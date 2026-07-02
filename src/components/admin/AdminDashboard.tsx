import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import {
  LogOut, Wallet, PiggyBank, ClipboardList, Phone, Calendar,
  MessageCircle, IndianRupee,
} from 'lucide-react';
import { auth, db } from '../../lib/firebase.ts';
import { EVENT_TYPES } from '../../data.ts';
import { BookingRecord } from '../../types.ts';
import ReceiptModal from './ReceiptModal.tsx';

const formatCurrency = (num: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);

const computePaymentStatus = (amountPaid: number, finalTotal: number): BookingRecord['paymentStatus'] => {
  if (amountPaid <= 0) return 'unpaid';
  if (amountPaid >= finalTotal) return 'paid';
  return 'partial';
};

const STATUS_STYLES: Record<BookingRecord['paymentStatus'], string> = {
  unpaid: 'bg-red-50 text-red-600 border-red-100',
  partial: 'bg-amber-50 text-amber-600 border-amber-100',
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

interface BookingCardProps {
  booking: BookingRecord;
}

function BookingCard({ booking }: BookingCardProps) {
  const [finalTotal, setFinalTotal] = useState(booking.finalTotal);
  const [amountPaid, setAmountPaid] = useState(booking.amountPaid);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    setFinalTotal(booking.finalTotal);
    setAmountPaid(booking.amountPaid);
  }, [booking.finalTotal, booking.amountPaid]);

  const remaining = Math.max(finalTotal - amountPaid, 0);

  const handleUpdateFinalTotal = async () => {
    await updateDoc(doc(db, 'bookings', booking.id), {
      finalTotal,
      paymentStatus: computePaymentStatus(amountPaid, finalTotal),
    });
  };

  const handleUpdatePayment = async () => {
    await updateDoc(doc(db, 'bookings', booking.id), {
      amountPaid,
      paymentStatus: computePaymentStatus(amountPaid, finalTotal),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="p-5 border border-gray-100 rounded-md hover:border-primary/15 hover:shadow-xs transition bg-light flex flex-col gap-4"
      id={`admin-booking-${booking.id}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-gray-800 text-sm">{booking.customerName}</span>
            <span className="text-[10px] bg-primary/10 text-primary font-bold px-2.5 py-0.5 uppercase tracking-wider">
              {booking.eventTypeLabel}
            </span>
            <span className={`text-[10px] border px-2.5 py-0.5 uppercase tracking-wider font-bold rounded ${STATUS_STYLES[computePaymentStatus(amountPaid, finalTotal)]}`}>
              {computePaymentStatus(amountPaid, finalTotal)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span className="font-semibold text-gray-700">{booking.customerPhone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>{new Date(booking.createdAt).toLocaleDateString('en-IN')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-gray-400" />
              <span>Stated budget: {formatCurrency(booking.budget)}</span>
            </div>
          </div>
          {booking.addons.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {booking.addons.map((a) => (
                <span key={a.id} className="text-[10px] bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded">
                  {a.label} ({formatCurrency(a.price)})
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-gray-200/60 pt-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Final total</label>
          <div className="flex gap-1.5">
            <input
              type="number"
              value={finalTotal}
              onChange={(e) => setFinalTotal(Number(e.target.value))}
              className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:border-primary focus:outline-none"
              id={`admin-final-total-${booking.id}`}
            />
            <button
              onClick={handleUpdateFinalTotal}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-[10px] font-bold uppercase cursor-pointer whitespace-nowrap"
            >
              Save
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Amount paid</label>
          <div className="flex gap-1.5">
            <input
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(Number(e.target.value))}
              className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:border-primary focus:outline-none"
              id={`admin-amount-paid-${booking.id}`}
            />
            <button
              onClick={handleUpdatePayment}
              className="px-2 py-1 bg-primary hover:bg-opacity-90 text-white rounded text-[10px] font-bold uppercase cursor-pointer whitespace-nowrap"
              id={`admin-update-payment-${booking.id}`}
            >
              Update
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Remaining</label>
          <div className="px-2 py-1.5 border border-gray-200 rounded text-xs font-bold text-gray-700 bg-white">
            {formatCurrency(remaining)}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowReceipt(true)}
          disabled={amountPaid <= 0}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-white rounded text-[10px] font-bold uppercase cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          id={`admin-send-receipt-${booking.id}`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Send Receipt via WhatsApp
        </button>
      </div>

      <ReceiptModal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        booking={booking}
        finalTotal={finalTotal}
        amountPaid={amountPaid}
      />
    </motion.div>
  );
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as BookingRecord))
      );
    });
    return () => unsubscribe();
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (categoryFilter !== 'all' && b.eventTypeId !== categoryFilter) return false;
      if (dateFrom && b.createdAt < new Date(dateFrom).getTime()) return false;
      if (dateTo && b.createdAt > new Date(dateTo).getTime() + 24 * 60 * 60 * 1000 - 1) return false;
      return true;
    });
  }, [bookings, categoryFilter, dateFrom, dateTo]);

  const totalRevenue = filteredBookings.reduce((sum, b) => sum + b.amountPaid, 0);
  const totalOutstanding = filteredBookings.reduce((sum, b) => sum + Math.max(b.finalTotal - b.amountPaid, 0), 0);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.hash = '';
    onLogout();
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-primary text-white p-5 flex items-center justify-between">
        <div>
          <h1 className="font-elegant text-2xl font-bold">EMediaEvent Admin Dashboard</h1>
          <p className="text-xs text-white/70">Bookings, payments, and revenue tracking</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded text-xs font-bold uppercase cursor-pointer"
          id="admin-logout-btn"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-primary/20 shadow-sm p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Total Bookings</p>
              <p className="text-xl font-bold text-gray-800">{filteredBookings.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-primary/20 shadow-sm p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Revenue Collected</p>
              <p className="text-xl font-bold text-emerald-700">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-primary/20 shadow-sm p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
              <PiggyBank className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Outstanding Balance</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(totalOutstanding)}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-primary/20 shadow-sm p-4 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded text-xs focus:border-primary focus:outline-none bg-white"
              id="admin-filter-category"
            >
              <option value="all">All categories</option>
              {EVENT_TYPES.map((et) => (
                <option key={et.id} value={et.id}>{et.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">From date</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded text-xs focus:border-primary focus:outline-none"
              id="admin-filter-date-from"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">To date</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded text-xs focus:border-primary focus:outline-none"
              id="admin-filter-date-to"
            />
          </div>
          {(categoryFilter !== 'all' || dateFrom || dateTo) && (
            <button
              onClick={() => { setCategoryFilter('all'); setDateFrom(''); setDateTo(''); }}
              className="text-xs text-primary hover:underline font-bold uppercase cursor-pointer"
              id="admin-filter-clear"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Bookings list */}
        <div className="bg-white rounded-lg border border-primary/20 overflow-hidden shadow-md">
          <div className="bg-primary/5 border-b border-primary/10 p-5">
            <h3 className="font-elegant text-xl font-bold text-primary">Bookings</h3>
            <p className="text-xs text-gray-500 mt-1">All Quick Quote Tool submissions, filterable by date and category.</p>
          </div>
          <div className="p-6">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12 text-gray-400" id="admin-no-bookings">
                <div className="w-12 h-12 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <p className="text-sm">No bookings match the current filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
