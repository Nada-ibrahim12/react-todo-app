import React from "react";

export default function Home() {
  return (
    <div>
      <div className="container-fluid h-custom mt-5 pt-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="container text-center mt-5">
            <h1>Welcome to the To-Do App</h1>
            <p className="lead mt-3">
              Stay organized and manage your tasks efficiently with our simple
              and easy-to-use To-Do app. Let's get started by adding your tasks!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
