import { Trophy } from 'lucide-react';

export default function CompetitionFloatingButton() {
  return (
    <div className="flex fixed left-0 top-1/3 z-40 flex-col bg-primary text-white shadow-lg rounded-r-md overflow-hidden" id="competition-floating-sidebar">
      <button
        onClick={() => { window.location.hash = 'competition-registration'; }}
        className="p-3 hover:bg-white/10 transition flex items-center justify-center cursor-pointer"
        title="போட்டி பதிவு (Competition Registration)"
        id="sidebar-competition-btn"
        aria-label="Competition Registration"
      >
        <Trophy className="w-5 h-5" />
      </button>
    </div>
  );
}
