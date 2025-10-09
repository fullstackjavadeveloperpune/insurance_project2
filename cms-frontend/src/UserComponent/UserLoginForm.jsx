import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";
import Footer from "../NavbarComponent/Footer"; // Import your Insurance Footer

const UserLoginForm = () => {
  const navigate = useNavigate();
  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    e.preventDefault();

    fetch("http://localhost:9000/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1200 });
          setTimeout(() => {
            window.location.href = "/home";
          }, 1200);

          if (res.user.role === "admin") {
            sessionStorage.setItem("active-admin", JSON.stringify(res.user));
            sessionStorage.setItem("admin-jwtToken", res.jwtToken);
          } else if (res.user.role === "customer") {
            sessionStorage.setItem("active-customer", JSON.stringify(res.user));
            sessionStorage.setItem("customer-jwtToken", res.jwtToken);
          } else if (res.user.role === "inspector") {
            sessionStorage.setItem("active-inspector", JSON.stringify(res.user));
            sessionStorage.setItem("inspector-jwtToken", res.jwtToken);
          }
        } else {
          toast.error(res.responseMessage, { position: "top-center", autoClose: 1200 });
        }
      })
      .catch(() => {
        toast.error("It seems server is down", { position: "top-center", autoClose: 1200 });
      });
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #f0f8ff, #e0f7fa)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="d-flex justify-content-center align-items-center flex-grow-1" style={{ padding: "2rem" }}>
        <div className="card shadow-lg rounded-4 border-0" style={{ width: "28rem", animation: "fadeIn 1s" }}>
          {/* Header */}
          <div className="card-header text-center text-white py-4 rounded-top-4" style={{ background: "linear-gradient(135deg, #0d6efd, #20c997)", fontSize: "1.6rem", fontWeight: "700", letterSpacing: "1px" }}>
            Login to Your Account
          </div>

          {/* Body */}
          <div className="card-body p-4" style={{ backgroundColor: "#ffffff" }}>
            <form onSubmit={loginAction}>
              {/* Role */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Select Role</label>
                <div className="input-group shadow-sm rounded-3">
                  <span className="input-group-text bg-white"><FaUserShield /></span>
                  <select name="role" onChange={handleUserInput} value={loginRequest.role} className="form-select form-select-lg border-start-0 rounded-end-3" required>
                    <option value="">Choose role...</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                    <option value="inspector">Inspector</option>
                  </select>
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <div className="input-group shadow-sm rounded-3">
                  <span className="input-group-text bg-white"><FaEnvelope /></span>
                  <input type="email" className="form-control form-control-lg border-start-0 rounded-end-3" id="emailId" name="emailId" placeholder="Enter your email" value={loginRequest.emailId} onChange={handleUserInput} required />
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group shadow-sm rounded-3">
                  <span className="input-group-text bg-white"><FaLock /></span>
                  <input type="password" className="form-control form-control-lg border-start-0 rounded-end-3" id="password" name="password" placeholder="Enter your password" value={loginRequest.password} onChange={handleUserInput} autoComplete="on" required />
                </div>
              </div>

              {/* Login Button */}
              <div className="d-grid mt-4">
                <button type="submit" className="btn text-white shadow-lg" style={{ background: "linear-gradient(135deg, #0d6efd, #20c997)", padding: "0.75rem 3rem", fontWeight: 600, borderRadius: "50px", fontSize: "1.1rem", transition: "all 0.3s ease" }}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Insurance App Footer */}
      <Footer />

      <ToastContainer />
    </div>
  );
};

export default UserLoginForm;
