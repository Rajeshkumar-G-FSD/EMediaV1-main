import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import QRCode from 'qrcode';
import { ArrowLeft, Upload, AlertCircle, Loader2, IndianRupee, ScanLine } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase.ts';
import { ParticipantRegistration } from '../../types.ts';
import { COMPETITION_PAYMENT_INFO } from '../../data.ts';
import { prepareFileForUpload, blobToDataUri, SCREENSHOT_TYPES } from '../../lib/fileUpload.ts';
import { syncRegistrationToSheet } from '../../lib/googleSheetsSync.ts';

// Kept well under Firestore's 1 MiB per-document cap — see the matching
// constant in CompetitionForm.tsx for why.
const SCREENSHOT_MIN_BYTES = 10 * 1024;
const SCREENSHOT_MAX_BYTES = 250 * 1024;

interface CompetitionPaymentPageProps {
  registration: ParticipantRegistration;
  onBack: () => void;
  onSubmitted: (registration: ParticipantRegistration) => void;
}

export default function CompetitionPaymentPage({ registration, onBack, onSubmitted }: CompetitionPaymentPageProps) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotError, setScreenshotError] = useState('');
  const [transactionError, setTransactionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const upiUri = `upi://pay?pa=${encodeURIComponent(COMPETITION_PAYMENT_INFO.upiId)}&pn=${encodeURIComponent(COMPETITION_PAYMENT_INFO.accountHolderName)}&am=${registration.entryFee}&cu=INR&tn=${encodeURIComponent(registration.registrationNumber)}`;
    QRCode.toDataURL(upiUri, { width: 320, margin: 1, color: { dark: '#175E5E', light: '#FFFFFF' } })
      .then(setQrDataUrl)
      .catch((err) => console.error('Failed to generate payment QR code', err));
  }, [registration.entryFee, registration.registrationNumber]);

  const handleSubmit = async () => {
    setSubmitError('');
    let hasError = false;

    if (!transactionId.trim()) {
      setTransactionError('Transaction ID is required.');
      hasError = true;
    } else {
      setTransactionError('');
    }

    if (!screenshotFile) {
      setScreenshotError('Please upload your payment screenshot.');
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);
    try {
      const prepared = await prepareFileForUpload(screenshotFile as File, {
        allowedTypes: SCREENSHOT_TYPES,
        minBytes: SCREENSHOT_MIN_BYTES,
        maxBytes: SCREENSHOT_MAX_BYTES,
      });
      if (prepared.error) {
        setScreenshotError(prepared.error);
        setIsSubmitting(false);
        return;
      }

      const paymentScreenshotURL = await blobToDataUri(prepared.blob);

      const updates = {
        transactionId: transactionId.trim(),
        paymentScreenshotURL,
        paymentStatus: 'payment_submitted' as const,
        updatedAt: Date.now(),
      };
      await updateDoc(doc(db, 'participants', registration.id), updates);

      const updatedRegistration = { ...registration, ...updates };
      syncRegistrationToSheet(updatedRegistration);
      onSubmitted(updatedRegistration);
    } catch (err) {
      console.error('Failed to submit payment confirmation', err);
      setSubmitError('Something went wrong while submitting your payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="competition-payment-page" data-no-text-reveal className="min-h-screen bg-light py-10 sm:py-16">
      <div className="container mx-auto px-4 max-w-2xl">

        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary hover:underline mb-6 cursor-pointer"
          id="competition-payment-back-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur rounded-2xl border border-white shadow-md p-6 sm:p-8"
        >
          <div className="text-center mb-6">
            <h2 className="font-elegant text-2xl font-bold text-primary mb-1 flex items-center justify-center gap-2">
              <ScanLine className="w-6 h-6" />
              Scan &amp; Pay
            </h2>
            <p className="text-xs text-gray-500">Complete your registration by paying the entry fee below</p>
          </div>

          {/* QR code */}
          <div className="flex flex-col items-center gap-2 mb-6">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="UPI payment QR code" className="w-56 h-56 sm:w-64 sm:h-64 rounded-xl border-4 border-primary/10" />
            ) : (
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-xl border-4 border-primary/10 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            )}
            <p className="text-sm font-bold text-gray-700">{COMPETITION_PAYMENT_INFO.upiId}</p>
            <p className="text-xs text-gray-400">{COMPETITION_PAYMENT_INFO.accountHolderName}</p>
          </div>

          {/* Registration summary */}
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-1.5 text-sm mb-6">
            <div className="flex justify-between"><span className="text-gray-500">Registration No.</span><span className="font-bold text-gray-800 font-mono">{registration.registrationNumber}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Participant</span><span className="font-bold text-gray-800">{registration.fullName}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Competition</span><span className="font-bold text-gray-800">{registration.competitionName}</span></div>
            <div className="flex justify-between items-center pt-1.5 border-t border-primary/10">
              <span className="font-bold text-primary">Amount to pay</span>
              <span className="font-bold text-primary text-lg flex items-center"><IndianRupee className="w-4 h-4" />{registration.entryFee}</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 bg-white border border-gray-100 rounded-lg p-3 mb-6 space-y-1">
            <p>1. Scan the QR code above using any UPI app.</p>
            <p>2. Pay the exact amount shown.</p>
            <p>3. Enter your transaction ID and upload a payment screenshot below.</p>
          </div>

          {/* Confirmation form */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Transaction ID *</label>
              <input
                className={`w-full px-3 py-2 border rounded text-sm focus:outline-none ${transactionError ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                value={transactionId}
                onChange={(e) => { setTransactionId(e.target.value); setTransactionError(''); }}
                id="cp-transaction-id"
              />
              {transactionError && <p className="text-[11px] text-red-500 mt-1">{transactionError}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Payment screenshot *</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`flex items-center gap-3 border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-primary transition ${screenshotError ? 'border-red-300' : 'border-gray-200'}`}
              >
                <Upload className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-500 truncate">
                  {screenshotFile ? screenshotFile.name : 'JPG, PNG or WEBP — 10 KB to 250 KB'}
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={(e) => { setScreenshotFile(e.target.files?.[0] ?? null); setScreenshotError(''); }}
                id="cp-screenshot-file"
              />
              {screenshotError && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{screenshotError}</p>}
            </div>

            {submitError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 text-xs text-red-700 flex items-start gap-2" role="alert">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase text-sm py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-60"
              id="cp-submit-btn"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? 'Submitting...' : 'Submit payment confirmation'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
