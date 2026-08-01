// Google Apps Script — bound to the "Competition Registrations" Google Sheet.
//
// Receives a completed competition registration (see
// src/lib/googleSheetsSync.ts), saves the ID proof + payment screenshot
// into a Drive folder, and appends one row per registration to this sheet.
//
// SETUP
// 1. Open the target Sheet: https://docs.google.com/spreadsheets/d/1QLApxdHxupQ6SXzcpUW-j55DQvAfz014E3WyaIUvq6k/edit
// 2. Extensions -> Apps Script
// 3. Delete any starter code and paste this whole file in
// 4. Update DRIVE_FOLDER_ID below to the Drive folder you want files saved into
// 5. Deploy -> New deployment -> type "Web app"
//      Execute as: Me
//      Who has access: Anyone
// 6. Copy the deployed /exec URL into VITE_APPS_SCRIPT_URL in .env.local
// 7. The first request will prompt an authorization screen in your Google
//    account (this account needs edit access to both the Sheet and the
//    Drive folder) — approve it once, from the Apps Script editor's "Run"
//    button on doPost with a manual test, or by submitting one real
//    registration from the site.

const DRIVE_FOLDER_ID = '1mBuYhwVBVyMhYLE1z4fAoTOhPdvLmyrH'; // "Emedia_Aug" folder

const SHEET_HEADERS = [
  'Timestamp', 'Registration No', 'Full Name', 'Parent/Spouse/Guardian Name', 'Their Number (Secondary)',
  'Mobile', 'WhatsApp', 'Email', 'Gender', 'DOB', 'Age', 'Address', 'District', 'Pincode', 'Participant Type',
  'Competition', 'Category', 'Entry Fee', 'Transaction ID',
  'ID Proof File', 'Payment Screenshot File', 'Payment Status', 'Verification Status',
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);

    const proofUrl = saveBase64File_(folder, data.proofDocumentBase64, data.proofFileName);
    const screenshotUrl = saveBase64File_(folder, data.paymentScreenshotBase64, data.paymentScreenshotFileName);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    ensureHeaderRow_(sheet);

    sheet.appendRow([
      new Date(),
      data.registrationNumber,
      data.fullName,
      data.parentName,
      data.parentContactNumber,
      data.mobile,
      data.whatsapp,
      data.email,
      data.gender,
      data.dob,
      data.age,
      data.address,
      data.district,
      data.pincode,
      data.participantType,
      data.competitionName,
      data.categoryLabel,
      data.entryFee,
      data.transactionId,
      proofUrl,
      screenshotUrl,
      data.paymentStatus,
      data.verificationStatus,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, proofUrl: proofUrl, screenshotUrl: screenshotUrl }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Decodes a "data:<mime>;base64,<data>" URI and saves it into the given
// Drive folder under the given file name. Returns the file's view URL, or
// '' if no data URI was provided (e.g. a Public participant has no ID proof).
function saveBase64File_(folder, dataUri, fileName) {
  if (!dataUri || !fileName) return '';

  const match = dataUri.match(/^data:(.+);base64,(.*)$/);
  const mimeType = match ? match[1] : 'image/jpeg';
  const base64 = match ? match[2] : dataUri;

  const bytes = Utilities.base64Decode(base64);
  const blob = Utilities.newBlob(bytes, mimeType, fileName);
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
  }
}
