import "./AddEditInvoice.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressInput from "./AddressInput";
import addInvoiceSlice from "../store/addInvoiceSlice";
import dataSlice from "../store/dataSlice";
import arrow from "../assets/icon-arrow-down.svg";
import moment from "moment";

function AddEditInvoice(props) {
  const dispatch = useDispatch();
  const invoicePageRef = useRef();
  const { appData } = useSelector((store) => store.data);
  const { addInvoicePageVisible } = useSelector(
    (store) => store.addInvoicePage
  );
  const { hideAddInvoicePage } = addInvoiceSlice.actions;
  const { addInvoice } = dataSlice.actions;
  const { invoiceID } = useSelector((store) => store.invoiceDetailsPage);
  const [invoice] = useSelector((store) =>
    store.data.appData.filter((invoice) => invoice.id === invoiceID)
  );

  const initialState = {
    createdAt: "",
    description: "",
    clientName: "",
    clientEmail: "",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [],
  };
  const [invoiceData, setInvoiceData] = useState(initialState);
  const [paymentTerm, setPaymentTerm] = useState(30);
  const [showPaymentTermMenu, setShowPaymentTermMenu] = useState(false);

  function handleHideInvoicePage() {
    dispatch(hideAddInvoicePage());
    setInvoiceData(initialState);
  }

  function handleInputChange(event) {
    setInvoiceData({
      ...invoiceData,
      [event.target.name]: event.target.value,
    });
  }

  function getSenderAddress(address) {
    setInvoiceData({
      ...invoiceData,
      senderAddress: { ...address },
    });
  }

  function getClientAddress(address) {
    setInvoiceData({
      ...invoiceData,
      clientAddress: { ...address },
    });
  }

  function handlePaymentTermMenu() {
    setShowPaymentTermMenu(!showPaymentTermMenu);
  }

  function handlePaymentTerm(event) {
    setPaymentTerm(+event.target.closest(".btn-payment-term").classList[1]);
    setShowPaymentTermMenu(false);
  }

  function handleSaveDraft() {
    const invoice = {
      ...invoiceData,
      id: getID(),
      status: "draft",
      paymentDue: moment(invoiceData.createdAt)
        .add(paymentTerm, "days")
        .format("YYYY-MM-DD"),
      total: "",
    };
    dispatch(addInvoice(invoice));
    dispatch(hideAddInvoicePage());
    setInvoiceData(initialState);
  }

  function handleSaveAndSend() {
    if (!Object.values(invoiceData).includes("")) {
      const invoice = {
        ...invoiceData,
        id: getID(),
        status: "pending",
        paymentDue: moment(invoiceData.createdAt)
          .add(paymentTerm, "days")
          .format("YYYY-MM-DD"),
        total: "",
      };
      dispatch(addInvoice(invoice));
      dispatch(hideAddInvoicePage());
      setInvoiceData(initialState);
    }
  }

  function getID() {
    const letters =
      String.fromCharCode(Math.random() * (90 - 65) + 65) +
      String.fromCharCode(Math.random() * (90 - 65) + 65);
    const id =
      letters +
      Math.ceil(Math.random() * 9999)
        .toString()
        .padStart(4, "0");
    appData.forEach((invoice) => {
      if (invoice.id === id) {
        getID();
      }
    });
    return id;
  }

  useEffect(() => {
    if (props.name === "new") {
      setInvoiceData(initialState);
    } else {
      setInvoiceData(invoice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceID]);

  useEffect(() => {
    invoicePageRef.current.scroll(0, 0);
    setPaymentTerm(30);
  }, [addInvoicePageVisible]);

  return (
    <div
      className={`add-edit-invoice-container ${
        addInvoicePageVisible ? "slide-right" : ""
      }`}
    >
      <form
        className="invoice-form"
        onSubmit={(event) => event.preventDefault()}
        ref={invoicePageRef}
      >
        <h2 className="invoice-heading">
          {props.name === "new" ? "New Invoice" : `Edit #${invoiceID}`}
        </h2>
        <div className="bill-from-box">
          <p className="bill-from-text">Bill From</p>
          <AddressInput
            addressObj={invoiceData.senderAddress}
            getAddress={getSenderAddress}
          />
        </div>
        <div className="bill-to-box">
          <p className="bill-to-text">Bill To</p>
          <label>
            Client's Name
            <input
              type="text"
              name="clientName"
              value={invoiceData.clientName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Client's Email
            <input
              type="text"
              name="clientEmail"
              placeholder="e.g. email@example.com"
              value={invoiceData.clientEmail}
              onChange={handleInputChange}
            />
          </label>
          <AddressInput
            addressObj={invoiceData.clientAddress}
            getAddress={getClientAddress}
          />
        </div>
        <div className="invoice-date-box">
          <label>
            Invoice Date
            <input
              type="date"
              name="createdAt"
              value={invoiceData.createdAt}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Payment Terms
            <div className="payment-term-menu">
              <button
                className="btn-payment-term-menu-head"
                onClick={handlePaymentTermMenu}
              >
                <span>
                  Net {paymentTerm} {paymentTerm > 1 ? "Days" : "Day"}
                </span>
                <img
                  src={arrow}
                  alt="down arrow"
                  className={`down-arrow ${
                    showPaymentTermMenu ? "rotate" : ""
                  }`}
                />
              </button>
              <div
                className={`btn-payment-term-menu-body ${
                  showPaymentTermMenu ? "" : "hidden"
                }`}
              >
                <button
                  className="btn-payment-term 1"
                  onClick={handlePaymentTerm}
                >
                  Net 1 day
                </button>
                <button
                  className="btn-payment-term 7"
                  onClick={handlePaymentTerm}
                >
                  Net 7 days
                </button>
                <button
                  className="btn-payment-term 14"
                  onClick={handlePaymentTerm}
                >
                  Net 14 days
                </button>
                <button
                  className="btn-payment-term 30"
                  onClick={handlePaymentTerm}
                >
                  Net 30 days
                </button>
              </div>
            </div>
          </label>
          <label className="project-description">
            Project Description
            <input
              type="text"
              name="description"
              placeholder="e.g. Graphic Design Service"
              value={invoiceData.description}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="item-list-box">
          <h4 className="item-list-heading">Item List</h4>
          <div className="item-list-head">
            <p>Item Name</p>
            <p>Qty.</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          {/* <div className="item-list-body">
          <input type="text" />
          <input type="number" />
          <input type="number" />
          <p className="form-total-cost"></p>
          <svg
            className="trash-icon"
            width="13"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
              fillRule="nonzero"
            />
          </svg>
        </div> */}
          <button className="btn btn-add-new-item">+ Add New Item</button>
        </div>
        <div
          className={`invoice-form-buttons ${
            addInvoicePageVisible ? "slide-right" : ""
          }`}
        >
          {props.name === "new" && (
            <div className="new-invoice-buttons">
              <button
                className="btn btn-discard"
                onClick={handleHideInvoicePage}
              >
                Discard
              </button>
              <button className="btn btn-save-draft" onClick={handleSaveDraft}>
                Save as Draft
              </button>
              <button className="btn btn-save-send" onClick={handleSaveAndSend}>
                Save & Send
              </button>
            </div>
          )}
          {props.name === "edit" && (
            <div className="edit-invoice-buttons">
              <button className="btn btn-form-cancel">Cancel</button>
              <button className="btn btn-save-changes">Save Changes</button>
            </div>
          )}
        </div>
      </form>
      <div
        className={`add-edit-invoice-bg ${
          addInvoicePageVisible ? "" : "hidden"
        }`}
        onClick={handleHideInvoicePage}
      ></div>
    </div>
  );
}

export default AddEditInvoice;
