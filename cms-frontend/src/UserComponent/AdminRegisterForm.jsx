import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Footer from "../NavbarComponent/Footer"; // make sure this path is correct

const AdminRegisterForm = () => {
  const navigate = useNavigate();
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  const [registerRequest, setRegisterRequest] = useState({});

  const handleUserInput = (e) => {
    setRegisterRequest({ ...registerRequest, [e.target.name]: e.target.value });
  };

  const registerAdmin = (e) => {
    e.preventDefault();
    fetch("http://localhost:9000/api/user/admin/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(registerRequest),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { autoClose: 1500 });
          setTimeout(() => navigate("/home"), 1500);
        } else {
          toast.error(res.responseMessage || "Server Error", { autoClose: 1500 });
        }
      })
      .catch(() => {
        toast.error("Server is down. Try again later.", { autoClose: 1500 });
      });
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ minHeight: "100vh", background: "#e9f5f9" }}
    >
      {/* Main Card */}
      <div className="d-flex justify-content-center align-items-start mt-4 mb-4 flex-grow-1">
        <div className="card shadow-lg rounded-4 border-0" style={{ width: "32rem" }}>
          {/* Header */}
          <div
            className="card-header text-center text-white py-4"
            style={{ background: "linear-gradient(135deg, #0d6efd, #20c997)" }}
          >
            <h3 className="mb-0 fw-bold">Admin Registration</h3>
          </div>

          {/* Body */}
          <div className="card-body p-4" style={{ backgroundColor: "#ffffff" }}>
            <form>
              <div className="mb-4">
                <label htmlFor="emailId" className="form-label fw-semibold text-dark">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg shadow-sm"
                  id="emailId"
                  name="emailId"
                  placeholder="Enter admin email"
                  value={registerRequest.emailId || ""}
                  onChange={handleUserInput}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold text-dark">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg shadow-sm"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={registerRequest.password || ""}
                  onChange={handleUserInput}
                  autoComplete="on"
                />
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn text-white shadow"
                  onClick={registerAdmin}
                  style={{ background: "linear-gradient(135deg, #0d6efd, #20c997)", fontWeight: "600", padding: "0.75rem" }}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />

      <ToastContainer />
    </div>
  );
};

export default AdminRegisterForm;
