document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const dobInput = document.getElementById("dob");
  const termsInput = document.getElementById("terms");
  const tableBody = document.getElementById("table-body");

  // to show error
  function showError(input) {
    input.classList.add("border-red-500");
  }

  // Function to calculate age based on DOB
  function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    // Adjust age if birthday hasn't happened this year yet
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    // Clear previous error classes
    [nameInput, emailInput, passwordInput, dobInput].forEach((input) => {
      input.classList.remove("border-red-500");
    });

    // Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput);
      valid = false;
    }

    // Validate Email
    if (!emailInput.validity.valid) {
      showError(emailInput);
      valid = false;
    }

    // Validate Password
    if (!passwordInput.value.trim()) {
      showError(passwordInput);
      valid = false;
    }

    // Validate Date of Birth (18 to 55 years old)
    const dob = dobInput.value;
    const age = calculateAge(dob);

    if (age < 18 || age > 55) {
      showError(dobInput);
      valid = false;
    }

    // Validate Terms
    if (!termsInput.checked) {
      alert("You must agree to the terms and conditions.");
      valid = false;
    }

    if (valid) {
      // Collect user data
      const user = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        dob: dobInput.value,
        termsAccepted: termsInput.checked,
      };

      // Save to localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      // Reset the form
      form.reset();

      // Add user data to table
      addUserToTable(user);
    }
  });

  // Function to add user data to the table
  function addUserToTable(user) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="border px-4 py-2">${user.name}</td>
      <td class="border px-4 py-2">${user.email}</td>
      <td class="border px-4 py-2">${user.password}</td>
      <td class="border px-4 py-2">${user.dob}</td>
      <td class="border px-4 py-2">${user.termsAccepted ? "true" : "false"}</td>
    `;

    tableBody.appendChild(row);
  }

  // Display users already saved in localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach(user => addUserToTable(user));
});
