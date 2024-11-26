import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("description"); // Default sorting by description

  useEffect(() => {
    fetch("http://localhost:3000/transactions" + (query ? `?q=${query}` : ""))
      .then((resp) => resp.json())
      .then((data) => {
        const sortedData = [...data].sort((a, b) => {
          if (a[sortBy] < b[sortBy]) return -1;
          if (a[sortBy] > b[sortBy]) return 1;
          return 0;
        });
        setTransactions(sortedData);
      });
  }, [query, sortBy]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleTransactionAdded = () => {
    fetch("http://localhost:3000/transactions")
      .then((resp) => resp.json())
      .then((data) => {
        const sortedData = [...data].sort((a, b) => {
          if (a[sortBy] < b[sortBy]) return -1;
          if (a[sortBy] > b[sortBy]) return 1;
          return 0;
        });
        setTransactions(sortedData);
      });
  };

  const handleDeleteTransaction = (id) => {
    fetch(`http://localhost:3000/transactions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTransactions(transactions.filter((transaction) => transaction.id !== id));
    });
  };

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <select onChange={handleSortChange} value={sortBy}>
        <option value="description">Sort by Description</option>
        <option value="category">Sort by Category</option>
      </select>
      <AddTransactionForm onTransactionAdded={handleTransactionAdded} />
      <TransactionsList transactions={transactions} onDelete={handleDeleteTransaction} />
    </div>
  );
}

export default AccountContainer;
