import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [usernames, setUsernames] = useState([]);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
  });

  function getData(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }
  useEffect(() => {
    const storedUsernames = JSON.parse(localStorage.getItem("usernames")) || [];
    setUsernames(storedUsernames);
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    if (!isChecked) {
      setError("You must agree to the terms of service");
      return;
    }
    let statusError = validation();
    if (statusError?.error) {
      setErrors(statusError?.error.details);
    } else {
      axios
        .post("http://hawas.runasp.net/api/v1/Register", formData)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("currentUser", formData.email);
          navigate("/Login");
        })
        .catch((err) => {
          console.log(err);
          setError(err.response?.data?.message || "Registration failed");
        });
    }
  }

  function validation() {
    let schema = Joi.object({
      userName: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
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

      rePassword: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": "Passwords do not match",
      }),
      dateOfBirth: Joi.date().iso().max("2020-12-31").required().messages({
        "date.max": "You must be born before 2021",
      }),
    });
    return schema.validate(formData, { abortEarly: false });
  }

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="text-black">
                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-5">
                        Sign up
                      </p>
                      {error.length ? (
                        <h6 className="alert alert-danger">{error}</h6>
                      ) : (
                        <></>
                      )}
                      {errors.length > 0 ? (
                        errors.map((err, i) => (
                          <h6 key={i} className="alert alert-danger">
                            {err.message}
                          </h6>
                        ))
                      ) : (
                        <></>
                      )}
                      <form onSubmit={submitHandler} className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="userName">
                              User Name
                            </label>
                            <input
                              onChange={getData}
                              name="userName"
                              type="text"
                              id="userName"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-calendar fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="dateOfBirth">
                              Birth Date
                            </label>
                            <input
                              onChange={getData}
                              name="dateOfBirth"
                              type="date"
                              id="dateOfBirth"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="email">
                              Your Email
                            </label>
                            <input
                              onChange={getData}
                              name="email"
                              type="email"
                              id="email"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                            <input
                              onChange={getData}
                              name="password"
                              type="password"
                              id="password"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="rePassword">
                              Confirm Password
                            </label>
                            <input
                              onChange={getData}
                              name="rePassword"
                              type="password"
                              id="rePassword"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3c"
                          >
                            I agree to all statements in{" "}
                            <Link to="#!">Terms of service</Link>
                          </label>
                        </div>
                        <div className="d-flex justify-content-between col-10 text-center text-lg-start mt-4 pt-2">
                          <button
                            type="submit"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-dark btn-lg pe-4 ps-4"
                          >
                            Register
                          </button>
                          <p className="small fw-bold mt-2 pt-1 mb-0">
                            Have an account?{" "}
                            <Link to="/Login" className="link-primary">
                              Login
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
