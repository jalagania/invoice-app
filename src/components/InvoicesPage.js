import "./InvoicesPage.css";
import { useState } from "react";
import arrow from "../assets/icon-arrow-down.svg";
import plus from "../assets/icon-plus.svg";
import check from "../assets/icon-check.svg";
import noInvoice from "../assets/illustration-empty.svg";

function InvoicesPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [filterCategory, setFilterCategory] = useState("total");
  const [filteredData, setFilteredData] = useState([]);

  const invoiceAmountText =
    document.body.clientWidth > 425
      ? `There are ${
          filteredData.length + " " + filterCategory.toLowerCase()
        } invoices`
      : `${filteredData.length} invoices`;

  function handleFilterCategory(event) {
    if (
      filterCategory ===
      event.target.closest(".btn-filter").lastElementChild.textContent
    ) {
      setFilterCategory("total");
    } else {
      setFilterCategory(
        event.target.closest(".btn-filter").lastElementChild.textContent
      );
    }
  }

  return (
    <div className="invoice-page-container">
      <div className="filter-box">
        <div className="invoice-text-box">
          <h1>Invoices</h1>
          <p className="invoice-amount-text">
            {filteredData.length === 0 ? "No invoices" : invoiceAmountText}
          </p>
        </div>
        <div className="filter-menu">
          <button
            className="btn-filter-head"
            onClick={() => setShowFilter(!showFilter)}
          >
            <p className="filter-head-text">Filter by status</p>
            <img
              src={arrow}
              alt="down arrow"
              className={`arrow-icon ${showFilter ? "rotate" : ""}`}
            />
          </button>
          <div className={`filter-body ${showFilter ? "" : "hidden"}`}>
            <button
              className="btn-filter btn-draft"
              onClick={handleFilterCategory}
            >
              <div
                className={`check-box ${
                  filterCategory === "Draft" ? "violet-bg" : ""
                }`}
              >
                <img
                  src={check}
                  alt="check icon"
                  className={`check-icon ${
                    filterCategory === "Draft" ? "" : "hidden"
                  }`}
                />
              </div>
              <p>Draft</p>
            </button>
            <button
              className="btn-filter btn-pending"
              onClick={handleFilterCategory}
            >
              <div
                className={`check-box ${
                  filterCategory === "Pending" ? "violet-bg" : ""
                }`}
              >
                <img
                  src={check}
                  alt="check icon"
                  className={`check-icon ${
                    filterCategory === "Pending" ? "" : "hidden"
                  }`}
                />
              </div>
              <p>Pending</p>
            </button>
            <button
              className="btn-filter btn-paid"
              onClick={handleFilterCategory}
            >
              <div
                className={`check-box ${
                  filterCategory === "Paid" ? "violet-bg" : ""
                }`}
              >
                <img
                  src={check}
                  alt="check icon"
                  className={`check-icon ${
                    filterCategory === "Paid" ? "" : "hidden"
                  }`}
                />
              </div>
              <p>Paid</p>
            </button>
          </div>
        </div>
        <button className="btn btn-add-invoice">
          <div className="plus-icon-wrapper">
            <img src={plus} alt="plus icon" className="plus-icon" />
          </div>
          <p>New Invoice</p>
        </button>
      </div>
      {filteredData.length > 0 && <div className="invoices-container"></div>}
      {filteredData.length === 0 && (
        <div className="no-invoices-container">
          <img src={noInvoice} alt="no invoices container" />
          <h2>There is nothing here</h2>
          <p className="no-invoice-text">
            Create an invoice by clicking the
            <span> New Invoice </span>
            button and get started
          </p>
        </div>
      )}
    </div>
  );
}

export default InvoicesPage;
