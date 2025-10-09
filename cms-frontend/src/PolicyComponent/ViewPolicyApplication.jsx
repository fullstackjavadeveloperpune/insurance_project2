import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewPolicyApplication = () => {
  const navigate = useNavigate();
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getApplication = async () => {
      const application = await retrieveApplication();
      if (application) setApplications(application.applications);
    };
    getApplication();
  }, []);

  const retrieveApplication = async () => {
    const response = await axios.get(
      "http://localhost:9000/api/policy/application/fetch/customer-wise?customerId=" +
        customer.id
    );
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    return date.toLocaleDateString();
  };

  const claimPolicy = (application) => {
    navigate("/customer/policy/claim", { state: application });
  };

  return (
    // Flex wrapper for sticky footer
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#e9f5f9",
      }}
    >
      {/* Main content */}
      <div style={{ flex: "1", padding: "2rem" }}>
        <div
          className="card shadow-lg rounded-4 border-0 mx-auto"
          style={{ maxWidth: "90%", height: "auto" }}
        >
          {/* Header */}
          <div
            className="card-header text-center text-white py-3 rounded-top-4"
            style={{
              background: "linear-gradient(135deg, #0d6efd, #20c997)",
              fontWeight: 700,
              fontSize: "1.5rem",
            }}
          >
            Policy Applications
          </div>

          {/* Body */}
          <div className="card-body p-4" style={{ backgroundColor: "#ffffff" }}>
            <div className="table-responsive">
              <table className="table table-hover table-bordered text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Policy Name</th>
                    <th>Policy Id</th>
                    <th>Application Date</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan="7">No applications found.</td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr key={app.id}>
                        <td>{app.policy.name}</td>
                        <td>{app.policy.policyId}</td>
                        <td>{formatDateFromEpoch(app.applicationDate)}</td>
                        <td>{app.startDate || "Approval Pending"}</td>
                        <td>{app.endDate || "Approval Pending"}</td>
                        <td>{app.status}</td>
                        <td>
                          {app.status === "Approved" && (
                            <button
                              onClick={() => claimPolicy(app)}
                              className="btn btn-sm text-white shadow"
                              style={{
                                background: "linear-gradient(135deg, #0d6efd, #20c997)",
                                borderRadius: "20px",
                              }}
                            >
                              Claim
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------- Full Footer ------------------- */}
      <footer
        className="text-center text-lg-start text-white mt-auto"
        style={{
          backgroundColor: "#1c2331",
          width: "100%",
        }}
      >
        <div style={{ padding: "1rem 0" }}>
          <a href="#" className="text-white me-4">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-white me-4">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-white me-4">
            <i className="fab fa-google"></i>
          </a>
          <a href="#" className="text-white me-4">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-white me-4">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-white me-4">
            <i className="fab fa-github"></i>
          </a>
        </div>

        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">
                  Insurance Management System
                </h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  The Insurance Management System helps manage insurance
                  policies, claims, and customers efficiently using modern
                  tools and technologies.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <a href="#!" className="text-white">
                    Health Insurance
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Vehicle Insurance
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Travel Insurance
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Life Insurance
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Contact Us</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <a href="#!" className="text-white">
                    Your Account
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Help
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Contact Us
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <i className="fas fa-home mr-3"></i> Pune, Maharashtra, India
                </p>
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
          </div>
        </section>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2025 Full Stack Java Developer | All Rights Reserved
        </div>
      </footer>
      {/* ------------------- End Footer ------------------- */}
    </div>
  );
};

export default ViewPolicyApplication;
