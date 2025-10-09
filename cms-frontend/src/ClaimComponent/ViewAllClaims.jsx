import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAllClaims = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const [inspectorId, setInspectorId] = useState("");
  const [claimId, setClaimId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const getInspectors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/user/fetch/all?role=inspector"
        );
        const validUsers = res.data?.users?.filter((u) => u?.user) || [];
        setInspectors(validUsers);
      } catch (error) {
        console.error(error);
      }
    };
    getInspectors();
  }, []);

  useEffect(() => {
    const getClaims = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/claim/fetch/all");
        const validClaims =
          res.data?.claims
            ?.filter((a) => a && a.claim)
            ?.map((a) => ({ ...a, claim: a.claim || {} })) || [];
        setApplications(validClaims);
      } catch (error) {
        console.error(error);
        setApplications([]);
      }
    };
    getClaims();
  }, []);

  const assignClaimId = (claimId) => {
    setClaimId(claimId);
    handleShow();
  };

  const formatDate = (epochTime) => {
    if (!epochTime) return "NA";
    return new Date(Number(epochTime)).toLocaleString();
  };

  const updateClaim = async (e) => {
    e.preventDefault();

    if (!inspectorId) {
      toast.error("Please select an inspector", { position: "top-center", autoClose: 1000 });
      return;
    }

    const data = {
      claimId: claimId,
      surveyorId: inspectorId,
    };

    try {
      const response = await fetch("http://localhost:9000/api/claim/assign/inspector", {
        method: "PUT",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (response.ok && res) {
        toast.success(res.responseMessage || "Claim assigned successfully!", {
          position: "top-center",
          autoClose: 1000,
        });
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error(res.responseMessage || "Failed to assign claim.", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error assigning claim:", error);
      toast.error("Server is down", { position: "top-center", autoClose: 1000 });
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
            <h3 className="mb-0">📄 All Claims</h3>
          </div>
          <div className="card-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Policy Name</th>
                    <th>Customer Name</th>
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
                  {applications.length > 0 ? (
                    applications.map((app, index) => (
                      <tr key={app.claim?.id || index}>
                        <td className="fw-bold">{app.policy?.name || "NA"}</td>
                        <td>{app.customer?.firstName || ""} {app.customer?.lastName || ""}</td>
                        <td>{formatDate(app.claim?.claimApplicationDate)}</td>
                        <td>{app.claim?.claimAmount || "NA"}</td>
                        <td>{app.claim?.dateOfAccident || "NA"}</td>
                        <td>{app.claim?.amtApprovedByInspector || "NA"}</td>
                        <td>
                          <span
                            className={`badge ${
                              app.claim?.claimStatus === "Pending"
                                ? "bg-warning text-dark"
                                : app.claim?.claimStatus === "Approved"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {app.claim?.claimStatus || "NA"}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              app.claim?.actionStatus === "Pending"
                                ? "bg-warning text-dark"
                                : app.claim?.actionStatus === "Completed"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {app.claim?.actionStatus || "NA"}
                          </span>
                        </td>
                        <td>{app.claim?.customerClaimResponse || "NA"}</td>
                        <td>
                          {app.claim?.actionStatus === "Pending" && (
                            <button
                              onClick={() => assignClaimId(app.claim?.id)}
                              className="btn btn-sm btn-primary shadow-sm"
                            >
                              Assign Inspector
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-muted fw-bold">
                        No claims found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Inspector Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Assign Inspector</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label fw-bold">Inspector</label>
              <select
                className="form-control"
                value={inspectorId}
                onChange={(e) => setInspectorId(e.target.value)}
              >
                <option value="">Select Inspector</option>
                {inspectors.map((ins, idx) => (
                  <option key={ins.user?.id || ins.id || idx} value={ins.user?.id || ins.id}>
                    {ins.user?.firstName || "NA"}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-success px-4 shadow-sm"
                onClick={updateClaim}
              >
                Assign Inspector
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

export default ViewAllClaims;
