// Get elements
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const addBtn = document.getElementById('addBtn');
const expenseList = document.getElementById('expenseList');
const totalDisplay = document.getElementById('total');

// Local storage data
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Add new expense
addBtn.addEventListener('click', () => {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  if (description === '' || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid description and amount.');
    return;
  }

  const expense = { id: Date.now(), description, amount, category };
  expenses.push(expense);
  saveAndRender();
  clearInputs();
});

// Delete expense
function deleteExpense(id) {
  expenses = expenses.filter(item => item.id !== id);
  saveAndRender();
}

// Save to localStorage and update UI
function saveAndRender() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  renderTotal();
}

// Show all expenses
function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        ₹${item.amount} - ${item.description} 
        <span class="category">[${item.category}]</span>
      </div>
      <button onclick="deleteExpense(${item.id})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

// Show total amount
function renderTotal() {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  totalDisplay.textContent = total.toFixed(2);
}

// Clear input fields
function clearInputs() {
  descriptionInput.value = '';
  amountInput.value = '';
  categoryInput.value = 'Food';
}

// Initial render
saveAndRender();
