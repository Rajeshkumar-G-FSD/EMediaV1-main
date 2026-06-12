import React, { useState } from 'react';
import { SERVICES_DATA, PRODUCTS_DATA } from '../data.ts';
import { Calculator, Sparkles, Check, ChevronRight, Share2, ClipboardList } from 'lucide-react';

interface EstimatorProps {
  onQuoteSubmit: (notes: string, selectedServiceName: string) => void;
}

export default function BudgetEstimator({ onQuoteSubmit }: EstimatorProps) {
  const [selectedServiceId, setSelectedServiceId] = useState('s1');
  const [tableCount, setTableCount] = useState(15);
  const [menuType, setMenuType] = useState('premium'); // standard, premium, luxury
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(['p1', 'p2']);
  const [withLighting, setWithLighting] = useState(true);
  const [submittedQuote, setSubmittedQuote] = useState(false);

  // Menus price mapping
  const menuPrices = {
    standard: { price: 2800000, desc: '5-course traditional menu + beer' },
    premium: { price: 3800000, desc: '6-course premium menu + beer & red wine' },
    luxury: { price: 5200000, desc: '7-course luxury menu' },
  };

  // Base service prices (approximate custom calculation)
  const serviceBasePrices: Record<string, number> = {
    s1: 12000000,
    s2: 25000000,
    s3: 35000000,
    s4: 8000000,
  };

  const getProductPrice = (id: string): number => {
    if (id === 'p1') return 4500000;
    if (id === 'p2') return 3200000;
    if (id === 'p3') return 6000000;
    if (id === 'p4') return 4800000;
    return 0;
  };

  // Calculator
  const baseServiceCost = serviceBasePrices[selectedServiceId] || 0;
  const menuCostPerTable = menuPrices[menuType as keyof typeof menuPrices]?.price || 0;
  const totalMenuCost = tableCount * menuCostPerTable;
  
  const totalProductsCost = selectedProductIds.reduce((sum, id) => {
    return sum + getProductPrice(id);
  }, 0);

  const lightingCost = withLighting ? 7500000 : 0;
  const grandTotal = baseServiceCost + totalMenuCost + totalProductsCost + lightingCost;

  const handleToggleProduct = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(selectedProductIds.filter(x => x !== id));
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const handleContactQuote = () => {
    const serviceName = SERVICES_DATA.find(s => s.id === selectedServiceId)?.title || 'Service';
    const productNamesStr = selectedProductIds
      .map(id => PRODUCTS_DATA.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const quoteDetails = `Budget estimate: total ${formatCurrency(grandTotal)}. Main service: ${serviceName}. Event tables: ${tableCount} tables (${menuPrices[menuType as keyof typeof menuPrices].desc}). Add-on products: ${productNamesStr || 'None selected'}. Lighting and stage support included: ${withLighting ? 'Yes' : 'No'}.`;
    
    onQuoteSubmit(quoteDetails, selectedServiceId);
    setSubmittedQuote(true);
    setTimeout(() => {
      setSubmittedQuote(false);
    }, 5000);
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
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">1. Choose a main service</label>
            <div className="grid grid-cols-2 gap-2">
              {SERVICES_DATA.slice(0, 3).map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedServiceId(item.id)}
                  className={`p-3 text-left rounded border text-xs transition cursor-pointer flex flex-col justify-between ${
                    selectedServiceId === item.id
                      ? 'border-primary bg-primary/5 text-primary font-bold'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                  id={`estimator-service-${item.id}`}
                >
                  <span>{item.title}</span>
                  <span className="text-[10px] text-gray-400 mt-1">From {item.priceRange.split(' - ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-gray-600 uppercase">2. Ceremony / reception menu</label>
              <span className="text-xs text-primary font-bold">{tableCount} tables</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={tableCount}
              onChange={(e) => setTableCount(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              id="estimator-range-tables"
            />
            <div className="grid grid-cols-3 gap-2 mt-3">
              {(Object.keys(menuPrices) as Array<keyof typeof menuPrices>).map((key) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setMenuType(key)}
                  className={`p-2 rounded text-center border text-[11px] transition cursor-pointer ${
                    menuType === key
                      ? 'border-primary bg-primary/5 text-primary font-semibold'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                  id={`estimator-menu-${key}`}
                >
                  <span className="block font-bold">{key === 'standard' ? 'Standard' : key === 'premium' ? 'Premium' : 'Luxury'}</span>
                  <span className="text-[9px] text-gray-400 font-mono block mt-0.5">{formatCurrency(menuPrices[key].price).split(',')[0]} / bàn</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">3. Add featured products</label>
            <div className="space-y-2">
              {PRODUCTS_DATA.map((prod) => (
                <label
                  key={prod.id}
                  className="flex items-center justify-between p-2 rounded border border-gray-100 text-xs hover:bg-gray-50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedProductIds.includes(prod.id)}
                      onChange={() => handleToggleProduct(prod.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      id={`estimator-product-${prod.id}`}
                    />
                    <span className="text-gray-700">{prod.name}</span>
                  </div>
                  <span className="font-mono text-gray-500">{prod.price.split(' VNĐ /')[0]}K</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-gray-600 uppercase">4. Lighting and stage support</span>
              <span className="text-[10px] text-gray-400">Ambient lighting and backdrop support throughout the event</span>
            </div>
            <button
              type="button"
              onClick={() => setWithLighting(!withLighting)}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                withLighting ? 'bg-primary' : 'bg-gray-200'
              }`}
              id="estimator-photo-toggle"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  withLighting ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
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
                <span>Main styling service:</span>
                <span className="font-semibold text-gray-800">{formatCurrency(baseServiceCost)}</span>
              </div>

              <div className="flex justify-between">
                <span>
                  Event catering ({tableCount} tables x {formatCurrency(menuPrices[menuType as keyof typeof menuPrices].price).split(',')[0]}):
                </span>
                <span className="font-semibold text-gray-800">{formatCurrency(totalMenuCost)}</span>
              </div>

              {selectedProductIds.length > 0 && (
                <div className="flex justify-between">
                  <span>Additional items x{selectedProductIds.length}:</span>
                  <span className="font-semibold text-gray-800">{formatCurrency(totalProductsCost)}</span>
                </div>
              )}

              {withLighting && (
                <div className="flex justify-between">
                  <span>Lighting and stage support:</span>
                  <span className="font-semibold text-gray-800">{formatCurrency(lightingCost)}</span>
                </div>
              )}

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
            <button
              onClick={handleContactQuote}
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
                  Quote saved!
                </>
              ) : (
                <>
                  <span>Send this estimate to EMedia</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
            {submittedQuote && (
              <p className="text-[10px] text-center text-primary font-medium mt-1">
                Your estimate has been saved into the consultation form below.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
