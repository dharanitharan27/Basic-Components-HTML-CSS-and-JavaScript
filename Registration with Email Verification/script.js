// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail, updatePassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
    //so on 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // ✅ Initialize Firebase Authentication

// Send Verification Email
document.getElementById('send-code').addEventListener('click', async function () {
    const email = document.getElementById('email').value;
    if (!email) {
        alert("Please enter your email.");
        return;
    }

    try {
        // Check if the email is already registered
        const methods = await fetchSignInMethodsForEmail(auth, email);
        if (methods.length > 0) {
            alert("Email is already registered. Please verify or sign in.");
            return;
        }

        // Create a new user with a temporary password 
        const userCredential = await createUserWithEmailAndPassword(auth, email, "temp");
        
        // Send verification email
        await sendEmailVerification(userCredential.user);
        alert("Verification email sent! Check your inbox.");
        document.getElementById('verify-code').disabled = false;

    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Verify Email
document.getElementById('verify-code').addEventListener('click', async function () {
    const user = auth.currentUser;
    if (!user) {
        alert("No user found. Please send the code first.");
        return;
    }

    // Reload user to check email verification status
    await user.reload();
    if (user.emailVerified) {
        alert("Email verified successfully!");
        document.getElementById('register-btn').disabled = false;
    } else {
        alert("Email not verified yet. Please check your inbox.");
    }
});

// Register User After Email Verification
document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const user = auth.currentUser;
    if (!user) {
        alert("No user found. Verify your email first.");
        return;
    }

    try {
        // Update user password
        await updatePassword(user, password);
        alert("Registration successful! You can now log in.");
        window.location.href = "index.html";
    } catch (error) {
        alert("Error updating password: " + error.message);
    }
});
