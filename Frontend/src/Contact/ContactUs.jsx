 import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("Sending...");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-white shadow-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-white shadow-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
  

        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 rounded-md bg-white shadow-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform hover:shadow-[0_0_15px_cyan] animate-bounce"
      >
        🚀 Send Message
      </button>

      <p className="mt-3 text-center text-sm text-gray-700">{status}</p>
    </form>
  );
};

const ContactUs16 = () => {
  return (
    <section className="min-h-screen w-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 flex items-center justify-center py-10 px-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 shadow-2xl rounded-3xl bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-8 md:p-12">
        {/* Left Info Section */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600">Contact Us</h2>
          <p className="text-gray-700">
            We'd love to hear from you! Fill out the form or connect with us directly.
          </p>

          <div className="flex items-center gap-3 text-gray-600">
            <FaPhoneAlt className="text-pink-500" /> +91 12345 67890
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <FaEnvelope className="text-pink-500" /> support@walmartclone.com
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <FaMapMarkerAlt className="text-pink-500" /> Patna, Bihar, India
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 mt-4 text-xl text-pink-600">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="bg-white bg-opacity-70 p-6 md:p-8 rounded-2xl shadow-xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactUs16;
