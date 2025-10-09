import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFileInvoiceDollar, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";

const AddClaim = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const application = location.state;

  const [claimRequest, setClaimRequest] = useState({
    customerId: application.user.id,
    policyApplicationId: application.id,
    policyId: application.policy.id,
    accidentDate: "",
    claimAmount: "",
  });

  const handleUserInput = (e) => {
    setClaimRequest({ ...claimRequest, [e.target.name]: e.target.value });
  };

  const addClaim = (e) => {
    e.preventDefault();
    if (!claimRequest.accidentDate || !claimRequest.claimAmount) {
      toast.error("Please fill all fields", { position: "top-center", autoClose: 1500 });
      return;
    }

    fetch("http://localhost:9000/api/claim/add", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(claimRequest),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1500 });
          setTimeout(() => navigate("/home"), 2000);
        } else {
          toast.error(res.responseMessage, { position: "top-center", autoClose: 1500 });
        }
      })
      .catch(() => toast.error("Server is down", { position: "top-center", autoClose: 1500 }));
  };

  return (
    <div className="container my-5">
      <ToastContainer />

      {/* Policy Summary Panel */}
      <div className="card shadow-lg border-0 rounded-4 mb-4" style={{ background: "#e3f2fd" }}>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5><FaFileInvoiceDollar className="me-2 text-primary" /> {application.policy.name}</h5>
            <p>Plan: {application.policy.plan} | Premium: ₹ {application.policy.premiumAmount}</p>
          </div>
          <div>
            <span className="badge bg-success">
              <FaCheckCircle className="me-1" /> Active
            </span>
          </div>
        </div>
      </div>

      {/* Floating Claim Form Card */}
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ background: "#fdfdfd", position: "relative", top: "-30px" }}>
        <h4 className="text-center mb-4" style={{ color: "#0072ff" }}>📄 Add New Claim</h4>

        <form onSubmit={addClaim}>
          {/* Accident Date */}
          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              id="accidentDate"
              name="accidentDate"
              value={claimRequest.accidentDate}
              onChange={handleUserInput}
            />
            <label htmlFor="accidentDate"><FaCalendarAlt className="me-2 text-primary" /> Accident Date</label>
          </div>

          {/* Claim Amount */}
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="claimAmount"
              name="claimAmount"
              value={claimRequest.claimAmount}
              onChange={handleUserInput}
            />
            <label htmlFor="claimAmount"><FaMoneyBillWave className="me-2 text-success" /> Claim Amount</label>
          </div>

          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn btn-lg fw-bold text-white"
              style={{
                background: "linear-gradient(135deg, #00c6ff, #0072ff)",
                borderRadius: "30px",
                padding: "0.6rem 2rem",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.background = "linear-gradient(135deg,#005bea,#00c6ff)")}
              onMouseOut={(e) => (e.target.style.background = "linear-gradient(135deg, #00c6ff, #0072ff)")}
            >
              Submit Claim
            </button>
          </div>
        </form>

        {/* Dynamic Claim Preview */}
        {claimRequest.accidentDate && claimRequest.claimAmount && (
          <div className="mt-4 p-3 border rounded-3" style={{ background: "#e3f2fd" }}>
            <h6 className="fw-bold">Preview:</h6>
            <p>Accident Date: {claimRequest.accidentDate}</p>
            <p>Claim Amount: ₹ {claimRequest.claimAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddClaim;
