import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAllInspectors = () => {
  const [allInspectors, setAllInspectors] = useState([]);

  useEffect(() => {
    fetchInspectors();
  }, []);

  const fetchInspectors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/user/fetch/all?role=inspector"
      );
      setAllInspectors(response.data.users || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch inspectors", { autoClose: 1500 });
    }
  };

  return (
    // Make the page a flex container with column direction
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Main content will grow to fill available space */}
      <div style={{ flex: "1" }}>
        <div className="d-flex justify-content-center mt-4">
          <div className="card shadow-lg rounded-4 border-0" style={{ width: "95%" }}>
            {/* Header */}
            <div
              className="card-header text-center text-white py-3"
              style={{
                background: "linear-gradient(135deg, #0d6efd, #20c997)",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
              }}
            >
              <h2 className="mb-0">All Inspectors</h2>
            </div>

            {/* Body */}
            <div className="card-body" style={{ overflowY: "auto", maxHeight: "60vh" }}>
              <div className="table-responsive">
                <table className="table table-hover text-center align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email Id</th>
                      <th>Phone No</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allInspectors.length > 0 ? (
                      allInspectors.map((inspector, index) => (
                        <tr key={index}>
                          <td>{inspector.user.firstName}</td>
                          <td>{inspector.user.lastName}</td>
                          <td>{inspector.user.emailId}</td>
                          <td>{inspector.user.contact}</td>
                          <td>{inspector.user.age}</td>
                          <td>{inspector.user.gender}</td>
                          <td>{`${inspector.user.street}, ${inspector.user.city}, ${inspector.user.pincode}`}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-muted">
                          No inspectors found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>

      {/* Sticky Footer */}
      <footer
        className="text-center text-lg-start text-white mt-5"
        style={{
          backgroundColor: "#1c2331",
          width: "100%",
          marginTop: "auto", // ensures footer sticks at the bottom
        }}
      >
        <div>
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

        <section className="">
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

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2025 Full Stack Java Developer | All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default ViewAllInspectors;
