import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from '../pages/landing';
import EventList from '../pages/events'
import EventDetails from '../pages/EventDetails';
import Booking from '../pages/Booking';
import Success from '../pages/success';
import Dashboard from '../pages/admin/Dashboard';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<Dashboard />} /> 
      </Routes>
    </BrowserRouter>
  );
}