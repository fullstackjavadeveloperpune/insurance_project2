import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="container my-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1>About Us</h1>
        <p className="text-muted">
          Passionate Full Stack Java Developers delivering scalable, high-performance applications.
        </p>
      </div>

      {/* Main Content */}
      <div className="row g-4">
        {/* Team Introduction */}
        <div className="col-12">
          <div className="p-4 shadow rounded bg-light">
            <p>
              We are a passionate team of Full Stack Java Developers based in{" "}
              <a href="https://maps.app.goo.gl/kQMdqfH2C8RNDqNa9" target="_blank" rel="noopener noreferrer">
                Pune, MH, India
              </a>
              , dedicated to building scalable, high-performance applications with expertise in Java, Spring Boot, React JS, and modern web technologies.
            </p>
            <p>
              At the core of our vision is{" "}
              <a href="https://www.linkedin.com/in/kiran-jadhav-22649b99/" target="_blank" rel="noopener noreferrer">
                Mr. Kiran Jadhav
              </a>
              , our Director, Software Architect, Book Author, and{" "}
              <a href="https://www.youtube.com/@fullstackjavadeveloper" target="_blank" rel="noopener noreferrer">
                YouTuber
              </a>
              , bringing 10+ years of industry experience and technical expertise.
            </p>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="col-12">
          <div className="p-4 shadow rounded bg-light">
            <h5 className="mb-3">We focus on:</h5>
            <p>
              <a href="http://www.fullstackjavadeveloper.in/curriculum.html" target="_blank" rel="noopener noreferrer">
                Full Stack Development
              </a>
            </p>
            <ul className="list-unstyled">
              <li className="mb-2">✅ Robust Backend Development – Java, Spring Boot, Microservices, RESTful APIs</li>
              <li className="mb-2">✅ Dynamic Frontend Solutions – React JS, UI/UX enhancements</li>
              <li className="mb-2">✅ Secure & Scalable Databases – MySQL, PostgreSQL, NoSQL, ORM tools</li>
              <li className="mb-2">✅ Cloud & DevOps Integration – CI/CD, Docker, Kubernetes, AWS</li>
              <li className="mb-2">✅ Enterprise-Level Software – Custom applications, Finance, Healthcare, Insurance, Telecom, CRM solutions, etc.</li>
            </ul>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="col-12">
          <div className="p-4 shadow rounded bg-light">
            <p>
              Driven by innovation, we believe in delivering excellence through clean code, agile development, and client-centric solutions. Whether developing a GST billing system, creating financial reports, or integrating advanced security measures, we ensure quality in every project.
            </p>
            <p>
              Connect with us to discuss your next project and take your career/business to the next level!
            </p>
            <div className="text-center mt-3">
              <Link to={"/ContactUs"} className="btn btn-primary btn-lg shadow">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-5 py-4 text-center text-light" style={{ background: "linear-gradient(90deg, #0d6efd, #0a58ca)" }}>
        <p className="mb-1">
          © {new Date().getFullYear()} <b>Full Stack Java Developer</b>. All Rights Reserved.
        </p>
        <small>
          Designed with ❤️ by{" "}
          <a href="https://www.linkedin.com/in/kiran-jadhav-22649b99/" target="_blank" rel="noopener noreferrer" className="text-warning text-decoration-none">
            Kiran Jadhav
          </a>
        </small>
      </footer>
      
    </div>
  );
};

export default AboutUs;