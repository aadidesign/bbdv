// FAQs combine the clinic's real topics with the medical-tourism questions
// Australian patients actually ask before booking.

export type Faq = { q: string; a: string; group: string };

export const faqs: Faq[] = [
  {
    group: "Safety and surgeons",
    q: "Is it safe to have cosmetic surgery in India?",
    a: "Yes. Your surgery is performed by board-certified plastic surgeons with MCh or DNB qualifications, in an accredited multi-specialty hospital with modern theatres and full anaesthetic support. Our partner clinic has operated since 2003 and has cared for patients from more than 39 countries.",
  },
  {
    group: "Safety and surgeons",
    q: "Who performs my procedure?",
    a: "A board-certified plastic surgeon, never a general practitioner. You meet your surgeon by video before you travel and in person once you arrive, so there are no surprises about who is caring for you.",
  },
  {
    group: "Safety and surgeons",
    q: "What happens if there is a complication?",
    a: "Your surgeon and our coordinators monitor your recovery closely while you are in India and after you fly home through structured follow-ups. We plan your stay so you remain in Bangalore long enough for safe early recovery before travelling.",
  },
  {
    group: "Cost and payments",
    q: "How much can I really save?",
    a: "Most patients save between 50 and 70 percent compared with Australian pricing, even after flights and accommodation. Your personalised quote in Australian dollars makes the full comparison clear.",
  },
  {
    group: "Cost and payments",
    q: "What does the quote include?",
    a: "Your itemised quote covers the procedure, surgeon and hospital fees, standard pre-operative tests, transfers and coordination. Accommodation and recovery support are included on our Signature and Luxe packages.",
  },
  {
    group: "Cost and payments",
    q: "What payment methods can I use?",
    a: "Payments can be made by card, bank transfer and other common methods. Finance and instalment options may be available. Your coordinator will walk you through the simplest approach for you.",
  },
  {
    group: "Travel and your trip",
    q: "How long do I need to stay in India?",
    a: "It depends on the procedure, usually between 7 and 21 days. Each procedure page lists a recommended stay, and your surgeon confirms the right length for safe early recovery before you fly home.",
  },
  {
    group: "Travel and your trip",
    q: "Do you help with flights, visa and accommodation?",
    a: "Yes. We guide your flights, provide a visa support letter, arrange airport pickup, transfers and recovery accommodation. You focus on getting ready, and we handle the logistics.",
  },
  {
    group: "Travel and your trip",
    q: "Can I bring a companion?",
    a: "Absolutely, and we encourage it. We can arrange companion-friendly accommodation and support so someone you trust is with you through surgery and recovery.",
  },
  {
    group: "Your results",
    q: "Will my results look natural?",
    a: "That is the goal of every plan. Our surgeons take a conservative, proportionate approach designed to look like you on your best day, never overdone.",
  },
  {
    group: "Your results",
    q: "How do I get started?",
    a: "Request a free quote or send us a WhatsApp message. We will ask a few questions, share an indicative quote, and arrange a no-obligation online consultation with a surgeon.",
  },
];

export const faqGroups = [
  "Safety and surgeons",
  "Cost and payments",
  "Travel and your trip",
  "Your results",
];
