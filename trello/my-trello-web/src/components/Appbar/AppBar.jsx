import { useState, React } from "react";
import "./Appbar.scss";

function AppBar() {
  const [toggle, setToggle] = useState(false);
  const ToggleLink = (e) => {
    if (e.target) {
      setToggle(!toggle);
    }
  };
  
  const linkmenu = `${toggle ? "show" : "hide"}`;
 return (
    <nav
      className="navbar navbar-expand-lg  navbar-light text-light"
      style={{ background: "#184a70"}}
    >
      <a className="navbar-brand text-light" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler "
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active ">
            <a className="nav-link text-light" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="null">
              Link
            </a>
          </li>
          <li className="nav-item dropdown" onClick={ToggleLink}>
            <a className="nav-link dropdown-toggle text-light" href="null">
              Dropdown
            </a>
            <div
              className={`dropdown-menu ${linkmenu}`}
              aria-labelledby="navbarDropdown"
            
            >
            
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">
              Disabled
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default AppBar;
