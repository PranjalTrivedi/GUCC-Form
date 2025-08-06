// Ensure this is in data.js or adjust the script tag in index.html to load it
const scriptURL = 'https://script.google.com/macros/s/AKfycbzREXxUQQkN1EsshPNE4s8Hs2G70faILUfA4Rt7A7DbHrayjcK7ZafJsZorYRfvLQjOkg/exec';
const form = document.forms['contact-form'];

form.addEventListener('submit', e => {
  e.preventDefault();

  // Call the validation function from provincecity.js
  if (typeof validateForm === 'function' && !validateForm(e)) {
    return; // Stop submission if validation fails
  }

  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    if (data.result === 'success') {
      alert("Thank you! Form is submitted");
      window.location.reload();
    } else {
      alert(`Error: ${data.error}`);
    }
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert('An error occurred. Please try again.');
  });
});