let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

function addExpense() {
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;
  let date = document.getElementById("date").value;

  if (!desc || !amount || !date) {
    alert("Fill all fields");
    return;
  }

  let expense = {
    id: Date.now(),
    desc,
    amount: Number(amount),
    category,
    date
  };

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  showExpenses();
}

function showExpenses() {
  let list = document.getElementById("list");
  let total = 0;
  let filter = document.getElementById("filter").value;

  list.innerHTML = "";

  let filtered = expenses.filter(exp => 
    filter === "All" || exp.category === filter
  );

  filtered.forEach(exp => {
    total += exp.amount;

    let li = document.createElement("li");
    li.innerHTML = `
      ${exp.desc} - ₹${exp.amount} (${exp.category})
      <button onclick="deleteExpense(${exp.id})">X</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;

  updateChart();
}

function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showExpenses();
}

function updateChart() {
  let data = {
    Food: 0,
    Travel: 0,
    Shopping: 0,
    Other: 0
  };

  expenses.forEach(e => {
    data[e.category] += e.amount;
  });

  let ctx = document.getElementById("chart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data)
      }]
    }
  });
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

showExpenses();