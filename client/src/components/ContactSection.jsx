import { useState } from 'react';
import api from '../utils/api';
import Swal from 'sweetalert2';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/contact', form);
      Swal.fire('Sent!', 'Your message has been sent.', 'success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Please try later', 'error');
    }
  };
  return (
    <div id="contact" className="p-8 md:p-16 bg-[#080808]">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <h2 className="text-3xl font-bold">Contact Me</h2>
          <p className="mt-4"><a href="mailto:mail4barman@gmail.com" className="text-[#04aa6d]">📧 Send Email</a></p>
          <p className="mt-4"><a href="https://wa.me/7319373098" className="text-[#04aa6d]">💬 WhatsApp</a></p>
          <p className="mt-4"><a href="tel:+917319373098" className="text-[#04aa6d]">📞 Call Now</a></p>
          <p className="mt-4"><a href="https://www.google.com/maps/dir/?api=1&destination=5QFX%2BH9P%2C+Narikeldaha%2C+West+Bengal+721642" className="text-[#04aa6d]">📍 Get Directions</a></p>
          <a href="/download-resume" className="inline-block mt-6 bg-[#04aa6d] px-6 py-2 rounded">Download Resume</a>
        </div>
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-2 bg-[#262626] rounded" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <input type="email" placeholder="Your Email" className="w-full p-2 bg-[#262626] rounded" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            <textarea rows="3" placeholder="Your Message" className="w-full p-2 bg-[#262626] rounded" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required></textarea>
            <button type="submit" className="bg-[#04aa6d] px-6 py-2 rounded">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ContactSection;