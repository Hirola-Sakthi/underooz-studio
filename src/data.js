// Generated imagery is kept local. Change these keys to swap assets per section.
export const image = (name) => `${import.meta.env.BASE_URL}images/${name}.jpg`;
export const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const services = [
  {
    id: "ads",
    image: image("studio"),
    title: "Advertisement & Shoots",
    blurb: "Films and stills built to stop the scroll and sell the product.",
    items: [
      "Commercial ads",
      "Product photography",
      "Brand films",
      "Promotional & corporate videos",
      "Reels & social content",
    ],
  },
  {
    id: "digital",
    image: image("marketing"),
    title: "Digital Marketing",
    blurb:
      "Strategy, design and distribution that carry the story to the right audience.",
    items: [
      "Social media",
      "Creative design",
      "Content creation",
      "Branding",
      "Digital advertising",
    ],
  },
];
export const projects = [
  { t: "Obsidian Watch Film", c: "Brand Film", y: 2026, image: image("watch"), position: "60% center" },
  { t: "Maison Aurum Campaign", c: "Commercial Ad", y: 2026, image: image("aurum"), position: "30% center" },
  { t: "Atlas Corporate Story", c: "Corporate Video", y: 2025, image: image("corporate"), position: "60% center" },
  { t: "Saffron Table Reels", c: "Social Content", y: 2025, image: image("food"), position: "60% center" },
  { t: "Noir Fragrance Stills", c: "Product Photography", y: 2025, image: image("fragrance"), position: "60% center" },
  { t: "Summit Launch Ads", c: "Digital Advertising", y: 2024, image: image("summit"), position: "60% center" },
];
export const posts = [
  {
    t: "How to storyboard a 30-second commercial",
    c: "Production",
    d: "12 Oct 2026",
    image: image("planning"),
  },
  {
    t: "Lighting luxury products: a practical guide",
    c: "Photography",
    d: "28 Sep 2026",
    image: image("lighting"),
  },
  {
    t: "Why brand films outperform static ads",
    c: "Strategy",
    d: "09 Sep 2026",
    image: image("studio"),
  },
  {
    t: "Shooting vertical video without losing cinema",
    c: "Social",
    d: "21 Aug 2026",
    image: image("social"),
  },
  {
    t: "Colour grading for a consistent brand look",
    c: "Post-production",
    d: "02 Aug 2026",
    image: image("editing"),
  },
  {
    t: "Planning a month of reels in one shoot day",
    c: "Marketing",
    d: "14 Jul 2026",
    image: image("marketing"),
  },
];
export const faqs = [
  [
    "What does UNDEROOZ STUDIO do?",
    "We are a creative production studio. We shoot and edit commercial ads, brand films, product photography, corporate videos and social content, and we run digital marketing around them.",
  ],
  [
    "How long does a typical project take?",
    "A reel or product shoot usually takes 1 to 2 weeks. A brand film takes 4 to 8 weeks from concept to final delivery.",
  ],
  [
    "Do you work with clients outside your city?",
    "Yes. We travel for shoots and manage remote reviews, so clients anywhere can work with us.",
  ],
  [
    "How is pricing decided?",
    "Pricing depends on scope, crew, locations and deliverables. Send a brief and we will reply with a clear quote within two working days.",
  ],
  [
    "Can you handle both the shoot and the marketing?",
    "Yes. One team plans, shoots, edits and publishes, so your visuals and your campaign stay consistent.",
  ],
  [
    "What do I receive at the end?",
    "Final edits in the formats you need, colour-graded masters, cut-downs for social and, if agreed, project files.",
  ],
];
