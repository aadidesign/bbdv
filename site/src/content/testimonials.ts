// Real patient testimonials from the Aesthetics Plus clinic (the India surgical
// partner). Lightly tidied for length; names as published.

export type Testimonial = {
  name: string;
  location?: string;
  procedure?: string;
  rating: number;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "S Aarch",
    procedure: "Facial procedure",
    rating: 5,
    quote:
      "Wonderful experience. The surgeon not only explained the entire procedure but ensured I had a smooth prep, surgery and follow-up. It is rare to find a doctor who combines such personal care with outstanding medical quality. I am so glad I chose them and would highly recommend.",
  },
  {
    name: "Amrita Pal",
    procedure: "Cosmetic surgery",
    rating: 5,
    quote:
      "It was a great experience to be treated here. The service, doctors, helpers and environment were friendly and comfortable. This treatment has changed my life for the better. I would recommend you all to give it a try and see how they change your life too.",
  },
  {
    name: "Soumya N",
    procedure: "Procedure I had postponed for years",
    rating: 5,
    quote:
      "I had been contemplating this for a very long time. The surgeon made me extremely comfortable and explained everything in detail, which gave me the confidence to go ahead. The procedure went well with no pain at all, and the follow-up was brilliant. Highly recommended.",
  },
  {
    name: "Su Raj",
    procedure: "Mummy makeover and hair transplant",
    rating: 5,
    quote:
      "Neat, clean and courteous staff. The doctor was knowledgeable, gave us all the facts and never pushed any procedure. I had a tummy tuck and breast lift and my husband had a hair transplant. Very happy with the result. Thank you to the whole team.",
  },
  {
    name: "Surya D",
    procedure: "Hair transplant and gynecomastia",
    rating: 5,
    quote:
      "I had surgery elsewhere before with scarring and a difficult recovery, which was corrected very well here, no drains and no pain at all. I then had FUE done as well. Very happy and will recommend to everyone. Thank you.",
  },
  {
    name: "Anindita Sarkar",
    procedure: "Surgical and non-surgical care",
    rating: 5,
    quote:
      "I have known this surgeon for many years. I like his approachability and the precision of his work, whether invasive or non-invasive, big or small. I would highly recommend him for any cosmetic or aesthetic work.",
  },
  {
    name: "Ridhimaa M",
    procedure: "Skin treatment",
    rating: 5,
    quote:
      "My skin felt very smooth and brighter after the procedure. I had a really comfortable experience at the clinic and the doctor was very patient in answering all my frequent follow-up questions.",
  },
];

export const reviewSummary = { rating: 5, count: 175, source: "patient reviews" };
