import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Phone, Mail, User, CheckCircle, Send, AlertCircle } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase.ts';
import { ConsultationRequest } from '../types.ts';

const WHATSAPP_NUMBER = '919566894134';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const NOTES_MAX_LENGTH = 500;

interface InquiryFormProps {
  preselectedService?: string;
  onSuccess?: (request: ConsultationRequest) => void;
}

type FieldName = 'fullName' | 'phone' | 'email' | 'serviceType' | 'notes';

type FieldErrors = Partial<Record<FieldName, string>>;

export default function InquiryForm({ preselectedService = '', onSuccess }: InquiryFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [serviceType, setServiceType] = useState(preselectedService || 'all-inclusive');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [showSummaryError, setShowSummaryError] = useState(false);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  const fieldRefs: Record<FieldName, React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>> = {
    fullName: fullNameRef,
    phone: phoneRef,
    email: emailRef,
    serviceType: serviceRef,
    notes: notesRef,
  };

  const serviceOptions = [
    { value: 'all-inclusive', label: 'EMedia full-service decoration package' },
    { value: 's1', label: 'Ceremony decor' },
    { value: 's2', label: 'Wedding reception styling' },
    { value: 's3', label: 'Outdoor event setup' },
    { value: 's4', label: 'Birthday party decoration' },
    { value: 'flex-banner', label: 'Flex Banner' },
    { value: 'other', label: 'Other product or service request' },
  ];

  // React to preselected changes
  React.useEffect(() => {
    if (preselectedService) {
      setServiceType(preselectedService);
    }
  }, [preselectedService]);

  const validators: Record<FieldName, (value: string) => string | undefined> = {
    fullName: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return 'Full name is required.';
      if (trimmed.length < 2) return 'Please enter at least 2 characters.';
      if (trimmed.length > 60) return 'Full name must be under 60 characters.';
      return undefined;
    },
    phone: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return 'Phone number is required.';
      if (!PHONE_REGEX.test(trimmed)) return 'Please enter a valid 10-digit phone number.';
      return undefined;
    },
    email: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return 'Email address is required.';
      if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address.';
      return undefined;
    },
    serviceType: (value) => {
      if (!value) return 'Please select a service.';
      return undefined;
    },
    notes: (value) => {
      if (value.length > NOTES_MAX_LENGTH) return `Please keep notes under ${NOTES_MAX_LENGTH} characters.`;
      return undefined;
    },
  };

  const fieldValues: Record<FieldName, string> = { fullName, phone, email, serviceType, notes };

  const validateAll = (): FieldErrors => {
    const errors: FieldErrors = {};
    (Object.keys(validators) as FieldName[]).forEach((name) => {
      const error = validators[name](fieldValues[name]);
      if (error) errors[name] = error;
    });
    return errors;
  };

  // Live-clears (or updates) an error as soon as the field becomes valid,
  // but only for fields the user has already interacted with.
  const handleFieldChange = (name: FieldName, value: string) => {
    if (touched[name] || showSummaryError) {
      setFieldErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  };

  const handleFieldBlur = (name: FieldName) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({ ...prev, [name]: validators[name](fieldValues[name]) }));
  };

  // Digits only, capped at 10 (no country code) — an 11th digit simply
  // can't be entered, and reaching the 10th moves focus to the next field.
  const handlePhoneChange = (rawValue: string) => {
    const digitsOnly = rawValue.replace(/\D/g, '').slice(0, 10);
    setPhone(digitsOnly);
    handleFieldChange('phone', digitsOnly);
    if (digitsOnly.length === 10) {
      // Deferred so the focus-triggered blur on this field fires after React
      // re-renders with the completed value — otherwise it re-validates the
      // stale (incomplete) value and the "10-digit" error flashes back.
      setTimeout(() => emailRef.current?.focus(), 0);
    }
  };

  const inputClass = (name: FieldName) =>
    `w-full pl-9 pr-3 py-2 border rounded text-sm focus:outline-none ${
      fieldErrors[name] ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-primary'
    }`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateAll();
    setFieldErrors(errors);
    setTouched({ fullName: true, phone: true, email: true, serviceType: true, notes: true });

    const fieldOrder: FieldName[] = ['fullName', 'phone', 'email', 'serviceType', 'notes'];
    const firstInvalidField = fieldOrder.find((name) => errors[name]);

    if (firstInvalidField) {
      setShowSummaryError(true);
      fieldRefs[firstInvalidField].current?.focus();
      return;
    }

    setShowSummaryError(false);

    const resolvedServiceLabel = serviceOptions.find(o => o.value === serviceType)?.label || serviceType;

    const newInquiry: ConsultationRequest = {
      id: 'req-' + Math.random().toString(36).substr(2, 9),
      fullName,
      phone,
      email,
      weddingDate: weddingDate || 'Not set',
      serviceType: resolvedServiceLabel,
      notes,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save to local storage
    const existing = localStorage.getItem('nhuy_consultations');
    const list = existing ? JSON.parse(existing) : [];
    list.unshift(newInquiry);
    localStorage.setItem('nhuy_consultations', JSON.stringify(list));

    // Send the full enquiry to EMedia's WhatsApp number
    const whatsappMessage = `New Quote Enquiry - EMediaEvent

Name: ${fullName.trim()}
Phone: ${phone.trim()}
Email: ${email.trim()}
Expected Event Date: ${weddingDate || 'Not set'}
Service of Interest: ${resolvedServiceLabel}
Notes: ${notes || 'None'}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener,noreferrer');

    // Store the enquiry in Firebase under the "Quotes Enquiry" category so it
    // shows up live in the admin dashboard.
    try {
      await addDoc(collection(db, 'quoteEnquiries'), {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        weddingDate: weddingDate || 'Not set',
        serviceType: resolvedServiceLabel,
        notes,
        status: 'pending',
        category: 'Quotes Enquiry',
        createdAt: Date.now(),
      });
    } catch (err) {
      console.error('Failed to save quote enquiry to Firestore', err);
    }

    setIsSubmitted(true);
    setFullName('');
    setPhone('');
    setEmail('');
    setWeddingDate('');
    setNotes('');
    setFieldErrors({});
    setTouched({});

    if (onSuccess) {
      onSuccess(newInquiry);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-primary/10 shadow-sm" id="inquiry-form-container" data-no-text-reveal>
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
          id="inquiry-success-message"
          role="status"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h3 className="font-elegant text-2xl font-bold text-primary mb-2">Inquiry sent successfully!</h3>
          <p className="text-gray-600 text-sm max-w-sm mx-auto mb-6">
            Thank you for trusting EMedia. Our team will get back to you by phone within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-xs uppercase font-bold text-primary hover:underline"
            id="inquiry-reset-btn"
          >
            Send another inquiry
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="text-center mb-4">
            <h3 className="font-elegant text-2xl text-primary font-bold">Book a Free Event Consultation in Erode</h3>
            <p className="text-xs text-gray-500">EMediaEvent will prepare a detailed decoration quote aligned with your budget and event vision</p>
          </div>

          {showSummaryError && (
            <div
              className="bg-red-50 border-l-4 border-red-500 p-3 text-xs text-red-700 flex items-start gap-2"
              id="inquiry-form-error"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Please fill in all required fields before submitting.</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1" htmlFor="field-fullname">Full name *</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <User className="h-4 w-4" />
              </span>
              <input
                ref={fullNameRef}
                type="text"
                placeholder="Enter your full name..."
                className={inputClass('fullName')}
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); handleFieldChange('fullName', e.target.value); }}
                onBlur={() => handleFieldBlur('fullName')}
                id="field-fullname"
                aria-invalid={!!fieldErrors.fullName}
                aria-describedby={fieldErrors.fullName ? 'field-fullname-error' : undefined}
                aria-required="true"
              />
            </div>
            {fieldErrors.fullName && (
              <p className="text-[11px] text-red-500 mt-1" id="field-fullname-error" role="alert">{fieldErrors.fullName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1" htmlFor="field-phone">Phone number *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Phone className="h-4 w-4" />
                </span>
                <input
                  ref={phoneRef}
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit phone number..."
                  className={inputClass('phone')}
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onBlur={() => handleFieldBlur('phone')}
                  id="field-phone"
                  aria-invalid={!!fieldErrors.phone}
                  aria-describedby={fieldErrors.phone ? 'field-phone-error' : undefined}
                  aria-required="true"
                />
              </div>
              {fieldErrors.phone && (
                <p className="text-[11px] text-red-500 mt-1" id="field-phone-error" role="alert">{fieldErrors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1" htmlFor="field-email">Email *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="example@gmail.com"
                  className={inputClass('email')}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); handleFieldChange('email', e.target.value); }}
                  onBlur={() => handleFieldBlur('email')}
                  id="field-email"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? 'field-email-error' : undefined}
                  aria-required="true"
                />
              </div>
              {fieldErrors.email && (
                <p className="text-[11px] text-red-500 mt-1" id="field-email-error" role="alert">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1" htmlFor="field-date">Expected event date</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Calendar className="h-4 w-4" />
                </span>
                <input
                  type="date"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  id="field-date"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1" htmlFor="field-service">Service of interest *</label>
              <select
                ref={serviceRef}
                className={`w-full px-3 py-2 border rounded text-sm focus:outline-none bg-white ${
                  fieldErrors.serviceType ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-primary'
                }`}
                value={serviceType}
                onChange={(e) => { setServiceType(e.target.value); handleFieldChange('serviceType', e.target.value); }}
                onBlur={() => handleFieldBlur('serviceType')}
                id="field-service"
                aria-invalid={!!fieldErrors.serviceType}
                aria-describedby={fieldErrors.serviceType ? 'field-service-error' : undefined}
                aria-required="true"
              >
                {serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {fieldErrors.serviceType && (
                <p className="text-[11px] text-red-500 mt-1" id="field-service-error" role="alert">{fieldErrors.serviceType}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1" htmlFor="field-notes">Additional requests or questions</label>
            <textarea
              ref={notesRef}
              rows={3}
              maxLength={NOTES_MAX_LENGTH}
              placeholder="Share notes about style, color palette, or budget goals..."
              className={`w-full px-3 py-2 border rounded text-sm focus:outline-none ${
                fieldErrors.notes ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-primary'
              }`}
              value={notes}
              onChange={(e) => { setNotes(e.target.value); handleFieldChange('notes', e.target.value); }}
              onBlur={() => handleFieldBlur('notes')}
              id="field-notes"
              aria-invalid={!!fieldErrors.notes}
              aria-describedby={fieldErrors.notes ? 'field-notes-error' : undefined}
            />
            {fieldErrors.notes && (
              <p className="text-[11px] text-red-500 mt-1" id="field-notes-error" role="alert">{fieldErrors.notes}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded text-sm uppercase flex items-center justify-center gap-2 cursor-pointer transition shadow-xs"
            id="inquiry-submit-btn"
          >
            <Send className="w-4 h-4" />
            Get a quote now
          </button>
        </form>
      )}
    </div>
  );
}
