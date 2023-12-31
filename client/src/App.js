import React from "react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import ExpenseForm from "./components/expenseForm/ExpenseForm";

function App() {
  const [data, setData] = useState([]);

  async function fetchData() {
    const response = await fetch("/get_expense")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello, React!</h1>
      <ExpenseForm fetchData={fetchData} />

      {/* Below should be componentized */}
      <div>
        {data === undefined ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data.map((expense) => {
              const createdDate = new Date(expense.created_date);
              createdDate.setDate(createdDate.getDate() + 1);

              return (
                <li key={expense.id}>
                  {expense.id}. {expense.category} - {expense.amount} (
                  {format(createdDate, "MMM/dd/yyyy")})
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
