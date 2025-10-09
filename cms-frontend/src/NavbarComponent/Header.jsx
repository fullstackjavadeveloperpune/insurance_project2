import { Link } from "react-router-dom";
import RoleNav from "./RoleNav";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-bg text-color">
        <div className="container-fluid text-color">
          <Link to="/" className="navbar-brand">
            <i>
              <b className="header-logo-color ms-2">
                Insurance Management System
              </b>
            </i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/AboutUs" className="nav-link text-white fw-bold">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/ContactUs" className="nav-link text-white fw-bold">
                  Contact Us
                </Link>
              </li>
            </ul>

            <RoleNav />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
