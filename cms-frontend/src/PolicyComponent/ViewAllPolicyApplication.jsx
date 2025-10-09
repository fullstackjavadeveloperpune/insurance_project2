import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

const ViewAllPolicyApplication = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [application, setApplication] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getApplication = async () => {
      try {
        const data = await retrieveApplication();
        if (data) setApplications(data.applications || []);
      } catch (error) {
        toast.error("Failed to fetch applications", { autoClose: 2000 });
        console.error(error);
      }
    };
    getApplication();
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const showApproveModal = (app) => {
    setApplication(app);
    setStartDate("");
    setEndDate("");
    handleShow();
  };

  const retrieveApplication = async () => {
    const response = await axios.get(
      "http://localhost:9000/api/policy/application/fetch/all"
    );
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    if (!epochTime) return "-";
    return new Date(Number(epochTime)).toLocaleDateString();
  };

  const updateApplicationStatus = async (applicationId, status, startDateValue, endDateValue) => {
    try {
      const payload = { policyApplicationId: applicationId, status };
      if (status === "Approved") {
        if (!startDateValue || !endDateValue) {
          toast.error("Please select start and end dates before approving.", { autoClose: 2000 });
          return;
        }
        payload.startDate = startDateValue;
        payload.endDate = endDateValue;
      }

      const res = await axios.put(
        "http://localhost:9000/api/policy/application/status/update",
        payload
      );

      if (res.data.success) {
        toast.success(res.data.responseMessage, { autoClose: 2000 });
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error(res.data.responseMessage, { autoClose: 2000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try later.", { autoClose: 2000 });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Main Content */}
      <div className="container my-5 flex-grow-1">
        <ToastContainer />
        <div className="card shadow-lg rounded-4">
          <div
            className="card-header text-center text-white rounded-top-4 py-3"
            style={{ background: "linear-gradient(90deg, #0d6efd, #0a58ca)" }}
          >
            <h3 className="mb-0">📋 All Policy Applications</h3>
          </div>
          <div className="card-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle text-center">
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
                  {applications.length > 0 ? (
                    applications.map((app, index) => (
                      <tr key={index}>
                        <td className="fw-bold">{app.policy?.name}</td>
                        <td>{app.policy?.policyId}</td>
                        <td>{formatDateFromEpoch(app.applicationDate)}</td>
                        <td>{app.startDate || "Pending"}</td>
                        <td>{app.endDate || "Pending"}</td>
                        <td>
                          <span
                            className={`badge ${
                              app.status === "Pending"
                                ? "bg-warning text-dark"
                                : app.status === "Approved"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td>
                          {app.status === "Pending" && (
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                className="btn btn-sm btn-success shadow-sm"
                                onClick={() => showApproveModal(app)}
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-sm btn-danger shadow-sm"
                                onClick={() => updateApplicationStatus(app.id, "Rejected")}
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-muted fw-bold">
                        No policy applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Approve Customer Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="p-2">
            <div className="mb-3">
              <label className="form-label fw-bold">Policy Name</label>
              <input
                type="text"
                className="form-control"
                value={application.policy?.name || ""}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Policy Id</label>
              <input
                type="text"
                className="form-control"
                value={application.policy?.policyId || ""}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Policy Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Policy End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-success px-4 shadow-sm"
                onClick={() =>
                  updateApplicationStatus(application.id, "Approved", startDate, endDate)
                }
              >
                Approve
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ------------------- Footer Section ------------------- */}
      <footer
        className="text-center text-lg-start text-white mt-auto"
        style={{ backgroundColor: "#1c2331", width: "100%" }}
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

export default ViewAllPolicyApplication;
