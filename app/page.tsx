"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Star, Home } from "lucide-react";
import { events } from "@/lib/events";

// Header Component
function Header() {
  return (
    <header className="bg-[#FFF8EE]/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/qtmlogo.png"
              alt="QTM Logo"
              width={50}
              height={50}
              className="w-12 h-12 object-contain"
            />
            <div>
              <span className="font-bold text-lg text-[#8B1A1A]">QTM Events</span>
              <p className="text-xs text-[#D4AF37]">Queensland Tamil Mandram</p>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <a
              href="https://qtm.org.au"
              className="flex items-center gap-2 text-[#222222] hover:text-[#8B1A1A] transition-colors font-medium"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Main Site</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B1A1A] via-[#6B1515] to-[#4A0F0F]"></div>
      <div className="absolute inset-0 kolam-pattern opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            QTM <span className="text-[#D4AF37]">Events</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Join us in celebrating Tamil culture through our community events,
            festivals, and cultural programs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Event Card
function EventCard({ event, index }: { event: typeof events[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white rounded-2xl overflow-hidden shadow-lg card-hover ${
        event.featured ? "ring-2 ring-[#D4AF37]" : ""
      }`}
    >
      {event.featured && (
        <div className="bg-[#8B1A1A] text-white text-center py-2 text-sm font-semibold flex items-center justify-center gap-2">
          <Star size={16} className="text-[#D4AF37]" /> Featured Event
        </div>
      )}
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            event.status === "upcoming"
              ? "bg-[#1F7A5B]/20 text-[#1F7A5B]"
              : "bg-gray-200 text-gray-600"
          }`}>
            {event.status === "upcoming" ? "Upcoming" : "Completed"}
          </span>
          {event.registrationOpen && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D4AF37]/20 text-[#8B1A1A]">
              Registration Open
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-1 text-[#8B1A1A]">{event.title}</h3>
        {event.tamilTitle && (
          <p className="text-[#D4AF37] text-sm mb-3">{event.tamilTitle}</p>
        )}

        <div className="space-y-2 text-[#222222]/70 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#1F7A5B]" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#1F7A5B]" />
            <span>{event.time}{event.endTime && ` - ${event.endTime}`}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#1F7A5B]" />
            <span>{event.venue || event.location}</span>
          </div>
        </div>

        <p className="text-[#222222]/70 mb-4 text-sm line-clamp-2">{event.description}</p>

        {event.ticketPrice && (
          <p className="text-[#8B1A1A] font-semibold mb-4">{event.ticketPrice}</p>
        )}

        <Link
          href={`/${event.id}`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#8B1A1A] text-white rounded-lg font-semibold hover:bg-[#6B1515] transition-colors"
        >
          View Details
          <ArrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
}

// Events List
function EventsList() {
  const upcomingEvents = events.filter(e => e.status === "upcoming");
  const pastEvents = events.filter(e => e.status === "completed");

  return (
    <section className="py-16 bg-[#FFF8EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2 text-[#222222]">
            Upcoming <span className="text-[#8B1A1A]">Events</span>
          </h2>
          <p className="text-[#222222]/70 mb-8">
            Don&apos;t miss these exciting upcoming events!
          </p>

          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl">
              <p className="text-[#222222]/70">No upcoming events at the moment. Check back soon!</p>
            </div>
          )}
        </motion.div>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-2 text-[#222222]">
              Past <span className="text-[#1F7A5B]">Events</span>
            </h2>
            <p className="text-[#222222]/70 mb-8">
              A look back at our previous celebrations.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#8B1A1A] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/qtmlogo.png"
              alt="QTM Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain bg-white rounded-full p-1"
            />
            <div>
              <span className="font-bold">Queensland Tamil Mandram</span>
              <p className="text-[#D4AF37] text-sm">Events Portal</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-white/80 text-sm">
              &copy; {new Date().getFullYear()} Queensland Tamil Mandram. All rights reserved.
            </p>
            <a
              href="https://qtm.org.au"
              className="text-[#D4AF37] hover:text-white transition-colors text-sm"
            >
              Visit Main Website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function EventsHome() {
  return (
    <main>
      <Header />
      <Hero />
      <EventsList />
      <Footer />
    </main>
  );
}
