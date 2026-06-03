// Real videos from the Aesthetics Plus YouTube channel (the India clinic).
// IDs scraped from the clinic site; titles kept descriptive and neutral.

export type Video = { id: string; title: string };

export const videos: Video[] = [
  { id: "y3Ex2gwqN94", title: "Inside the clinic" },
  { id: "2Ot7Knwvgv4", title: "A patient's experience" },
  { id: "Yozy8xUri1I", title: "Meet the surgeons" },
  { id: "hqJFfrmpSig", title: "Understanding your procedure" },
  { id: "iWB4TsTnu80", title: "Recovery and aftercare" },
  { id: "nZqJ290GfXs", title: "Results that look natural" },
  { id: "eGSbyANbRUE", title: "Your questions answered" },
];

export const youtubeChannel = "https://www.youtube.com/channel/UC6wUAraGMCzAqAbqpMO7CtA";

export const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const watch = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const embed = (id: string) => `https://www.youtube.com/embed/${id}`;
