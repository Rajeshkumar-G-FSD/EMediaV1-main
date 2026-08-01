import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import html2canvas from 'html2canvas-pro';
import { CheckCircle, Download, Printer, Home } from 'lucide-react';
import { ParticipantRegistration } from '../../types.ts';
import { COMPETITION_PAYMENT_INFO, PARTICIPANT_TYPE_LABELS } from '../../data.ts';
import CompetitionReceiptCard from './CompetitionReceiptCard.tsx';

interface CompetitionSuccessPageProps {
  registration: ParticipantRegistration;
  onDone: () => void;
}

export default function CompetitionSuccessPage({ registration, onDone }: CompetitionSuccessPageProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const hasOpenedWhatsApp = useRef(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const whatsAppMessage = `Competition Registration

Registration No: ${registration.registrationNumber}
Name: ${registration.fullName}
Phone: ${registration.mobile}
Competition: ${registration.competitionName}
Category: ${registration.categoryLabel}
Participant Type: ${PARTICIPANT_TYPE_LABELS[registration.participantType]}
Amount: ₹${registration.entryFee}
Transaction ID: ${registration.transactionId}

A receipt image was just downloaded to your device — please attach it in this chat.`;

  const downloadReceipt = async () => {
    if (!receiptRef.current) return;
    const canvas = await html2canvas(receiptRef.current, { scale: 2, backgroundColor: '#ffffff' });
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${registration.registrationNumber}-receipt.png`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    if (hasOpenedWhatsApp.current) return;
    hasOpenedWhatsApp.current = true;

    // Downloads the exact same bill (logo + registration details between the
    // dashed borders) shown below, then opens WhatsApp with the text — a
    // wa.me link can only pre-fill text, never attach media, so the
    // participant attaches the just-downloaded image themselves.
    (async () => {
      await downloadReceipt();
      window.open(
        `https://wa.me/${COMPETITION_PAYMENT_INFO.organizerWhatsAppNumber}?text=${encodeURIComponent(whatsAppMessage)}`,
        '_blank',
        'noopener,noreferrer'
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadReceipt();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => window.print();

  return (
    <div id="competition-success-page" data-no-text-reveal className="min-h-screen bg-light py-10 sm:py-16">
      <div className="container mx-auto px-4 max-w-lg">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6 print:hidden"
        >
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-9 h-9" />
          </div>
          <h1 className="font-elegant text-2xl sm:text-3xl font-bold text-primary mb-1">Registration Successful!</h1>
          <p className="text-sm text-gray-500">Payment submitted successfully. Our team will verify it shortly.</p>
        </motion.div>

        {/* Receipt card — captured as an image for download / printed directly */}
        <CompetitionReceiptCard ref={receiptRef} registration={registration} status="submitted" />

        <div className="flex flex-col sm:flex-row gap-3 mt-6 print:hidden">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold uppercase text-xs py-2.5 rounded cursor-pointer disabled:opacity-60"
            id="competition-download-receipt-btn"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Preparing...' : 'Download receipt'}
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 border border-primary/20 hover:bg-primary/5 text-primary font-bold uppercase text-xs py-2.5 rounded cursor-pointer"
            id="competition-print-receipt-btn"
          >
            <Printer className="w-4 h-4" />
            Print receipt
          </button>
          <button
            onClick={onDone}
            className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase text-xs py-2.5 rounded cursor-pointer"
            id="competition-done-btn"
          >
            <Home className="w-4 h-4" />
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
