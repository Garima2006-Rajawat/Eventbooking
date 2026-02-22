import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../api/eventApi";
import EventHero from "../components/events/EventHero";
import EventMeta from "../components/events/EventMeta";
import TicketSelector from "../components/events/TicketSelector";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    loadEvent();
  }, []);

  const loadEvent = async () => {
    const res = await getEventById(id);
    setEvent(res.data);
  };

  if (!event) return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen">
      <EventHero event={event} />
      <EventMeta event={event} />
      <TicketSelector event={event} />
    </div>
  );
}