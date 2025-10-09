import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewMyClaims = () => {
  const navigate = useNavigate();
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customer) {
      toast.error("Please login first!", { position: "top-center", autoClose: 1500 });
      setTimeout(() => navigate("/user/login"), 1500);
      return;
    }

    const getApplication = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/claim/fetch/customer-wise?customerId=${customer.id}`
        );
        setApplications(response.data.claims || []);
      } catch (error) {
        toast.error("Failed to fetch claims", { position: "top-center", autoClose: 1500 });
      } finally {
        setLoading(false);
      }
    };

    getApplication();
  }, [customer, navigate]);

  const formatDateFromEpoch = (epochTime) => {
    if (!epochTime) return "NA";
    const date = new Date(Number(epochTime));
    return date.toLocaleDateString();
  };

  const updateMyClaim = (claimId, status) => {
    if (!claimId) return;
    fetch("http://localhost:9000/api/claim/customer/response", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ claimId, customerClaimResponse: status }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1200 });
          setTimeout(() => window.location.reload(), 1200);
        } else {
          toast.error(res.responseMessage, { position: "top-center", autoClose: 1200 });
        }
      })
      .catch(() => {
        toast.error("Server seems down", { position: "top-center", autoClose: 1200 });
      });
  };

  if (!customer) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#e9f5f9" }}>
      {/* Main Content */}
      <div style={{ flex: "1", padding: "2rem" }}>
        <div className="card shadow-lg rounded-4 border-0 mx-auto" style={{ maxWidth: "95%" }}>
          <div
            className="card-header text-center text-white py-3 rounded-top-4"
            style={{ background: "linear-gradient(135deg, #0d6efd, #20c997)", fontWeight: 700, fontSize: "1.5rem" }}
          >
            My Claims
          </div>

          <div className="card-body p-4" style={{ backgroundColor: "#ffffff", overflowX: "auto" }}>
            {loading ? (
              <div className="text-center">Loading claims...</div>
            ) : (
              <table className="table table-hover table-bordered text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Policy Name</th>
                    <th>Claim Date</th>
                    <th>Claim Amount</th>
                    <th>Accident Date</th>
                    <th>Amount Approved</th>
                    <th>Claim Status</th>
                    <th>Action Status</th>
                    <th>Customer Response</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan="9">No claims found.</td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr key={app.claim?.id || Math.random()}>
                        <td>{app.policy?.name || "NA"}</td>
                        <td>{formatDateFromEpoch(app.claim?.claimApplicationDate)}</td>
                        <td>{app.claim?.claimAmount || "NA"}</td>
                        <td>{app.claim?.dateOfAccident || "NA"}</td>
                        <td>{app.claim?.amtApprovedByInspector || "NA"}</td>
                        <td>{app.claim?.claimStatus || "NA"}</td>
                        <td>{app.claim?.actionStatus || "NA"}</td>
                        <td>{app.claim?.customerClaimResponse || "NA"}</td>
                        <td>
                          {app.claim?.claimStatus === "Open" && (
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                onClick={() => updateMyClaim(app.claim.id, "Accept")}
                                className="btn btn-sm text-white shadow"
                                style={{
                                  background: "linear-gradient(135deg, #0d6efd, #20c997)",
                                  borderRadius: "20px",
                                }}
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => updateMyClaim(app.claim.id, "Withdraw")}
                                className="btn btn-sm text-white shadow"
                                style={{
                                  background: "linear-gradient(135deg, #dc3545, #ff6b6b)",
                                  borderRadius: "20px",
                                }}
                              >
                                Withdraw
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ------------------- Full Footer ------------------- */}
      <footer
        className="text-center text-lg-start text-white mt-auto"
        style={{ backgroundColor: "#1c2331", width: "100%" }}
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
                <h6 className="text-uppercase fw-bold">Insurance Management System</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                />
                <p>
                  The Insurance Management System helps manage insurance policies,
                  claims, and customers efficiently using modern tools and technologies.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                />
                <p><a href="#!" className="text-white">Health Insurance</a></p>
                <p><a href="#!" className="text-white">Vehicle Insurance</a></p>
                <p><a href="#!" className="text-white">Travel Insurance</a></p>
                <p><a href="#!" className="text-white">Life Insurance</a></p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Contact Us</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                />
                <p><a href="#!" className="text-white">Your Account</a></p>
                <p><a href="#!" className="text-white">Help</a></p>
                <p><a href="#!" className="text-white">Contact Us</a></p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                />
                <p><i className="fas fa-home mr-3"></i> Pune, Maharashtra, India</p>
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

        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © 2025 Full Stack Java Developer | All Rights Reserved
        </div>
      </footer>
      {/* ------------------- End Footer ------------------- */}

      <ToastContainer />
    </div>
  );
};

export default ViewMyClaims;
