import { events, getEventById } from "@/lib/events";
import EventDetailClient from "./EventDetailClient";
import Link from "next/link";
import Image from "next/image";

// Generate static params for all events (required for static export)
export function generateStaticParams() {
  return events.map((event) => ({
    eventId: event.id,
  }));
}

// Generate metadata for each event page
export async function generateMetadata({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const event = getEventById(eventId);
  if (!event) {
    return { title: "Event Not Found | QTM Events" };
  }
  return {
    title: `${event.title} | QTM Events`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <main className="min-h-screen bg-[#FFF8EE]">
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
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#8B1A1A] mb-4">Event Not Found</h1>
            <p className="text-[#222222]/70 mb-8">The event you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/"
              className="px-6 py-3 bg-[#8B1A1A] text-white rounded-lg font-semibold hover:bg-[#6B1515] transition-colors inline-block"
            >
              View All Events
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <EventDetailClient event={event} />;
}
