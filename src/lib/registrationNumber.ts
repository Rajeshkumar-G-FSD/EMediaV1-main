import { doc, runTransaction } from 'firebase/firestore';
import { db } from './firebase.ts';

// Generates a unique, sequential registration number per calendar year,
// e.g. COMP-2026-00001, backed by a Firestore counter document so
// concurrent submissions never collide.
export async function generateRegistrationNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const counterRef = doc(db, 'counters', `competitionRegistrations-${year}`);

  const nextCount = await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(counterRef);
    const current = snap.exists() ? (snap.data().count as number) : 0;
    const next = current + 1;
    transaction.set(counterRef, { count: next }, { merge: true });
    return next;
  });

  return `COMP-${year}-${String(nextCount).padStart(5, '0')}`;
}
