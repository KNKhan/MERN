import "./Alert.css";
import close from "../Assets/images/close.png";

function Alert(props) {
  return (
    <div className="cover">
      <div className="cell">
          <div className="content">
            <div className="close"><img src={close} alt="close" /></div>
            {props.text}
          </div>
      </div>
    </div>
  );
}
export default Alert;
