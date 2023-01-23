import "./Invoice.css";
import arrow from "../assets/icon-arrow-right.svg";
import { useDispatch } from "react-redux";
import invoicesPageSlice from "../store/invoicesPageSlice";
import invoiceDetailsPageSlice from "../store/invoiceDetailsPageSlice";
import moment from "moment";

function Invoice(props) {
  const dispatch = useDispatch();
  const { hideInvoicesPage } = invoicesPageSlice.actions;
  const { showInvoiceDetailsPage, setInvoiceID } =
    invoiceDetailsPageSlice.actions;

  function handleInvoiceBox() {
    dispatch(hideInvoicesPage());
    dispatch(showInvoiceDetailsPage());
    dispatch(setInvoiceID(props.invoice.id));
  }

  return (
    <div className="invoice-box" onClick={handleInvoiceBox}>
      <p className="invoice-id">
        <span>#</span>
        {props.invoice.id}
      </p>
      <p className="payment-due">
        Due {moment(props.invoice.paymentDue).format("DD MMM YYYY")}
      </p>
      <p className="client-name">{props.invoice.clientName}</p>
      <p className="total">
        £{" "}
        {props.invoice.total.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
      <p className={`status ${props.invoice.status}`}>
        <span>&bull;</span>
        {props.invoice.status}
      </p>
      <img src={arrow} alt="left arrow" className="arrow" />
    </div>
  );
}

export default Invoice;
