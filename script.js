let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (!desc || !amount || amount <= 0 || !date) {
    alert("Please fill all fields correctly.");
    return;
  }

  expenses.push({
    id: Date.now(),
    desc,
    amount,
    category,
    date
  });

  saveExpenses();
  clearForm();
  showExpenses();
}

function clearForm() {
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
}

function showExpenses() {
  const list = document.getElementById("list");
  const totalExpense = document.getElementById("totalExpense");
  const totalEntries = document.getElementById("totalEntries");

  const search = document.getElementById("search").value.toLowerCase();
  const filterCategory = document.getElementById("filterCategory").value;

  list.innerHTML = "";

  let filtered = expenses.filter(exp => {
    return (
      (filterCategory === "All" || exp.category === filterCategory) &&
      exp.desc.toLowerCase().includes(search)
    );
  });

  let total = 0;

  if (filtered.length === 0) {
    list.innerHTML = `<li class="empty">No expenses found</li>`;
  }

  filtered.forEach(exp => {
    total += exp.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${exp.desc}</strong><br>
        <small>${exp.category} | ${exp.date}</small>
      </div>
      <div>
        ₹${exp.amount}
        <button onclick="deleteExpense(${exp.id})">✖</button>
      </div>
    `;
    list.appendChild(li);
  });

  totalExpense.innerText = `₹${total}`;
  totalEntries.innerText = filtered.length;

  updateChart();
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveExpenses();
  showExpenses();
}

function updateChart() {
  const categoryTotals = {
    Food: 0,
    Travel: 0,
    Shopping: 0,
    Bills: 0,
    Entertainment: 0,
    Other: 0
  };

  expenses.forEach(exp => {
    categoryTotals[exp.category] += exp.amount;
  });

  const ctx = document.getElementById("chart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#00c9a7",
          "#ff9671",
          "#ffc75f",
          "#845ec2",
          "#0081cf",
          "#f9f871"
        ]
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: document.body.classList.contains("light") ? "#000" : "#fff"
          }
        }
      }
    }
  });
}

function exportCSV() {
  if (expenses.length === 0) {
    alert("No expenses to export.");
    return;
  }

  let csv = "Description,Amount,Category,Date\n";

  expenses.forEach(exp => {
    csv += `${exp.desc},${exp.amount},${exp.category},${exp.date}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");

  a.href = URL.createObjectURL(blob);
  a.download = "expenses.csv";
  a.click();
}

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
  showExpenses();
});

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

showExpenses();
