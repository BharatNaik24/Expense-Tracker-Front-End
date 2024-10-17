import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    type: "credit",
    amount: "",
    description: "",
    date: "",
    running_balance: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.amount || formData.amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    if (!formData.description.trim()) {
      setError("Description cannot be empty");
      return;
    }
    if (!formData.date) {
      setError("Date must be selected");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Transaction added:", result);
      navigate("/");
    } catch (error) {
      console.error("Error adding transaction:", error);
      setError("Failed to add transaction");
    }
  };

  return (
    <div className="add-transaction-container">
      <h2>Add New Transaction</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="credit">Income</option>
            <option value="debit">Expenses</option>
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
