import "./AddEditInvoicePage.css";
import { useDispatch, useSelector } from "react-redux";
import addEditInvoiceSlice from "../store/addEditInvoiceSlice";
import InvoiceForm from "./InvoiceForm";

function AddEditInvoicePage() {
  const dispatch = useDispatch();
  const { addEditInvoicePageVisible } = useSelector(
    (store) => store.addEditInvoicePage
  );
  const { hideAddEditInvoicePage, hideAddInvoicePage, hideEditInvoicePage } =
    addEditInvoiceSlice.actions;
  const { addInvoicePageVisible } = useSelector(
    (store) => store.addEditInvoicePage
  );
  const { editInvoicePageVisible } = useSelector(
    (store) => store.addEditInvoicePage
  );

  function handleHideInvoicePage() {
    dispatch(hideAddEditInvoicePage());
    setTimeout(() => {
      dispatch(hideAddInvoicePage());
      dispatch(hideEditInvoicePage());
    }, 600);
  }

  return (
    <div
      className={`add-edit-invoice-container ${
        addEditInvoicePageVisible ? "slide-right" : ""
      }`}
    >
      {addInvoicePageVisible && <InvoiceForm name="new" />}
      {editInvoicePageVisible && <InvoiceForm name="edit" />}
      <div
        className={`add-edit-invoice-bg ${
          addEditInvoicePageVisible ? "" : "hidden"
        }`}
        onClick={handleHideInvoicePage}
      ></div>
    </div>
  );
}

export default AddEditInvoicePage;
