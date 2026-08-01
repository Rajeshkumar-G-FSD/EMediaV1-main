import { ParticipantRegistration } from '../types.ts';
import { PARTICIPANT_TYPE_LABELS } from '../data.ts';

// Fires a completed registration + its ID proof / payment screenshot at a
// Google Apps Script Web App (see google-apps-script/CompetitionSync.gs),
// which appends a row to a Google Sheet and saves the two files into a
// Drive folder. Firestore stays the source of truth for the app itself —
// this is a best-effort side channel for the organiser's spreadsheet, so a
// failure here is logged but never blocks the participant's success page.
//
// Apps Script Web Apps don't send CORS headers back to the browser, so this
// uses `mode: 'no-cors'` (a "simple request" that skips the CORS preflight
// entirely) — the request still reaches the script and runs, but the
// response body can't be read from here, hence no return value.
export function syncRegistrationToSheet(registration: ParticipantRegistration): void {
  const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
  if (!scriptUrl) {
    console.warn('Google Sheet sync skipped: VITE_APPS_SCRIPT_URL is not configured.');
    return;
  }

  const safeName = registration.fullName.trim().replace(/[^a-zA-Z0-9]+/g, '_');
  const filePrefix = `${registration.registrationNumber}_${safeName}`;

  const payload = {
    registrationNumber: registration.registrationNumber,
    fullName: registration.fullName,
    parentName: registration.parentName,
    parentContactNumber: registration.parentContactNumber,
    mobile: registration.mobile,
    whatsapp: registration.whatsapp,
    email: registration.email,
    gender: registration.gender,
    dob: registration.dob,
    age: registration.age,
    address: registration.address,
    district: registration.district,
    pincode: registration.pincode,
    participantType: PARTICIPANT_TYPE_LABELS[registration.participantType],
    competitionName: registration.competitionName,
    categoryLabel: registration.categoryLabel,
    entryFee: registration.entryFee,
    transactionId: registration.transactionId,
    paymentStatus: registration.paymentStatus,
    verificationStatus: registration.verificationStatus,
    proofDocumentBase64: registration.proofDocumentURL,
    proofFileName: registration.proofDocumentURL ? `${filePrefix}_ID.jpg` : '',
    paymentScreenshotBase64: registration.paymentScreenshotURL,
    paymentScreenshotFileName: registration.paymentScreenshotURL ? `${filePrefix}_Payment.jpg` : '',
  };

  fetch(scriptUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.error('Failed to sync registration to Google Sheet', err);
  });
}
