import { useEffect, useState } from "react";
import EventForm from "../../components/admin/EventForm";
import EventTable from "../../components/admin/EventTable";
import { getEvents } from "../../api/eventApi";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadEvents = async () => {
    const res = await getEvents();
    setEvents(res.data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Admin Dashboard
      </h1>

      <div className="grid lg:grid-cols-2 gap-10">
        <EventForm selected={selected} refresh={loadEvents} setSelected={setSelected} />
        <EventTable events={events} refresh={loadEvents} setSelected={setSelected} />
      </div>
    </div>
  );
}