document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("user-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const dobInput = document.getElementById("dob");
    const termsInput = document.getElementById("terms");
    const tableBody = document.getElementById("table-body");
  

    // to validate the date of birth input
    const today = new Date();
    const year = today.getFullYear();
  
    const maxAge = 18;
    const minAge = 55;
  
    const maxDate = new Date(year - maxAge, today.getMonth(), today.getDate());
    const minDate = new Date(year - minAge, today.getMonth(), today.getDate());
  
    dobInput.max = maxDate.toISOString().split("T")[0];
    dobInput.min = minDate.toISOString().split("T")[0];
  
    //to show error
    function showError(input) {
      input.classList.add("border-red-500");
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      let valid = true;
  
      [nameInput, emailInput, passwordInput, dobInput].forEach((input) => {
        input.classList.remove("border-red-500");
      });
  
      if (!nameInput.value.trim()) {
        showError(nameInput);
        valid = false;
      }
      if (!emailInput.validity.valid) {
        showError(emailInput);
        valid = false;
      }
      if (!passwordInput.value.trim()) {
        showError(passwordInput);
        valid = false;
      }
  
      const dob = new Date(dobInput.value);
      if (dob < minDate || dob > maxDate) {
        showError(dobInput);
        valid = false;
      }
  
      if (!termsInput.checked) {
        alert("You must agree to the terms and conditions.");
        valid = false;
      }
  
      if (valid) {
        // to collect user data
        const user = {
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
          dob: dobInput.value,
          termsAccepted: termsInput.checked,
        };
  
        // to save to localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        form.reset();
        addUserToTable(user);
      }
    });
  
    // to add user data to the table
    function addUserToTable(user) {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td class="border px-4 py-2">${user.name}</td>
        <td class="border px-4 py-2">${user.email}</td>
        <td class="border px-4 py-2">${user.password}</td>
        <td class="border px-4 py-2">${user.dob}</td>
        <td class="border px-4 py-2">${user.termsAccepted ? "True" : "False"}</td>
      `;
  
      tableBody.appendChild(row);
    }
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach(user => addUserToTable(user));
  });
  
