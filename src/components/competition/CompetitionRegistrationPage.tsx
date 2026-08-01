import { motion } from 'motion/react';
import { ArrowLeft, Clock, Trophy, ListChecks, UserCheck, IndianRupee, FileCheck } from 'lucide-react';
import { CompetitionDefinition } from '../../types.ts';
import { COMPETITIONS_DATA } from '../../data.ts';

interface CompetitionRegistrationPageProps {
  onBack: () => void;
  onSelectCompetition: (competition: CompetitionDefinition) => void;
}

const INSTRUCTIONS = [
  { icon: UserCheck, text: 'Fill in your participant details accurately — they will appear on your certificate.' },
  { icon: ListChecks, text: 'Choose your competition and category based on your age group.' },
  { icon: IndianRupee, text: 'Pay the entry fee via UPI and submit your transaction ID with a screenshot.' },
  { icon: FileCheck, text: 'Save your registration number — you will need it on the event day.' },
];

export default function CompetitionRegistrationPage({ onBack, onSelectCompetition }: CompetitionRegistrationPageProps) {
  return (
    <div id="competition-registration-page" data-no-text-reveal className="min-h-screen bg-light">

      {/* Hero banner */}
      <section className="relative w-full py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary text-white text-center">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px),radial-gradient(circle_at_80%_60%,white_1px,transparent_1px)] [background-size:40px_40px]" />

        <button
          onClick={onBack}
          className="absolute top-6 left-4 sm:left-8 z-10 inline-flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold uppercase tracking-wide backdrop-blur transition cursor-pointer rounded-full"
          id="competition-back-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to home
        </button>

        <div className="relative container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/15 border border-white/30 backdrop-blur mb-5"
          >
            <Trophy className="w-8 h-8 text-yellow-300" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-elegant text-4xl sm:text-6xl font-bold mb-4"
          >
            போட்டி பதிவு
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/85 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Competition Registration — register for drawing, kolam, dance, singing, running, poetry, and reels
            competitions hosted by EMedia Event &amp; Promotions.
          </motion.p>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-6xl py-14">

        {/* Registration instructions */}
        <section className="mb-14" aria-label="Registration instructions">
          <h2 className="font-elegant text-2xl sm:text-3xl font-bold text-primary text-center mb-8">
            How registration works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INSTRUCTIONS.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/70 backdrop-blur border border-white shadow-sm hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Competition cards */}
        <section aria-label="Competitions">
          <h2 className="font-elegant text-2xl sm:text-3xl font-bold text-primary text-center mb-8">
            Choose your competition
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPETITIONS_DATA.map((comp, i) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="group relative rounded-2xl bg-white/60 backdrop-blur border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                id={`competition-card-${comp.id}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-elegant text-xl font-bold text-primary leading-tight">{comp.nameTamil}</h3>
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Trophy className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wide text-secondary mb-2">{comp.nameEnglish}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    {comp.timing}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">{comp.description}</p>
                  <button
                    onClick={() => onSelectCompetition(comp)}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase text-xs tracking-wide py-2.5 rounded-lg transition cursor-pointer"
                    id={`competition-register-btn-${comp.id}`}
                  >
                    Register
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
