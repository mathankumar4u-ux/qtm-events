"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Home,
  CheckCircle,
  Mail,
  Play,
  X,
  Ticket,
  Share2,
  Facebook,
  Award,
} from "lucide-react";
import { EventType } from "@/lib/events";

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

          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#222222] hover:text-[#8B1A1A] transition-colors font-medium"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">All Events</span>
            </Link>
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

// Web3Forms access key
const WEB3FORMS_KEY = "8ad7b588-a0af-4e76-b9d0-0ed138312fbf";

// Registration Form Modal
function RegistrationModal({
  isOpen,
  onClose,
  eventTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attendees: "1",
    requirements: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Event Registration: ${eventTitle}`,
          from_name: "QTM Events Registration",
          to: "info@qtm.org.au",
          event: eventTitle,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          attendees: formData.attendees,
          special_requirements: formData.requirements || "None",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({ name: "", email: "", phone: "", attendees: "1", requirements: "" });
        }, 3000);
      } else {
        setError("Failed to submit registration. Please try again.");
      }
    } catch {
      setError("Failed to submit registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#FFF8EE] rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle size={64} className="text-[#1F7A5B] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#8B1A1A] mb-2">Thank You!</h3>
            <p className="text-[#222222]/70">Your registration has been submitted successfully. We will contact you soon!</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#8B1A1A]">Register for Event</h3>
              <button onClick={onClose} className="text-[#222222]">
                <X size={24} />
              </button>
            </div>
            <p className="text-[#222222]/70 mb-4">
              Register for: <strong>{eventTitle}</strong>
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#222222]">Full Name *</label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none bg-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#222222]">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none bg-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#222222]">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none bg-white"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#222222]">Number of Attendees</label>
                <select
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  className="w-full px-4 py-2 border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none bg-white"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5+">5+ People</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#222222]">Special Requirements</label>
                <textarea
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-4 py-2 border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none bg-white resize-none"
                  placeholder="Any dietary requirements or accessibility needs..."
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#8B1A1A] text-white rounded-lg font-semibold hover:bg-[#6B1515] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

// Video Modal
function VideoModal({
  isOpen,
  onClose,
  videoUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}) {
  if (!isOpen) return null;

  // Check if it's a local video file (MP4)
  const isLocalVideo = videoUrl.endsWith('.mp4') || videoUrl.startsWith('/');

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative max-w-4xl w-full aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-10 right-0 text-white"
          onClick={onClose}
        >
          <X size={32} />
        </button>
        {isLocalVideo ? (
          <video
            src={videoUrl}
            className="w-full h-full rounded-lg"
            controls
            autoPlay
          />
        ) : (
          <iframe
            src={videoUrl}
            className="w-full h-full rounded-lg"
            allowFullScreen
          />
        )}
      </motion.div>
    </div>
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

const tierColors = {
  platinum: "bg-gradient-to-r from-gray-300 to-gray-100 text-gray-800",
  gold: "bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-gray-800",
  silver: "bg-gradient-to-r from-gray-400 to-gray-200 text-gray-800",
  bronze: "bg-gradient-to-r from-amber-600 to-amber-400 text-white",
};

export default function EventDetailClient({ event }: { event: EventType }) {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  event.status === "upcoming"
                    ? "bg-[#1F7A5B] text-white"
                    : "bg-gray-500 text-white"
                }`}>
                  {event.status === "upcoming" ? "Upcoming" : "Completed"}
                </span>
                {event.featured && (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[#D4AF37] text-[#222222]">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{event.title}</h1>
              {event.tamilTitle && (
                <p className="text-[#D4AF37] text-xl mb-4">{event.tamilTitle}</p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 bg-[#FFF8EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-[#8B1A1A] mb-4">About This Event</h2>
                <div className="prose text-[#222222]/80 whitespace-pre-line">
                  {event.longDescription || event.description}
                </div>
              </motion.div>

              {/* Highlights */}
              {event.highlights && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-[#8B1A1A] mb-4">Event Highlights</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {event.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-[#1F7A5B] mt-0.5 flex-shrink-0" />
                        <span className="text-[#222222]/80">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Schedule */}
              {event.schedule && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-[#8B1A1A] mb-4">Event Schedule</h2>
                  <div className="space-y-4">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="w-24 flex-shrink-0">
                          <span className="text-[#1F7A5B] font-semibold">{item.time}</span>
                        </div>
                        <div className="flex-1 pb-4 border-b border-[#D4AF37]/20 last:border-0">
                          <span className="text-[#222222]">{item.activity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Video Section */}
              {event.videoUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-[#8B1A1A] mb-4">Event Video</h2>
                  <button
                    onClick={() => setShowVideo(true)}
                    className="w-full aspect-video bg-[#222222]/10 rounded-xl flex items-center justify-center group hover:bg-[#222222]/20 transition-colors"
                  >
                    <div className="w-20 h-20 bg-[#8B1A1A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                  </button>
                </motion.div>
              )}

              {/* Sponsors */}
              {event.sponsors && event.sponsors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-[#8B1A1A] mb-6">Our Sponsors</h2>
                  <div className="space-y-4">
                    {(["platinum", "gold", "silver", "bronze"] as const).map((tier) => {
                      const tierSponsors = event.sponsors?.filter((s) => s.tier === tier);
                      if (!tierSponsors || tierSponsors.length === 0) return null;
                      return (
                        <div key={tier}>
                          <div className="flex items-center gap-2 mb-3">
                            <Award size={20} className="text-[#D4AF37]" />
                            <h3 className="font-semibold text-[#222222] capitalize">{tier} Sponsors</h3>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {tierSponsors.map((sponsor, index) => (
                              <div
                                key={index}
                                className={`p-4 rounded-xl text-center ${tierColors[tier]}`}
                              >
                                <span className="font-semibold">{sponsor.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Gallery */}
              {event.gallery && event.gallery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-[#8B1A1A] mb-4">Gallery</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {event.gallery.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-xl"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
              >
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#8B1A1A]/10 rounded-full flex items-center justify-center">
                      <Calendar size={20} className="text-[#8B1A1A]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#222222]/60">Date</p>
                      <p className="font-semibold text-[#222222]">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#8B1A1A]/10 rounded-full flex items-center justify-center">
                      <Clock size={20} className="text-[#8B1A1A]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#222222]/60">Time</p>
                      <p className="font-semibold text-[#222222]">
                        {event.time}{event.endTime && ` - ${event.endTime}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#8B1A1A]/10 rounded-full flex items-center justify-center">
                      <MapPin size={20} className="text-[#8B1A1A]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#222222]/60">Venue</p>
                      <p className="font-semibold text-[#222222]">{event.venue || event.location}</p>
                      {event.address && (
                        <p className="text-sm text-[#222222]/60">{event.address}</p>
                      )}
                    </div>
                  </div>
                  {event.ticketPrice && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#8B1A1A]/10 rounded-full flex items-center justify-center">
                        <Ticket size={20} className="text-[#8B1A1A]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#222222]/60">Entry</p>
                        <p className="font-semibold text-[#1F7A5B]">{event.ticketPrice}</p>
                      </div>
                    </div>
                  )}
                </div>

                {event.registrationOpen && event.status === "upcoming" && (
                  <button
                    onClick={() => setShowRegistration(true)}
                    className="w-full py-3 bg-[#8B1A1A] text-white rounded-lg font-semibold hover:bg-[#6B1515] transition-colors mb-4"
                  >
                    Register Now
                  </button>
                )}

                <button className="w-full py-3 border-2 border-[#8B1A1A] text-[#8B1A1A] rounded-lg font-semibold hover:bg-[#8B1A1A] hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  Share Event
                </button>

                {/* Contact */}
                <div className="mt-6 pt-6 border-t border-[#D4AF37]/20">
                  <h3 className="font-semibold text-[#222222] mb-3">Contact Organizer</h3>
                  <div className="space-y-2">
                    {event.contactEmail && (
                      <a
                        href={`mailto:${event.contactEmail}`}
                        className="flex items-center gap-2 text-[#222222]/70 hover:text-[#8B1A1A]"
                      >
                        <Mail size={16} />
                        <span className="text-sm">{event.contactEmail}</span>
                      </a>
                    )}
                    <a
                      href="https://www.facebook.com/QLDTamilMandram"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#222222]/70 hover:text-[#1877F2]"
                    >
                      <Facebook size={16} />
                      <span className="text-sm">Facebook Page</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <RegistrationModal
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        eventTitle={event.title}
      />
      {event.videoUrl && (
        <VideoModal
          isOpen={showVideo}
          onClose={() => setShowVideo(false)}
          videoUrl={event.videoUrl}
        />
      )}
    </main>
  );
}
