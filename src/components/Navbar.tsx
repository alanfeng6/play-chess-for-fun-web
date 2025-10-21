const Navbar = () => {
  return (
    <nav className="navbar bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{color: "white"}}>
          <img
            src="./logo.jpg"
            alt="Logo"
            width="50"
            height="50"
            style={{marginRight: "10px"}}
            className="d-inline-block"
          ></img>
          Play Chess For Fun
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
