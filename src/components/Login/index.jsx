import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";

export default function Login({ saveDataUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const getData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validation();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    axios
      .post("http://hawas.runasp.net/api/v1/Login", formData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("Token", res.data.jwt);
        localStorage.setItem("currentUser", formData.email);
        saveDataUser();
        navigate("/welcomePage");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Invalid email or password");
      });
  };

  const validation = () => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .min(8)
        .max(30)
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$"
          )
        )
        .required()
        .messages({
          "string.base": "Password must be a string",
          "string.empty": "Password cannot be empty",
          "string.min": "Password must be at least {#limit} characters long",
          "string.max":
            "Password must be less than or equal to {#limit} characters",
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          "any.required": "Password is required",
        }),
    });

    const { error } = schema.validate(formData, { abortEarly: false });
    return error ? error.details : null;
  };

  return (
    <div>
      <section className="vh-75 mt-5 pt-5">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <p className="text-center h1 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                Login
              </p>
              {error && <h6 className="alert alert-danger">{error}</h6>}
              {errors.length > 0 &&
                errors.map((err, i) => (
                  <h6 key={i} className="alert alert-danger">
                    {err.message}
                  </h6>
                ))}
              <form onSubmit={submitHandler}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                  <input
                    onChange={getData}
                    name="email"
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                  <input
                    onChange={getData}
                    name="password"
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <Link to="#!" className="text-body">
                    Forgot password?
                  </Link>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg pe-4 ps-4"
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to="#!" className="link-primary">
                      Register
                    </Link>
                  </p>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                  <div className="divider d-flex align-items-center my-4 col-12">
                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                  </div>
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                  <button
                    type="button"
                    className="btn btn-dark btn-floating mx-1"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-dark btn-floating mx-1"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-dark btn-floating mx-1"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
