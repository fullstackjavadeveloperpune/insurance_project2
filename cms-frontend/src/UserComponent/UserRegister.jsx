import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome, FaCity, FaHashtag } from "react-icons/fa";
import Footer from "../NavbarComponent/Footer"; // Import your saved Insurance Footer

const UserRegister = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    if (document.URL.includes("customer")) setUser(prev => ({ ...prev, role: "customer" }));
    else if (document.URL.includes("inspector")) setUser(prev => ({ ...prev, role: "inspector" }));
    else if (document.URL.includes("irda")) setUser(prev => ({ ...prev, role: "irda" }));
  }, []);

  const handleUserInput = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const saveUser = (e) => {
    e.preventDefault();
    if (!user.gender) {
      toast.error("Please select gender!", { position: "top-center" });
      return;
    }

    fetch("http://localhost:9000/api/user/register", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1500 });
          setTimeout(() => navigate("/user/login"), 1500);
        } else {
          toast.error(res.responseMessage || "Server Error", { position: "top-center", autoClose: 1500 });
        }
      })
      .catch(() => toast.error("Server seems down!", { position: "top-center", autoClose: 1500 }));
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #f0f8ff, #e0f7fa)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="d-flex justify-content-center align-items-center flex-grow-1" style={{ padding: "2rem" }}>
        <div className="card shadow-lg rounded-4 border-0" style={{ width: "50rem", maxWidth: "95%", animation: "fadeIn 1s" }}>
          {/* Header */}
          <div className="card-header text-center text-white py-4 rounded-top-4" style={{ background: "linear-gradient(135deg, #0d6efd, #20c997)", fontSize: "1.6rem", fontWeight: "700", letterSpacing: "1px" }}>
            Welcome to Insurance Management
          </div>

          {/* Sub-header */}
          <div className="text-center mt-3 mb-4">
            <p className="text-muted">Create your account and manage your policies effortlessly.</p>
          </div>

          {/* Form */}
          <div className="card-body p-4" style={{ backgroundColor: "#ffffff" }}>
            <form className="row g-4" onSubmit={saveUser}>
              <div className="col-md-6">
                <label className="form-label fw-semibold">First Name</label>
                <div className="input-group shadow-sm rounded-3">
                  <span className="input-group-text bg-white"><FaUser /></span>
                  <input type="text" name="firstName" value={user.firstName} onChange={handleUserInput} className="form-control form-control-lg border-start-0 rounded-end-3" placeholder="Enter first name" required />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Last Name</label>
                <div className="input-group shadow-sm rounded-3">
                  <span className="input-group-text bg-white"><FaUser /></span>
                  <input type="text" name="lastName" value={user.lastName} onChange={handleUserInput} className="form-control form-control-lg border-start-0 rounded-end-3" placeholder="Enter last name" required />
                </div>
              </div>

              {/* Other fields */}
              {[
                { label: "Email ID", name: "emailId", type: "email", icon: <FaEnvelope /> },
                { label: "Password", name: "password", type: "password", icon: <FaLock /> },
                { label: "Contact No", name: "contact", type: "tel", icon: <FaPhone /> },
                { label: "Age", name: "age", type: "number", icon: <FaUser /> },
                { label: "Street Address", name: "street", type: "text", icon: <FaHome /> },
                { label: "City", name: "city", type: "text", icon: <FaCity /> },
                { label: "Pincode", name: "pincode", type: "number", icon: <FaHashtag /> },
              ].map((field, idx) => (
                <div className="col-md-6" key={idx}>
                  <label className="form-label fw-semibold">{field.label}</label>
                  <div className="input-group shadow-sm rounded-3">
                    <span className="input-group-text bg-white">{field.icon}</span>
                    <input type={field.type} name={field.name} value={user[field.name]} onChange={handleUserInput} className="form-control form-control-lg border-start-0 rounded-end-3" placeholder={`Enter ${field.label.toLowerCase()}`} required />
                  </div>
                </div>
              ))}

              {/* Gender */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Gender</label>
                <select name="gender" value={user.gender} onChange={handleUserInput} className="form-select form-select-lg shadow-sm rounded-3" required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Submit */}
              <div className="col-12 text-center mt-4">
                <button type="submit" className="btn text-white shadow-lg" style={{ background: "linear-gradient(135deg, #0d6efd, #20c997)", padding: "0.9rem 3rem", fontWeight: 700, borderRadius: "50px", fontSize: "1.2rem", transition: "all 0.3s ease" }}>Register Now</button>
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

export default UserRegister;
