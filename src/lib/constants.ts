import type { RsvpFormData } from '@/types';
import { formatDateId } from '@/lib/utils';

/** Vite `base`-aware URL for files under `public/` */
const withBase = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

// =============================================================================
// Wedding content — replace placeholders before sending invites (CONTENT_GUIDE.md)
// =============================================================================

/** Groom first name or full name as shown on the invitation */
export const GROOM_NAME = 'Arif Eko Pramono';

/** Bride first name or full name as shown on the invitation */
export const BRIDE_NAME = 'Amalia Indah Palupi';

/** Short names used in compact UI areas (e.g. header / sticky navbar) */
export const GROOM_NICKNAME = 'Arif';
export const BRIDE_NICKNAME = 'Amal';

/** Wedding date as ISO date only; time is applied with Asia/Jakarta below */
export const WEDDING_DATE_ISO = '2026-06-01';

/**
 * Event instant for countdown (replace WEDDING_DATE_ISO and adjust time if needed).
 * Example uses 08:00 WIB.
 */
export const WEDDING_DATE = new Date(`${WEDDING_DATE_ISO}T08:00:00+07:00`);

/**
 * Derived from `WEDDING_DATE` via `formatDateId` (`Intl`, Bahasa Indonesia).
 * Ubah hanya `WEDDING_DATE_ISO` — teks hero/kartu ikut tanpa edit manual.
 */
export const WEDDING_DATE_LABEL_LONG = `${formatDateId(WEDDING_DATE)} · InsyaAllah`;

/**
 * Foto sampul: latar penuh halaman buka undangan (empty = hanya gradien).
 * File di `public/`, contoh `withBase('/images/gallery/foto.jpg')`
 */
export const COVER_IMAGE_SRC = withBase('/images/gallery/-xdunqp.jpg');

// --- WhatsApp RSVP (E.164 without +, e.g. 6281234567890) --------------------

export const WHATSAPP_RSVP_E164 = '6280000000000';

// --- Venues (replace addresses and map links with yours) --------------------

export const VENUE_AKAD = {
  title: 'Akad Nikah',
  scheduleLabel: '08.00 WIB – Selesai',
  addressLine: '[ALAMAT LENGKAP AKAD + LINK MAPS]',
  /** Opens in new tab for "Petunjuk Lokasi" */
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Monumen+Nasional',
  /** Paste embed URL from Google Maps → Share → Embed a map */
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7980598473668!2d106.827153!3d-6.175392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5e2c12617c7%3A0x16cb25091ae78032!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1',
};

export const VENUE_RESEPSI = {
  title: 'Resepsi',
  scheduleLabel: '11.00 – 14.00 WIB',
  addressLine: '[ALAMAT LENGKAP RESEPSI + LINK MAPS]',
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Monumen+Nasional',
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7980598473668!2d106.827153!3d-6.175392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5e2c12617c7%3A0x16cb25091ae78032!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1',
};

// --- Digital gifts ------------------------------------------------------------

/** Full line shown to guests (bank name, number, account holder) */
export const BANK_DISPLAY_LINE = '[BANK] — [NOMOR REKENING] — a.n. [ATAS NAMA]';

/** Exact string copied when tapping "Salin Nomor Rekening" (usually digits only) */
export const BANK_COPY_TEXT = '[NOMOR REKENING]';

/**
 * QRIS image under `public/` (empty string hides the QR block).
 * e.g. `/images/qris.png`
 */
export const QRIS_IMAGE_SRC = '';

// --- Ayat -------------------------------------------------------------------

export const AYAT_ARABIC =
  'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ';

export const AYAT_TRANSLATION =
  'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir. (QS. Ar-Rum: 21)';

// --- Gallery (replace with your photos under public/images/gallery/) ---------

export const galleryImages = [
  {
    src: withBase('/images/gallery/IMG_2355.JPG'),
    alt: 'Momen pre-wedding Arif dan Amalia',
    caption: 'Perjalanan sederhana yang menjadi cerita indah menuju hari ini.',
  },
  {
    src: withBase('/images/gallery/IMG_2356.JPG'),
    alt: 'Potret kebersamaan Arif dan Amalia',
    caption: 'Setiap langkah kecil kami penuh doa dan harapan yang baik.',
  },
  {
    src: withBase('/images/gallery/IMG_2358.JPG'),
    alt: 'Jejak pre-wedding Arif dan Amalia',
    caption: 'Ruang penuh tawa yang kini kami kenang bersama keluarga besar.',
  },
  {
    src: withBase('/images/gallery/IMG_2362.JPG'),
    alt: 'Momen pre-wedding Arif dan Amalia',
    caption: 'Jejak cerita kami, satu langkah lebih dekat menuju hari bahagia.',
  },
  {
    src: withBase('/images/gallery/IMG_2363.JPG'),
    alt: 'Potret kebersamaan Arif dan Amalia',
    caption: 'Kebersamaan ini tumbuh dari doa-doa yang sama.',
  },
  {
    src: withBase('/images/gallery/IMG_2364.JPG'),
    alt: 'Jejak pre-wedding Arif dan Amalia',
    caption: 'Setiap tatap menjadi pengingat untuk saling menjaga.',
  },
  {
    src: withBase('/images/gallery/IMG_2366.JPG'),
    alt: 'Momen pre-wedding Arif dan Amalia',
    caption: 'Cerita sederhana kami bertumbuh dengan rasa syukur.',
  },
  {
    src: withBase('/images/gallery/IMG_2367.JPG'),
    alt: 'Potret kebersamaan Arif dan Amalia',
    caption: 'Dalam langkah ini, kami belajar saling menguatkan.',
  },
  {
    src: withBase('/images/gallery/IMG_2369.JPG'),
    alt: 'Jejak pre-wedding Arif dan Amalia',
    caption: 'Momen kecil yang menjadi kenangan besar.',
  },
  {
    src: withBase('/images/gallery/IMG_2371.JPG'),
    alt: 'Momen pre-wedding Arif dan Amalia',
    caption: 'Semoga perjalanan ini selalu dipenuhi keberkahan.',
  },
  {
    src: withBase('/images/gallery/IMG_2373.JPG'),
    alt: 'Potret kebersamaan Arif dan Amalia',
    caption: 'Kami menata hari depan dengan hati yang tenang.',
  },
  {
    src: withBase('/images/gallery/IMG_2375.JPG'),
    alt: 'Jejak pre-wedding Arif dan Amalia',
    caption: 'Langkah kami sederhana, niat kami sama: ibadah bersama.',
  },
  {
    src: withBase('/images/gallery/IMG_2379.JPG'),
    alt: 'Momen pre-wedding Arif dan Amalia',
    caption: 'Tawa hari ini menjadi doa untuk hari-hari berikutnya.',
  },
  {
    src: withBase('/images/gallery/IMG_2380.JPG'),
    alt: 'Potret kebersamaan Arif dan Amalia',
    caption: 'Kami bersyukur dipertemukan dalam waktu terbaik-Nya.',
  },
  {
    src: withBase('/images/gallery/IMG_2381.JPG'),
    alt: 'Jejak pre-wedding Arif dan Amalia',
    caption: 'Mohon doa agar perjalanan ini selalu dijaga dalam kebaikan.',
  },
];

// Legacy localStorage keys cleared on load (older RSVP / wishes shapes)

export const OLD_RSVP_KEYS_TO_REMOVE = [
  'wedding-invitation.rsvp-draft-v2',
  'wedding-invitation.rsvp-submitted-v2',
  'wedding-invitation.rsvp-draft',
  'wedding-invitation.rsvp-submitted',
] as const;

export const defaultRsvpForm: RsvpFormData = {
  guestName: '',
  attendance: 'hadir',
  guestCount: '1',
};

export const attendanceLabels: Record<string, string> = {
  hadir: 'Hadir',
  'tidak-hadir': 'Tidak Hadir',
  ragu: 'Masih Ragu',
};
