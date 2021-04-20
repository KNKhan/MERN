import "./Header.css";
import micon from "../Assets/images/maleicon.png";
import emailicon from "../Assets/images/maleicon.png";
import logouticon from "../Assets/images/logout.png";

function Header(props) {
  function logOut() {
    window.location.replace("/");
  }

  return (
    <div>
      {props.user ? (
        <header>
          <div>
            <img src={micon} alt="user" className="icon" />
            Welcome - <span className="username">{props.user.name}</span>!
          </div>
          <div className="rightsec">
            <img src={emailicon} alt="email" className="icon" />
            {props.user.email}
            <img
              src={logouticon}
              alt="logout"
              className="icon pointer"
              onClick={logOut}
            />
          </div>
        </header>
      ) : (
        ""
      )}
    </div>
  );
}
export default Header;
