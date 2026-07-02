import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';
import { BookingRecord } from '../../types.ts';
import Modal from '../Modal.tsx';

const formatCurrency = (num: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);

const toWhatsAppNumber = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `91${digits}`;
  return digits;
};

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingRecord;
  finalTotal: number;
  amountPaid: number;
}

export default function ReceiptModal({ isOpen, onClose, booking, finalTotal, amountPaid }: ReceiptModalProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const remaining = Math.max(finalTotal - amountPaid, 0);
  const status = amountPaid <= 0 ? 'unpaid' : amountPaid >= finalTotal ? 'paid' : 'partial';

  const handleDownloadAndShare = async () => {
    if (!receiptRef.current) return;
    setIsSharing(true);
    try {
      const canvas = await html2canvas(receiptRef.current, { scale: 2, backgroundColor: '#ffffff' });
      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `EMediaEvent-Receipt-${booking.customerName.replace(/\s+/g, '-')}.png`;
        link.click();
        URL.revokeObjectURL(url);
      }

      const message = `EMediaEvent - Payment Receipt

Customer: ${booking.customerName}
Event: ${booking.eventTypeLabel}
Total Amount: ${formatCurrency(finalTotal)}
Amount Paid: ${formatCurrency(amountPaid)}
Remaining Balance: ${formatCurrency(remaining)}
Status: ${status.toUpperCase()}

A receipt image was just downloaded to your device — please attach it in this chat.
Thank you for choosing EMediaEvent!`;

      window.open(
        `https://wa.me/${toWhatsAppNumber(booking.customerPhone)}?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer'
      );
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment Receipt">
      <div className="flex flex-col items-center gap-4">
        {/* Receipt card — captured as an image for sharing */}
        <div
          ref={receiptRef}
          className="w-full max-w-sm bg-white border-2 border-primary/20 rounded-lg p-6"
          id="receipt-capture-target"
        >
          <div className="text-center border-b-2 border-dashed border-gray-200 pb-4 mb-4">
            <img
              src="/images/emediaevents_logo.png"
              alt="EMediaEvent"
              className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-primary/20"
            />
            <p className="font-elegant text-xl font-bold text-primary">EMediaEvent</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Event Decoration in Erode</p>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase">Payment Receipt</span>
            <span className="text-[10px] text-gray-400 font-mono">{new Date().toLocaleDateString('en-IN')}</span>
          </div>

          <div className="space-y-1 text-xs text-gray-600 mb-4">
            <div className="flex justify-between">
              <span>Customer</span>
              <span className="font-semibold text-gray-800">{booking.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span>Phone</span>
              <span className="font-semibold text-gray-800">{booking.customerPhone}</span>
            </div>
            <div className="flex justify-between">
              <span>Event</span>
              <span className="font-semibold text-gray-800">{booking.eventTypeLabel}</span>
            </div>
          </div>

          {booking.addons.length > 0 && (
            <div className="text-xs text-gray-500 mb-4 space-y-1 border-t border-gray-100 pt-3">
              {booking.addons.map((a) => (
                <div className="flex justify-between" key={a.id}>
                  <span>{a.label}</span>
                  <span>{formatCurrency(a.price)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="border-t-2 border-dashed border-gray-200 pt-3 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-bold text-gray-800">{formatCurrency(finalTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-bold text-emerald-600">{formatCurrency(amountPaid)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Remaining Balance</span>
              <span className="font-bold text-red-500">{formatCurrency(remaining)}</span>
            </div>
          </div>

          <div className="text-center mt-4">
            <span
              className={`inline-block text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                status === 'paid'
                  ? 'bg-emerald-50 text-emerald-700'
                  : status === 'partial'
                  ? 'bg-amber-50 text-amber-600'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {status}
            </span>
          </div>

          <div className="text-center mt-4 pt-3 border-t border-dashed border-gray-200 text-[10px] text-gray-400">
            Thank you for choosing EMediaEvent!
            <br />
            +91 95668 94134
          </div>
        </div>

        <button
          onClick={handleDownloadAndShare}
          disabled={isSharing}
          className="w-full max-w-sm flex items-center justify-center gap-2 bg-secondary text-white font-bold uppercase text-xs py-2.5 rounded cursor-pointer disabled:opacity-60"
          id="receipt-download-share-btn"
        >
          <Download className="w-4 h-4" />
          {isSharing ? 'Preparing...' : 'Download & Share via WhatsApp'}
        </button>
      </div>
    </Modal>
  );
}
