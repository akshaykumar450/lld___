// Valentine Week Configuration
// Easy to customize dates, text, and images

export interface DayConfig {
  id: string;
  date: string; // Format: "2025-02-07"
  name: string;
  emoji: string;
  theme: string;
  tagline: string;
  color: string;
  route: string;
}

// For testing: Set dates to past dates so all days are unlocked
// For production: Update these to actual Valentine Week dates
export const valentineWeekConfig: DayConfig[] = [
  {
    id: "rose-day",
    date: "2025-02-07", // Feb 7 - Rose Day
    name: "Rose Day",
    emoji: "🌹",
    theme: "Magical & Aesthetic",
    tagline: "Every rose reminds me of you",
    color: "rose",
    route: "/day/rose",
  },
  {
    id: "propose-day",
    date: "2025-02-08", // Feb 8 - Propose Day
    name: "Propose Day",
    emoji: "💍",
    theme: "Emotional & Climactic",
    tagline: "Will you be mine?",
    color: "gold",
    route: "/day/propose",
  },
  {
    id: "chocolate-day",
    date: "2025-02-09", // Feb 9 - Chocolate Day
    name: "Chocolate Day",
    emoji: "🍫",
    theme: "Fun & Interactive",
    tagline: "Life is sweet with you",
    color: "chocolate",
    route: "/day/chocolate",
  },
  {
    id: "teddy-day",
    date: "2025-02-10", // Feb 10 - Teddy Day
    name: "Teddy Day",
    emoji: "🧸",
    theme: "Cute Overload",
    tagline: "Soft hugs, warm hearts",
    color: "blush",
    route: "/day/teddy",
  },
  {
    id: "promise-day",
    date: "2025-02-11", // Feb 11 - Promise Day
    name: "Promise Day",
    emoji: "🤝",
    theme: "Emotional & Elegant",
    tagline: "A promise from my heart",
    color: "lavender",
    route: "/day/promise",
  },
  {
    id: "kiss-day",
    date: "2025-02-12", // Feb 12 - Kiss Day
    name: "Kiss Day",
    emoji: "💋",
    theme: "Playful Mystery",
    tagline: "Sealed with a kiss",
    color: "primary",
    route: "/day/kiss",
  },
  {
    id: "hug-day",
    date: "2025-02-13", // Feb 13 - Hug Day
    name: "Hug Day",
    emoji: "🤗",
    theme: "Warm & Comforting",
    tagline: "In your arms is my favorite place",
    color: "cream",
    route: "/day/hug",
  },
  {
    id: "valentines-day",
    date: "2025-02-14", // Feb 14 - Valentine's Day
    name: "Valentine's Day",
    emoji: "❤️",
    theme: "Grand Finale",
    tagline: "Happy Valentine's Day",
    color: "rose-deep",
    route: "/day/valentine",
  },
];

// Site content configuration
export const siteConfig = {
  title: "7 Days, 7 Feelings, 1 Love",
  subtitle: "A journey through Valentine Week",
  lockedMessage: "This page unlocks on",
  partnerName: "Babydoll", // Customize with your partner's name
};

// Image placeholders - replace with your own images
export const imageConfig = {
  couplePhotos: [
    "/images/rose-slide-1.jpg",
    "/images/rose-slide-2.jpg",
    "/images/rose-slide-3.jpg",
    "/images/rose-slide-4.jpg",
  ],
  proposeDayPhotos: [
    "/images/propose-day-1.jpg",
    "/images/propose-day-2.jpg",
    "/images/propose-day-3.jpg",
    "/images/propose-day-4.jpg",
  ],
  kissDayPhotos: [
    "/images/kiss-day-1.jpg",
    "/images/kiss-day-2.jpg",
    "/images/kiss-day-3.jpg",
    "/images/kiss-day-4.jpg",
    "/images/kiss-day-5.jpg",
  ],
  valentineDayPhotos: [
    "/images/valentine-slide-1.jpg",
    "/images/valentine-slide-2.jpg",
    "/images/valentine-slide-3.jpg",
    "/images/valentine-slide-4.jpg",
    "/images/valentine-slide-5.jpg",
    "/images/valentine-slide-6.jpg",
    "/images/valentine-slide-7.jpg",
    "/images/valentine-slide-8.jpg",
    "/images/valentine-slide-9.jpg",
    "/images/valentine-slide-10.jpg",
    "/images/valentine-slide-11.jpg",
    "/images/valentine-slide-12.jpg",
    "/images/valentine-slide-13.jpg",
    "/images/valentine-slide-14.jpg",
    "/images/valentine-slide-15.jpg",
    "/images/valentine-slide-16.jpg",
    "/images/valentine-slide-17.jpg",
    "/images/valentine-slide-18.jpg",
    "/images/valentine-slide-19.jpg",
    "/images/valentine-slide-20.jpg",
  ],
  proposalImage: "/placeholder.svg",
  kissImage: "/placeholder.svg",
  valentineVideo: "", // Add your video URL here
};

// Helper function to check if a day is unlocked
export const isDayUnlocked = (dateStr: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayDate = new Date(dateStr);
  dayDate.setHours(0, 0, 0, 0);

  return today >= dayDate;
};

// Password Configuration
export const passwordConfig: Record<string, { password: string; riddle: string }> = {
  "rose-day": { password: "red", riddle: "What comes in red and speaks of love?" },
  "propose-day": { password: "yes", riddle: "The only answer I want to hear..." },
  "chocolate-day": { password: "sweetie", riddle: "Sweeter than silk, but you're sweeter still." },
  "teddy-day": { password: "hugme", riddle: "Soft, fuzzy, and loves to be held." },
  "promise-day": { password: "forever", riddle: "A word that binds us beyond time." },
  "kiss-day": { password: "muah", riddle: "The sound of a sweet seal." },
  "hug-day": { password: "warmth", riddle: "The best mechanic to fix a bad day." },
  "valentines-day": { password: "babydoll", riddle: "The name of my favorite person." },
};

// Get current unlocked day
export const getCurrentDay = (): DayConfig | null => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return valentineWeekConfig.find(day => {
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);
    return dayDate.getTime() === today.getTime();
  }) || null;
};

// Format date for display
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};
