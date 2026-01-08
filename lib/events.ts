// ===========================================
// EVENTS DATA - Easy to update
// ===========================================
// To add a new event, add an object to the events array below
// All fields are required except: sponsors, videoUrl, gallery

export interface Sponsor {
  name: string;
  logo?: string;
  website?: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
}

export interface EventType {
  id: string;
  title: string;
  subtitle: string;
  tamilTitle?: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  venue?: string;
  address?: string;
  description: string;
  longDescription?: string;
  image: string;
  featured?: boolean;
  status: "upcoming" | "ongoing" | "completed";
  registrationOpen?: boolean;
  registrationLink?: string;
  ticketPrice?: string;
  sponsors?: Sponsor[];
  videoUrl?: string;
  gallery?: string[];
  highlights?: string[];
  schedule?: { time: string; activity: string }[];
  organizer?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export const events: EventType[] = [
  {
    id: "pongal-2026",
    title: "Pongal Celebration",
    subtitle: "Harvest Festival",
    tamilTitle: "பொங்கல் திருநாள்",
    date: "February 7, 2026",
    time: "2:30 PM",
    endTime: "9:00 PM",
    location: "Brisbane",
    venue: "New Farm Park",
    address: "1042 Brunswick Street, New Farm, QLD 4005",
    description: "Celebrate the harvest festival with traditional food, music, and cultural performances.",
    longDescription: `Join Queensland Tamil Mandram for our grand Pongal Celebration 2026!

Pongal is one of the most important Tamil festivals, celebrating the harvest season and thanking the Sun God for agricultural abundance. This four-day festival marks the beginning of the Tamil month Thai and is celebrated with great enthusiasm.

Our celebration will feature:
- Traditional Pongal cooking demonstration
- Classical and folk dance performances
- Live music by local Tamil artists
- Traditional games and activities for children
- Authentic Tamil cuisine
- Cultural exhibitions

Come dressed in traditional attire and be part of this vibrant celebration of Tamil culture!`,
    image: "/pongal_coverpage.png",
    featured: true,
    status: "upcoming",
    registrationOpen: true,
    ticketPrice: "Free Entry",
    highlights: [
      "Traditional Pongal cooking with clay pots",
      "Bharatanatyam & folk dance performances",
      "Live Carnatic music",
      "Kids activities and games",
      "Traditional food stalls",
      "Cultural exhibitions"
    ],
    schedule: [
      { time: "2:30 PM", activity: "Gates Open & Welcome" },
      { time: "3:00 PM", activity: "Traditional Pongal Cooking Ceremony" },
      { time: "4:00 PM", activity: "Cultural Performances Begin" },
      { time: "5:30 PM", activity: "Dinner Break - Food Stalls Open" },
      { time: "6:30 PM", activity: "Kids Activities & Games" },
      { time: "7:30 PM", activity: "Main Stage Performances" },
      { time: "9:00 PM", activity: "Closing Ceremony" },
    ],
    sponsors: [
      { name: "Air My Cart", tier: "gold", website: "https://airmycart.com" },
      { name: "Murugan Foods Brisbane", tier: "silver" },
      { name: "Allionecart Indian Grocery", tier: "silver" },
    ],
    videoUrl: "/Pongal_Video.mp4",
    gallery: [
      "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop",
    ],
    organizer: "Queensland Tamil Mandram",
    contactEmail: "info@qtm.org.au",
  },
  {
    id: "tamil-new-year-2026",
    title: "Tamil New Year",
    subtitle: "Puthandu Celebration",
    tamilTitle: "புத்தாண்டு",
    date: "April 14, 2026",
    time: "5:00 PM",
    endTime: "10:00 PM",
    location: "Brisbane",
    venue: "Brisbane Convention & Exhibition Centre",
    address: "Merivale St, South Brisbane QLD 4101",
    description: "Welcome the Tamil New Year with grand celebrations and performances.",
    longDescription: `Celebrate the dawn of a new Tamil year with Queensland Tamil Mandram!

Puthandu (Tamil New Year) marks the first day of the Tamil calendar year. It is celebrated with great joy and enthusiasm, with people wearing new clothes, preparing special dishes, and visiting temples.

Our grand celebration will feature:
- Traditional welcome ceremony
- Classical dance performances (Bharatanatyam, Kuchipudi)
- Live orchestra with renowned artists
- Traditional feast (Puthandu Sadam)
- New Year special programs
- Lucky draws and prizes

Join us for an evening of culture, tradition, and celebration!`,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    featured: false,
    status: "upcoming",
    registrationOpen: true,
    ticketPrice: "$25 per person",
    highlights: [
      "Grand welcome ceremony",
      "Professional dance performances",
      "Live orchestra",
      "Traditional Puthandu feast",
      "Kids entertainment",
      "Lucky draw prizes"
    ],
    schedule: [
      { time: "5:00 PM", activity: "Registration & Welcome Drinks" },
      { time: "5:30 PM", activity: "Traditional Lamp Lighting Ceremony" },
      { time: "6:00 PM", activity: "Cultural Performances" },
      { time: "7:30 PM", activity: "Dinner Service" },
      { time: "8:30 PM", activity: "Main Entertainment Program" },
      { time: "9:30 PM", activity: "Lucky Draw & Awards" },
      { time: "10:00 PM", activity: "Vote of Thanks & Closing" },
    ],
    sponsors: [
      { name: "Tamil Cultural Foundation", tier: "platinum" },
      { name: "South Indian Bank", tier: "gold" },
      { name: "Chennai Silks Brisbane", tier: "gold" },
    ],
    organizer: "Queensland Tamil Mandram",
    contactEmail: "info@qtm.org.au",
  },
];

export function getEventById(id: string): EventType | undefined {
  return events.find(event => event.id === id);
}

export function getUpcomingEvents(): EventType[] {
  return events.filter(event => event.status === "upcoming");
}

export function getPastEvents(): EventType[] {
  return events.filter(event => event.status === "completed");
}
