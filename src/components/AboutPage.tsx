import { useEffect } from 'react';
import {
  Camera, Video, Cake, PartyPopper, Heart, CalendarHeart, Sparkles,
  Baby, Landmark, Building2, ChefHat, School, GraduationCap, LayoutPanelTop,
  Wand2, CheckCircle2, Target, Eye, Award, ShieldCheck, ArrowRight,
} from 'lucide-react';
import BlurText from './BlurText.tsx';
import ScrollReveal from './ScrollReveal.tsx';
import CountUp from './CountUp.tsx';

interface AboutPageProps {
  onBookNow: () => void;
}

const SERVICES = [
  { label: 'Photography',                icon: Camera },
  { label: 'Videography',                icon: Video },
  { label: 'Birthday Party Decoration',   icon: Cake },
  { label: 'Balloon Decoration',          icon: PartyPopper },
  { label: 'Wedding Decoration',          icon: Heart },
  { label: 'Wedding Planning',            icon: CalendarHeart },
  { label: 'Pre Wedding Shoot',           icon: Sparkles },
  { label: 'Baby Shower Decoration',      icon: Baby },
  { label: 'Traditional Events',          icon: Landmark },
  { label: 'Corporate Events',            icon: Building2 },
  { label: 'Cooking Events',              icon: ChefHat },
  { label: 'School Events',               icon: School },
  { label: 'College Events',              icon: GraduationCap },
  { label: 'Stage Decoration',            icon: LayoutPanelTop },
  { label: 'Customized Event Planning',   icon: Wand2 },
];

const STATS = [
  { to: 2014, suffix: '',  label: 'Founded' },
  { to: 5000, suffix: '+', label: 'Successful Events' },
  { to: 100,  suffix: '%', label: 'Customer Satisfaction' },
  { to: 1000, suffix: '+', label: 'Happy Families' },
  { to: 250,  suffix: '+', label: 'Corporate Events' },
  { to: 50,   suffix: '+', label: 'Schools & Colleges Served' },
];

const WHY_CHOOSE_US = [
  'Over a decade of experience with 5,000+ successful events',
  'End-to-end planning, decoration, photography and coordination',
  'Transparent pricing with no hidden costs',
  'Timely execution and on-site coordination for every event',
  'Personalized service tailored to every client\'s vision',
];

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl uppercase font-elegant text-primary font-bold mb-4 text-center">
    {children}
  </h2>
);

export default function AboutPage({ onBookNow }: AboutPageProps) {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null;
    const descriptionTag = document.querySelector('meta[name="description"]');

    document.title = 'About Us | E Media Event & Decoration - Erode\'s Trusted Event Planners Since 2014';
    descriptionTag?.setAttribute(
      'content',
      'E Media Event & Decoration has delivered 5,000+ successful weddings, birthdays, and corporate events across South India since 2014. Discover our story, mission, and complete event planning services.'
    );
    window.scrollTo({ top: 0 });

    return () => {
      document.title = prevTitle;
      if (prevDescription !== null) {
        descriptionTag?.setAttribute('content', prevDescription);
      }
    };
  }, []);

  return (
    <>
      {/* Hero banner */}
      <section
        className="relative w-full h-[560px] sm:h-[640px] md:h-[760px] lg:h-[840px] bg-gray-200 overflow-hidden"
        id="about-hero"
        aria-label="About E Media Event & Decoration"
      >
        <img
          src="/images/Emedia_event_Erode_about.png"
          alt="E Media Event & Decoration founding team in Erode"
          className="absolute inset-0 w-full h-full object-cover object-top"
          id="about-hero-image"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />

        <div className="relative container mx-auto px-4 sm:px-6 max-w-6xl h-full flex items-center">
          <div className="w-full sm:w-4/5 md:w-2/3 text-white">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary font-semibold border border-secondary/60 px-3 py-1 inline-block mb-4">
              About Us
            </span>

            <BlurText
              text="E Media Event & Decoration"
              tag="h1"
              className="text-3xl sm:text-4xl md:text-5xl uppercase text-shadow mb-4 leading-tight font-elegant text-white"
              delay={90}
              direction="bottom"
              stepDuration={0.4}
            />

            <p className="text-sm md:text-lg text-gray-100 max-w-xl leading-relaxed">
              Since 2014, we've turned over 5,000 celebrations across South India into unforgettable memories &mdash; one wedding, birthday, and milestone at a time.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg
            className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[80px]"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="fill-white" d="M1200 120L0 16.48V120h1200z"></path>
          </svg>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-6xl py-14 flex flex-col gap-16" id="about-content">

        {/* Hero About paragraph */}
        <ScrollReveal direction="up">
          <p className="text-center text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            E Media Event & Decoration has been creating unforgettable celebrations since 2014. With over 5,000 successful events across South India, we specialize in transforming ideas into extraordinary experiences. From intimate family gatherings to grand weddings and corporate celebrations, our dedicated team delivers creative concepts, elegant decorations, professional photography, and flawless event execution. Every event is carefully planned with passion, precision, and attention to detail, ensuring memories that last a lifetime.
          </p>
        </ScrollReveal>

        {/* Our Story */}
        <ScrollReveal direction="up">
          <section id="about-story">
            <SectionHeading>Our Story</SectionHeading>
            <p className="text-center text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              What began as a small passion for creating beautiful celebrations has grown into one of South India's trusted event management companies. Over the years, E Media Event & Decoration has earned the confidence of thousands of happy clients through creativity, dedication, and exceptional service. Our commitment to quality, innovation, and customer satisfaction has helped us build lasting relationships while successfully organizing events of every size and style.
            </p>
          </section>
        </ScrollReveal>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal direction="left">
            <div className="bg-light rounded-lg p-8 h-full border border-primary/10">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-elegant font-bold text-primary mb-3">Our Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our mission is to make every celebration meaningful, stress-free, and unforgettable. We strive to provide creative event solutions that perfectly reflect our clients' dreams while maintaining the highest standards of professionalism. Through innovative decoration concepts, premium photography, seamless event management, and personalized service, we aim to create moments that families and businesses will cherish forever.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="bg-light rounded-lg p-8 h-full border border-primary/10">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-elegant font-bold text-primary mb-3">Our Vision</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our vision is to become South India's most trusted and innovative event management company by delivering exceptional experiences for every celebration. We continuously embrace new trends, modern technology, and creative ideas to exceed customer expectations. We believe every event deserves perfection, and our goal is to create memorable experiences that inspire happiness for generations.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Why Choose Us */}
        <ScrollReveal direction="up">
          <section id="about-why-choose-us">
            <SectionHeading>Why Choose Us</SectionHeading>
            <p className="text-center text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Choosing E Media Event & Decoration means partnering with a team that values creativity, reliability, and customer satisfaction. With over a decade of experience and 5,000+ successful events, we understand every detail that makes an event extraordinary. From planning and decoration to photography and event coordination, we provide complete end-to-end solutions with transparent pricing, timely execution, and personalized service tailored to every client.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {WHY_CHOOSE_US.map((point) => (
                <div key={point} className="flex items-start gap-3 bg-light rounded-lg p-4 border border-primary/10">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* What We Do */}
        <ScrollReveal direction="up">
          <section id="about-what-we-do">
            <SectionHeading>What We Do</SectionHeading>
            <p className="text-center text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              We offer comprehensive event planning and decoration services for every special occasion. Our expertise includes wedding decoration, birthday celebrations, balloon decoration, baby showers, traditional ceremonies, photography, videography, pre-wedding shoots, corporate functions, school events, college festivals, cooking competitions, stage decoration, and customized event concepts. Every project is executed with creativity, precision, and professionalism.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {SERVICES.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-2 bg-white border border-primary/10 rounded-lg p-4 hover:border-primary/30 hover:shadow-md transition"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-600 leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Achievements & Promise */}
        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal direction="left">
            <div className="bg-light rounded-lg p-8 h-full border border-primary/10">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-elegant font-bold text-primary mb-3">Our Achievements</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Since 2014, E Media Event & Decoration has proudly completed over 5,000 successful events across South India. Our growing family of satisfied clients reflects our commitment to excellence, creativity, and quality service. Every event strengthens our reputation for delivering memorable experiences, elegant decorations, and professional event management that exceeds expectations and creates lasting impressions.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="bg-light rounded-lg p-8 h-full border border-primary/10">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-elegant font-bold text-primary mb-3">Our Promise</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                At E Media Event & Decoration, every event is treated as our own celebration. We promise creative designs, premium-quality decorations, professional photography, timely execution, transparent communication, and complete customer satisfaction. Our experienced team works closely with every client to ensure every detail is perfectly executed, creating beautiful memories that last forever.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Company Statistics */}
        <ScrollReveal direction="up">
          <section className="bg-primary rounded-lg p-8 md:p-12" id="about-stats">
            <h2 className="text-2xl md:text-3xl uppercase font-elegant text-white font-bold mb-8 text-center">
              Company Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-4xl font-bold font-serif text-white mb-1">
                    <CountUp to={stat.to} duration={2} separator="," className="align-middle" />
                    {stat.suffix}
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-wider text-white/70 font-semibold">{stat.label}</div>
                </div>
              ))}
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold font-serif text-white mb-1">South India</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-white/70 font-semibold">Service Coverage</div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up">
          <section className="text-center bg-light rounded-lg p-8 md:p-14 border border-primary/10" id="about-cta">
            <h2 className="text-2xl md:text-3xl uppercase font-elegant text-primary font-bold mb-4">
              Ready to Make Your Celebration Unforgettable?
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Whether you're planning a dream wedding, birthday celebration, baby shower, corporate gathering, or special family event, E Media Event & Decoration is here to bring your vision to life. Let's create unforgettable memories together.
            </p>
            <button
              onClick={onBookNow}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-opacity-90 font-bold uppercase text-xs tracking-wider text-white transition cursor-pointer"
              id="about-cta-btn"
            >
              <span>Book Your Event Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
