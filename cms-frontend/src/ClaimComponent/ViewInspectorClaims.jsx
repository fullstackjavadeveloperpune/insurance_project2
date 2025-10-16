import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Badge } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewInspectorClaims = () => {
  const navigate = useNavigate();
  const inspector = JSON.parse(sessionStorage.getItem("active-inspector"));

  const [applications, setApplications] = useState([]);
  const [claim, setClaim] = useState({});
  const [actionStatus, setActionStatus] = useState("");
  const [amtApprovedByInspector, setAmtApprovedByInspector] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const updateClaimStatus = (claim) => {
    setClaim(claim);
    setActionStatus("");
    setAmtApprovedByInspector("");
    handleShow();
  };

  useEffect(() => {
    const getApplication = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/claim/fetch/inspector-wise?inspectorId=${inspector.id}`
        );
        setApplications(response.data.claims || []);
      } catch (error) {
        toast.error("Failed to fetch claims", { position: "top-center", autoClose: 1500 });
      }
    };
    if (inspector) getApplication();
  }, [inspector]);

  const formatDateFromEpoch = (epochTime) => {
    if (!epochTime) return "NA";
    const date = new Date(Number(epochTime));
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

   const updateClaim = (e) => {
    e.preventDefault();

    let data;

    if (actionStatus === "") {
      alert("Please select the Claim Status");
    } else if (actionStatus === "Approved" && amtApprovedByInspector === "") {
      alert("Please select the Claim Approved amount!!!");
    } else {
      fetch("http://localhost:9000/api/claim/inspector/update", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionStatus: actionStatus,
          claimId: claim.id,
          amtApprovedByInspector: amtApprovedByInspector,
        }),
      })
        .then((result) => {
          console.log("result", result);
          result.json().then((res) => {
            if (res.success) {
              toast.success(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              setTimeout(() => {
                navigate("/home");
              }, 2000); // Redirect after 3 seconds
            } else {
              toast.error(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const getBadge = (text) => {
    switch (text) {
      case "Open":
      case "Assigned to Inspector":
        return <Badge bg="info">{text}</Badge>;
      case "Accepted":
      case "Approved":
        return <Badge bg="success">{text}</Badge>;
      case "Rejected":
      case "Withdraw":
        return <Badge bg="danger">{text}</Badge>;
      default:
        return <Badge bg="secondary">{text}</Badge>;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f0f8ff" }}>
      {/* Main Content */}
      <div style={{ flex: "1", padding: "2rem" }}>
        <div className="card shadow-lg rounded-4 border-0 mx-auto" style={{ maxWidth: "98%" }}>
          <div
            className="card-header text-center text-white py-3 rounded-top-4"
            style={{ background: "linear-gradient(135deg, #0d6efd, #20c997)", fontWeight: 700, fontSize: "1.5rem" }}
          >
            Assigned Claims For Survey
          </div>

          <div className="card-body p-4" style={{ backgroundColor: "#ffffff", overflowX: "auto" }}>
            <table className="table table-hover table-bordered text-center align-middle">
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
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="10">No claims assigned.</td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.claim.id}>
                      <td>{app.policy.name}</td>
                      <td>{app.customer.firstName + " " + app.customer.lastName}</td>
                      <td>{formatDateFromEpoch(app.claim.claimApplicationDate)}</td>
                      <td>{app.claim.claimAmount}</td>
                      <td>{app.claim.dateOfAccident}</td>
                      <td>{app.claim.amtApprovedByInspector || "NA"}</td>
                      <td>{getBadge(app.claim.claimStatus)}</td>
                      <td>{getBadge(app.claim.actionStatus)}</td>
                      <td>{getBadge(app.claim.customerClaimResponse)}</td>
                      <td>
                        {app.claim.actionStatus === "Assigned to Inspector" && (
                          <button
                            onClick={() => updateClaimStatus(app.claim)}
                            className="btn btn-sm text-white shadow"
                            style={{ background: "linear-gradient(135deg, #0d6efd, #20c997)", borderRadius: "20px" }}
                          >
                            Update Status
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

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton style={{ background: "#0d6efd", color: "#fff" }}>
          <Modal.Title>Update Customer Claim Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="p-2">
            <div className="mb-3">
              <label className="form-label"><b>Claim Application Date</b></label>
              <input type="text" className="form-control" value={formatDateFromEpoch(claim.claimApplicationDate)} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label"><b>Accident Date</b></label>
              <input type="text" className="form-control" value={claim.dateOfAccident} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label"><b>Customer Claim Amount</b></label>
              <input type="text" className="form-control" value={claim.claimAmount} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label"><b>Claim Status</b></label>
              <select className="form-control" value={actionStatus} onChange={(e) => setActionStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            {actionStatus === "Accepted" && (
              <div className="mb-3">
                <label className="form-label"><b>Approved Amount</b></label>
                <input
                  type="number"
                  className="form-control"
                  value={amtApprovedByInspector}
                  onChange={(e) => setAmtApprovedByInspector(e.target.value)}
                />
              </div>
            )}
            <div className="d-flex justify-content-center gap-2">
              <Button onClick={updateClaim} style={{ background: "linear-gradient(135deg, #0d6efd, #20c997)", border: "none" }}>Update Claim</Button>
              <ToastContainer />
            </div>
          </form>
        </Modal.Body>
      </Modal>

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
    </div>
  );
};

export default ViewInspectorClaims;
