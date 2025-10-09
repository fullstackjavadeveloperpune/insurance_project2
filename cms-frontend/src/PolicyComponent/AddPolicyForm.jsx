import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddPolicyForm = () => {
  let navigate = useNavigate();

  const [addRequest, setAddRequest] = useState({ coverageDetails: [] });
  const [coverageDetails, setCoverageDetails] = useState([]);
  const [coverageDetail, setCoverageDetail] = useState({
    type: "",
    description: "",
    amount: "",
  });

  const handleUserInput = (e) => {
    setAddRequest({ ...addRequest, [e.target.name]: e.target.value });
  };

  const handleUserCoverageInput = (e) => {
    setCoverageDetail({ ...coverageDetail, [e.target.name]: e.target.value });
  };

  const addCoverage = (e) => {
    e.preventDefault();
    if (!coverageDetail.type || !coverageDetail.description || !coverageDetail.amount) {
      toast.error("Please fill in all coverage fields");
      return;
    }
    setCoverageDetails([...coverageDetails, coverageDetail]);
    setCoverageDetail({ type: "", description: "", amount: "" });
  };

  const addPolicy = (e) => {
    e.preventDefault();
    if (!addRequest.plan) {
      toast.error("Please select a policy plan!");
    } else if (coverageDetails.length === 0) {
      toast.error("Please add at least one coverage detail!");
    } else {
      addRequest.coverageDetails = coverageDetails;
      fetch("http://localhost:9000/api/policy/add", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(addRequest),
      })
        .then((result) =>
          result.json().then((res) => {
            if (res.success) {
              toast.success(res.responseMessage);
              setTimeout(() => navigate("/home"), 2000);
            } else {
              toast.error(res.responseMessage);
            }
          })
        )
        .catch(() => toast.error("Server is down. Please try later."));
    }
  };

  return (
    <>
      <div className="container my-5">
        <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />

        <div className="row g-4 justify-content-center">
          {/* Add Policy Form */}
          <div className="col-md-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-header bg-primary text-white text-center rounded-top-4">
                <h5 className="mb-0 fw-bold">➕ Add Policy</h5>
              </div>
              <div className="card-body">
                <form className="text-secondary">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Policy Name</label>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      name="name"
                      onChange={handleUserInput}
                      value={addRequest.name || ""}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="3"
                      name="description"
                      onChange={handleUserInput}
                      value={addRequest.description || ""}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Policy Plan</label>
                    <select
                      name="plan"
                      onChange={handleUserInput}
                      className="form-select rounded-pill"
                    >
                      <option value="">Select Plan</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Premium Amount</label>
                    <input
                      type="number"
                      className="form-control rounded-pill"
                      name="premiumAmount"
                      onChange={handleUserInput}
                      value={addRequest.premiumAmount || ""}
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary rounded-pill fw-bold shadow"
                      onClick={addPolicy}
                    >
                      Add Policy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Add Coverage Form */}
          <div className="col-md-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-header bg-success text-white text-center rounded-top-4">
                <h5 className="mb-0 fw-bold">➕ Add Coverage</h5>
              </div>
              <div className="card-body">
                <form className="text-secondary">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Coverage Type</label>
                    <select
                      name="type"
                      onChange={handleUserCoverageInput}
                      className="form-select rounded-pill"
                    >
                      <option value="">Select Type</option>
                      <option value="Collision">Collision</option>
                      <option value="Comprehensive">Comprehensive</option>
                      <option value="Liability">Liability</option>
                      <option value="Uninsured Motorist">Uninsured Motorist</option>
                      <option value="Medical Payment">Medical Payment</option>
                      <option value="Roadside Assistance">Roadside Assistance</option>
                      <option value="Rental Reimbursement">Rental Reimbursement</option>
                      <option value="Gap Insurance">Gap Insurance</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="3"
                      name="description"
                      onChange={handleUserCoverageInput}
                      value={coverageDetail.description}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Coverage Amount</label>
                    <input
                      type="number"
                      className="form-control rounded-pill"
                      name="amount"
                      onChange={handleUserCoverageInput}
                      value={coverageDetail.amount}
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-success rounded-pill fw-bold shadow"
                      onClick={addCoverage}
                    >
                      Add Coverage
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Coverage Table */}
          <div className="col-md-8">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-header bg-info text-white text-center rounded-top-4">
                <h5 className="mb-0 fw-bold">📋 Coverage Details</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover text-center align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>Policy Type</th>
                        <th>Description</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coverageDetails.length > 0 ? (
                        coverageDetails.map((coverage, index) => (
                          <tr key={index}>
                            <td className="fw-bold">{coverage.type}</td>
                            <td>{coverage.description}</td>
                            <td>₹ {coverage.amount}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-muted">
                            No coverage details added yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------- Footer Section ------------------- */}
      <footer
        className="text-center text-lg-start text-white"
        style={{
          backgroundColor: "#1c2331",
          width: "100%",
          marginTop: "50px",
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

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Insurance Management System</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}/>
                <p>
                  The Insurance Management System helps manage insurance policies,
                  claims, and customers efficiently using modern tools and technologies.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}/>
                <p><a href="#!" className="text-white">Health Insurance</a></p>
                <p><a href="#!" className="text-white">Vehicle Insurance</a></p>
                <p><a href="#!" className="text-white">Travel Insurance</a></p>
                <p><a href="#!" className="text-white">Life Insurance</a></p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Contact Us</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}/>
                <p><a href="#!" className="text-white">Your Account</a></p>
                <p><a href="#!" className="text-white">Help</a></p>
                <p><a href="#!" className="text-white">Contact Us</a></p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}/>
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
    </>
  );
};

export default AddPolicyForm;
