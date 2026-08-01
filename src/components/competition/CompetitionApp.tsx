import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CompetitionDefinition, ParticipantRegistration } from '../../types.ts';
import CompetitionRegistrationPage from './CompetitionRegistrationPage.tsx';
import CompetitionForm from './CompetitionForm.tsx';
import CompetitionPaymentPage from './CompetitionPaymentPage.tsx';
import CompetitionSuccessPage from './CompetitionSuccessPage.tsx';

type CompetitionStep = 'list' | 'form' | 'payment' | 'success';

export default function CompetitionApp() {
  const [step, setStep] = useState<CompetitionStep>('list');
  const [selectedCompetition, setSelectedCompetition] = useState<CompetitionDefinition | null>(null);
  const [registration, setRegistration] = useState<ParticipantRegistration | null>(null);

  const goHome = () => { window.location.hash = ''; };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {step === 'list' && (
          <CompetitionRegistrationPage
            onBack={goHome}
            onSelectCompetition={(competition) => {
              setSelectedCompetition(competition);
              setStep('form');
            }}
          />
        )}

        {step === 'form' && selectedCompetition && (
          <CompetitionForm
            competition={selectedCompetition}
            onCancel={() => setStep('list')}
            onSubmitted={(reg) => {
              setRegistration(reg);
              setStep('payment');
            }}
          />
        )}

        {step === 'payment' && registration && (
          <CompetitionPaymentPage
            registration={registration}
            onBack={() => setStep('form')}
            onSubmitted={(reg) => {
              setRegistration(reg);
              setStep('success');
            }}
          />
        )}

        {step === 'success' && registration && (
          <CompetitionSuccessPage registration={registration} onDone={goHome} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
