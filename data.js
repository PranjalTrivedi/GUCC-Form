const scriptURL = 'https://script.google.com/macros/s/AKfycbzREXxUQQkN1EsshPNE4s8Hs2G70faILUfA4Rt7A7DbHrayjcK7ZafJsZorYRfvLQjOkg/exec';
const form = document.forms['contact-form'];
const submissionMessage = document.getElementById('submission-message');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Call the validation function from provincecity.js
  if (typeof validateForm === 'function' && !validateForm(e)) {
    return; // Stop submission if validation fails
  }

  // Show submitting status
  submissionMessage.style.display = 'block';
  submissionMessage.style.backgroundColor = '#e0e0e0';
  submissionMessage.style.color = '#333';
  submissionMessage.textContent = 'Submitting...';

  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    if (data.result === 'success') {
      submissionMessage.style.backgroundColor = '#d4edda';
      submissionMessage.style.color = '#155724';
      submissionMessage.textContent = 'Thank you! Your form has been submitted successfully.';
      form.reset(); // Reset the form
      // Reset select fields to default
      document.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
      });
    } else {
      submissionMessage.style.backgroundColor = '#f8d7da';
      submissionMessage.style.color = '#721c24';
      submissionMessage.textContent = `Error: ${data.error}`;
    }
  })
  .catch(error => {
    console.error('Error!', error.message);
    submissionMessage.style.backgroundColor = '#f8d7da';
    submissionMessage.style.color = '#721c24';
    submissionMessage.textContent = 'An error occurred. Please try again.';
  });
});