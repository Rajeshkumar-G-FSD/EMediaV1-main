import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import PortfolioCarousel from './components/PortfolioCarousel.tsx';
import Welcome from './components/Welcome.tsx';
import ServiceGrid from './components/ServiceGrid.tsx';
import ProductSlider from './components/ProductSlider.tsx';
import BudgetEstimator from './components/BudgetEstimator.tsx';
import BlogSection from './components/BlogSection.tsx';
import InquiryForm from './components/InquiryForm.tsx';
import BookingList from './components/BookingList.tsx';
import Footer from './components/Footer.tsx';
import SocialSidebar from './components/SocialSidebar.tsx';
import Modal from './components/Modal.tsx';
import TextRevealObserver from './components/TextRevealObserver.tsx';
import PageLoader from './components/PageLoader.tsx';
import { Customer, Service, Product, BlogPost, ConsultationRequest } from './types.ts';
import { Info, HelpCircle, PhoneCall, MailOpen, Compass, CalendarCheck } from 'lucide-react';

export default function App() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Active section tracking state
  const [activeSection, setActiveSection] = useState('hero');
  
  // Floating support modal details
  const [activeQuickSupport, setActiveQuickSupport] = useState<string | null>(null);

  // Inquiries persistent state
  const [inquiries, setInquiries] = useState<ConsultationRequest[]>([]);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string>('all-inclusive');

  // References for scroll navigation
  const introductionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const customersRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const appointmentsRef = useRef<HTMLDivElement>(null);

  // Load inquiries on boot
  useEffect(() => {
    const existing = localStorage.getItem('nhuy_consultations');
    if (existing) {
      try {
        setInquiries(JSON.parse(existing));
      } catch (err) {
        console.error('Error parsing consultations from localstorage', err);
      }
    }
  }, []);

  const handleRefreshInquiries = () => {
    const existing = localStorage.getItem('nhuy_consultations');
    if (existing) {
      try {
        setInquiries(JSON.parse(existing));
      } catch (err) {
        setInquiries([]);
      }
    }
  };

  const handleAddInquirySuccess = () => {
    handleRefreshInquiries();
    // Scroll smoothly down to view their newly listed appointment!
    setTimeout(() => {
      appointmentsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm('Are you sure you want to delete this consultation request from this browser?')) {
      const updated = inquiries.filter(x => x.id !== id);
      setInquiries(updated);
      localStorage.setItem('nhuy_consultations', JSON.stringify(updated));
    }
  };

  const handleClearAllInquiries = () => {
    if (confirm('Are you sure you want to clear all consultation history on this computer?')) {
      localStorage.removeItem('nhuy_consultations');
      setInquiries([]);
    }
  };

  // Triggered when client creates a dynamic budget estimate quote
  const handleQuoteSubmit = (quoteDetails: string, selectedServiceId: string) => {
    setPreselectedServiceId(selectedServiceId);
    
    // Fill values into form instantly with notes
    const fieldNotes = document.getElementById('field-notes') as HTMLTextAreaElement | null;
    if (fieldNotes) {
      fieldNotes.value = quoteDetails;
    }
    
    // Auto scroll directly down to the booking form below
    setTimeout(() => {
      const formEl = document.getElementById('inquiry-form-container');
      formEl?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  // Floating sidebar actions
  const handleQuickSidebarAction = (actionId: string) => {
    if (actionId === 'phone') {
      setActiveQuickSupport('phone');
    } else if (actionId === 'email') {
      setActiveQuickSupport('email');
    } else if (actionId === 'form') {
      const formEl = document.getElementById('inquiry-form-container');
      formEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll mapping
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    let targetRef: React.RefObject<HTMLDivElement | null> | null = null;
    if (sectionId === 'introduction') targetRef = introductionRef;
    if (sectionId === 'services') targetRef = servicesRef;
    if (sectionId === 'products') targetRef = productsRef;
    if (sectionId === 'customers') targetRef = customersRef;
    if (sectionId === 'blog') targetRef = blogRef;
    if (sectionId === 'calculator') targetRef = calculatorRef;
    if (sectionId === 'appointments') targetRef = appointmentsRef;

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll section spy
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 120;
      
      const refs = [
        { id: 'introduction', ref: introductionRef },
        { id: 'services', ref: servicesRef },
        { id: 'products', ref: productsRef },
        { id: 'customers', ref: customersRef },
        { id: 'blog', ref: blogRef },
        { id: 'calculator', ref: calculatorRef },
        { id: 'appointments', ref: appointmentsRef },
      ];

      for (let i = refs.length - 1; i >= 0; i--) {
        const item = refs[i];
        if (item.ref.current && item.ref.current.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <div className="bg-white text-gray-700 font-sans antialiased overflow-x-hidden min-h-screen flex flex-col justify-between" id="app-root">
      <PageLoader />
      <TextRevealObserver />
      
      {/* 1. Sticky Navigation Header */}
      <Header
        onNavClick={handleNavClick}
        activeSection={activeSection}
        hasInquiries={inquiries.length > 0}
      />

      {/* 2. Right Floating Sidebar */}
      <SocialSidebar onQuickActionClick={handleQuickSidebarAction} />

      {/* 3. Immersive Hero Presentation */}
      <Hero onActionClick={() => handleNavClick('services')} />

      {/* 4. 3D Portfolio Carousel */}
      <div ref={customersRef} className="scroll-mt-24" id="section-customers">
        <PortfolioCarousel />
      </div>

      {/* 5. Elegant Single-Screen Grid Layout Content */}
      <main className="container mx-auto px-4 max-w-6xl py-12 space-y-20 md:space-y-24 flex-grow">
        
        {/* Section 1: Welcome Intro */}
        <div ref={introductionRef} className="scroll-mt-24" id="section-introduction">
          <Welcome onLearnMoreClick={() => handleNavClick('appointments')} />
        </div>

        <div className="h-px bg-primary/10 w-full" />

        {/* Section 2: Professional Services Column */}
        <div ref={servicesRef} className="scroll-mt-24" id="section-services">
          <ServiceGrid
            onServiceSelect={setSelectedService}
            onBookNow={(sId) => {
              setPreselectedServiceId(sId);
              document.getElementById('inquiry-form-container')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        <div className="h-px bg-primary/10 w-full" />

        {/* Section 3: Highly Categorized Custom Products Catalog */}
        <div ref={productsRef} className="scroll-mt-24" id="section-products">
          <ProductSlider
            onProductSelect={setSelectedProduct}
            onBookProduct={(pName) => {
              setPreselectedServiceId('other');
              const textNotes = document.getElementById('field-notes') as HTMLTextAreaElement | null;
              if (textNotes) {
                textNotes.value = `I would like a detailed consultation and quote for: ${pName}`;
              }
              document.getElementById('inquiry-form-container')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        <div className="h-px bg-primary/10 w-full" />

        {/* Section 5: Real-time Budget Calculator Tool */}
        <div ref={calculatorRef} className="scroll-mt-24" id="section-calculator">
          <div className="text-center mb-8 relative">
            <h2 className="text-3xl uppercase bg-white inline-block px-6 relative z-10 font-elegant text-primary">
              Quick Quote Tool
            </h2>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0" />
          </div>
          <p className="text-center text-sm text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Build your event concept, choose venue styling and ceremonial items, and preview an instant live cost estimate.
          </p>
          <BudgetEstimator onQuoteSubmit={handleQuoteSubmit} />
        </div>

        <div className="h-px bg-primary/10 w-full" />

        {/* Section 4: Guides & Blog Tips List */}
        <div ref={blogRef} className="scroll-mt-24" id="section-blog">
          <BlogSection onBlogPostSelect={setSelectedPost} />
        </div>

        <div className="h-px bg-primary/10 w-full" />

        {/* Section 5: Consultation Booking & Persistent Appointment Tracking CRM */}
        <div ref={appointmentsRef} className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8" id="section-appointments">
          {/* Inquiry form - col span 5 */}
          <div className="lg:col-span-5">
            <InquiryForm
              preselectedService={preselectedServiceId}
              onSuccess={handleAddInquirySuccess}
            />
          </div>

          {/* Persistent listings tracker - col span 7 */}
          <div className="lg:col-span-7">
            <BookingList
              inquiries={inquiries}
              onDeleteInquiry={handleDeleteInquiry}
              onClearAll={handleClearAllInquiries}
            />
          </div>
        </div>

      </main>

      {/* 5. Clean Structured Local Entity Footer */}
      <Footer onNavClick={handleNavClick} />

      {/* --- Detail Modals Overlay --- */}

      {/* Customer Report Details */}
      <Modal
        isOpen={selectedCustomer !== null}
        onClose={() => setSelectedCustomer(null)}
        title={selectedCustomer?.title || ''}
      >
        {selectedCustomer && (
          <div className="space-y-4" id="customer-modal-view">
            <img
              alt={selectedCustomer.title}
              className="w-full h-72 md:h-80 object-cover rounded shadow"
              src={selectedCustomer.image}
            />
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono border-b border-gray-100 pb-2">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded uppercase font-bold tracking-wider">Event feature story</span>
              <span>Event date: {selectedCustomer.date}</span>
            </div>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p className="font-semibold text-primary">We sincerely thank our clients for trusting EMedia with these special moments.</p>
              <p>{selectedCustomer.description}</p>
              <p>Every detail, from the ceremony backdrop to the ceremonial trays, is crafted to be elegant, memorable, and camera-ready. We wish every couple a lifetime of happiness and togetherness.</p>
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 border border-gray-200 rounded text-xs uppercase font-bold hover:bg-gray-50 cursor-pointer"
                id="customer-modal-close"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCustomer(null);
                  setPreselectedServiceId('other');
                  const descField = document.getElementById('field-notes') as HTMLTextAreaElement | null;
                  if (descField) {
                    descField.value = `I would like to discuss a custom concept similar to: ${selectedCustomer.title}`;
                  }
                  document.getElementById('inquiry-form-container')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-primary text-white text-xs uppercase font-bold hover:bg-opacity-90 transition rounded cursor-pointer"
                id="customer-modal-book-concept"
              >
                Book this concept
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Service Details Option */}
      <Modal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title || ''}
      >
        {selectedService && (
          <div className="space-y-4" id="service-modal-view">
            <img
              alt={selectedService.title}
              className="w-full h-64 md:h-72 object-cover rounded shadow"
              src={selectedService.image}
            />
            <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-100 pb-2">
              <span className="font-bold text-primary flex items-center gap-1">
                <Compass className="w-4 h-4" />
                Starting price:
              </span>
              <span className="font-mono font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded text-sm">{selectedService.priceRange}</span>
            </div>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p className="font-bold text-sm text-gray-800 uppercase tracking-wider">Service details:</p>
              <p>{selectedService.detailedDescription}</p>
              <p>Every stage is monitored by an experienced project team to ensure a smooth handover well before the event day.</p>
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-1.5 border border-gray-200 rounded text-xs uppercase font-bold hover:bg-gray-50 cursor-pointer"
                id="service-modal-close"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setSelectedService(null);
                  setPreselectedServiceId(selectedService.id);
                  document.getElementById('inquiry-form-container')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-1.5 bg-primary text-white text-xs uppercase font-bold hover:bg-opacity-90 transition rounded cursor-pointer"
                id="service-modal-book-now"
              >
                Book now
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Product Details Option */}
      <Modal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name || ''}
      >
        {selectedProduct && (
          <div className="space-y-4" id="product-modal-view">
            <img
              alt={selectedProduct.name}
              className="w-full h-72 md:h-80 object-cover rounded shadow"
              src={selectedProduct.image}
            />
            <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-100 pb-2">
              <span className="bg-primary/10 text-primary px-3 py-1 font-bold text-[11px] rounded uppercase tracking-wider">{selectedProduct.category}</span>
              <span>Design price: <span className="font-mono text-sm font-bold text-primary">{selectedProduct.price}</span></span>
            </div>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p className="font-semibold text-gray-800">Product details:</p>
              <p>{selectedProduct.detailedDescription}</p>
              <p>Please place orders at least 7 days in advance so we can prepare the ideal size, palette, and decorative finish.</p>
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-1.5 border border-gray-200 rounded text-xs uppercase font-bold hover:bg-gray-50 cursor-pointer"
                id="product-modal-close"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setPreselectedServiceId('other');
                  const noteArea = document.getElementById('field-notes') as HTMLTextAreaElement | null;
                  if (noteArea) {
                    noteArea.value = `I would like a detailed consultation and rental quote for: ${selectedProduct.name} (${selectedProduct.price})`;
                  }
                  document.getElementById('inquiry-form-container')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-1.5 bg-primary text-white text-xs uppercase font-bold hover:bg-opacity-90 transition rounded cursor-pointer"
                id="product-modal-checkout"
              >
                Add to inquiry
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* BlogPost Read Panel */}
      <Modal
        isOpen={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
        title={selectedPost?.title || ''}
      >
        {selectedPost && (
          <div className="space-y-4" id="blog-modal-view">
            <img
              alt={selectedPost.title}
              className="w-full h-64 md:h-72 object-cover rounded shadow"
              src={selectedPost.image}
            />
            <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-100 pb-2">
              <span className="font-semibold text-primary">Wedding planning guide</span>
              <span className="flex items-center gap-1.5">
                <CalendarCheck className="w-3.5 h-3.5 text-gray-400" />
                Published: June 2026
              </span>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line bg-gray-50 p-4 rounded border border-gray-100">
              {selectedPost.content}
            </div>
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 bg-primary text-white text-xs uppercase font-bold hover:bg-opacity-90 transition rounded cursor-pointer"
                id="blog-modal-close"
              >
                Done reading
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Floating Support Modal action triggers */}
      <Modal
        isOpen={activeQuickSupport !== null}
        onClose={() => setActiveQuickSupport(null)}
        title={activeQuickSupport === 'phone' ? 'Call our support hotline' : 'Email support channel'}
      >
        {activeQuickSupport === 'phone' ? (
          <div className="text-center py-6 space-y-4" id="support-modal-phone">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <PhoneCall className="w-8 h-8" />
            </div>
            <h4 className="font-elegant text-2xl font-bold text-primary">+91 95668 94134</h4>
            <div className="space-y-2 text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
              <p>Please call the hotline above for quick pricing support and concept guidance within 10 minutes.</p>
              <p className="text-xs text-gray-400">You can also reach us through the same number for fast photo and planning coordination.</p>
            </div>
            <div className="pt-4 flex justify-center">
              <a
                href="tel:+919566894134"
                className="px-6 py-2 bg-primary hover:bg-opacity-95 text-white font-bold uppercase text-xs tracking-wider"
              >
                Call now
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4" id="support-modal-email">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <MailOpen className="w-8 h-8" />
            </div>
            <h4 className="font-mono text-lg font-bold text-primary">emediaerode@gmail.com</h4>
            <div className="space-y-2 text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
              <p>For contract questions, bulk pricing, or 3D design files, please email the sales address above.</p>
              <p className="text-xs text-gray-400">Messages are reviewed and replied to with attachments within 12 business hours.</p>
            </div>
            <div className="pt-4 flex justify-center">
              <a
                href="mailto:emediaerode@gmail.com"
                className="px-6 py-2 bg-primary hover:bg-opacity-95 text-white font-bold uppercase text-xs tracking-wider"
              >
                Send email
              </a>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
