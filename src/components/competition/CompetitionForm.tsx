import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft, ArrowRight, User, Users, Phone, MessageCircle, Mail, MapPin,
  Hash, Upload, AlertCircle, IndianRupee, Loader2,
} from 'lucide-react';
import { doc, setDoc, FirestoreError } from 'firebase/firestore';
import { db } from '../../lib/firebase.ts';
import { CompetitionDefinition, ParticipantType, ParticipantRegistration } from '../../types.ts';
import { COMPETITIONS_DATA, PARTICIPANT_ENTRY_FEE, PARTICIPANT_TYPE_LABELS, TAMIL_NADU_DISTRICTS } from '../../data.ts';
import { generateRegistrationNumber } from '../../lib/registrationNumber.ts';
import { prepareFileForUpload, blobToDataUri, ID_PROOF_TYPES } from '../../lib/fileUpload.ts';

// Kept well under Firestore's 1 MiB per-document cap: this doc also carries
// a payment screenshot (see CompetitionPaymentPage.tsx) added later, plus
// base64 encoding inflates size by ~33% over the raw compressed bytes.
const ID_PROOF_MIN_BYTES = 10 * 1024;
const ID_PROOF_MAX_BYTES = 250 * 1024;

const PHONE_REGEX = /^[0-9]{10}$/;
const PINCODE_REGEX = /^[0-9]{6}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const calculateAge = (dob: string): number => {
  if (!dob) return 0;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
  return Math.max(age, 0);
};

interface CompetitionFormProps {
  competition: CompetitionDefinition;
  onCancel: () => void;
  onSubmitted: (registration: ParticipantRegistration) => void;
}

type Step1Field = 'fullName' | 'parentName' | 'parentContactNumber' | 'mobile' | 'address' | 'district' | 'pincode' | 'email';

export default function CompetitionForm({ competition, onCancel, onSubmitted }: CompetitionFormProps) {
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 fields
  const [fullName, setFullName] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentContactNumber, setParentContactNumber] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [participantType, setParticipantType] = useState<ParticipantType>('public');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofError, setProofError] = useState('');

  const [step1Errors, setStep1Errors] = useState<Partial<Record<Step1Field, string>>>({});

  // Step 2 fields
  const [competitionId, setCompetitionId] = useState(competition.id);
  const selectedCompetition = useMemo(
    () => COMPETITIONS_DATA.find((c) => c.id === competitionId) ?? competition,
    [competitionId, competition]
  );
  const [categoryId, setCategoryId] = useState(selectedCompetition.categories[0]?.id ?? '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const age = calculateAge(dob);
  const entryFee = PARTICIPANT_ENTRY_FEE[participantType];

  const handleCompetitionChange = (id: string) => {
    setCompetitionId(id);
    const next = COMPETITIONS_DATA.find((c) => c.id === id);
    setCategoryId(next?.categories[0]?.id ?? '');
  };

  const inputClass = (hasError: boolean) =>
    `w-full pl-9 pr-3 py-2 border rounded text-sm focus:outline-none ${
      hasError ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-primary'
    }`;

  const validateStep1 = (): boolean => {
    const errors: Partial<Record<Step1Field, string>> = {};
    if (!fullName.trim() || fullName.trim().length < 2) errors.fullName = 'Please enter the participant\'s full name.';
    if (!parentName.trim() || parentName.trim().length < 2) errors.parentName = 'Please enter parent/spouse/guardian name.';
    if (parentContactNumber.trim() && !PHONE_REGEX.test(parentContactNumber.trim())) errors.parentContactNumber = 'Please enter a valid 10-digit number.';
    if (!PHONE_REGEX.test(mobile.trim())) errors.mobile = 'Please enter a valid 10-digit mobile number.';
    if (!address.trim()) errors.address = 'Address is required.';
    if (!district) errors.district = 'Please select a district.';
    if (!PINCODE_REGEX.test(pincode.trim())) errors.pincode = 'Please enter a valid 6-digit pincode.';
    if (email.trim() && !EMAIL_REGEX.test(email.trim())) errors.email = 'Please enter a valid email address.';

    setStep1Errors(errors);

    if (participantType !== 'public' && !proofFile) {
      setProofError(`Please upload your ${participantType === 'school' ? 'school' : 'college'} ID card.`);
      return false;
    }

    return Object.keys(errors).length === 0;
  };

  const handleProofFileChange = (file: File | null) => {
    setProofError('');
    setProofFile(file);
  };

  const handleStep1Continue = () => {
    if (!validateStep1()) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setSubmitError('');
    setIsSubmitting(true);
    try {
      let proofDocumentURL = '';
      if (participantType !== 'public' && proofFile) {
        const prepared = await prepareFileForUpload(proofFile, {
          allowedTypes: ID_PROOF_TYPES,
          minBytes: ID_PROOF_MIN_BYTES,
          maxBytes: ID_PROOF_MAX_BYTES,
        });
        if (prepared.error) {
          setProofError(prepared.error);
          setStep(1);
          setIsSubmitting(false);
          return;
        }
        proofDocumentURL = await blobToDataUri(prepared.blob);
      }

      const registrationNumber = await generateRegistrationNumber();
      const category = selectedCompetition.categories.find((c) => c.id === categoryId);
      const now = Date.now();

      const registration: Omit<ParticipantRegistration, 'id'> = {
        registrationNumber,
        fullName: fullName.trim(),
        parentName: parentName.trim(),
        parentContactNumber: parentContactNumber.trim(),
        mobile: mobile.trim(),
        whatsapp: whatsapp.trim() || mobile.trim(),
        email: email.trim(),
        gender,
        dob,
        age,
        address: address.trim(),
        district,
        pincode: pincode.trim(),
        participantType,
        proofDocumentURL,
        competitionId: selectedCompetition.id,
        competitionName: selectedCompetition.nameEnglish,
        categoryId,
        categoryLabel: category?.label ?? '',
        entryFee,
        transactionId: '',
        paymentScreenshotURL: '',
        paymentStatus: 'pending_payment',
        verificationStatus: 'pending',
        remarks: '',
        createdAt: now,
        updatedAt: now,
      };

      // A deterministic doc ID (rather than a random one) lets Firestore
      // security rules reject a second registration for the same mobile
      // number + competition without needing public read/list access to
      // check for duplicates first — see firestore.rules.
      const registrationId = `${mobile.trim()}_${selectedCompetition.id}`;
      await setDoc(doc(db, 'participants', registrationId), registration);
      onSubmitted({ id: registrationId, ...registration });
    } catch (err) {
      console.error('Failed to submit competition registration', err);
      if (err instanceof FirestoreError && err.code === 'permission-denied') {
        setSubmitError('This mobile number is already registered for this competition.');
      } else {
        setSubmitError('Something went wrong while saving your registration. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="competition-form-page" data-no-text-reveal className="min-h-screen bg-light py-10 sm:py-16">
      <div className="container mx-auto px-4 max-w-2xl">

        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary hover:underline mb-6 cursor-pointer"
          id="competition-form-back-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to competitions
        </button>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2].map((n) => (
            <React.Fragment key={n}>
              <div className={`flex items-center gap-2 ${step >= n ? 'text-primary' : 'text-gray-300'}`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  step >= n ? 'bg-primary text-white border-primary' : 'border-gray-200'
                }`}>
                  {n}
                </span>
                <span className="text-xs font-bold uppercase tracking-wide hidden sm:inline">
                  {n === 1 ? 'Participant Details' : 'Competition Details'}
                </span>
              </div>
              {n === 1 && <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/80 backdrop-blur rounded-2xl border border-white shadow-md p-6 sm:p-8"
        >
          {step === 1 ? (
            <div className="space-y-4">
              <h2 className="font-elegant text-2xl font-bold text-primary mb-1">Participant Details</h2>
              <p className="text-xs text-gray-500 mb-4">Registering for {selectedCompetition.nameTamil} ({selectedCompetition.nameEnglish})</p>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Full name *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><User className="h-4 w-4" /></span>
                  <input className={inputClass(!!step1Errors.fullName)} value={fullName} onChange={(e) => setFullName(e.target.value)} id="cf-fullname" />
                </div>
                {step1Errors.fullName && <p className="text-[11px] text-red-500 mt-1">{step1Errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Parent / Spouse / Guardian name *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Users className="h-4 w-4" /></span>
                    <input className={inputClass(!!step1Errors.parentName)} value={parentName} onChange={(e) => setParentName(e.target.value)} id="cf-parentname" />
                  </div>
                  {step1Errors.parentName && <p className="text-[11px] text-red-500 mt-1">{step1Errors.parentName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Their number (secondary)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Phone className="h-4 w-4" /></span>
                    <input
                      className={inputClass(!!step1Errors.parentContactNumber)}
                      inputMode="numeric"
                      maxLength={10}
                      value={parentContactNumber}
                      onChange={(e) => setParentContactNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      id="cf-parent-contact"
                    />
                  </div>
                  {step1Errors.parentContactNumber && <p className="text-[11px] text-red-500 mt-1">{step1Errors.parentContactNumber}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Mobile number *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Phone className="h-4 w-4" /></span>
                    <input
                      className={inputClass(!!step1Errors.mobile)}
                      inputMode="numeric"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      id="cf-mobile"
                    />
                  </div>
                  {step1Errors.mobile && <p className="text-[11px] text-red-500 mt-1">{step1Errors.mobile}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">WhatsApp number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><MessageCircle className="h-4 w-4" /></span>
                    <input
                      className={inputClass(false)}
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Same as mobile if left blank"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      id="cf-whatsapp"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Mail className="h-4 w-4" /></span>
                  <input className={inputClass(!!step1Errors.email)} type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="cf-email" />
                </div>
                {step1Errors.email && <p className="text-[11px] text-red-500 mt-1">{step1Errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Gender</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none bg-white" value={gender} onChange={(e) => setGender(e.target.value)} id="cf-gender">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Date of birth</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none" value={dob} max={new Date().toISOString().split('T')[0]} onChange={(e) => setDob(e.target.value)} id="cf-dob" />
                  {dob && <p className="text-[11px] text-gray-400 mt-1">Age: {age} years</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Address *</label>
                <div className="relative">
                  <span className="absolute top-2.5 left-0 pl-3 flex items-center text-gray-400"><MapPin className="h-4 w-4" /></span>
                  <textarea rows={2} className={inputClass(!!step1Errors.address)} value={address} onChange={(e) => setAddress(e.target.value)} id="cf-address" />
                </div>
                {step1Errors.address && <p className="text-[11px] text-red-500 mt-1">{step1Errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">District *</label>
                  <select
                    className={`w-full px-3 py-2 border rounded text-sm focus:outline-none bg-white ${step1Errors.district ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    id="cf-district"
                  >
                    <option value="">Select district</option>
                    {TAMIL_NADU_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {step1Errors.district && <p className="text-[11px] text-red-500 mt-1">{step1Errors.district}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Pincode *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Hash className="h-4 w-4" /></span>
                    <input
                      className={inputClass(!!step1Errors.pincode)}
                      inputMode="numeric"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      id="cf-pincode"
                    />
                  </div>
                  {step1Errors.pincode && <p className="text-[11px] text-red-500 mt-1">{step1Errors.pincode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Participant type *</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none bg-white"
                  value={participantType}
                  onChange={(e) => {
                    setParticipantType(e.target.value as ParticipantType);
                    setProofFile(null);
                    setProofError('');
                  }}
                  id="cf-participant-type"
                >
                  <option value="school">School Student</option>
                  <option value="college">College Student</option>
                  <option value="public">Public</option>
                </select>
              </div>

              {participantType !== 'public' && (
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Upload {participantType === 'school' ? 'School' : 'College'} ID card *
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex items-center gap-3 border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-primary transition ${proofError ? 'border-red-300' : 'border-gray-200'}`}
                  >
                    <Upload className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-500 truncate">
                      {proofFile ? proofFile.name : 'JPG or PNG — 10 KB to 250 KB'}
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleProofFileChange(e.target.files?.[0] ?? null)}
                    id="cf-proof-file"
                  />
                  {proofError && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{proofError}</p>}
                </div>
              )}

              <button
                onClick={handleStep1Continue}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase text-sm py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition"
                id="cf-step1-continue-btn"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="font-elegant text-2xl font-bold text-primary mb-1">Competition Details</h2>
              <p className="text-xs text-gray-500 mb-4">Participant: {fullName}</p>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Competition *</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none bg-white"
                  value={competitionId}
                  onChange={(e) => handleCompetitionChange(e.target.value)}
                  id="cf-competition"
                >
                  {COMPETITIONS_DATA.map((c) => (
                    <option key={c.id} value={c.id}>{c.nameTamil} — {c.nameEnglish}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Category *</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none bg-white"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  id="cf-category"
                >
                  {selectedCompetition.categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Participant type</span>
                  <span className="font-bold text-gray-800">{PARTICIPANT_TYPE_LABELS[participantType]}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Registration fee</span>
                  <span className="font-bold text-gray-800 flex items-center"><IndianRupee className="w-3.5 h-3.5" />{entryFee}</span>
                </div>
                <div className="flex items-center justify-between text-base border-t border-primary/10 pt-2">
                  <span className="font-bold text-primary">Total amount</span>
                  <span className="font-bold text-primary flex items-center"><IndianRupee className="w-4 h-4" />{entryFee}</span>
                </div>
              </div>

              {submitError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 text-xs text-red-700 flex items-start gap-2" role="alert">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold uppercase text-sm py-3 rounded-lg cursor-pointer transition"
                  id="cf-step2-back-btn"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold uppercase text-sm py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-60"
                  id="cf-step2-continue-btn"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  {isSubmitting ? 'Saving...' : 'Continue to payment'}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
