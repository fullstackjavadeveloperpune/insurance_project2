import { FcCellPhone } from "react-icons/fc";
import { GiRotaryPhone } from "react-icons/gi";
import { FaLinkedin, FaYoutube, FaGlobe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1>Contact Us</h1>
        <p className="text-muted">
          We'd love to hear from you! Whether you have a project inquiry, need technical consultation, or want to collaborate, feel free to reach out.
        </p>
      </div>

      <div className="row g-4">
        {/* Address */}
        <div className="col-lg-6 col-md-12">
          <div className="p-4 shadow rounded bg-light h-100">
            <h5 className="mb-3">📍 Office Address</h5>
            <a href="https://maps.app.goo.gl/kQMdqfH2C8RNDqNa9" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
              <p className="mb-0">Full Stack Java Developer</p>
              <p className="mb-0">[Research & Development Center]</p>
              <p className="mb-0">Inspiria Mall, Level- 04,</p>
              <p className="mb-0">Near Bhakti Shakti Chowk,</p>
              <p className="mb-0">Nigdi, Pimpri Chinchwad,</p>
              <p className="mb-0">Pune - 411044</p>
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="col-lg-6 col-md-12">
          <div className="p-4 shadow rounded bg-light h-100">
            <h5 className="mb-3">📞 Contact</h5>
            <p><FcCellPhone /> <b>Mobile:</b> <a href="tel:+917887575991">+91 7887575991</a> / <a href="tel:+919356943970">+91 9356943970</a></p>
            <p><GiRotaryPhone /> <b>Office:</b> <a href="tel:02047212644">020 4721 2644</a></p>
          </div>
        </div>

        {/* Email */}
        <div className="col-lg-6 col-md-12">
          <div className="p-4 shadow rounded bg-light h-100">
            <h5 className="mb-3">📧 Email</h5>
            <p><a href="mailto:contact@fullstackjavadeveloper.in" className="text-decoration-none text-dark">contact@fullstackjavadeveloper.in</a></p>
          </div>
        </div>

        {/* Website */}
        <div className="col-lg-6 col-md-12">
          <div className="p-4 shadow rounded bg-light h-100">
            <h5 className="mb-3">🌐 Website</h5>
            <p><a href="http://www.fullstackjavadeveloper.in" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">www.fullstackjavadeveloper.in</a></p>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="text-muted">Feel free to visit us or get in touch for any inquiries. We are always ready to assist you! 🚀</p>
      </div>

      {/* Footer */}
      <footer className="mt-5 py-4" style={{ background: "linear-gradient(90deg, #0d6efd, #0a58ca)", color: "white" }}>
        <div className="container">
          <div className="row align-items-center">
            {/* Left */}
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0">
                © {new Date().getFullYear()} <b>Full Stack Java Developer</b> | All Rights Reserved
              </p>
            </div>

            {/* Right */}
            <div className="col-md-6 text-center text-md-end">
              <a href="mailto:contact@fullstackjavadeveloper.in" className="text-light mx-2 fs-5 hover-opacity"><MdEmail /></a>
              <a href="https://www.linkedin.com/in/kiran-jadhav-22649b99/" target="_blank" rel="noopener noreferrer" className="text-light mx-2 fs-5 hover-opacity"><FaLinkedin /></a>
              <a href="https://www.youtube.com/@fullstackjavadeveloper" target="_blank" rel="noopener noreferrer" className="text-light mx-2 fs-5 hover-opacity"><FaYoutube /></a>
              <a href="http://www.fullstackjavadeveloper.in" target="_blank" rel="noopener noreferrer" className="text-light mx-2 fs-5 hover-opacity"><FaGlobe /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;