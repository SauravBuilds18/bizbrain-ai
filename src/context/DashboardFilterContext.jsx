import { createContext, useContext, useMemo, useState } from "react";
import { useInvoices } from "./InvoiceContext";

const DashboardFilterContext = createContext();

export function DashboardFilterProvider({ children }) {
  const { invoices } = useInvoices();

  const today = new Date();

  const formatDate = (date) => {
    if (!date) return "";

    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }

    // DD/MM/YYYY
    if (typeof date === "string" && date.includes("/")) {
      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    const d = new Date(date);

    if (isNaN(d.getTime())) return "";

    return d.toISOString().split("T")[0];
  };

  const todayString = formatDate(today);

  const [filterType, setFilterType] = useState("today");
  const [selectedDate, setSelectedDate] = useState(todayString);
  const [fromDate, setFromDate] = useState(todayString);
  const [toDate, setToDate] = useState(todayString);

  const filteredInvoices = useMemo(() => {
    switch (filterType) {

      case "today":
        return invoices.filter(
          (invoice) => formatDate(invoice.date) === todayString
        );

      case "yesterday": {

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const yesterdayString = formatDate(yesterday);

        return invoices.filter(
          (invoice) => formatDate(invoice.date) === yesterdayString
        );
      }

      case "week": {

        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 6);

        const weekAgoString = formatDate(weekAgo);

        return invoices.filter((invoice) => {

          const invoiceDate = formatDate(invoice.date);

          return (
            invoiceDate >= weekAgoString &&
            invoiceDate <= todayString
          );
        });
      }

      case "month": {

        const currentMonth = today.getMonth() + 1;
        const currentYear = today.getFullYear();

        return invoices.filter((invoice) => {

          const formatted = formatDate(invoice.date);

          if (!formatted) return false;

          const [year, month] = formatted.split("-");

          return (
            Number(month) === currentMonth &&
            Number(year) === currentYear
          );
        });
      }

      case "year": {

        const currentYear = today.getFullYear();

        return invoices.filter((invoice) => {

          const formatted = formatDate(invoice.date);

          if (!formatted) return false;

          const [year] = formatted.split("-");

          return Number(year) === currentYear;
        });
      }

      case "selected":

        return invoices.filter(
          (invoice) => formatDate(invoice.date) === selectedDate
        );

      case "range":

        return invoices.filter((invoice) => {

          const invoiceDate = formatDate(invoice.date);

          return (
            invoiceDate >= fromDate &&
            invoiceDate <= toDate
          );
        });

      default:
        return invoices;
    }

  }, [
    invoices,
    filterType,
    selectedDate,
    fromDate,
    toDate,
    todayString,
  ]);

  const previousInvoices = useMemo(() => {

    switch (filterType) {

      case "today": {

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const yesterdayString = formatDate(yesterday);

        return invoices.filter(
          (invoice) => formatDate(invoice.date) === yesterdayString
        );
      }

      case "week": {

        const end = new Date(today);
        end.setDate(today.getDate() - 7);

        const start = new Date(today);
        start.setDate(today.getDate() - 13);

        const startString = formatDate(start);
        const endString = formatDate(end);

        return invoices.filter((invoice) => {

          const invoiceDate = formatDate(invoice.date);

          return (
            invoiceDate >= startString &&
            invoiceDate <= endString
          );
        });
      }

      case "month": {

        const previousMonth = new Date(today);
        previousMonth.setMonth(today.getMonth() - 1);

        const month = previousMonth.getMonth() + 1;
        const year = previousMonth.getFullYear();

        return invoices.filter((invoice) => {

          const formatted = formatDate(invoice.date);

          if (!formatted) return false;

          const [y, m] = formatted.split("-");

          return (
            Number(m) === month &&
            Number(y) === year
          );
        });
      }

      default:
        return [];
    }

  }, [invoices, filterType]);

  return (
    <DashboardFilterContext.Provider
      value={{
        filterType,
        setFilterType,
        selectedDate,
        setSelectedDate,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        filteredInvoices,
        previousInvoices,
      }}
    >
      {children}
    </DashboardFilterContext.Provider>
  );
}

export function useDashboardFilter() {
  return useContext(DashboardFilterContext);
}