import { useEffect, useState } from "react";
import { createEvent, updateEvent } from "../../api/eventApi";

const initialState = {
  title: "",
  description: "",
  location: "",
  date: "",
  price: "",
  total_seats: "",
  img: ""
};

export default function EventForm({ selected, refresh, setSelected }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    selected
      ? await updateEvent(selected.id, form)
      : await createEvent(form);

    refresh();
    setSelected(null);
    setForm(initialState);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">
        {selected ? "Update Event" : "Create Event"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {["title", "location", "date", "price", "total_seats", "img"].map(field => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.replace("_", " ")}
            className="bg-black/30 border border-white/10 px-3 py-2 rounded outline-none"
          />
        ))}

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="col-span-2 bg-black/30 border border-white/10 px-3 py-2 rounded outline-none"
        />

        <button className="col-span-2 bg-pink-600 hover:bg-pink-700 py-2 rounded font-semibold">
          {selected ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
}