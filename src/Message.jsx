import "./App.css";

let tyyli = "";

const Message = ({ message, isPositive }) => {
  if (isPositive === true) {
    tyyli = "pos";
  } else {
    tyyli = "neg";
  }

  return <div className={tyyli}>{message}</div>;
};

export default Message;
