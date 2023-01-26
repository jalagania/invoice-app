import "./InvoiceForm.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressInput from "./AddressInput";
import addInvoiceSlice from "../store/addEditInvoiceSlice";
import dataSlice from "../store/dataSlice";
import arrow from "../assets/icon-arrow-down.svg";
import trash from "../assets/icon-delete.svg";
import moment from "moment";
import { cloneDeep } from "lodash";

function InvoiceForm(props) {
  const dispatch = useDispatch();
  const invoicePageRef = useRef();
  const { appData } = useSelector((store) => store.data);
  const { addEditInvoicePageVisible } = useSelector(
    (store) => store.addEditInvoicePage
  );
  const { hideAddEditInvoicePage, hideAddInvoicePage, hideEditInvoicePage } =
    addInvoiceSlice.actions;
  const { addInvoice, editInvoice } = dataSlice.actions;
  const { invoiceID } = useSelector((store) => store.invoiceDetailsPage);
  const [invoice] = useSelector((store) =>
    store.data.appData.filter((invoice) => invoice.id === invoiceID)
  );

  const invoiceObj = {
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

  const itemObj = {
    name: "",
    quantity: "",
    price: "",
    total: "0.00",
  };

  const initialInvoice = props.name === "new" ? invoiceObj : invoice;
  const [invoiceData, setInvoiceData] = useState(initialInvoice);
  const initialTerm = props.name === "new" ? 30 : invoice.paymentTerms || 30;
  const [paymentTerm, setPaymentTerm] = useState(initialTerm);
  const [showPaymentTermMenu, setShowPaymentTermMenu] = useState(false);
  const initialList = props.name === "new" ? [] : invoice.items;
  const [itemList, setItemList] = useState(initialList);
  const [listItem, setListItem] = useState(itemObj);
  const [error, setError] = useState(false);

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

  function formIsFilled(obj) {
    const myArr = [];
    const array = Object.values(obj).flat().slice();
    array.forEach((element) => {
      if (element.constructor.name === "Object") {
        myArr.push(...Object.values(element));
      } else {
        myArr.push(element);
      }
    });
    return !myArr.flat().includes("") && obj.items.length > 0;
  }

  function closeInvoiceForm() {
    dispatch(hideAddEditInvoicePage());
    setTimeout(() => {
      dispatch(hideAddInvoicePage());
      dispatch(hideEditInvoicePage());
    }, 600);
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

  function handleItemChange(event, index) {
    const items = cloneDeep(invoiceData.items);
    items[index][event.target.name] = event.target.value;
    items[index].total = items[index].price * items[index].quantity;
    setInvoiceData({
      ...invoiceData,
      items: [...items],
    });
  }

  function handleAddItemButton() {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, itemObj],
    });
  }

  function handleItemDeleteButton(id) {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter(
        (item) => invoiceData.items.indexOf(item) !== id
      ),
    });
  }

  function handleDiscardButton() {
    closeInvoiceForm();
  }

  function handleSaveDraft() {
    const invoice = {
      ...invoiceData,
      id: getID(),
      status: "draft",
      paymentDue: moment(invoiceData.createdAt)
        .add(paymentTerm, "days")
        .format("YYYY-MM-DD"),
      total: invoiceData.items.reduce((sum, num) => sum + +num.total, 0),
    };
    dispatch(addInvoice(invoice));
    closeInvoiceForm();
  }

  function handleSaveAndSend() {
    if (formIsFilled(invoiceData)) {
      const invoice = {
        ...invoiceData,
        id: getID(),
        status: "pending",
        paymentDue: moment(invoiceData.createdAt)
          .add(paymentTerm, "days")
          .format("YYYY-MM-DD"),
        total: invoiceData.items.reduce((sum, num) => sum + +num.total, 0),
      };
      dispatch(addInvoice(invoice));
      closeInvoiceForm();
    } else {
      setError(true);
      setTimeout(() => {
        invoicePageRef.current.scroll(0, 100000);
      }, 1);
    }
  }

  function handleCancelButton() {
    closeInvoiceForm();
  }

  function handleSaveChanges() {
    if (formIsFilled(invoiceData)) {
      const invoice = {
        ...invoiceData,
        paymentTerms: paymentTerm,
        paymentDue: moment(invoiceData.createdAt)
          .add(paymentTerm, "days")
          .format("YYYY-MM-DD"),
        status: invoiceData.status === "draft" ? "pending" : invoiceData.status,
        total: invoiceData.items.reduce((sum, num) => sum + +num.total, 0),
      };
      dispatch(editInvoice([invoiceID, invoice]));
      closeInvoiceForm();
    } else {
      setError(true);
      setTimeout(() => {
        invoicePageRef.current.scroll(0, 100000);
      }, 1);
    }
  }

  useEffect(() => {
    invoicePageRef.current.scroll(0, 0);
  }, [addEditInvoicePageVisible]);

  return (
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
                className={`down-arrow ${showPaymentTermMenu ? "rotate" : ""}`}
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
        <div className="item-list-body">
          {invoiceData.items.map((item, index) => {
            return (
              <div key={index} className="list-item-box">
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(e, index)}
                />
                <input
                  type="number"
                  placeholder="0"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(e, index)}
                />
                <input
                  type="number"
                  placeholder="0.00"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleItemChange(e, index)}
                />
                <p className="form-total-cost">
                  {item.total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <img
                  src={trash}
                  alt="trash icon"
                  className="trash-icon"
                  onClick={() => handleItemDeleteButton(index)}
                />
              </div>
            );
          })}
        </div>
        <button className="btn btn-add-new-item" onClick={handleAddItemButton}>
          + Add New Item
        </button>
      </div>
      {error && (
        <div className="error-text-box">
          <p>- All fields must be added</p>
          <p>- An item must be added</p>
        </div>
      )}
      <div
        className={`invoice-form-buttons ${
          addEditInvoicePageVisible ? "slide-right" : ""
        }`}
      >
        {props.name === "new" && (
          <div className="new-invoice-buttons">
            <button
              type="button"
              className="btn btn-discard"
              onClick={handleDiscardButton}
            >
              Discard
            </button>
            <button
              type="button"
              className="btn btn-save-draft"
              onClick={handleSaveDraft}
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="btn btn-save-send"
              onClick={handleSaveAndSend}
            >
              Save & Send
            </button>
          </div>
        )}
        {props.name === "edit" && (
          <div className="edit-invoice-buttons">
            <button
              type="button"
              className="btn btn-form-cancel"
              onClick={handleCancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-save-changes"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default InvoiceForm;
