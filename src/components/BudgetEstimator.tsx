import { useState } from 'react';
import { Calculator, Check, ChevronRight, ClipboardList, User, Phone, MessageCircle } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase.ts';
import { EVENT_TYPES, ADDONS } from '../data.ts';

interface EstimatorProps {
  onQuoteSubmit: (notes: string, selectedServiceName: string) => void;
}

const WHATSAPP_NUMBER = '919566894134';
const PHONE_REGEX = /^[0-9+.\s-]{9,15}$/;

export default function BudgetEstimator({ onQuoteSubmit }: EstimatorProps) {
  const [selectedEventType, setSelectedEventType] = useState(EVENT_TYPES[0].id);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [budget, setBudget] = useState(50000);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedQuote, setSubmittedQuote] = useState(false);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  const selectedEvent = EVENT_TYPES.find((e) => e.id === selectedEventType);
  const baseCost = selectedEvent?.price || 0;
  const selectedAddons = ADDONS.filter((a) => selectedAddonIds.includes(a.id));
  const addonsCost = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const grandTotal = baseCost + addonsCost;

  const handleToggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSendQuote = async () => {
    setErrorMsg('');

    if (!contactName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!contactPhone.trim() || !PHONE_REGEX.test(contactPhone.trim())) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }

    const addonLines = selectedAddons.length
      ? selectedAddons.map((a) => `- ${a.label}: ${formatCurrency(a.price)}`).join('\n')
      : '- None selected';

    const message = `New Quick Quote Request - EMediaEvent

Event Type: ${selectedEvent?.label}
Add-ons:
${addonLines}

Approximate Budget: ${formatCurrency(budget)}
Estimated Total: ${formatCurrency(grandTotal)}

Name: ${contactName.trim()}
Phone: ${contactPhone.trim()}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');

    try {
      await addDoc(collection(db, 'bookings'), {
        eventTypeId: selectedEventType,
        eventTypeLabel: selectedEvent?.label || '',
        addons: selectedAddons,
        budget,
        estimateTotal: grandTotal,
        finalTotal: grandTotal,
        amountPaid: 0,
        paymentStatus: 'unpaid',
        customerName: contactName.trim(),
        customerPhone: contactPhone.trim(),
        createdAt: Date.now(),
      });
    } catch (err) {
      console.error('Failed to save booking to Firestore', err);
    }

    onQuoteSubmit(message, 'other');
    setSubmittedQuote(true);
    setTimeout(() => setSubmittedQuote(false), 5000);
  };

  return (
    <div className="bg-white rounded-lg border border-primary/20 overflow-hidden shadow-lg" id="estimator-panel" data-no-text-reveal>
      <div className="bg-primary p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          <h3 className="font-elegant text-xl font-bold">Online event budget estimate</h3>
        </div>
        <span className="bg-white/10 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">EMedia Smart Budget</span>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Parameters input */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">1. Choose your event type</label>
            <div className="grid grid-cols-2 gap-2">
              {EVENT_TYPES.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedEventType(item.id)}
                  className={`p-3 text-left rounded border text-xs transition cursor-pointer flex flex-col justify-between ${
                    selectedEventType === item.id
                      ? 'border-primary bg-primary/5 text-primary font-bold'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                  id={`estimator-event-${item.id}`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-gray-400 mt-1">From {formatCurrency(item.price)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-gray-600 uppercase">2. Your approximate budget</label>
              <span className="text-xs text-primary font-bold">{formatCurrency(budget)}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={300000}
              step={5000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              id="estimator-range-budget"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>{formatCurrency(10000)}</span>
              <span>{formatCurrency(300000)}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">3. Add extra services</label>
            <div className="space-y-2">
              {ADDONS.map((addon) => (
                <label
                  key={addon.id}
                  className="flex items-center justify-between p-2 rounded border border-gray-100 text-xs hover:bg-gray-50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedAddonIds.includes(addon.id)}
                      onChange={() => handleToggleAddon(addon.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      id={`estimator-addon-${addon.id}`}
                    />
                    <span className="text-gray-700">{addon.label}</span>
                  </div>
                  <span className="font-mono text-gray-500">{formatCurrency(addon.price)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">4. Your contact details</label>
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder="Your full name..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  id="estimator-contact-name"
                />
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Phone className="h-4 w-4" />
                </span>
                <input
                  type="tel"
                  placeholder="Your phone number..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  id="estimator-contact-phone"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown output */}
        <div className="bg-light p-6 rounded-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-primary font-bold mb-4 text-sm uppercase tracking-wide border-b border-gray-200 pb-2">
              <ClipboardList className="w-4 h-4" />
              <span>Estimated breakdown</span>
            </div>

            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>{selectedEvent?.label}:</span>
                <span className="font-semibold text-gray-800">{formatCurrency(baseCost)}</span>
              </div>

              {selectedAddons.map((addon) => (
                <div className="flex justify-between" key={addon.id}>
                  <span>{addon.label}:</span>
                  <span className="font-semibold text-gray-800">{formatCurrency(addon.price)}</span>
                </div>
              ))}

              <div className="flex justify-between text-gray-500">
                <span>Your stated budget:</span>
                <span className="font-semibold">{formatCurrency(budget)}</span>
              </div>

              <div className="border-t border-dashed border-gray-300 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-700">TOTAL ESTIMATE:</span>
                <span className="text-xl font-bold text-primary font-serif">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <div className="mt-4 text-[10px] text-gray-400 leading-relaxed bg-white p-3 rounded border border-gray-100">
              <span className="font-bold block text-gray-500 mb-0.5">Important note:</span>
              These figures are estimates based on standard pricing. Final pricing may vary by season, venue, and event scope.
            </div>
          </div>

          <div className="mt-6 pt-4">
            {errorMsg && (
              <div className="bg-red-50 border-l-4 border-red-500 p-2 text-xs text-red-700 mb-3" id="estimator-form-error">
                {errorMsg}
              </div>
            )}
            <button
              onClick={handleSendQuote}
              className={`w-full text-center py-2.5 px-4 font-bold uppercase text-xs tracking-wider transition flex items-center justify-center gap-2 cursor-pointer ${
                submittedQuote
                  ? 'bg-secondary text-white'
                  : 'bg-primary hover:bg-opacity-90 text-white'
              }`}
              id="estimator-contact-btn"
            >
              {submittedQuote ? (
                <>
                  <Check className="w-4 h-4" />
                  Sent to WhatsApp!
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" />
                  <span>Send this quote via WhatsApp</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
            {submittedQuote && (
              <p className="text-[10px] text-center text-primary font-medium mt-1">
                Your estimate has been shared with EMediaEvent on WhatsApp.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
