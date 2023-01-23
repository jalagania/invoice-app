import "./ModalDelete.css";
import { useDispatch, useSelector } from "react-redux";
import modalDeleteSLice from "../store/modalDeleteSlice";
import dataSlice from "../store/dataSlice";
import invoiceDetailsPageSlice from "../store/invoiceDetailsPageSlice";
import invoicesPageSlice from "../store/invoicesPageSlice";

function ModalDelete() {
  const dispatch = useDispatch();
  const { invoiceID } = useSelector((store) => store.invoiceDetailsPage);
  const { closeModalDelete } = modalDeleteSLice.actions;
  const { deleteInvoice } = dataSlice.actions;
  const { hideInvoiceDetailsPage } = invoiceDetailsPageSlice.actions;
  const { showInvoicesPage } = invoicesPageSlice.actions;

  function handleModalDelete() {
    dispatch(deleteInvoice(invoiceID));
    dispatch(closeModalDelete());
    dispatch(hideInvoiceDetailsPage());
    dispatch(showInvoicesPage());
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2 className="modal-heading">Confirm Deletion</h2>
        <p className="modal-text">
          Are you sure you want to delete invoice #{invoiceID}? This action
          cannot be undone.
        </p>
        <div className="modal-buttons">
          <button
            className="btn btn-modal-cancel"
            onClick={() => dispatch(closeModalDelete())}
          >
            Cancel
          </button>
          <button className="btn btn-modal-delete" onClick={handleModalDelete}>
            Delete
          </button>
        </div>
      </div>
      <div
        className="modal-bg"
        onClick={() => dispatch(closeModalDelete())}
      ></div>
    </div>
  );
}

export default ModalDelete;
