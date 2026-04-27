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
      label: "Welcome",
      to: "/",
    },
    {
      label: "Celebration",
      to: "/celebration",
    },
    {
      label: "Guest Guide",
      to: "/guest-guide",
    },
    {
      label: "RSVP",
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
    dayLabel: "Monday",
    dateLabel: "1 Juni 2026",
    fullDateLabel: "Monday, 1 Juni 2026",
    venue: {
      name: "",
      city: "",
      addressLines: [],
    },
  },
  hero: {
    eyebrow: "Monday, 1 Juni 2026",
    titleAccent: "&",
    lede: "We are inviting you to a candlelit evening of vows, dinner, and dancing beneath the trees. Your presence will make the celebration complete.",
    primaryCta: {
      label: "RSVP Now",
      href: "/rsvp",
    },
    secondaryCta: {
      label: "View Celebration",
      href: "/celebration",
    },
  },
  invitationSummary: {
    label: "The Invitation",
    headline: "",
    highlights: [],
  },
  story: {
    sectionTag: "Our Story",
    title: "From coffee dates to forever",
    body: "After years of shared playlists, midnight ramen, and flights taken just to spend one more day together, we are ready for our next chapter. We wanted the day to feel warm, thoughtful, and deeply personal, just like the life we are building.",
  },
  details: {
    sectionTag: "Details",
    title: "What to expect",
    items: [
      {
        id: "dress-code",
        label: "Dress Code",
        value: "Formal, romantic, and comfortable for an outdoor evening.",
      },
      {
        id: "reception",
        label: "Reception",
        value:
          "Seated dinner, live band, signature cocktails, and late sweets.",
      },
      {
        id: "arrival-note",
        label: "Notes",
        value: "Please arrive 30 minutes early for the ceremony processional.",
      },
    ],
  },
  countdown: {
    sectionTag: "Countdown",
    title: "The celebration is getting close",
    body: "Use this page as your guest hub before the event. The countdown, guide, and RSVP flow are designed to make the invitation shareable as a public link.",
  },
  schedule: {
    sectionTag: "Timeline",
    title: "An evening designed to linger",
    items: [
      {
        id: "guest-arrival",
        time: "3:30 PM",
        title: "Guests Arrive",
        detail:
          "Garden courtyard reception with welcome drinks and a string trio.",
      },
      {
        id: "ceremony",
        time: "4:30 PM",
        title: "Vows Under The Canopy",
        detail:
          "An intimate ceremony surrounded by family, friends, and sunset light.",
      },
      {
        id: "dinner",
        time: "6:00 PM",
        title: "Dinner & Toasts",
        detail:
          "Seasonal dinner service followed by stories, speeches, and dessert.",
      },
      {
        id: "dance-floor",
        time: "8:00 PM",
        title: "Lantern Dance Floor",
        detail: "Live band, late-night sweets, and dancing into the evening.",
      },
    ],
  },
  gallery: {
    sectionTag: "Gallery",
    title: "Snapshots from our story",
    body: "These cards are placeholders for the photos and captions you want guests to see before the wedding day.",
    items: [
      {
        id: "gallery-1",
        title: "First Trip Together",
        caption:
          "A weekend drive that turned into the tradition we never stopped repeating.",
      },
      {
        id: "gallery-2",
        title: "The Proposal",
        caption:
          "At golden hour, with a notebook full of promises and a very obvious smile.",
      },
      {
        id: "gallery-3",
        title: "Our Favorite Table",
        caption: "The quiet corner where most of our best plans somehow began.",
      },
    ],
  },
  guestGuide: {
    sectionTag: "Guest Guide",
    title: "Travel, timing, and finding the venue",
    body: "Everything a guest needs for the weekend lives here. Replace the placeholder guidance with your final map, hotel, and transport information.",
    mapLabel: "",
    groups: [
      {
        title: "Arrival",
        items: [
          "Plan to arrive 30 minutes before the ceremony begins.",
          "Parking and drop-off will be available near the glasshouse entrance.",
        ],
      },
      {
        title: "Stay Nearby",
        items: [
          "Reserve accommodation near central Ubud for the easiest ride to the venue.",
          "Share hotel recommendations here for out-of-town guests.",
        ],
      },
      {
        title: "Transport",
        items: [
          "Coordinate a return shuttle or rideshare suggestion for the late evening.",
          "Add any dress, weather, or footwear notes guests should know before arriving.",
        ],
      },
    ],
  },
  registry: {
    sectionTag: "Gift Registry",
    title: "If you would like to give a gift",
    body: "This section is optional. Keep it simple, or replace these cards with your final registry links and notes.",
    items: [
      {
        id: "registry-home",
        label: "Home Fund",
        description:
          "A place for future-home contributions once you add the final public link.",
      },
      {
        id: "registry-honeymoon",
        label: "Honeymoon Experiences",
        description:
          "Swap this text for a travel registry or experience-based gift option.",
      },
      {
        id: "registry-note",
        label: "Warm Note",
        description:
          "A heartfelt message can sit here if you prefer no registry at all.",
      },
    ],
  },
  rsvp: {
    sectionTag: "RSVP",
    title: "Celebrate with us",
    deadlineLabel: "",
    body: "Please reply before 1 August 2026. This version includes a client-side RSVP form for guest flow review and a generated email handoff you can replace with a real backend later.",
    formNote:
      "Current behavior: the form validates input and stores it in the browser for demo purposes. For production guest collection, connect it to Formspree, Supabase, Airtable, or your own API.",
    contactEmail: "",
    questionEmail: "",
    attendanceOptions: [
      {
        value: "joyfully-accepts",
        label: "Joyfully accepts",
      },
      {
        value: "regretfully-declines",
        label: "Regretfully declines",
      },
    ],
    mealOptions: [
      {
        value: "chef-selection",
        label: "Chef selection",
      },
      {
        value: "vegetarian",
        label: "Vegetarian",
      },
      {
        value: "vegan",
        label: "Vegan",
      },
    ],
    primaryCta: {
      label: "Send RSVP",
      href: "/rsvp",
    },
    secondaryCta: {
      label: "Ask A Question",
      href: "",
    },
  },
  footerNote: "With love, gratitude, and a seat saved just for you.",
};
