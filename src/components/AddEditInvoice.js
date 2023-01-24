import "./AddEditInvoice.css";
import { useDispatch, useSelector } from "react-redux";
import AddressInput from "./AddressInput";
import addInvoiceSlice from "../store/addInvoiceSlice";

function AddEditInvoice(props) {
  const dispatch = useDispatch();
  const { addInvoicePageVisible } = useSelector(
    (store) => store.addInvoicePage
  );
  const { hideAddInvoicePage } = addInvoiceSlice.actions;

  function handleHideInvoicePage() {
    dispatch(hideAddInvoicePage());
  }

  return (
    <div
      className={`add-edit-invoice-container ${
        addInvoicePageVisible ? "slide-right" : ""
      }`}
    >
      <form
        className="invoice-form"
        onSubmit={(event) => event.preventDefault()}
      >
        <h2 className="invoice-heading">
          {props.name === "new" ? "New Invoice" : "Edit #"}
        </h2>
        <div className="bill-from-box">
          <p className="bill-from-text">Bill From</p>
          <AddressInput />
        </div>
        <div className="bill-to-box">
          <p className="bill-to-text">Bill To</p>
          <label>
            Client's Name
            <input type="text" name="clientName" />
          </label>
          <label>
            Client's Email
            <input
              type="text"
              name="clientEmail"
              placeholder="e.g. email@example.com"
            />
          </label>
          <AddressInput />
        </div>
        <div className="invoice-date-box">
          <label>
            Invoice Date
            <input type="date" name="createdAt" />
          </label>
          <label>
            Payment Terms
            <input type="text" name="clientName" />
          </label>
          <label className="project-description">
            Project Description
            <input
              type="text"
              name="description"
              placeholder="e.g. Graphic Design Service"
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
              <button className="btn btn-save-draft">Save as Draft</button>
              <button className="btn btn-save-send">Save & Send</button>
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

//
//         Net 1 day Net 7 days Net 14 days Net
//     30 days
