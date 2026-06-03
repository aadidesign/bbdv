// Procedure catalogue. Clinical detail mirrors the per-procedure template seen
// on the reference sites. Prices are indicative AUD estimates for planning only,
// confirmed after consultation. Savings are vs typical Australian pricing.

export type CategorySlug = "face" | "breast" | "body" | "men" | "nonsurgical";

export type Category = {
  slug: CategorySlug;
  label: string;
  title: string;
  blurb: string;
  icon: string; // lucide icon name
  image: string;
};

export const categories: Category[] = [
  {
    slug: "face",
    label: "Face",
    title: "Facial Aesthetics",
    blurb:
      "Refine and refresh your features with surgery designed to look like you on your best day, never overdone.",
    icon: "Sparkles",
    image: "/images/clinic/face-treatment.jpg",
  },
  {
    slug: "breast",
    label: "Breast",
    title: "Breast Surgery",
    blurb:
      "Augmentation, lift, reduction and reconstruction, shaped around your body and the result you have in mind.",
    icon: "Heart",
    image: "/images/clinic/breast-consult.jpg",
  },
  {
    slug: "body",
    label: "Body",
    title: "Body Contouring",
    blurb:
      "Reshape and tighten after weight change or pregnancy with liposuction, tummy tuck and lift procedures.",
    icon: "Activity",
    image: "/images/clinic/body-injection.jpg",
  },
  {
    slug: "men",
    label: "Men",
    title: "Procedures for Men",
    blurb:
      "Discreet, natural results for men, from hair restoration to gynecomastia correction and high-definition sculpting.",
    icon: "User",
    image: "/images/clinic/men-treatment.jpg",
  },
  {
    slug: "nonsurgical",
    label: "Non-surgical",
    title: "Non-surgical Treatments",
    blurb:
      "Refresh without downtime using injectables, fillers, PRP and thread lifts performed by specialist hands.",
    icon: "Droplet",
    image: "/images/clinic/injectable.jpg",
  },
];

export type Procedure = {
  slug: string;
  name: string;
  category: CategorySlug;
  commonName: string;
  tagline: string;
  shortDesc: string;
  overview: string;
  benefits: string[];
  anaesthetic: string;
  duration: string;
  hospitalStay: string;
  recovery: string;
  stayInIndia: string;
  fromAUD: number;
  auFromAUD: number; // typical Australian price for the savings comparison
  popular?: boolean;
  image: string;
};

export const procedures: Procedure[] = [
  // ---------------- FACE ----------------
  {
    slug: "rhinoplasty",
    name: "Rhinoplasty",
    category: "face",
    commonName: "Nose reshaping",
    tagline: "Balance and breathe easier",
    shortDesc: "Reshape the nose for a profile that suits your face and, where needed, improves breathing.",
    overview:
      "Rhinoplasty refines the size, shape and proportion of the nose so it sits in harmony with the rest of your face. Our surgeons take a conservative, natural approach and can also correct breathing issues at the same time.",
    benefits: ["Natural, balanced profile", "Improved breathing if needed", "Refined tip and bridge", "Permanent result"],
    anaesthetic: "General anaesthetic",
    duration: "2 to 3 hours",
    hospitalStay: "Day care, usually same-day discharge",
    recovery: "Splint for 1 week, social recovery 10 to 14 days",
    stayInIndia: "10 to 14 days recommended",
    fromAUD: 4200,
    auFromAUD: 15000,
    popular: true,
    image: "/images/procedures/rhinoplasty.jpg",
  },
  {
    slug: "facelift",
    name: "Facelift",
    category: "face",
    commonName: "Rhytidectomy",
    tagline: "Turn back the clock, gently",
    shortDesc: "Lift and firm sagging skin around the cheeks, jawline and neck for a rested, younger look.",
    overview:
      "A facelift addresses loose skin and deeper tissue laxity in the lower face and neck. The goal is a refreshed, natural result that softens the signs of ageing without changing who you are.",
    benefits: ["Firmer jawline and cheeks", "Smoother neck", "Long-lasting result", "Customised to your anatomy"],
    anaesthetic: "General anaesthetic",
    duration: "3 to 5 hours",
    hospitalStay: "1 night",
    recovery: "Social recovery 2 to 3 weeks",
    stayInIndia: "14 to 21 days recommended",
    fromAUD: 6500,
    auFromAUD: 30000,
    popular: true,
    image: "/images/procedures/facelift-2.jpg",
  },
  {
    slug: "eyelid-surgery",
    name: "Eyelid Surgery",
    category: "face",
    commonName: "Blepharoplasty",
    tagline: "Open up a tired gaze",
    shortDesc: "Remove excess skin and puffiness from upper or lower lids for brighter, more awake eyes.",
    overview:
      "Blepharoplasty rejuvenates the upper and lower eyelids by removing surplus skin and repositioning fat. It is one of the most effective ways to look less tired while keeping your natural expression.",
    benefits: ["Brighter, more open eyes", "Reduced puffiness", "Subtle, natural change", "Quick recovery"],
    anaesthetic: "Local with sedation or general",
    duration: "1 to 2 hours",
    hospitalStay: "Day care",
    recovery: "Social recovery 7 to 10 days",
    stayInIndia: "7 to 10 days recommended",
    fromAUD: 2800,
    auFromAUD: 9000,
    image: "/images/procedures/eyelid-surgery-2.jpg",
  },
  {
    slug: "neck-lift",
    name: "Neck Lift",
    category: "face",
    commonName: "Lower rhytidectomy",
    tagline: "Define your profile",
    shortDesc: "Tighten loose neck skin and banding for a smoother, more defined neckline.",
    overview:
      "A neck lift removes excess skin and tightens the muscle beneath to restore a clean, youthful neckline. It pairs beautifully with a facelift for a complete lower-face result.",
    benefits: ["Defined neckline", "Reduced banding and jowls", "Natural contour", "Long-lasting"],
    anaesthetic: "General anaesthetic",
    duration: "2 to 3 hours",
    hospitalStay: "1 night",
    recovery: "Social recovery 2 weeks",
    stayInIndia: "14 days recommended",
    fromAUD: 5200,
    auFromAUD: 18000,
    image: "/images/procedures/neck-lift.jpg",
  },
  {
    slug: "chin-augmentation",
    name: "Chin Augmentation",
    category: "face",
    commonName: "Genioplasty",
    tagline: "Strengthen your profile",
    shortDesc: "Add balance and definition to a receding or weak chin with an implant or reshaping.",
    overview:
      "Chin augmentation improves facial balance by enhancing a weak or receding chin. The result is a stronger profile that complements the nose and jaw.",
    benefits: ["Balanced profile", "Stronger jawline", "Subtle, permanent result", "Pairs well with rhinoplasty"],
    anaesthetic: "General or local with sedation",
    duration: "1 to 2 hours",
    hospitalStay: "Day care",
    recovery: "Social recovery 7 to 10 days",
    stayInIndia: "7 to 10 days recommended",
    fromAUD: 3200,
    auFromAUD: 9000,
    image: "/images/procedures/chin-augmentation-2.jpg",
  },
  {
    slug: "otoplasty",
    name: "Ear Surgery",
    category: "face",
    commonName: "Otoplasty",
    tagline: "Confidence, pinned back",
    shortDesc: "Reshape or reposition prominent ears for a natural, proportioned look.",
    overview:
      "Otoplasty corrects prominent or misshapen ears by reshaping the cartilage and bringing the ears closer to the head. It is a popular, confidence-building procedure for adults and teens.",
    benefits: ["Natural ear position", "Improved symmetry", "Permanent result", "Quick recovery"],
    anaesthetic: "Local with sedation or general",
    duration: "1 to 2 hours",
    hospitalStay: "Day care",
    recovery: "Headband for 1 week, social recovery 7 days",
    stayInIndia: "7 days recommended",
    fromAUD: 2600,
    auFromAUD: 8000,
    image: "/images/procedures/otoplasty-2.jpg",
  },

  // ---------------- BREAST ----------------
  {
    slug: "breast-augmentation",
    name: "Breast Augmentation",
    category: "breast",
    commonName: "Breast implants",
    tagline: "Shape and balance, your way",
    shortDesc: "Enhance breast size and shape with implants chosen to suit your frame and goals.",
    overview:
      "Breast augmentation increases volume and improves shape using implants selected for your body and the look you want. Our surgeons focus on proportion and a natural feel.",
    benefits: ["Fuller, balanced shape", "Implant options to suit you", "Natural movement and feel", "Long-lasting result"],
    anaesthetic: "General anaesthetic",
    duration: "1.5 to 2 hours",
    hospitalStay: "1 night",
    recovery: "Social recovery 1 to 2 weeks",
    stayInIndia: "10 to 14 days recommended",
    fromAUD: 5200,
    auFromAUD: 16000,
    popular: true,
    image: "/images/procedures/breast-augmentation-4.jpg",
  },
  {
    slug: "breast-lift",
    name: "Breast Lift",
    category: "breast",
    commonName: "Mastopexy",
    tagline: "Lift and restore",
    shortDesc: "Raise and reshape breasts that have changed with time, pregnancy or weight loss.",
    overview:
      "A breast lift removes excess skin and reshapes the breast to a higher, firmer position. It can be combined with implants for added volume where wanted.",
    benefits: ["Firmer, higher position", "Reshaped contour", "Repositioned nipple", "Can combine with implants"],
    anaesthetic: "General anaesthetic",
    duration: "2 to 3 hours",
    hospitalStay: "1 night",
    recovery: "Social recovery 2 weeks",
    stayInIndia: "12 to 14 days recommended",
    fromAUD: 5800,
    auFromAUD: 18000,
    image: "/images/procedures/breast-lift-4.jpg",
  },
  {
    slug: "breast-reduction",
    name: "Breast Reduction",
    category: "breast",
    commonName: "Reduction mammoplasty",
    tagline: "Relief and proportion",
    shortDesc: "Reduce breast size to ease back and neck strain and restore comfortable proportion.",
    overview:
      "Breast reduction removes excess tissue and skin to relieve physical discomfort and create a lighter, better-proportioned shape. Many patients find both physical relief and renewed confidence.",
    benefits: ["Relief from back and neck pain", "Better proportion", "Easier movement and exercise", "Reshaped, lifted result"],
    anaesthetic: "General anaesthetic",
    duration: "2 to 4 hours",
    hospitalStay: "1 night",
    recovery: "Social recovery 2 to 3 weeks",
    stayInIndia: "14 days recommended",
    fromAUD: 6200,
    auFromAUD: 20000,
    image: "/images/procedures/breast-reduction-4.jpg",
  },

  // ---------------- BODY ----------------
  {
    slug: "liposuction",
    name: "Liposuction",
    category: "body",
    commonName: "Lipo",
    tagline: "Sculpt stubborn areas",
    shortDesc: "Remove stubborn fat that resists diet and exercise to refine your contours.",
    overview:
      "Liposuction precisely removes localised fat from areas such as the abdomen, flanks, thighs and arms. It is about shape and proportion, sculpting contours that training alone cannot reach.",
    benefits: ["Targeted fat removal", "Refined contours", "Smoother proportions", "Long-lasting with stable weight"],
    anaesthetic: "General or local with sedation",
    duration: "1 to 3 hours",
    hospitalStay: "Day care or 1 night",
    recovery: "Compression garment, social recovery 1 to 2 weeks",
    stayInIndia: "10 to 14 days recommended",
    fromAUD: 3500,
    auFromAUD: 12000,
    popular: true,
    image: "/images/procedures/liposuction.jpg",
  },
  {
    slug: "tummy-tuck",
    name: "Tummy Tuck",
    category: "body",
    commonName: "Abdominoplasty",
    tagline: "A flatter, firmer middle",
    shortDesc: "Remove loose skin and tighten abdominal muscles after pregnancy or weight loss.",
    overview:
      "A tummy tuck removes excess skin and fat and repairs separated abdominal muscles for a flatter, firmer midsection. It is a transformative procedure after pregnancy or major weight loss.",
    benefits: ["Flatter abdomen", "Repaired muscle separation", "Removed loose skin", "Improved core support"],
    anaesthetic: "General anaesthetic",
    duration: "2 to 4 hours",
    hospitalStay: "1 to 2 nights",
    recovery: "Social recovery 3 to 4 weeks",
    stayInIndia: "14 to 21 days recommended",
    fromAUD: 5500,
    auFromAUD: 20000,
    popular: true,
    image: "/images/procedures/tummy-tuck.jpg",
  },
  {
    slug: "brazilian-butt-lift",
    name: "Brazilian Butt Lift",
    category: "body",
    commonName: "BBL",
    tagline: "Lift and shape, naturally",
    shortDesc: "Use your own fat to add volume and shape to the buttocks for a natural curve.",
    overview:
      "A Brazilian butt lift transfers your own purified fat to enhance the shape and projection of the buttocks. Because it uses your own tissue, the result looks and feels natural.",
    benefits: ["Natural shape from your own fat", "Slimmer donor areas too", "Improved proportion", "No implants required"],
    anaesthetic: "General anaesthetic",
    duration: "3 to 4 hours",
    hospitalStay: "1 night",
    recovery: "Limited sitting 2 to 3 weeks, social recovery 2 weeks",
    stayInIndia: "14 days recommended",
    fromAUD: 6200,
    auFromAUD: 18000,
    image: "/images/procedures/brazilian-butt-lift-2.jpg",
  },
  {
    slug: "arm-lift",
    name: "Arm Lift",
    category: "body",
    commonName: "Brachioplasty",
    tagline: "Tone and tighten",
    shortDesc: "Remove loose skin from the upper arms for a firmer, smoother contour.",
    overview:
      "An arm lift removes excess skin and fat from the upper arms, often after weight loss, to reveal a firmer, more toned contour.",
    benefits: ["Firmer upper arms", "Removed loose skin", "Smoother contour", "Confidence in sleeveless clothing"],
    anaesthetic: "General anaesthetic",
    duration: "2 to 3 hours",
    hospitalStay: "1 night",
    recovery: "Social recovery 2 weeks",
    stayInIndia: "12 to 14 days recommended",
    fromAUD: 3800,
    auFromAUD: 12000,
    image: "/images/procedures/arm-lift-2.jpg",
  },
  {
    slug: "mummy-makeover",
    name: "Mummy Makeover",
    category: "body",
    commonName: "Combined body restoration",
    tagline: "Restore what motherhood changed",
    shortDesc: "A tailored combination, often tummy tuck plus breast surgery, to restore your pre-pregnancy shape.",
    overview:
      "A mummy makeover combines procedures such as a tummy tuck, breast lift or augmentation, and liposuction into one coordinated plan. Combining surgery means one recovery and one trip.",
    benefits: ["Personalised combination", "One recovery period", "Comprehensive result", "Cost-effective as a package"],
    anaesthetic: "General anaesthetic",
    duration: "4 to 6 hours",
    hospitalStay: "2 nights",
    recovery: "Social recovery 4 weeks",
    stayInIndia: "21 days recommended",
    fromAUD: 9500,
    auFromAUD: 35000,
    popular: true,
    image: "/images/procedures/mummy-makeover.jpg",
  },

  // ---------------- MEN ----------------
  {
    slug: "fue-hair-transplant",
    name: "FUE Hair Transplant",
    category: "men",
    commonName: "Follicular unit extraction",
    tagline: "Restore your hairline",
    shortDesc: "Move your own follicles to restore a natural, permanent hairline with no linear scar.",
    overview:
      "FUE hair transplantation relocates your own hair follicles to thinning or balding areas, one graft at a time, for a natural and permanent result with no linear scar.",
    benefits: ["Natural, permanent result", "No linear scar", "Your own hair", "Minimal downtime"],
    anaesthetic: "Local anaesthetic",
    duration: "4 to 8 hours",
    hospitalStay: "Day care",
    recovery: "Social recovery 7 to 10 days",
    stayInIndia: "5 to 7 days recommended",
    fromAUD: 2500,
    auFromAUD: 15000,
    popular: true,
    image: "/images/procedures/fue-hair-transplant-2.jpg",
  },
  {
    slug: "gynecomastia",
    name: "Gynecomastia Surgery",
    category: "men",
    commonName: "Male chest reduction",
    tagline: "A flatter, firmer chest",
    shortDesc: "Remove excess breast tissue and fat for a flatter, more masculine chest contour.",
    overview:
      "Gynecomastia surgery treats enlarged male breast tissue with liposuction and gland removal to create a flatter, firmer chest. It is one of the most requested procedures for men.",
    benefits: ["Flatter chest contour", "Removed glandular tissue", "Confidence without a shirt", "Long-lasting result"],
    anaesthetic: "General or local with sedation",
    duration: "1.5 to 2.5 hours",
    hospitalStay: "Day care or 1 night",
    recovery: "Compression vest, social recovery 1 to 2 weeks",
    stayInIndia: "7 to 10 days recommended",
    fromAUD: 3200,
    auFromAUD: 11000,
    image: "/images/procedures/gynecomastia.jpg",
  },
  {
    slug: "hi-def-liposuction",
    name: "Hi-Definition Liposuction",
    category: "men",
    commonName: "6-pack sculpting",
    tagline: "Sculpted, athletic definition",
    shortDesc: "Advanced liposuction that etches athletic definition into the abdomen and torso.",
    overview:
      "High-definition liposuction sculpts the abdomen and torso to reveal athletic definition by removing fat around the muscle lines. It suits men already close to their goal shape.",
    benefits: ["Athletic definition", "Sculpted torso", "Targeted, artistic technique", "Long-lasting with training"],
    anaesthetic: "General anaesthetic",
    duration: "2 to 4 hours",
    hospitalStay: "1 night",
    recovery: "Compression garment, social recovery 2 weeks",
    stayInIndia: "12 to 14 days recommended",
    fromAUD: 4500,
    auFromAUD: 16000,
    image: "/images/procedures/hi-def-liposuction-2.jpg",
  },

  // ---------------- NON-SURGICAL ----------------
  {
    slug: "dermal-fillers",
    name: "Dermal Fillers",
    category: "nonsurgical",
    commonName: "Facial fillers",
    tagline: "Restore volume in minutes",
    shortDesc: "Smooth lines and restore lost volume to cheeks, lips and folds with no downtime.",
    overview:
      "Dermal fillers restore lost volume and smooth folds for a refreshed look with immediate results and no downtime. A subtle, in-clinic treatment performed by specialists.",
    benefits: ["Immediate results", "No downtime", "Natural volume", "Tailored to your face"],
    anaesthetic: "Topical numbing",
    duration: "30 to 45 minutes",
    hospitalStay: "Walk in, walk out",
    recovery: "None to minimal",
    stayInIndia: "Same day",
    fromAUD: 350,
    auFromAUD: 900,
    image: "/images/procedures/dermal-fillers.jpg",
  },
  {
    slug: "anti-wrinkle",
    name: "Anti-Wrinkle Injections",
    category: "nonsurgical",
    commonName: "Botox",
    tagline: "Soften lines, keep expression",
    shortDesc: "Relax the muscles behind frown lines and crow's feet for a smoother, rested look.",
    overview:
      "Anti-wrinkle injections soften dynamic lines on the forehead, between the brows and around the eyes while keeping your natural expression. A quick, popular refresh.",
    benefits: ["Smoother forehead and eyes", "Natural expression kept", "Fast, in-clinic", "No downtime"],
    anaesthetic: "None required",
    duration: "15 to 30 minutes",
    hospitalStay: "Walk in, walk out",
    recovery: "None",
    stayInIndia: "Same day",
    fromAUD: 250,
    auFromAUD: 600,
    image: "/images/procedures/anti-wrinkle.jpg",
  },
  {
    slug: "prp-treatment",
    name: "PRP Treatment",
    category: "nonsurgical",
    commonName: "Platelet-rich plasma",
    tagline: "Your own renewal",
    shortDesc: "Use your own platelet-rich plasma to rejuvenate skin or support hair growth.",
    overview:
      "PRP uses growth factors from your own blood to stimulate skin renewal and support hair growth. A natural, regenerative treatment with minimal downtime.",
    benefits: ["Uses your own plasma", "Skin and hair benefits", "Natural, regenerative", "Minimal downtime"],
    anaesthetic: "Topical numbing",
    duration: "45 to 60 minutes",
    hospitalStay: "Walk in, walk out",
    recovery: "Minimal",
    stayInIndia: "Same day",
    fromAUD: 300,
    auFromAUD: 800,
    image: "/images/procedures/prp-treatment.jpg",
  },
  {
    slug: "fat-transfer",
    name: "Fat Transfer",
    category: "nonsurgical",
    commonName: "Autologous fat grafting",
    tagline: "Refine with your own fat",
    shortDesc: "Move fat from one area to add natural volume to the face, breasts or buttocks.",
    overview:
      "Fat transfer harvests fat from one area through gentle liposuction and reinjects it where volume is wanted, such as the face, breasts or buttocks, for a natural result.",
    benefits: ["Natural result from your own fat", "Slims the donor area", "No implants", "Soft, natural feel"],
    anaesthetic: "General or local with sedation",
    duration: "2 to 3 hours",
    hospitalStay: "Day care",
    recovery: "Social recovery 1 to 2 weeks",
    stayInIndia: "10 days recommended",
    fromAUD: 3500,
    auFromAUD: 11000,
    image: "/images/procedures/fat-transfer-2.jpg",
  },
];

// ---- helpers ----
export function savingsPct(p: Procedure): number {
  return Math.round(((p.auFromAUD - p.fromAUD) / p.auFromAUD) * 100);
}
export function getProcedure(slug: string) {
  return procedures.find((p) => p.slug === slug);
}
export function proceduresByCategory(cat: CategorySlug) {
  return procedures.filter((p) => p.category === cat);
}
export function popularProcedures() {
  return procedures.filter((p) => p.popular);
}
export function getCategory(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug)!;
}
export const formatAUD = (n: number) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
