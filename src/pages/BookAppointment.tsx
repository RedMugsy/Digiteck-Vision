import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";

const BOOKINGS_URL = "https://bookings.cloud.microsoft/book/DigiteckVision@digiteckvision.com/?ismsaljsauthenabled";

export default function BookAppointment() {
  useEffect(() => {
    document.title = "Book Appointment | Digiteck Vision";
  }, []);

  return (
    <div className="page" style={{ background: "#0b0b0f" }}>
      <Navbar theme="dark" />

      <main className="booking-page">
        <div className="booking-page-header">
          <p className="booking-eyebrow">MICROSOFT BOOKINGS</p>
          <h1>Book an Appointment</h1>
          <p>
            Choose your preferred time directly in our Microsoft Bookings calendar. Your appointment details are
            submitted to our scheduling platform immediately.
          </p>
        </div>

        <div className="booking-actions">
          <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="booking-action-primary">
            Open in New Tab
          </a>
          <a href="/contact" className="booking-action-secondary">
            Prefer Contact Form Instead?
          </a>
        </div>

        <div className="booking-embed-container">
          <iframe
            src={BOOKINGS_URL}
            title="Digiteck Vision Microsoft Bookings"
            width="100%"
            height="100%"
            scrolling="yes"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <p className="booking-helper-text">
          If the embedded scheduler does not load on your device or browser, click <strong>Open in New Tab</strong>.
        </p>
      </main>

      <Footer />
    </div>
  );
}
