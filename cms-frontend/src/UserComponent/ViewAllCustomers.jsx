import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

const ViewAllCustomers = () => {
  const [allCustomer, setAllCustomer] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/user/fetch/all?role=customer"
      );
      setAllCustomer(response.data.users || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch customers", { autoClose: 1500 });
    }
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      const response = await axios.delete(
        `http://localhost:9000/api/user/delete?userId=${id}`
      );

      if (response.data.success) {
        toast.success(response.data.responseMessage, { autoClose: 1500 });
        fetchCustomers(); // Refresh list
      } else {
        toast.error(response.data.responseMessage || "Delete failed", { autoClose: 1500 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Try again later.", { autoClose: 1500 });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Main Content */}
      <div className="mt-3 flex-grow-1">
        <div className="card shadow-lg rounded-4 border-0 ms-2 me-2 mb-5">
          <div
            className="card-header text-center text-white py-3"
            style={{ background: "linear-gradient(135deg, #0d6efd, #20c997)" }}
          >
            <h2 className="mb-0">All Customers</h2>
          </div>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allCustomer.length > 0 ? (
                    allCustomer.map((customer, index) => (
                      <tr key={index}>
                        <td>{customer.user.firstName}</td>
                        <td>{customer.user.lastName}</td>
                        <td>{customer.user.emailId}</td>
                        <td>{customer.user.contact}</td>
                        <td>{customer.user.age}</td>
                        <td>{customer.user.gender}</td>
                        <td>{`${customer.user.street}, ${customer.user.city}, ${customer.user.pincode}`}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => deleteCustomer(customer.user.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-muted">
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>

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

export default ViewAllCustomers;
