export default function CompetitionFloatingButton() {
  return (
    <div data-no-text-reveal className="flex fixed left-0 top-1/3 z-40 flex-col bg-primary text-white shadow-lg rounded-r-md overflow-hidden animate-pulse-glow" id="competition-floating-sidebar">
      <button
        onClick={() => { window.location.hash = 'competition-registration'; }}
        className="py-4 px-2 hover:bg-white/10 transition flex items-center justify-center cursor-pointer animate-float"
        title="நம்ம ஊரு சாம்பியன் - 2026 (Competition Registration)"
        id="sidebar-competition-btn"
        aria-label="நம்ம ஊரு சாம்பியன் - 2026 போட்டி பதிவு"
      >
        <span className="vertical-tamil-text text-sm font-bold tracking-wider whitespace-nowrap">
          நம்ம ஊரு சாம்பியன் - 2026
        </span>
      </button>
    </div>
  );
}
