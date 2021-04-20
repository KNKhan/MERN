import "./Header.css";
import micon from "../Assets/images/maleicon.png";
import emailicon from "../Assets/images/maleicon.png";

function Header(props) {
  return (
    <div>
      {props.user ? (
        <header>
          <div>
            <img src={micon} alt="usericon" className="usericon" />
            Welcome - <span className="name">{props.user.name}</span>!
          </div>
          <div className="email">
            <img src={emailicon} alt="usericon" className="usericon" />
            {props.user.email}
          </div>
        </header>
      ) : (
        ""
      )}
    </div>
  );
}
export default Header;
