import "./InvoicesPage.css";
import { useState } from "react";
import arrow from "../assets/icon-arrow-down.svg";
import plus from "../assets/icon-plus.svg";
import check from "../assets/icon-check.svg";

function InvoicesPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");

  return (
    <div className="invoice-page-container">
      <div className="filter-box">
        <div className="invoice-text-box">
          <h1>Invoices</h1>
          <p className="invoice-amount-text">
            <span>There are</span>
            <span>{}</span>
            <span>total invoices</span>
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
            <button className="btn-filter btn-draft">
              <div className="check-box">
                <img src={check} alt="check icon" className="check-icon" />
              </div>
              <p>Draft</p>
            </button>
            <button className="btn-filter btn-pending">
              <div className="check-box">
                <img src={check} alt="check icon" className="check-icon" />
              </div>
              <p>Pending</p>
            </button>
            <button className="btn-filter btn-paid">
              <div className="check-box">
                <img src={check} alt="check icon" className="check-icon" />
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
      <div className="invoices-container"></div>
    </div>
  );
}

export default InvoicesPage;
