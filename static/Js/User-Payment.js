document.getElementById('payment-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const paymentMethod = document.getElementById('payment-method').value;
  const transactionId = document.getElementById('transaction-id').value;
  const amount = document.getElementById('amount').value;
  const balanceElement = document.getElementById('sacco-balance');
  
  if (amount <= 0) {
      alert("Please enter a valid amount.");
      return;
  }

  const paymentData = {
      method: paymentMethod,
      transaction_id: transactionId,
      amount: amount
  };

  fetch('/user/pay-sacco-fee/', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": document.querySelector('[name=csrfmiddlewaretoken]').value
      },
      body: JSON.stringify(paymentData)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert("Payment successful!");
          updatePaymentHistory(paymentData);
          balanceElement.textContent = `KES ${data.new_balance}`;
      } else {
          alert("Payment failed. Please check your transaction details.");
      }
  })
  .catch(error => console.error("Error:", error));
});

// Function to update payment history dynamically
function updatePaymentHistory(payment) {
  const paymentTable = document.getElementById('payment-history');
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${new Date().toLocaleDateString()}</td>
      <td>${payment.method}</td>
      <td>${payment.transaction_id}</td>
      <td>KES ${payment.amount}</td>
      <td>Pending</td>
  `;
  paymentTable.prepend(row);
}
