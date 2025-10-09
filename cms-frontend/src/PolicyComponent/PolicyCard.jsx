import { Link } from "react-router-dom";
import { FaShieldAlt, FaFileAlt, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";

const PolicyCard = ({ item }) => {
  return (
    <div className="col">
      <Link
        to={`/policy/${item.id}/detail`}
        className="text-decoration-none"
      >
        <div
          className="card shadow-lg border-0 h-100 rounded-4"
          style={{
            transition: "0.3s",
            cursor: "pointer",
          }}
        >
          {/* Card Header */}
          <div
            className="card-header text-white text-center fw-bold rounded-top-4"
            style={{
              background: "linear-gradient(90deg, #0072ff, #00c6ff)",
              fontSize: "1.2rem",
            }}
          >
            <FaShieldAlt className="me-2" />
            Policy Name: {item.name}
          </div>

          {/* Card Body */}
          <div className="card-body text-dark">
            <p className="mb-2">
              <FaFileAlt className="me-2 text-primary" />
              <span className="fw-semibold">Description:</span> {item.description}
            </p>
            <p className="mb-2">
              <FaCalendarAlt className="me-2 text-success" />
              <span className="fw-semibold">Plan:</span> {item.plan}
            </p>
            <p className="mb-0">
              <FaRupeeSign className="me-2 text-warning" />
              <span className="fw-semibold">Premium:</span> ₹ {item.premiumAmount}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PolicyCard;
