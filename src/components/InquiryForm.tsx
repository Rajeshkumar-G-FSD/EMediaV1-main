import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Phone, Mail, User, CheckCircle, Send } from 'lucide-react';
import { ConsultationRequest } from '../types.ts';

interface InquiryFormProps {
  preselectedService?: string;
  onSuccess?: (request: ConsultationRequest) => void;
}

export default function InquiryForm({ preselectedService = '', onSuccess }: InquiryFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [serviceType, setServiceType] = useState(preselectedService || 'all-inclusive');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const serviceOptions = [
    { value: 'all-inclusive', label: 'EMedia full-service decoration package' },
    { value: 's1', label: 'Ceremony decor' },
    { value: 's2', label: 'Wedding reception styling' },
    { value: 's3', label: 'Outdoor event setup' },
    { value: 's4', label: 'Birthday party decoration' },
    { value: 'other', label: 'Other product or service request' },
  ];

  // React to preselected changes
  React.useEffect(() => {
    if (preselectedService) {
      setServiceType(preselectedService);
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter a contact phone number.');
      return;
    }
    const phoneRegex = /^[0-9+.\s-]{9,15}$/;
    if (!phoneRegex.test(phone.trim())) {
      setErrorMsg('The phone number is invalid.');
      return;
    }

    const newInquiry: ConsultationRequest = {
      id: 'req-' + Math.random().toString(36).substr(2, 9),
      fullName,
      phone,
      email: email || 'Not provided',
      weddingDate: weddingDate || 'Not set',
      serviceType: serviceOptions.find(o => o.value === serviceType)?.label || serviceType,
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

    setIsSubmitted(true);
    setFullName('');
    setPhone('');
    setEmail('');
    setWeddingDate('');
    setNotes('');

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="font-elegant text-2xl text-primary font-bold">Book a Free Event Consultation in Erode</h3>
            <p className="text-xs text-gray-500">EMediaEvent will prepare a detailed decoration quote aligned with your budget and event vision</p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 text-xs text-red-700" id="inquiry-form-error">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Full name *</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Enter your full name..."
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                id="field-fullname"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Phone number *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Phone className="h-4 w-4" />
                </span>
                <input
                  type="tel"
                  placeholder="Enter your phone number..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="field-phone"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="field-email"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Expected event date</label>
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
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Service of interest</label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none bg-white"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                id="field-service"
              >
                {serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Additional requests or questions</label>
            <textarea
              rows={3}
              placeholder="Share notes about style, color palette, or budget goals..."
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              id="field-notes"
            />
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
