import React from "react";

function Login() {
  return (
    <div className="container my-5  p-1" style={{ height: "400px" }}>
      <div className="mx-auto  text-dark font-weight-bold  text-center w-50  h-100">
        <div className="trello-form ">
          <div className="h3 d-flex flex-column h-50 al  ">
            <span>
              <i class="bi bi-trello ">icon</i>
              <h4 className="d-inline mx-2">TRELLO</h4>
            </span>
            <p className="h4 my-2">Log to conitnue</p>
            <form>
              {" "}
              <div className="form-group">
                <input className="form-control" placeholder="Password" />
              </div>
              <button type="submit" class="w-100 my-4 btn btn-primary mb-2">
                continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
