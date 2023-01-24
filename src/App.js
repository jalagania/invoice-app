import "./App.css";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import InvoicesPage from "./components/InvoicesPage";
import InvoiceDetailsPage from "./components/InvoiceDetailsPage";
import ModalDelete from "./components/ModalDelete";
import AddInvoicePage from "./components/AddInvoicePage";

function App() {
  const { invoicesPageVisible } = useSelector((store) => store.invoicesPage);
  const { invoiceDetailsPageVisible } = useSelector(
    (store) => store.invoiceDetailsPage
  );
  const { modalDeleteVisible } = useSelector((store) => store.modalDelete);
  const { addInvoicePageVisible } = useSelector(
    (store) => store.addInvoicePage
  );

  return (
    <div>
      <Sidebar />
      <AddInvoicePage />
      <div className="page-container">
        <div className="invoice-container">
          {invoicesPageVisible && <InvoicesPage />}
          {invoiceDetailsPageVisible && <InvoiceDetailsPage />}
          {modalDeleteVisible && <ModalDelete />}
        </div>
      </div>
    </div>
  );
}

export default App;
