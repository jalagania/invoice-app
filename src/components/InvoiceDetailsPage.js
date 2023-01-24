import "./InvoiceDetailsPage.css";
import { useDispatch, useSelector } from "react-redux";
import arrow from "../assets/icon-arrow-left.svg";
import moment from "moment";
import invoicesPageSlice from "../store/invoicesPageSlice";
import invoiceDetailsPageSlice from "../store/invoiceDetailsPageSlice";
import modalDeleteSLice from "../store/modalDeleteSlice";
import dataSlice from "../store/dataSlice";

function InvoiceDetailsPage() {
  const dispatch = useDispatch();
  const { showInvoicesPage } = invoicesPageSlice.actions;
  const { hideInvoiceDetailsPage } = invoiceDetailsPageSlice.actions;
  const { openModalDelete } = modalDeleteSLice.actions;
  const { markInvoiceAsPaid } = dataSlice.actions;
  const { appData } = useSelector((store) => store.data);
  const { invoiceID } = useSelector((store) => store.invoiceDetailsPage);
  const invoice = appData.find((invoice) => invoice.id === invoiceID);

  function handleGoBack() {
    dispatch(hideInvoiceDetailsPage());
    dispatch(showInvoicesPage());
  }

  function handleInvoiceDelete() {
    dispatch(openModalDelete());
  }

  function handleMarkAsPaid() {
    if (invoice.status === "pending") {
      dispatch(markInvoiceAsPaid(invoiceID));
    }
  }

  return (
    <div className="invoice-details-container">
      <button className="btn-go-back" onClick={handleGoBack}>
        <img src={arrow} alt="left arrow" />
        <span>Go back</span>
      </button>
      <div className="invoice-status-box">
        <p className="status-text">Status</p>
        <p className={`status ${invoice.status}`}>
          <span>&bull;</span>
          {invoice.status}
        </p>
        <div className="invoice-details-buttons">
          <button className="btn btn-edit">Edit</button>
          <button className="btn btn-delete" onClick={handleInvoiceDelete}>
            Delete
          </button>
          <button className="btn btn-mark-paid" onClick={handleMarkAsPaid}>
            Mark as Paid
          </button>
        </div>
      </div>
      <div className="invoice-details-box">
        <div className="invoce-details-info">
          <div className="invoice-id-box">
            <p className="invoice-details-id">
              <span>#</span>
              {invoice.id}
            </p>
            <p className="invoice-description">{invoice.description}</p>
          </div>
          <div className="invoice-sender-address">
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
          <div className="invoice-details-date">
            <p className="invoice-date-text">Invoice Date</p>
            <p className="invoice-created">
              {moment(invoice.createdAt).format("DD MMM YYYY")}
            </p>
          </div>
          <div className="invoice-details-billTo">
            <p className="invoice-client-text">Bill To</p>
            <p className="invoice-client-name">{invoice.clientName}</p>
            <div className="invoice-client-address">
              <p className="invoice-client-street">
                {invoice.clientAddress.street}
              </p>
              <p className="invoice-client-city">
                {invoice.clientAddress.city}
              </p>
              <p className="invoice-client-postcode">
                {invoice.clientAddress.postCode}
              </p>
              <p className="invoice-client-country">
                {invoice.clientAddress.country}
              </p>
            </div>
          </div>
          <div className="invoice-client-sendTo">
            <p className="invoice-email-text">Email To</p>
            <p className="invoice-client-email">{invoice.clientEmail}</p>
          </div>
          <div className="invoice-due-date">
            <p className="invoice-due-text">Payment Due</p>
            <p className="invoice-payment-due">
              {moment(invoice.paymentDue).format("DD MMM YYYY")}
            </p>
          </div>
        </div>
        <div className="invoice-price-table">
          <table className="price-table-body">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>QNT.</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      £{" "}
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      £{" "}
                      {item.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="price-table-bottom">
            <p className="invoice-total-text">Amount Due</p>
            <p className="invoice-details-total">
              {" "}
              £{" "}
              {invoice.total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetailsPage;
