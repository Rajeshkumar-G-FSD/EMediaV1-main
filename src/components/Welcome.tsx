import React from 'react';
import { motion } from 'motion/react';

interface WelcomeProps {
  onLearnMoreClick: () => void;
}

export default function Welcome({ onLearnMoreClick }: WelcomeProps) {
  return (
    <section className="flex flex-wrap md:flex-nowrap items-center gap-12 py-8" id="welcome-section">
      <div className="w-full md:w-2/3">
        <span className="text-xs uppercase font-bold text-primary tracking-widest block mb-2">Thương hiệu uy tín Đà Nẵng</span>
        <h2 className="text-3xl md:text-4xl uppercase mb-6 tracking-wide font-elegant text-primary" id="welcome-title">
          Chào mừng bạn đến với
          <br />
          Dịch vụ cưới Như Ý!
        </h2>
        <div className="space-y-4 text-sm md:text-base text-gray-500 mb-8 leading-relaxed">
          <p>
            Như Ý tự hào là người đồng hành đáng tin cậy của hàng ngàn cặp uyên ương trong suốt nhiều năm qua tại thành phố Đà Nẵng và khu vực lân cận. Chúng tôi hiểu rằng, ngày cưới là mốc son chói lọi nhất trong cuộc đời mỗi con người, là kết tinh của tình yêu đôi lứa và sự kỳ vọng của hai bên dòng tộc.
          </p>
          <p>
            Chính vì lẽ đó, mỗi cổng hoa cưới, mỗi khuôn rạp lụa, mỗi mâm quả hay bài trí gia lễ đều được tập thể thiết kế viên giàu tâm huyết của Như Ý chuẩn bị chỉn chu, đáp ứng trọn vẹn cả hai tiêu chí: đậm nét truyền thống gia tộc Việt và rạng ngời phong cách hiện đại hợp xu hướng.
          </p>
        </div>
        <button
          onClick={onLearnMoreClick}
          className="px-6 py-2 bg-primary hover:bg-opacity-90 font-bold uppercase text-xs tracking-wider text-white transition cursor-pointer"
          id="welcome-learn-more-btn"
        >
          Liên hệ đặt lịch ngay
        </button>
      </div>

      <div className="w-full md:w-1/3 flex justify-center relative">
        <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-gray-50 shadow-md relative z-10 hover:scale-105 transition duration-500">
          <img
            alt="Lớp hoa cầm tay cô dâu đẹp mắt"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrzm_rOJgrgJcKYbTQdAgH1wTxPHoaFNV3zTCD1PytjwAQMJ7OHIimBJK_JBuifJbJh9FkFJVTvWCJBcTY47YO7mU5f7KQglgkU6SG9Z0pSYPJRCA62B9EZfq8MnI9VgfAUlJ1Dxuumk0Gyb1vjaSV6T4xn-qw0hSJN0ReH_oqmrh-4wP3A0EVQ7xqwocxgRPfuZXjxMG1NrQsFLIxwz-F-6PLwlaYywdOatgS2__bvunhBjpp_QSk5G7l-SvHTNDCQfKJWbou2oQ"
            id="welcome-bouquet-image"
          />
        </div>
        {/* Decorative dotted circle background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-dashed border-primary/30 -z-0 animate-spin-slow" />
      </div>
    </section>
  );
}
