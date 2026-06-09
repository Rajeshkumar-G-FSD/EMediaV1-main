import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Phone, Mail, User, Info, CheckCircle, Send } from 'lucide-react';
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
    { value: 'all-inclusive', label: 'Dịch vụ trọn gói Như Ý' },
    { value: 's1', label: 'Trang trí lễ gia tiên' },
    { value: 's2', label: 'Trang trí tiệc cưới' },
    { value: 's3', label: 'Tổ chức tiệc ngoài trời' },
    { value: 's4', label: 'Chụp ảnh ngày cưới' },
    { value: 'other', label: 'Yêu cầu sản phẩm / Dịch vụ khác' },
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
      setErrorMsg('Vui lòng nhập họ và tên.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Vui lòng nhập số điện thoại liên hệ.');
      return;
    }
    const phoneRegex = /^[0-9+.\s-]{9,15}$/;
    if (!phoneRegex.test(phone.trim())) {
      setErrorMsg('Số điện thoại không hợp lệ.');
      return;
    }

    const newInquiry: ConsultationRequest = {
      id: 'req-' + Math.random().toString(36).substr(2, 9),
      fullName,
      phone,
      email: email || 'Không cung cấp',
      weddingDate: weddingDate || 'Chưa xác định',
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
    <div className="bg-white p-6 rounded-lg border border-primary/10 shadow-sm" id="inquiry-form-container">
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
          <h3 className="font-elegant text-2xl font-bold text-primary mb-2">Gửi yêu cầu thành công!</h3>
          <p className="text-gray-600 text-sm max-w-sm mx-auto mb-6">
            Cảm ơn bạn đã tin tưởng dịch vụ cưới Như Ý. Tư vấn viên của chúng tôi sẽ liên hệ lại qua số điện thoại sớm nhất trong vòng 24 giờ.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-xs uppercase font-bold text-primary hover:underline"
            id="inquiry-reset-btn"
          >
            Gửi yêu cầu tư vấn mới
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="font-elegant text-2xl text-primary font-bold">Đặt lịch tư vấn miễn phí</h3>
            <p className="text-xs text-gray-500">Như Ý sẽ liên hệ thiết kế bảng báo giá chi tiết phù hợp với ngân sách của bạn</p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 text-xs text-red-700" id="inquiry-form-error">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Họ và tên *</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Nhập họ và tên của bạn..."
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
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Số điện thoại *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Phone className="h-4 w-4" />
                </span>
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="field-phone"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Thư điện tử (Email)</label>
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
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Ngày cưới dự kiến</label>
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
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Dịch vụ quan tâm</label>
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
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Yêu cầu bổ sung hoặc câu hỏi</label>
            <textarea
              rows={3}
              placeholder="Chia sẻ ý kiến hoặc yêu cầu chi tiết về màu sắc, ngân sách dự kiến..."
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
            Nhận tư vấn báo giá ngay
          </button>
        </form>
      )}
    </div>
  );
}
