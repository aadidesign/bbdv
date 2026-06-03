// Surgeons, trust stats, the BBDV journey, why India, packages, accreditation.
// Surgeon names and credentials are real (Aesthetics Plus, Bangalore).

export type Surgeon = {
  name: string;
  role: string;
  creds: string;
  bio: string;
  focus: string[];
  image: string;
};

export const surgeons: Surgeon[] = [
  {
    name: "Dr. Surindher D.S.A",
    role: "Founder & Chief Plastic Surgeon",
    creds: "MBBS, MS (General Surgery), MCh (Plastic Surgery)",
    bio: "Founder of the clinic and a board-certified plastic surgeon with more than two decades of experience. He has helped patients from over 39 countries achieve natural-looking results, and is known by his patients for one word above all: trustworthy.",
    focus: ["Face", "Breast", "Body", "Hair", "Reconstructive"],
    image: "/images/clinic/portrait-1.webp",
  },
  {
    name: "Dr. Madhusudhan V L",
    role: "Consultant Plastic Surgeon",
    creds: "MBBS, MS (General Surgery), MCh (Plastic Surgery)",
    bio: "Trained at MS Ramaiah Medical College and the highly regarded CMC Vellore, Dr. Madhusudhan brings a strong aesthetic eye to breast surgery, liposuction, rhinoplasty, tummy tuck and facial procedures.",
    focus: ["Breast", "Liposuction", "Rhinoplasty", "Facial"],
    image: "/images/surgeons/dr-madhusudhan-real.webp",
  },
  // Dr. Muddappa P.P removed pending confirmation of his current Aesthetics Plus
  // affiliation (his own listings show Manipal Hospital, Kanakpura Road).
];

export type Stat = { value: number; suffix: string; label: string; decimals?: number };

export const stats: Stat[] = [
  { value: 20, suffix: "+", label: "Years of experience" },
  { value: 20000, suffix: "+", label: "Happy patients" },
  { value: 39, suffix: "+", label: "Countries served" },
  // Official Aesthetics Plus figure (aestheticsplus.in): "99.997% Success Rate".
  { value: 99.997, suffix: "%", label: "Procedure success rate", decimals: 3 },
];

export const trustPoints = [
  "Board-certified plastic surgeons",
  "Award-winning Bangalore clinic",
  "Accredited multi-specialty hospital",
  "Patients from 39+ countries",
];

export type JourneyStep = {
  n: number;
  title: string;
  desc: string;
  icon: string;
};

export const journey: JourneyStep[] = [
  {
    n: 1,
    title: "Enquire and get your free quote",
    desc: "Tell us what you are considering. We send a clear, itemised quote in Australian dollars, usually within 48 hours, with no obligation.",
    icon: "MessageCircle",
  },
  {
    n: 2,
    title: "Online consultation with your surgeon",
    desc: "Meet your board-certified surgeon over video. Share photos, ask questions, and agree on a plan that is right for you.",
    icon: "Video",
  },
  {
    n: 3,
    title: "We plan your trip end to end",
    desc: "Flights guidance, visa letter, airport pickup, hospital and recovery stay are all coordinated for you. You only pack a bag.",
    icon: "Plane",
  },
  {
    n: 4,
    title: "Arrive in Bangalore",
    desc: "You are met at the airport and settled in. An in-person consult and pre-operative tests confirm everything before surgery.",
    icon: "MapPin",
  },
  {
    n: 5,
    title: "Your procedure and recovery",
    desc: "Surgery is performed at an accredited hospital, then you rest in comfortable, supported recovery accommodation with our team close by.",
    icon: "HeartPulse",
  },
  {
    n: 6,
    title: "Home, with aftercare that follows you",
    desc: "Fly home refreshed. Your surgeon and coordinator stay in touch with structured follow-ups so your recovery stays on track.",
    icon: "House",
  },
];

export type WhyPoint = { title: string; desc: string; icon: string };

export const whyIndia: WhyPoint[] = [
  {
    title: "Save up to 70 percent",
    desc: "The same procedure, performed by board-certified surgeons, at a fraction of the Australian price, with no compromise on safety.",
    icon: "PiggyBank",
  },
  {
    title: "Surgeons you can trust",
    desc: "Your surgery is performed by board-certified plastic surgeons at an award-winning clinic established in 2003.",
    icon: "ShieldCheck",
  },
  {
    title: "Everything coordinated",
    desc: "One team manages your quote, consults, hospital, recovery stay and transfers. No juggling, no surprises.",
    icon: "ClipboardCheck",
  },
  {
    title: "Recover like a getaway",
    desc: "Heal in calm, comfortable accommodation in Bangalore rather than rushing back to daily life too soon.",
    icon: "Palmtree",
  },
  {
    title: "No long waitlists",
    desc: "Choose dates that suit you and your surgeon, often far sooner than waiting at home.",
    icon: "CalendarCheck",
  },
  {
    title: "Privacy and discretion",
    desc: "Travel, recover and return looking refreshed, on your own terms and in complete confidence.",
    icon: "Lock",
  },
];

export type Package = {
  name: string;
  tagline: string;
  highlight?: boolean;
  includes: string[];
};

export const packages: Package[] = [
  {
    name: "Essential",
    tagline: "The surgery, fully coordinated",
    includes: [
      "Online and in-person surgeon consults",
      "Your procedure at an accredited hospital",
      "All standard pre-operative tests",
      "Airport pickup and clinic transfers",
      "Dedicated patient coordinator",
      "Structured follow-up care after you fly home",
    ],
  },
  {
    name: "Signature",
    tagline: "Surgery plus a supported recovery",
    highlight: true,
    includes: [
      "Everything in Essential",
      "Comfortable recovery accommodation",
      "Daily recovery check-ins",
      "Local transfers throughout your stay",
      "A nurse-guided recovery plan",
      "WhatsApp line to your coordinator",
    ],
  },
  {
    name: "Luxe",
    tagline: "The full restorative escape",
    includes: [
      "Everything in Signature",
      "Premium hotel recovery stay",
      "Private transfers and concierge",
      "Companion travel support",
      "Curated rest-day experiences in Bangalore",
      "Extended aftercare package",
    ],
  },
];

export const accreditation = {
  heading: "Safety is never the part we save on",
  points: [
    {
      title: "Board-certified surgeons",
      desc: "Every procedure is performed by qualified plastic surgeons with MCh or DNB credentials, not by general practitioners.",
    },
    {
      title: "Accredited hospital",
      desc: "Surgery takes place in an accredited multi-specialty hospital with modern theatres and full anaesthetic support.",
    },
    {
      title: "Award-winning clinic",
      desc: "Our partner clinic in Bangalore holds the Karnataka Healthcare Leadership Award and has served patients since 2003.",
    },
    {
      title: "Transparent pricing",
      desc: "Clear quotes in Australian dollars with no hidden charges, agreed before you travel.",
    },
  ],
};
