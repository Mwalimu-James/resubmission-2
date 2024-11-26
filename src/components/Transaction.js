import React from "react";

function Transaction({ date, description, category, amount, onDelete }) {
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>
        <button onClick={onDelete} className="ui red button">
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Transaction;
