import "./InvoicesPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import arrow from "../assets/icon-arrow-down.svg";
import plus from "../assets/icon-plus.svg";
import check from "../assets/icon-check.svg";
import noInvoice from "../assets/illustration-empty.svg";
import Invoice from "./Invoice";
import addInvoiceSlice from "../store/addInvoiceSlice";

function InvoicesPage() {
  const dispatch = useDispatch();
  const { appData } = useSelector((store) => store.data);
  const [showFilter, setShowFilter] = useState(false);
  const [filterCategory, setFilterCategory] = useState("total");
  const [filteredData, setFilteredData] = useState(appData);
  const { showAddInvoicePage } = addInvoiceSlice.actions;

  const invoiceAmountText =
    document.body.clientWidth > 425
      ? `There are ${
          filteredData.length + " " + filterCategory.toLowerCase()
        } invoices`
      : `${filteredData.length} invoices`;

  const filterHeadText =
    document.body.clientWidth > 425 ? "Filter by status" : "Filter";

  const invoiceButtonText =
    document.body.clientWidth > 425 ? "New Invoice" : "New";

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

  function handleAddInvoice() {
    dispatch(showAddInvoicePage());
  }

  useEffect(() => {
    if (filterCategory === "total") {
      setFilteredData(appData);
    }
    if (filterCategory === "Draft") {
      setFilteredData(appData.filter((invoice) => invoice.status === "draft"));
    }
    if (filterCategory === "Pending") {
      setFilteredData(
        appData.filter((invoice) => invoice.status === "pending")
      );
    }
    if (filterCategory === "Paid") {
      setFilteredData(appData.filter((invoice) => invoice.status === "paid"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategory]);

  useEffect(() => {
    function closeFilterMenu(event) {
      if (
        !event.target.closest(".btn-filter-head") &&
        !event.target.closest(".filter-body")
      ) {
        setShowFilter(false);
      }
    }

    document.addEventListener("click", closeFilterMenu);

    return () => document.removeEventListener("click", closeFilterMenu);
  }, []);

  useEffect(() => {
    setFilteredData(appData);
  }, [appData]);

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
            <p className="filter-head-text">{filterHeadText}</p>
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
        <button className="btn btn-add-invoice" onClick={handleAddInvoice}>
          <div className="plus-icon-wrapper">
            <img src={plus} alt="plus icon" className="plus-icon" />
          </div>
          <p>{invoiceButtonText}</p>
        </button>
      </div>
      {filteredData.length > 0 && (
        <div className="invoices-container">
          {filteredData.map((invoice) => {
            return <Invoice key={invoice.id} invoice={invoice} />;
          })}
        </div>
      )}
      {filteredData.length === 0 && (
        <div className="no-invoices-container">
          <img src={noInvoice} alt="no invoices container" />
          <h2>There is nothing here</h2>
          <p className="no-invoice-text">
            Create an invoice by clicking the <br />
            <span> New Invoice </span>
            button and get started
          </p>
        </div>
      )}
    </div>
  );
}

export default InvoicesPage;
