import { deleteEvent } from "../../api/eventApi";

export default function EventTable({ events, refresh, setSelected }) {
  const handleDelete = async id => {
    if (confirm("Delete this event?")) {
      await deleteEvent(id);
      refresh();
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 overflow-auto">
      <h2 className="text-xl font-bold mb-4">All Events</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="p-2 text-left">Title</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.map(e => (
            <tr key={e.id} className="border-b border-white/5">
              <td className="p-2">{e.title}</td>
              <td>{e.venue}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td>{e.total_seats}</td>

              <td className="flex gap-3 py-2">
                <button
                  onClick={() => setSelected(e)}
                  className="px-3 py-1 bg-blue-500 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(e.id)}
                  className="px-3 py-1 bg-red-600 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}