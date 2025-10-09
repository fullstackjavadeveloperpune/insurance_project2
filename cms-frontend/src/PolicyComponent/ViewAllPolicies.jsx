import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAllPolicies = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getApplication = async () => {
      const application = await retrieveApplication();
      if (application) setApplications(application.policies);
    };
    getApplication();
  }, []);

  const retrieveApplication = async () => {
    const response = await axios.get("http://localhost:9000/api/policy/fetch/all");
    return response.data;
  };

  const viewPolicy = (policy) => {
    navigate(`/policy/${policy.id}/detail`);
  };

  const deletePolicy = (policyId) => {
    fetch(`http://localhost:9000/api/policy/delete?policyId=${policyId}`, {
      method: "DELETE",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { autoClose: 2000 });
          setTimeout(() => window.location.reload(), 1000);
        } else {
          toast.error(res.responseMessage, { autoClose: 2000 });
        }
      })
      .catch(() => {
        toast.error("Server is down. Please try later.", { autoClose: 2000 });
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Main Content */}
      <div className="container my-5 flex-grow-1">
        <ToastContainer />
        <div className="card shadow-lg rounded-4">
          <div
            className="card-header text-white text-center rounded-top-4 py-3"
            style={{ background: "linear-gradient(90deg, #007bff, #0056b3)" }}
          >
            <h3 className="mb-0">📋 All Policies</h3>
          </div>
          <div className="card-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Policy Name</th>
                    <th>Policy Id</th>
                    <th>Description</th>
                    <th>Premium Amount</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length > 0 ? (
                    applications.map((policy, index) => (
                      <tr key={index}>
                        <td className="fw-bold">{policy.name}</td>
                        <td>{policy.policyId}</td>
                        <td>{policy.description}</td>
                        <td>₹ {policy.premiumAmount}</td>
                        <td>{policy.plan}</td>
                        <td>
                          <span
                            className={`badge ${
                              policy.status === "Active"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {policy.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-info me-2 shadow-sm"
                            onClick={() => viewPolicy(policy)}
                          >
                            View Detail
                          </button>
                          <button
                            className="btn btn-sm btn-danger shadow-sm"
                            onClick={() => deletePolicy(policy.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-muted fw-bold">
                        No policies found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------- Footer Section ------------------- */}
      <footer
        className="text-center text-lg-start text-white mt-auto"
        style={{
          backgroundColor: "#1c2331",
          width: "100%",
        }}
      >
        <div>
          <a href="#" className="text-white me-4"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-white me-4"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-white me-4"><i className="fab fa-google"></i></a>
          <a href="#" className="text-white me-4"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-white me-4"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="text-white me-4"><i className="fab fa-github"></i></a>
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
      {/* ------------------- End Footer Section ------------------- */}
    </div>
  );
};

export default ViewAllPolicies;
