// Real before and after results supplied by the partner clinic (Aesthetics
// Plus, Bangalore). Each image is a single before/after composite. The
// `procedure` label is verified against the photo so cards read accurately.
// Curated to the clearest images and to cover the main face procedures.

export type BeforeAfter = { src: string; procedure: string };

export const beforeAfters: BeforeAfter[] = [
  { src: "ba-6", procedure: "Neck Lift" },
  { src: "ba-8", procedure: "Rhinoplasty" },
  { src: "ba-1", procedure: "Facelift" },
  { src: "ba-5", procedure: "Temporal Brow Lift" },
  { src: "ba-11", procedure: "Otoplasty" },
  { src: "ba-9", procedure: "Neck Lift" },
  { src: "ba-10", procedure: "Rhinoplasty" },
  { src: "ba-4", procedure: "Otoplasty" },
  { src: "ba-2", procedure: "Facelift" },
];
