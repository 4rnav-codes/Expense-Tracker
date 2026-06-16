let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart = null;

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (desc === "" || isNaN(amount) || amount <= 0 || date === "") {
    alert("Please fill all fields correctly.");
    return;
  }

  const newExpense = {
    id: Date.now(),
    desc: desc,
    amount: amount,
    category: category,
    date: date
  };

  expenses.push(newExpense);

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

  if (!list) return;

  const search = document.getElementById("search").value.toLowerCase();
  const filterCategory = document.getElementById("filterCategory").value;

  list.innerHTML = "";

  let filteredExpenses = expenses.filter(exp => {
    return (
      (filterCategory === "All" || exp.category === filterCategory) &&
      exp.desc.toLowerCase().includes(search)
    );
  });

  let total = 0;

  if (filteredExpenses.length === 0) {
    list.innerHTML = `<li class="empty">No expenses found</li>`;
  }

  filteredExpenses.forEach(exp => {
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

  totalExpense.textContent = `₹${total}`;
  totalEntries.textContent = filteredExpenses.length;

  updateChart();
  updateBudget();
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveExpenses();
  showExpenses();
}

function updateChart() {
  const canvas = document.getElementById("chart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const categoryTotals = {
    Food: 0,
    Travel: 0,
    Shopping: 0,
    Bills: 0,
    Entertainment: 0,
    Other: 0
  };

  expenses.forEach(exp => {
    if (categoryTotals[exp.category] !== undefined) {
      categoryTotals[exp.category] += exp.amount;
    }
  });

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: Object.keys(categoryTotals),
    datasets: [{
  label: "Expenses (₹)",
  data: Object.values(categoryTotals),
  backgroundColor: [
    "#00c9a7", // Food
    "#ff9671", // Travel
    "#ffc75f", // Shopping
    "#845ec2", // Bills
    "#0081cf", // Entertainment
    "#f9f871"  // Other
  ]
}]
  },
  options: {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Expense Distribution by Category"
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
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "expenses.csv";
  link.click();
}

function saveBudget() {
  const budget = parseFloat(document.getElementById("budgetInput").value);

  if (isNaN(budget) || budget <= 0) {
    alert("Enter a valid budget");
    return;
  }

  localStorage.setItem("budget", budget);

  updateBudget();
}

function updateBudget() {
  const budget = parseFloat(localStorage.getItem("budget")) || 0;

  const totalSpent = expenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  const remaining = budget - totalSpent;

  document.getElementById("budgetAmount").textContent = budget;
  document.getElementById("remainingAmount").textContent = remaining;

  const percentage =
    budget > 0 ? (totalSpent / budget) * 100 : 0;

    document.getElementById("budgetPercent").textContent =
Math.round(percentage) + "% Used";

  document.getElementById("budgetProgress").style.width =
    Math.min(percentage, 100) + "%";

  if (percentage > 80) {
    document.getElementById("budgetProgress").style.background =
      "#ff4d4d";
  } else {
    document.getElementById("budgetProgress").style.background =
      "#00c9a7";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light");

      localStorage.setItem(
        "theme",
        document.body.classList.contains("light") ? "light" : "dark"
      );
    });
  }

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }

  showExpenses();
  updateBudget();
});
