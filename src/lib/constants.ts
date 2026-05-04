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

/** Shared venue address + maps (akad & resepsi same location). Coords from Google Maps place link. */
const VENUE_ADDRESS_LINE =
  'Pohgunung, RT.36 RW.09, Margourip, Ngancar, Kediri';
const VENUE_DIRECTIONS_URL = 'https://www.google.com/maps/place/-7.9662645,112.176766';
const VENUE_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.8!2d112.176766!3d-7.966265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPohgunung%2C+Margourip%2C+Ngancar%2C+Kediri!5e0!3m2!1sid!2sid!4v1';

export const VENUE_AKAD = {
  title: 'Akad Nikah',
  scheduleLabel: '08.00 WIB – Selesai',
  addressLine: VENUE_ADDRESS_LINE,
  /** Opens in new tab for "Petunjuk Lokasi" */
  directionsUrl: VENUE_DIRECTIONS_URL,
  /** Paste embed URL from Google Maps → Share → Embed a map */
  embedUrl: VENUE_EMBED_URL,
};

export const VENUE_RESEPSI = {
  title: 'Resepsi',
  scheduleLabel: '11.00 – 14.00 WIB',
  addressLine: VENUE_ADDRESS_LINE,
  directionsUrl: VENUE_DIRECTIONS_URL,
  embedUrl: VENUE_EMBED_URL,
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

/**
 * Foto di `public/images/gallery/`. Urutan: sesi busana adat (studio) → lamaran
 * (backdrop) → bersama keluarga. Sampul undangan pakai `COVER_IMAGE_SRC` (bukan di sini).
 */
export const galleryImages = [
  {
    src: withBase('/images/gallery/IMG_2363.JPG'),
    alt: 'Amalia berkebaya dan jarik batik parang, potret studio adat Jawa',
    caption: 'Warisan lembut yang kami bawa: kebaya, jarik, dan rasa syukur yang sama.',
  },
  {
    src: withBase('/images/gallery/IMG_2364.JPG'),
    alt: 'Arif berbeskap memegang keris, potret studio adat Jawa',
    caption: 'Beskap, batik, dan keris—simbol adab yang ingin kami jaga bersama.',
  },
  {
    src: withBase('/images/gallery/IMG_2379.JPG'),
    alt: 'Arif dan Amalia berlutut berbusana adat di depan payung dan bunga',
    caption: 'Dalam kemuliaan adat, kami berjanji melangkah dengan saling menghormati.',
  },
  {
    src: withBase('/images/gallery/IMG_2369.JPG'),
    alt: 'Pasangan berbusana adat, Arif duduk dan Amalia berdiri di sampingnya',
    caption: 'Satu irama batik, dua hati yang belajar selaras dalam doa.',
  },
  {
    src: withBase('/images/gallery/IMG_2380.JPG'),
    alt: 'Arif dan Amalia berlutut tersenyum memakai beskap dan kebaya',
    caption: 'Senyum sederhana di balik rias megah—bukti bahagia yang tenang.',
  },
  {
    src: withBase('/images/gallery/IMG_2381.JPG'),
    alt: 'Arif dan Amalia berdiri berbusana adat memegang keris',
    caption: 'Kami mengikat niat baik di antara payung, bunga, dan warisan budaya.',
  },
  {
    src: withBase('/images/gallery/IMG_2371.JPG'),
    alt: 'Arif dan Amalia bergandengan, pose berdiri dan duduk studio adat',
    caption: 'Genggaman erat di tengah warna cokelat dan emas—janji yang pelan tapi pasti.',
  },
  {
    src: withBase('/images/gallery/IMG_2373.JPG'),
    alt: 'Pasangan adat dengan payung kertas dan dekor bunga anggrek',
    caption: 'Detail kecil—payung, anggrek, batik—mengisi cerita besar kami.',
  },
  {
    src: withBase('/images/gallery/IMG_2386.jpg'),
    alt: 'Arif dan Amalia duduk berdampingan di depan backdrop lamaran Amalia & Arif',
    caption: 'Momen lamaran: ketika dua keluarga mulai merangkai restu bersama.',
  },
  {
    src: withBase('/images/gallery/IMG_2426.jpg'),
    alt: 'Amalia berdiri di belakang Arif yang duduk, backdrop bunga dan tulisan nama',
    caption: 'Di balik setiap undangan ada tawa ringan yang membuat hari ini terasa nyata.',
  },
  {
    src: withBase('/images/gallery/IMG_2578%20(1).jpg'),
    alt: 'Arif dan Amalia tertawa bersama di depan backdrop lamaran',
    caption: 'Tawa lepas—momen favorit kami sebelum hari besar tiba.',
  },
  {
    src: withBase('/images/gallery/IMG-20251108-WA0023.jpg'),
    alt: 'Empat anggota keluarga berpose di depan dekor lamaran',
    caption: 'Keluarga yang mendampingi doa kami sejak awal hingga hari ini.',
  },
  {
    src: withBase('/images/gallery/IMG-20251108-WA0029.jpg'),
    alt: 'Keluarga berempat berbusana batik dan kebaya di acara lamaran',
    caption: 'Terima kasih atas kasih sayang yang menumbuhkan keberanian kami berdua.',
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
