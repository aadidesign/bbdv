// Central brand + site configuration for BBDV (Body By Design Vacations).
// All values are real, sourced from the brand's Facebook pages and the
// Aesthetics Plus clinic (the accredited India surgical partner).

export const site = {
  name: "Body By Design Vacations",
  shortName: "BBDV",
  tagline: "Cosmetic Surgery Holidays to India",
  taglineLong: "World-class cosmetic and plastic surgery in Bangalore, fully coordinated from Australia.",
  description:
    "Body By Design Vacations plans your cosmetic surgery holiday to India end to end. Board-certified surgeons, an award-winning Bangalore clinic, and a calm recovery, for a fraction of the Australian price.",
  url: "https://bodybydesignvacations.com",
  domainLabel: "bodybydesignvacations.com",
  monogram: "BBDV",
} as const;

// Partner clinic in India
export const partner = {
  name: "Aesthetics Plus Clinics",
  shortName: "Aesthetics Plus",
  city: "Bangalore",
  established: 2003,
  parent: "A unit of Phoenix Health Ventures",
  award: "Karnataka Healthcare Leadership Award, 2019",
} as const;

export const contact = {
  // Australia (BBDV front line)
  au: {
    label: "Australia",
    contactName: "Shree",
    city: "Melbourne, Australia",
    phone: "+61 411 888 504",
    phoneHref: "tel:+61411888504",
    whatsapp: "https://wa.me/61411888504",
    whatsappLabel: "+61 411 888 504",
  },
  // India (Aesthetics Plus clinic)
  india: {
    label: "India clinic",
    phones: ["+91 99457 80075", "+91 96061 70075"],
    phoneHrefs: ["tel:+919945780075", "tel:+919606170075"],
    email: "hello@aestheticsplus.in",
    emailHref: "mailto:hello@aestheticsplus.in",
    whatsapp: "https://wa.me/919606170075",
    address: "Sadashiv Nagar, Bangalore, Karnataka, India",
    hours: "11am to 5pm, Monday to Saturday",
  },
  // Primary lead capture (Melbourne business wants WhatsApp + calls)
  primaryWhatsApp: "https://wa.me/61411888504",
  primaryPhone: "+61 411 888 504",
  primaryPhoneHref: "tel:+61411888504",
} as const;

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/share/1EmgNbjesm/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/aestheticsplusclinics/", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC6wUAraGMCzAqAbqpMO7CtA", icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/aestheticsplusclinics/", icon: "linkedin" },
] as const;

// Source markets BBDV serves (regional funnels, all routing to Bangalore)
export const markets = [
  "Australia",
  "New Zealand",
  "Malaysia",
  "Singapore",
  "Africa & Middle East",
  "United Kingdom",
] as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Procedures", href: "/procedures" },
  { label: "Surgery in India", href: "/surgery-in-india" },
  { label: "Pricing", href: "/pricing" },
  { label: "Patient Stories", href: "/patient-stories" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export const footerNav = {
  procedures: [
    { label: "Face", href: "/procedures#face" },
    { label: "Breast", href: "/procedures#breast" },
    { label: "Body", href: "/procedures#body" },
    { label: "Men", href: "/procedures#men" },
    { label: "Non-surgical", href: "/procedures#nonsurgical" },
  ],
  company: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Surgery in India", href: "/surgery-in-india" },
    { label: "Pricing & Savings", href: "/pricing" },
    { label: "Patient Stories", href: "/patient-stories" },
    { label: "About Us", href: "/about" },
  ],
  support: [
    { label: "Get a Quote", href: "/get-a-quote" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export const cta = {
  quote: { label: "Get a Free Quote", href: "/get-a-quote" },
  call: { label: "Talk to a Coordinator", href: contact.primaryPhoneHref },
  whatsapp: { label: "WhatsApp Us", href: contact.primaryWhatsApp },
} as const;

// Medical disclaimer (adapted from the clinic's own disclaimer)
export const medicalDisclaimer =
  "The information on this website is for general education and awareness about cosmetic and plastic surgery options. It does not replace a consultation with a board-certified plastic surgeon. Results vary from person to person, and any images shown do not represent typical results. Prices shown are indicative estimates in Australian dollars for planning purposes only and are confirmed after a personal consultation.";
