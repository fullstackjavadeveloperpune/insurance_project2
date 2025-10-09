import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div style={{ width: "100%", position: "relative", bottom: 0 }}>
      <footer
        style={{
          width: "100%",
          backgroundColor: "#0d47a1",
          color: "#ffffff",
          borderRadius: "0",
          padding: "40px 20px",
        }}
      >
        <div className="container-fluid p-4 pb-0">
          <section>
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                <h4 style={{ color: "#ffca28" }}>
                  <i>Insurance Management</i>
                </h4>
                <p style={{ color: "#e3f2fd" }}>
                  Secure your future with us. We provide reliable insurance
                  services to protect what matters most to you.
                </p>
              </div>

              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h5 style={{ color: "#90caf9" }}>About us</h5>
                <ul className="list-unstyled mb-0">
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Our Mission</a></li>
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Team</a></li>
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>History</a></li>
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Partners</a></li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h5 style={{ color: "#90caf9" }}>Contact us</h5>
                <ul className="list-unstyled mb-0">
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Email</a></li>
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Phone</a></li>
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Address</a></li>
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Support</a></li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h5 style={{ color: "#90caf9" }}>Careers</h5>
                <ul className="list-unstyled mb-0">
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Openings</a></li>
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Internships</a></li>
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Benefits</a></li>
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Apply</a></li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h5 style={{ color: "#90caf9" }}>Links</h5>
                <ul className="list-unstyled mb-0">
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Blog</a></li>
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>FAQ</a></li>
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Terms</a></li>
                  <li><a href="#!" style={{ color: "#e3f2fd" }}>Privacy</a></li>
                </ul>
              </div>
            </div>
          </section>

          <hr style={{ borderColor: "#90caf9" }} />

          <section>
            <p className="d-flex justify-content-center align-items-center">
              <span style={{ fontWeight: "bold", color: "#ffca28", marginRight: "10px" }}>
                © 2025 Full Stack Java Developer | All Rights Reserved
              </span>
            </p>
          </section>

          <hr style={{ borderColor: "#90caf9" }} />

          <div className="text-center" style={{ color: "#e3f2fd" }}>
            <a 
              href="http://fullstackjavadeveloper.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "#ffca28", marginLeft: "5px" }}
            >
              fullstackjavadeveloper.in
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
