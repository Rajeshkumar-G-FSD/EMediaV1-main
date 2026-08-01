import { useEffect, useMemo, useRef, useState, ComponentType } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas-pro';
import {
  Trophy, Users, Clock, CheckCircle2, XCircle, IndianRupee, GraduationCap, School, User as UserIcon,
  Phone, MessageCircle, FileText, Image as ImageIcon, Trash2, Search, Download, Loader2,
} from 'lucide-react';
import { db } from '../../lib/firebase.ts';
import { COMPETITIONS_DATA, PARTICIPANT_TYPE_LABELS } from '../../data.ts';
import { ParticipantRegistration, VerificationStatus, ParticipantType } from '../../types.ts';
import CompetitionReceiptCard from '../competition/CompetitionReceiptCard.tsx';

const VERIFICATION_STYLES: Record<VerificationStatus, string> = {
  pending: 'bg-amber-50 text-amber-600 border-amber-100',
  verified: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  rejected: 'bg-red-50 text-red-600 border-red-100',
};

const PAYMENT_STYLES: Record<ParticipantRegistration['paymentStatus'], string> = {
  pending_payment: 'bg-gray-100 text-gray-500 border-gray-200',
  payment_submitted: 'bg-blue-50 text-blue-600 border-blue-100',
};

const toWhatsAppDigits = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 ? `91${digits}` : digits;
};

const buildVerificationReceiptMessage = (registration: ParticipantRegistration, status: VerificationStatus) => [
  status === 'verified' ? '✅ *Registration Confirmed* — EMediaEvent' : '❌ *Payment Rejected* — EMediaEvent',
  '',
  `Registration No: ${registration.registrationNumber}`,
  `Name: ${registration.fullName}`,
  `Competition: ${registration.competitionName}`,
  `Category: ${registration.categoryLabel}`,
  `Participant Type: ${PARTICIPANT_TYPE_LABELS[registration.participantType]}`,
  `Amount Paid: ₹${registration.entryFee}`,
  `Transaction ID: ${registration.transactionId || '-'}`,
  '',
  status === 'verified'
    ? 'Your payment has been verified and your participation is confirmed. See you at the event!'
    : 'We could not verify your payment. Please contact us to resolve this.',
  '',
  'A receipt image was just downloaded to your device — please attach it in this chat.',
  '',
  'EMediaEvent — +91 95668 94134',
].join('\n');

const sendVerificationWhatsApp = (registration: ParticipantRegistration, status: VerificationStatus) => {
  const message = buildVerificationReceiptMessage(registration, status);
  window.open(
    `https://wa.me/${toWhatsAppDigits(registration.whatsapp || registration.mobile)}?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer'
  );
};

// wa.me links can only pre-fill text, never attach media, so the bill image
// is downloaded to the admin's device and the WhatsApp message (above) asks
// them to attach it manually — same pattern as ReceiptModal.tsx.
const downloadReceiptImage = async (node: HTMLElement | null, fileName: string) => {
  if (!node) return;
  const canvas = await html2canvas(node, { scale: 2, backgroundColor: '#ffffff' });
  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.png`;
  link.click();
  URL.revokeObjectURL(url);
};

const toCsvValue = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;

const exportToCsv = (rows: ParticipantRegistration[]) => {
  const headers = [
    'Registration No', 'Name', 'Phone', 'Competition', 'Category', 'Participant Type',
    'Entry Fee', 'Transaction ID', 'Payment Status', 'Verification Status', 'District', 'Date',
  ];
  const lines = [headers.join(',')];
  rows.forEach((r) => {
    lines.push([
      toCsvValue(r.registrationNumber),
      toCsvValue(r.fullName),
      toCsvValue(r.mobile),
      toCsvValue(r.competitionName),
      toCsvValue(r.categoryLabel),
      toCsvValue(PARTICIPANT_TYPE_LABELS[r.participantType]),
      toCsvValue(r.entryFee),
      toCsvValue(r.transactionId),
      toCsvValue(r.paymentStatus),
      toCsvValue(r.verificationStatus),
      toCsvValue(r.district),
      toCsvValue(new Date(r.createdAt).toLocaleString('en-IN')),
    ].join(','));
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `competition-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

interface RegistrationCardProps {
  registration: ParticipantRegistration;
}

function RegistrationCard({ registration }: RegistrationCardProps) {
  const [remarks, setRemarks] = useState(registration.remarks);
  const [sendingReceiptFor, setSendingReceiptFor] = useState<VerificationStatus | null>(null);
  const verifiedReceiptRef = useRef<HTMLDivElement>(null);
  const rejectedReceiptRef = useRef<HTMLDivElement>(null);

  const handleVerification = async (status: VerificationStatus) => {
    setSendingReceiptFor(status);
    try {
      await updateDoc(doc(db, 'participants', registration.id), { verificationStatus: status, updatedAt: Date.now() });
      const receiptNode = status === 'verified' ? verifiedReceiptRef.current : rejectedReceiptRef.current;
      await downloadReceiptImage(receiptNode, `${registration.registrationNumber}-${status}`);
      sendVerificationWhatsApp(registration, status);
    } finally {
      setSendingReceiptFor(null);
    }
  };

  const handleSaveRemarks = async () => {
    await updateDoc(doc(db, 'participants', registration.id), { remarks, updatedAt: Date.now() });
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete registration ${registration.registrationNumber}? This cannot be undone.`)) return;
    await deleteDoc(doc(db, 'participants', registration.id));
  };

  const handleWhatsApp = () => {
    const message = `Hi ${registration.fullName}, regarding your competition registration ${registration.registrationNumber} for ${registration.competitionName} — EMedia Event & Promotions.`;
    window.open(`https://wa.me/${toWhatsAppDigits(registration.whatsapp || registration.mobile)}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="p-5 border border-gray-100 rounded-md hover:border-primary/15 hover:shadow-xs transition bg-light flex flex-col gap-4"
      id={`admin-competition-reg-${registration.id}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{registration.registrationNumber}</span>
            <span className="font-bold text-gray-800 text-sm">{registration.fullName}</span>
            <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-2.5 py-0.5 uppercase tracking-wider">
              {registration.competitionName}
            </span>
            <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2.5 py-0.5 uppercase tracking-wider">
              {registration.categoryLabel}
            </span>
            <span className={`text-[10px] border px-2.5 py-0.5 uppercase tracking-wider font-bold rounded ${PAYMENT_STYLES[registration.paymentStatus]}`}>
              {registration.paymentStatus === 'payment_submitted' ? 'Payment Submitted' : 'Pending Payment'}
            </span>
            <span className={`text-[10px] border px-2.5 py-0.5 uppercase tracking-wider font-bold rounded ${VERIFICATION_STYLES[registration.verificationStatus]}`}>
              {registration.verificationStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-1 gap-x-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span>{registration.mobile}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-gray-400" />
              <span>Fee: <span className="font-semibold text-gray-700">₹{registration.entryFee}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>{PARTICIPANT_TYPE_LABELS[registration.participantType]}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>{registration.district}</span>
            </div>
          </div>

          {registration.transactionId && (
            <p className="text-[11px] text-gray-400 font-mono">Txn ID: {registration.transactionId}</p>
          )}
          <p className="text-[10px] text-gray-400 font-mono">
            Submitted {new Date(registration.createdAt).toLocaleString('en-IN')}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
          {registration.proofDocumentURL && (
            <a href={registration.proofDocumentURL} target="_blank" rel="noreferrer" className="p-1.5 bg-white border border-gray-200 rounded text-gray-500 hover:text-primary" title="Download ID proof">
              <FileText className="w-3.5 h-3.5" />
            </a>
          )}
          {registration.paymentScreenshotURL && (
            <a href={registration.paymentScreenshotURL} target="_blank" rel="noreferrer" className="p-1.5 bg-white border border-gray-200 rounded text-gray-500 hover:text-primary" title="View payment screenshot">
              <ImageIcon className="w-3.5 h-3.5" />
            </a>
          )}
          <a href={`tel:+91${registration.mobile}`} className="p-1.5 bg-white border border-gray-200 rounded text-gray-500 hover:text-primary" title="Call">
            <Phone className="w-3.5 h-3.5" />
          </a>
          <button onClick={handleWhatsApp} className="p-1.5 bg-white border border-gray-200 rounded text-gray-500 hover:text-primary cursor-pointer" title="WhatsApp">
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
          <button onClick={handleDelete} className="p-1.5 bg-white border border-gray-200 rounded text-red-400 hover:text-red-600 cursor-pointer" title="Delete">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-gray-200/60 pt-4">
        <div className="flex gap-1.5">
          <button
            onClick={() => handleVerification('verified')}
            disabled={sendingReceiptFor !== null}
            className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase cursor-pointer disabled:opacity-60"
          >
            {sendingReceiptFor === 'verified' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            Approve
          </button>
          <button
            onClick={() => handleVerification('rejected')}
            disabled={sendingReceiptFor !== null}
            className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded text-[10px] font-bold uppercase cursor-pointer disabled:opacity-60"
          >
            {sendingReceiptFor === 'rejected' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
            Reject
          </button>
        </div>
        <div className="sm:col-span-2 flex gap-1.5">
          <input
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Add remarks..."
            className="flex-1 px-2 py-1.5 border border-gray-200 rounded text-xs focus:border-primary focus:outline-none"
          />
          <button
            onClick={handleSaveRemarks}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-[10px] font-bold uppercase cursor-pointer whitespace-nowrap"
          >
            Save
          </button>
        </div>
      </div>

      {/* Off-screen receipt templates, captured via html2canvas on approve/reject */}
      <div className="fixed -left-[9999px] top-0 w-[380px]" aria-hidden="true">
        <CompetitionReceiptCard ref={verifiedReceiptRef} registration={registration} status="verified" />
      </div>
      <div className="fixed -left-[9999px] top-0 w-[380px]" aria-hidden="true">
        <CompetitionReceiptCard ref={rejectedReceiptRef} registration={registration} status="rejected" />
      </div>
    </motion.div>
  );
}

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  onClick?: () => void;
  active?: boolean;
}

function StatCard({ label, value, icon: Icon, color, onClick, active }: StatCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`text-left bg-white rounded-lg border shadow-sm p-4 flex items-center gap-3 transition ${
        onClick ? 'cursor-pointer hover:shadow-md' : 'cursor-default'
      } ${active ? 'border-primary ring-2 ring-primary/30' : 'border-primary/20'}`}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-[10px] text-gray-400 uppercase font-bold">{label}</p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>
    </button>
  );
}

export default function CompetitionAdminSection() {
  const [registrations, setRegistrations] = useState<ParticipantRegistration[]>([]);
  const [search, setSearch] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState<'all' | ParticipantType>('all');
  const [paymentFilter, setPaymentFilter] = useState<'all' | ParticipantRegistration['paymentStatus']>('all');
  const [verificationFilter, setVerificationFilter] = useState<'all' | VerificationStatus>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'participants'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRegistrations(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ParticipantRegistration)));
    });
    return () => unsubscribe();
  }, []);

  const todayStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }, []);

  const summary = useMemo(() => ({
    total: registrations.length,
    today: registrations.filter((r) => r.createdAt >= todayStart).length,
    paid: registrations.filter((r) => r.paymentStatus === 'payment_submitted').length,
    pending: registrations.filter((r) => r.paymentStatus === 'pending_payment').length,
    verified: registrations.filter((r) => r.verificationStatus === 'verified').length,
    rejected: registrations.filter((r) => r.verificationStatus === 'rejected').length,
    school: registrations.filter((r) => r.participantType === 'school').length,
    college: registrations.filter((r) => r.participantType === 'college').length,
    public: registrations.filter((r) => r.participantType === 'public').length,
  }), [registrations, todayStart]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return registrations.filter((r) => {
      if (competitionFilter !== 'all' && r.competitionId !== competitionFilter) return false;
      if (typeFilter !== 'all' && r.participantType !== typeFilter) return false;
      if (paymentFilter !== 'all' && r.paymentStatus !== paymentFilter) return false;
      if (verificationFilter !== 'all' && r.verificationStatus !== verificationFilter) return false;
      if (dateFrom && r.createdAt < new Date(dateFrom).getTime()) return false;
      if (dateTo && r.createdAt > new Date(dateTo).getTime() + 24 * 60 * 60 * 1000 - 1) return false;
      if (term) {
        const haystack = `${r.fullName} ${r.mobile} ${r.registrationNumber} ${r.competitionName} ${r.district}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [registrations, search, competitionFilter, typeFilter, paymentFilter, verificationFilter, dateFrom, dateTo]);

  const hasActiveFilters = search || competitionFilter !== 'all' || typeFilter !== 'all' || paymentFilter !== 'all' || verificationFilter !== 'all' || dateFrom || dateTo;

  // Clicking a stat card applies (or, on a second click, clears) the
  // matching filter — this is what surfaces the "confirmed participation
  // list" / "rejected participation list" views.
  const toggleVerificationFilter = (status: VerificationStatus) => {
    setVerificationFilter((prev) => (prev === status ? 'all' : status));
  };
  const togglePaymentFilter = (status: ParticipantRegistration['paymentStatus']) => {
    setPaymentFilter((prev) => (prev === status ? 'all' : status));
  };

  const clearFilters = () => {
    setSearch('');
    setCompetitionFilter('all');
    setTypeFilter('all');
    setPaymentFilter('all');
    setVerificationFilter('all');
    setDateFrom('');
    setDateTo('');
  };

  return (
    <div className="space-y-6" id="admin-competition-section">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard label="Total Registrations" value={summary.total} icon={Trophy} color="bg-primary/10 text-primary" />
        <StatCard label="Today's Registrations" value={summary.today} icon={Clock} color="bg-blue-50 text-blue-600" />
        <StatCard
          label="Paid" value={summary.paid} icon={IndianRupee} color="bg-emerald-50 text-emerald-600"
          onClick={() => togglePaymentFilter('payment_submitted')} active={paymentFilter === 'payment_submitted'}
        />
        <StatCard
          label="Pending Payment" value={summary.pending} icon={Clock} color="bg-amber-50 text-amber-600"
          onClick={() => togglePaymentFilter('pending_payment')} active={paymentFilter === 'pending_payment'}
        />
        <StatCard
          label="Verified" value={summary.verified} icon={CheckCircle2} color="bg-emerald-50 text-emerald-600"
          onClick={() => toggleVerificationFilter('verified')} active={verificationFilter === 'verified'}
        />
        <StatCard
          label="Rejected" value={summary.rejected} icon={XCircle} color="bg-red-50 text-red-500"
          onClick={() => toggleVerificationFilter('rejected')} active={verificationFilter === 'rejected'}
        />
        <StatCard label="School Students" value={summary.school} icon={School} color="bg-secondary/10 text-secondary" />
        <StatCard label="College Students" value={summary.college} icon={GraduationCap} color="bg-secondary/10 text-secondary" />
        <StatCard label="Public" value={summary.public} icon={UserIcon} color="bg-gray-100 text-gray-500" />
        <StatCard label="Total Entry Fees" value={`₹${registrations.reduce((sum, r) => sum + (r.paymentStatus === 'payment_submitted' ? r.entryFee : 0), 0)}`} icon={Users} color="bg-primary/10 text-primary" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-primary/20 shadow-sm p-4 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[180px]">
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, phone, reg no, district..."
              className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded text-xs focus:border-primary focus:outline-none"
              id="admin-competition-search"
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Competition</label>
          <select value={competitionFilter} onChange={(e) => setCompetitionFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded text-xs focus:border-primary focus:outline-none bg-white">
            <option value="all">All</option>
            {COMPETITIONS_DATA.map((c) => <option key={c.id} value={c.id}>{c.nameEnglish}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Participant type</label>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as 'all' | ParticipantType)} className="px-3 py-2 border border-gray-200 rounded text-xs focus:border-primary focus:outline-none bg-white">
            <option value="all">All</option>
            <option value="school">School</option>
            <option value="college">College</option>
            <option value="public">Public</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Payment</label>
          <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value as 'all' | ParticipantRegistration['paymentStatus'])} className="px-3 py-2 border border-gray-200 rounded text-xs focus:border-primary focus:outline-none bg-white">
            <option value="all">All</option>
            <option value="pending_payment">Pending</option>
            <option value="payment_submitted">Submitted</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Verification</label>
          <select value={verificationFilter} onChange={(e) => setVerificationFilter(e.target.value as 'all' | VerificationStatus)} className="px-3 py-2 border border-gray-200 rounded text-xs focus:border-primary focus:outline-none bg-white">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">From date</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="px-3 py-2 border border-gray-200 rounded text-xs focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">To date</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="px-3 py-2 border border-gray-200 rounded text-xs focus:border-primary focus:outline-none" />
        </div>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-xs text-primary hover:underline font-bold uppercase cursor-pointer">
            Clear filters
          </button>
        )}
        <button
          onClick={() => exportToCsv(filtered)}
          className="ml-auto flex items-center gap-1.5 px-3 py-2 bg-primary hover:bg-primary/90 text-white rounded text-[10px] font-bold uppercase cursor-pointer"
          id="admin-competition-export-csv"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </div>

      {/* Registrations list */}
      <div className="bg-white rounded-lg border border-primary/20 overflow-hidden shadow-md">
        <div className="bg-primary/5 border-b border-primary/10 p-5 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-elegant text-xl font-bold text-primary flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Competition Registrations
            </h3>
            <p className="text-xs text-gray-500 mt-1">போட்டி பதிவு submissions, synced live from Firebase.</p>
          </div>
          <span className="text-[10px] bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {filtered.length} of {registrations.length}
          </span>
        </div>
        <div className="p-6">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400" id="admin-no-competition-registrations">
              <div className="w-12 h-12 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6" />
              </div>
              <p className="text-sm">No competition registrations match the current filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((registration) => (
                  <RegistrationCard key={registration.id} registration={registration} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
