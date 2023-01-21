import "./App.css";
import Sidebar from "./components/Sidebar";
import InvoicesPage from "./components/InvoicesPage";

function App() {
  return (
    <div>
      <Sidebar />
      <div className="page-container">
        <div className="invoice-container">
          <InvoicesPage />
        </div>
      </div>
    </div>
  );
}

export default App;
