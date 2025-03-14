const labels = document.querySelectorAll('.form-control label');

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('');
});

// Redirect to Register Page when clicking "Register"
const registerLink = document.getElementById('register-link');
if (registerLink) {
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "register.html"; // Redirect to Register Page
    });
}

// Show success message on registration and redirect to login
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("You have successfully registered! 🎉");
        window.location.href = "index.html"; // Redirect to Login Page
    });
}
