import { Phone, Mail, MapPin, Navigation } from 'lucide-react';

const ADDRESS = 'No. 183, Near Parimalam Mahal, 5th Street, 3rd Cross Sakthi Nager, Thindal, Erode-638012, Tamil Nadu';
const MAP_LINK = 'https://www.google.com/maps/place/E+Media+Event+%26+Promotions/@11.3214547,77.6834364,16z/data=!3m1!4b1!4m6!3m5!1s0x3ba96fe37356773d:0xd2fadad261aaf347!8m2!3d11.3214547!4d77.6834364!16s%2Fg%2F11zfs7906b?entry=ttu';
const MAP_EMBED_SRC = 'https://www.google.com/maps?q=E+Media+Event+%26+Promotions,11.3214547,77.6834364&z=16&output=embed';

export default function ContactMapPanel() {
  return (
    <div className="bg-white rounded-lg border border-primary/20 overflow-hidden shadow-md h-full flex flex-col" id="contact-map-panel" data-no-text-reveal>
      {/* Panel Banner */}
      <div className="bg-primary/5 border-b border-primary/10 p-5">
        <h3 className="font-elegant text-xl font-bold text-primary flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Visit Us / Get in Touch
        </h3>
        <p className="text-xs text-gray-500 mt-1">Drop by our studio in Erode or reach out — we'd love to help plan your event.</p>
      </div>

      <div className="p-6 flex flex-col gap-5 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="tel:+919566894134" className="group flex items-start gap-3">
            <span className="w-9 h-9 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
              <Phone className="w-4 h-4 text-primary" />
            </span>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Hotline</p>
              <p className="text-sm text-gray-700 group-hover:text-primary transition-colors font-semibold">+91 95668 94134</p>
            </div>
          </a>

          <a href="mailto:emediaerode@gmail.com" className="group flex items-start gap-3">
            <span className="w-9 h-9 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
              <Mail className="w-4 h-4 text-primary" />
            </span>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Email</p>
              <p className="text-sm text-gray-700 group-hover:text-primary transition-colors font-semibold break-all">emediaerode@gmail.com</p>
            </div>
          </a>
        </div>

        <div className="flex items-start gap-3">
          <span className="w-9 h-9 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-primary" />
          </span>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Address</p>
            <p className="text-sm text-gray-700 leading-relaxed">{ADDRESS}</p>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:text-primary/70 transition-colors uppercase tracking-wide mt-2"
            >
              <Navigation className="w-3 h-3" />
              Get Directions
            </a>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="rounded-lg overflow-hidden border border-primary/10 flex-1 min-h-[220px]">
          <iframe
            title="E Media Event & Promotions location"
            src={MAP_EMBED_SRC}
            className="w-full h-full min-h-[220px]"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
