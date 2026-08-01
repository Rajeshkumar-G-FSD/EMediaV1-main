import { forwardRef } from 'react';
import { ParticipantRegistration } from '../../types.ts';
import { PARTICIPANT_TYPE_LABELS } from '../../data.ts';

export type ReceiptStatus = 'submitted' | 'verified' | 'rejected';

const STATUS_BADGE: Record<ReceiptStatus, { label: string; className: string }> = {
  submitted: { label: 'Payment submitted — pending verification', className: 'bg-amber-50 text-amber-600' },
  verified: { label: 'Registration confirmed', className: 'bg-emerald-50 text-emerald-700' },
  rejected: { label: 'Payment rejected', className: 'bg-red-50 text-red-600' },
};

interface CompetitionReceiptCardProps {
  registration: ParticipantRegistration;
  status: ReceiptStatus;
}

// Shared bill/receipt layout, captured as a PNG via html2canvas wherever it's
// used (registration success page, admin approve/reject) so it can be
// attached in WhatsApp — wa.me links can only pre-fill text, never media.
const CompetitionReceiptCard = forwardRef<HTMLDivElement, CompetitionReceiptCardProps>(
  ({ registration, status }, ref) => {
    const badge = STATUS_BADGE[status];
    return (
      <div ref={ref} className="bg-white border-2 border-primary/20 rounded-lg p-6 w-full max-w-[380px] print:border-0" id="competition-receipt-capture-target">
        <div className="text-center border-b-2 border-dashed border-gray-200 pb-4 mb-4">
          <img src="/images/emediaevents_logo.png" alt="EMediaEvent" className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-primary/20" />
          <p className="font-elegant text-xl font-bold text-primary">EMediaEvent</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Competition Registration Receipt</p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-gray-500 uppercase">Registration No.</span>
          <span className="text-sm font-mono font-bold text-primary">{registration.registrationNumber}</span>
        </div>

        <div className="space-y-1.5 text-xs text-gray-600">
          <div className="flex justify-between"><span>Participant</span><span className="font-semibold text-gray-800">{registration.fullName}</span></div>
          <div className="flex justify-between"><span>Phone</span><span className="font-semibold text-gray-800">{registration.mobile}</span></div>
          <div className="flex justify-between"><span>Competition</span><span className="font-semibold text-gray-800">{registration.competitionName}</span></div>
          <div className="flex justify-between"><span>Category</span><span className="font-semibold text-gray-800">{registration.categoryLabel}</span></div>
          <div className="flex justify-between"><span>Participant type</span><span className="font-semibold text-gray-800">{PARTICIPANT_TYPE_LABELS[registration.participantType]}</span></div>
          <div className="flex justify-between"><span>Transaction ID</span><span className="font-semibold text-gray-800">{registration.transactionId}</span></div>
        </div>

        <div className="border-t-2 border-dashed border-gray-200 mt-4 pt-3 flex justify-between items-center">
          <span className="text-xs text-gray-500">Amount Paid</span>
          <span className="font-bold text-emerald-600 text-lg">₹{registration.entryFee}</span>
        </div>

        <div className="text-center mt-4">
          <span className={`inline-block text-[10px] font-bold uppercase px-3 py-1 rounded-full ${badge.className}`}>
            {badge.label}
          </span>
        </div>

        <div className="text-center mt-4 pt-3 border-t border-dashed border-gray-200 text-[10px] text-gray-400">
          Thank you for registering with EMediaEvent!
          <br />
          +91 95668 94134
        </div>
      </div>
    );
  }
);

CompetitionReceiptCard.displayName = 'CompetitionReceiptCard';
export default CompetitionReceiptCard;
