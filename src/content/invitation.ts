export type ActionLink = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  to: string;
};

export type PersonName = {
  first: string;
  display: string;
};

export type VenueInfo = {
  name: string;
  city: string;
  addressLines: string[];
};

export type TimelineItem = {
  id: string;
  time: string;
  title: string;
  detail: string;
};

export type DetailItem = {
  id: string;
  label: string;
  value: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
};

export type GuideGroup = {
  title: string;
  items: string[];
};

export type RegistryItem = {
  id: string;
  label: string;
  description: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type InvitationContent = {
  navigation: NavItem[];
  couple: {
    partnerOne: PersonName;
    partnerTwo: PersonName;
    displayName: string;
  };
  event: {
    isoDate: string;
    dayLabel: string;
    dateLabel: string;
    fullDateLabel: string;
    venue: VenueInfo;
  };
  hero: {
    eyebrow: string;
    titleAccent: string;
    lede: string;
    primaryCta: ActionLink;
    secondaryCta: ActionLink;
  };
  invitationSummary: {
    label: string;
    headline: string;
    highlights: string[];
  };
  story: {
    sectionTag: string;
    title: string;
    body: string;
  };
  details: {
    sectionTag: string;
    title: string;
    items: DetailItem[];
  };
  countdown: {
    sectionTag: string;
    title: string;
    body: string;
  };
  schedule: {
    sectionTag: string;
    title: string;
    items: TimelineItem[];
  };
  gallery: {
    sectionTag: string;
    title: string;
    body: string;
    items: GalleryItem[];
  };
  guestGuide: {
    sectionTag: string;
    title: string;
    body: string;
    mapLabel: string;
    groups: GuideGroup[];
  };
  registry: {
    sectionTag: string;
    title: string;
    body: string;
    items: RegistryItem[];
  };
  rsvp: {
    sectionTag: string;
    title: string;
    deadlineLabel: string;
    body: string;
    formNote: string;
    contactEmail: string;
    questionEmail: string;
    attendanceOptions: SelectOption[];
    mealOptions: SelectOption[];
    primaryCta: ActionLink;
    secondaryCta: ActionLink;
  };
  footerNote: string;
};

export const invitationContent: InvitationContent = {
  navigation: [
    {
      label: "Beranda",
      to: "/",
    },
    {
      label: "Rangkaian Acara",
      to: "/celebration",
    },
    {
      label: "Panduan Tamu",
      to: "/guest-guide",
    },
    {
      label: "Konfirmasi Kehadiran",
      to: "/rsvp",
    },
  ],
  couple: {
    partnerOne: {
      first: "Amalia",
      display: "Amalia Indah Palupi",
    },
    partnerTwo: {
      first: "Arif",
      display: "Arif Eko Pramono",
    },
    displayName: "Amalia & Arif",
  },
  event: {
    isoDate: "2026-06-01T00:00:00+07:00",
    dayLabel: "Senin",
    dateLabel: "1 Juni 2026",
    fullDateLabel: "Senin, 1 Juni 2026",
    venue: {
      name: "",
      city: "",
      addressLines: [],
    },
  },
  hero: {
    eyebrow: "Senin, 1 Juni 2026 · InsyaAllah",
    titleAccent: "&",
    lede: "Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada hari bahagia kami. Kehadiran serta doa restu panjenengan akan menjadi kebahagiaan yang sangat kami syukuri.",
    primaryCta: {
      label: "Isi Konfirmasi",
      href: "/rsvp",
    },
    secondaryCta: {
      label: "Lihat Acara",
      href: "/celebration",
    },
  },
  invitationSummary: {
    label: "Undangan",
    headline: "Dengan memohon rahmat dan ridha Allah SWT",
    highlights: [
      "Akad dan rangkaian syukuran akan diselenggarakan secara khidmat bersama keluarga terdekat.",
      "Jamuan hangat, silaturahmi, serta kebersamaan sederhana akan mengiringi acara kami.",
      "Busana sopan dan anggun bernuansa lembut sangat kami harapkan.",
    ],
  },
  story: {
    sectionTag: "Kisah Kami",
    title: "Langkah kecil menuju ikatan yang diridhai",
    body: "Dengan izin Allah SWT, perjalanan kami bertumbuh dari pertemuan-pertemuan sederhana menjadi niat yang semakin mantap untuk melangkah bersama. Kami berharap hari pernikahan ini terasa teduh, hangat, dan penuh adab, sebagaimana rumah tangga yang ingin kami bangun kelak.",
  },
  details: {
    sectionTag: "Informasi",
    title: "Hal yang perlu diketahui",
    items: [
      {
        id: "dress-code",
        label: "Busana",
        value:
          "Busana formal, sopan, dan nyaman dengan nuansa warna lembut sangat kami anjurkan.",
      },
      {
        id: "reception",
        label: "Ramah Tamah",
        value:
          "Jamuan sederhana, silaturahmi keluarga, dan suasana hangat akan menemani rangkaian acara.",
      },
      {
        id: "arrival-note",
        label: "Catatan",
        value:
          "Kami memohon kehadiran tamu sekitar 30 menit lebih awal agar acara dapat dimulai dengan tertib.",
      },
    ],
  },
  countdown: {
    sectionTag: "Hitung Mundur",
    title: "Menuju hari yang kami nantikan",
    body: "Halaman ini kami siapkan sebagai pusat informasi bagi para tamu. Hitung mundur, panduan acara, dan formulir konfirmasi dapat dibagikan melalui tautan undangan ini.",
  },
  schedule: {
    sectionTag: "Susunan Acara",
    title: "Rangkaian acara InsyaAllah",
    items: [
      {
        id: "guest-arrival",
        time: "3:30 PM",
        title: "Kedatangan Tamu",
        detail:
          "Penerimaan tamu dan penyambutan keluarga dimulai dengan suasana yang tenang dan tertata.",
      },
      {
        id: "ceremony",
        time: "4:30 PM",
        title: "Akad dan Doa Bersama",
        detail:
          "Momen inti acara akan dilangsungkan secara khidmat bersama keluarga, kerabat, dan sahabat terdekat.",
      },
      {
        id: "dinner",
        time: "6:00 PM",
        title: "Jamuan dan Silaturahmi",
        detail:
          "Setelah prosesi utama, tamu dipersilakan menikmati jamuan sambil bersilaturahmi bersama keluarga besar.",
      },
      {
        id: "dance-floor",
        time: "8:00 PM",
        title: "Penutup Acara",
        detail:
          "Acara ditutup dengan suasana santai, ucapan syukur, dan kebersamaan yang hangat.",
      },
    ],
  },
  gallery: {
    sectionTag: "Galeri",
    title: "Jejak perjalanan kami",
    body: "Beberapa kenangan yang kami simpan sebagai penanda perjalanan menuju hari pernikahan kami.",
    items: [
      {
        id: "gallery-1",
        title: "Langkah Pertama Bersama",
        caption:
          "Perjalanan sederhana yang kemudian menjadi kebiasaan manis yang selalu kami rindukan.",
      },
      {
        id: "gallery-2",
        title: "Niat yang Dimantapkan",
        caption:
          "Sebuah momen yang menguatkan niat, disertai doa dan harapan untuk masa depan yang baik.",
      },
      {
        id: "gallery-3",
        title: "Ruang Cerita Kami",
        caption:
          "Sudut sederhana tempat banyak rencana baik kami mulai dibicarakan dengan tenang.",
      },
    ],
  },
  guestGuide: {
    sectionTag: "Panduan Tamu",
    title: "Panduan kehadiran dan informasi lokasi",
    body: "Seluruh informasi yang dibutuhkan tamu sebelum hari acara akan kami rangkum di sini. Detail lokasi, perjalanan, dan akomodasi dapat diperbarui begitu susunan akhir telah dipastikan.",
    mapLabel: "",
    groups: [
      {
        title: "Kedatangan",
        items: [
          "Kami mohon tamu hadir sekitar 30 menit sebelum acara dimulai.",
          "Informasi area parkir dan titik turun tamu akan dibagikan setelah detail venue final ditetapkan.",
        ],
      },
      {
        title: "Akomodasi",
        items: [
          "Silakan memilih penginapan di sekitar area venue setelah lokasi diumumkan secara resmi.",
          "Rekomendasi hotel atau penginapan keluarga dapat kami tambahkan untuk tamu dari luar kota.",
        ],
      },
      {
        title: "Transportasi",
        items: [
          "Mohon menyiapkan transportasi pulang atau layanan perjalanan daring sesuai kebutuhan masing-masing.",
          "Catatan cuaca, alas kaki, atau kebutuhan khusus lainnya akan kami perbarui setelah lokasi dipastikan.",
        ],
      },
    ],
  },
  registry: {
    sectionTag: "Doa dan Tanda Kasih",
    title: "Kehadiran dan doa restu sudah sangat berarti",
    body: "Bagi kami, kehadiran dan doa restu Bapak/Ibu/Saudara/i merupakan anugerah yang paling berharga. Apabila berkenan memberikan tanda kasih, keterangan berikut dapat menjadi panduan.",
    items: [
      {
        id: "registry-home",
        label: "Dana Rumah Tangga",
        description:
          "Pilihan sederhana untuk mendukung awal rumah tangga yang sedang kami rintis bersama.",
      },
      {
        id: "registry-honeymoon",
        label: "Perjalanan Syukur",
        description:
          "Pilihan tanda kasih yang dapat mendukung perjalanan pertama kami sebagai suami dan istri.",
      },
      {
        id: "registry-note",
        label: "Titip Doa",
        description:
          "Doa tulus dan pesan baik dari panjenengan akan selalu kami simpan dengan penuh syukur.",
      },
    ],
  },
  rsvp: {
    sectionTag: "Konfirmasi Kehadiran",
    title: "Mohon konfirmasi kehadiran",
    deadlineLabel: "",
    body: "Kami memohon kesediaan Bapak/Ibu/Saudara/i untuk mengisi konfirmasi kehadiran melalui formulir berikut. Setelah Firebase dan Firestore terhubung, data akan otomatis masuk ke daftar tamu bersama.",
    formNote:
      "Apabila Firebase belum dikonfigurasi, data konfirmasi tetap akan tersimpan di perangkat ini agar alur undangan dapat ditinjau terlebih dahulu.",
    contactEmail: "",
    questionEmail: "",
    attendanceOptions: [
      {
        value: "joyfully-accepts",
        label: "InsyaAllah hadir",
      },
      {
        value: "regretfully-declines",
        label: "Dengan hormat berhalangan hadir",
      },
    ],
    mealOptions: [
      {
        value: "chef-selection",
        label: "Menu pilihan panitia",
      },
      {
        value: "vegetarian",
        label: "Menu vegetarian",
      },
      {
        value: "vegan",
        label: "Menu vegan",
      },
    ],
    primaryCta: {
      label: "Kirim Konfirmasi",
      href: "/rsvp",
    },
    secondaryCta: {
      label: "Sampaikan Pertanyaan",
      href: "",
    },
  },
  footerNote:
    "Atas kehadiran dan doa restu panjenengan, kami haturkan terima kasih. Semoga Allah SWT membalas segala kebaikan dengan keberkahan.",
};
