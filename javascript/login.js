// Migrate old single user storage to multiple users array
const oldUser = JSON.parse(localStorage.getItem("user"));
if (oldUser) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  // Only add if not already in users array
  if (!users.some(u => u.email === oldUser.email)) {
    users.push(oldUser);
    localStorage.setItem("users", JSON.stringify(users));
  }
  localStorage.removeItem("user"); // Remove old single user key
}

// Signup page validation
const signupForm = document.getElementById('signupForm');

if (signupForm) {
  const password = document.getElementById('password');
  const confirm = document.getElementById('confirm');
  const email = document.getElementById('email');
  const errorMessage = document.getElementById('error-message');

  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let errors = [];

    // Email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.value.match(emailPattern)) {
      errors.push("Please enter a valid email address.");
    }

    // Password validation
    if (password.value.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    if (password.value !== confirm.value) {
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      errorMessage.innerText = errors.join(" ");
      errorMessage.style.display = "block";
    } else {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.some(u => u.email === email.value)) {
        errorMessage.innerText = "This email is already registered.";
        errorMessage.style.display = "block";
        return;
      }

      users.push({ email: email.value, password: password.value });
      localStorage.setItem("users", JSON.stringify(users));

      window.location.href = "home.html";
    }
  });
}

// login page validation
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const loginError = document.getElementById('login-error');

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === loginEmail.value && u.password === loginPassword.value);

    if (user) {
      window.location.href = "home.html";
    } else {
      loginError.innerText = "Invalid email or password.";
      loginError.style.display = "block";
    }
  });
}

// Download accounts as text file
const downloadBtn = document.getElementById('downloadAccounts');
if (downloadBtn) {
  downloadBtn.addEventListener('click', function() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    let text = '';
    users.forEach(u => {
      text += `${u.email},${u.password}\n`;
    });

    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = 'accounts.txt';
    link.href = window.URL.createObjectURL(blob);
    link.click();
  });
}
