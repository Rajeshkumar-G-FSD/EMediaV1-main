import React, { useState } from 'react';
import { ConsultationRequest } from '../types.ts';
import { Mail, Phone, Calendar, ClipboardCheck, Trash2, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingListProps {
  inquiries: ConsultationRequest[];
  onDeleteInquiry: (id: string) => void;
  onClearAll: () => void;
}

export default function BookingList({ inquiries, onDeleteInquiry, onClearAll }: BookingListProps) {
  return (
    <div className="bg-white rounded-lg border border-primary/20 overflow-hidden shadow-md" id="booking-list-panel" data-no-text-reveal>
      {/* Panel Banner */}
      <div className="bg-primary/5 border-b border-primary/10 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-elegant text-xl font-bold text-primary flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5" />
            Saved Inquiries & Appointments
          </h3>
          <p className="text-xs text-gray-500 mt-1">A running list of consultation forms you submitted to the EMedia planning team.</p>
        </div>
        {inquiries.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-red-500 hover:text-red-700 hover:underline uppercase font-bold text-left sm:text-right cursor-pointer"
            id="clear-all-inquiries-btn"
          >
            Clear history
          </button>
        )}
      </div>

      <div className="p-6">
        {inquiries.length === 0 ? (
          <div className="text-center py-12 text-gray-400" id="no-appointments-placeholder">
            <div className="w-12 h-12 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <p className="text-sm">You currently have no saved inquiries.</p>
            <p className="text-xs text-gray-400 mt-1">Use the consultation form below or the smart budget tool to create one.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {inquiries.map((inq) => (
                <motion.div
                  key={inq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 border border-gray-100 rounded-md hover:border-primary/15 hover:shadow-xs transition bg-light flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  id={`inquiry-record-${inq.id}`}
                >
                  {/* Customer Information */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="font-bold text-gray-800 text-sm md:text-base">{inq.fullName}</span>
                      <span className="text-[10px] bg-primary/10 text-primary font-bold px-2.5 py-0.5 uppercase tracking-wider">
                        {inq.serviceType}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">ID: {inq.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>Phone: <span className="font-semibold text-gray-700">{inq.phone}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span>Email: <span className="text-gray-700">{inq.email}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>Event date: <span className="font-semibold text-gray-700">{inq.weddingDate}</span></span>
                      </div>
                    </div>

                    {inq.notes && (
                      <div className="text-xs italic text-gray-500 bg-white p-2 border border-gray-100 rounded mt-1 max-w-2xl leading-relaxed">
                        <span className="font-bold not-italic text-gray-400 mr-1.5">Request notes:</span>
                        {inq.notes}
                      </div>
                    )}
                  </div>

                  {/* Status & Cancel Control */}
                  <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 border-gray-200/50 pt-3 md:pt-0">
                    <div className="flex flex-col text-left md:text-right">
                      <span className="text-[10px] text-gray-400 uppercase font-mono">Submitted</span>
                      <span className="text-xs font-semibold text-gray-600 font-mono">{inq.createdAt}</span>
                    </div>

                    {/* Badge Status */}
                    <span className="flex items-center gap-1 bg-white/70 border border-emerald-100 text-emerald-700 px-2.5 py-1 text-xs rounded font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Pending review</span>
                    </span>

                    {/* Delete entry trigger */}
                    <button
                      onClick={() => onDeleteInquiry(inq.id)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded transition cursor-pointer"
                      title="Delete this inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
