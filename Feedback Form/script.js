
const labels = document.querySelectorAll('.form-control label');

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('');
});

// Handle form submission
const feedbackForm = document.getElementById('feedback-form');

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(feedbackForm);
    const feedback = {
        name: formData.get('name'),
        email: formData.get('email'),
        rating: formData.get('rating'),
        feedback: formData.get('feedback')
    };
    
    // Here you would typically send the feedback to a server
    console.log('Feedback submitted:', feedback);
    
    // Show success message
    alert('Thank you for your feedback! 🎉');
    feedbackForm.reset();
});

// Handle select field label animation
const selectField = document.querySelector('select');
selectField.addEventListener('change', () => {
    if (selectField.value) {
        selectField.classList.add('has-value');
    } else {
        selectField.classList.remove('has-value');
    }
});
