import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PolicyDetail = () => {
  const navigate = useNavigate();
  const { policyId } = useParams();
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));

  const [policy, setPolicy] = useState({});

  const retrievePolicy = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/policy/fetch?policyId=${policyId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch policy data", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    const getPolicy = async () => {
      const res = await retrievePolicy();
      if (res) setPolicy(res.policies[0]);
    };
    getPolicy();
  }, []);

  const applyPolicy = async (policyId) => {
    if (!customer) {
      toast.info("Please login as Customer to apply");
      return;
    }

    try {
      const result = await fetch(
        "http://localhost:9000/api/policy/application/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: customer.id,
            policyId: policyId,
          }),
        }
      );

      const res = await result.json();
      if (res.success) {
        toast.success(res.responseMessage, { autoClose: 1500 });
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error(res.responseMessage, { autoClose: 1500 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error, please try again later", { autoClose: 1500 });
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <div className="row g-4">
        {/* Policy Info Card */}
        <div className="col-lg-4 col-md-12">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-primary text-white text-center rounded-top-4">
              <h4 className="mb-0">Policy Details</h4>
            </div>
            <div className="card-body">
              <p className="fw-bold mb-2">Policy Name: <span className="text-secondary">{policy.name}</span></p>
              <p className="fw-bold mb-2">Policy ID: <span className="text-secondary">{policy.policyId}</span></p>
              <p className="fw-bold mb-2">Description: <span className="text-secondary">{policy.description}</span></p>
              <p className="fw-bold mb-2">Plan: <span className="text-secondary">{policy.plan}</span></p>
              <p className="fw-bold mb-3">Premium: <span className="text-success">₹{policy.premiumAmount}</span></p>
              <button
                onClick={() => applyPolicy(policy.id)}
                className="btn btn-primary w-100 py-2 fw-bold rounded-3"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Coverage Details Card */}
        <div className="col-lg-8 col-md-12">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-primary text-white text-center rounded-top-4">
              <h4 className="mb-0">Coverage Details</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col">Policy Type</th>
                      <th scope="col">Description</th>
                      <th scope="col">Coverage Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {policy.coverageDetailsList &&
                      policy.coverageDetailsList.map((coverage, idx) => (
                        <tr key={idx}>
                          <td className="fw-bold">{coverage.type}</td>
                          <td>{coverage.description}</td>
                          <td className="text-success fw-bold">₹{coverage.amount}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetail;
