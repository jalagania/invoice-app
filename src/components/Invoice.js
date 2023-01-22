import "./Invoice.css";
import arrow from "../assets/icon-arrow-right.svg";

function Invoice(props) {
  return (
    <div className="invoice-box">
      <p className="invoice-id">
        <span>#</span>
        {props.invoice.id}
      </p>
      <p className="payment-due">Due {props.invoice.paymentDue}</p>
      <p className="client-name">{props.invoice.clientName}</p>
      <p className="total">
        £{" "}
        {props.invoice.total.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
      <p className={`status ${props.invoice.status.toLowerCase()}`}>
        <span>&bull;</span>
        {props.invoice.status}
      </p>
      <img src={arrow} alt="left arrow" className="arrow" />
    </div>
  );
}

export default Invoice;
