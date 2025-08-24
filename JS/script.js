// JavaScript for Cross-Platform Web App Development Questionnaire

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('questionnaire-form');
    const resultsContainer = document.getElementById('results');
    const scoreDisplay = document.getElementById('score');
    const feedbackDisplay = document.getElementById('feedback');

    // Correct answers
    const correctAnswers = {
        // Multiple Choice Answers
        'q1': 'c',
        'q2': 'b',
        'q3': 'a',
        'q4': 'c',
        'q5': 'b',
        'q6': 'd',
        'q7': 'a',
        'q8': 'c',
        'q9': 'b',
        'q10': 'd',
        
        // True/False Answers
        'tf1': 'true',
        'tf2': 'false',
        'tf3': 'false',
        'tf4': 'true',
        'tf5': 'true',
        'tf6': 'false',
        'tf7': 'true',
        'tf8': 'false',
        'tf9': 'true',
        'tf10': 'false'
    };

    // Add event listeners to true/false options for better UX
    const trueFalseOptions = document.querySelectorAll('.true-false-option');
    trueFalseOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Remove active class from all options in this group
            const groupName = radio.name;
            document.querySelectorAll(`.true-false-option input[name="${groupName}"]`).forEach(input => {
                input.parentElement.style.background = '#edf2f7';
                input.parentElement.style.borderColor = '#cbd5e0';
            });
            
            // Add active class to selected option
            this.style.background = '#667eea';
            this.style.borderColor = '#667eea';
            this.style.color = 'white';
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;
        
        // Check multiple choice answers
        for (let i = 1; i <= 10; i++) {
            const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedAnswer && selectedAnswer.value === correctAnswers[`q${i}`]) {
                score++;
            }
        }
        
        // Check true/false answers
        for (let i = 1; i <= 10; i++) {
            const selectedAnswer = document.querySelector(`input[name="tf${i}"]:checked`);
            if (selectedAnswer && selectedAnswer.value === correctAnswers[`tf${i}`]) {
                score++;
            }
        }
        
        // Calculate percentage
        const percentage = Math.round((score / totalQuestions) * 100);
        
        // Display results
        scoreDisplay.textContent = `${score}/${totalQuestions} (${percentage}%)`;
        
        // Provide feedback based on score
        let feedback = '';
        if (percentage >= 90) {
            feedback = 'Excellent! You have a strong understanding of cross-platform web app development.';
        } else if (percentage >= 70) {
            feedback = 'Good job! You have a solid foundation in cross-platform development concepts.';
        } else if (percentage >= 50) {
            feedback = 'Not bad! Keep learning and you\'ll master cross-platform development.';
        } else {
            feedback = 'Keep studying! Cross-platform development is a valuable skill worth mastering.';
        }
        
        feedbackDisplay.textContent = feedback;
        
        // Show results
        resultsContainer.style.display = 'block';
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Highlight correct/incorrect answers
        highlightAnswers();
    });

    function highlightAnswers() {
        // Highlight multiple choice answers
        for (let i = 1; i <= 10; i++) {
            const correctOption = document.querySelector(`input[name="q${i}"][value="${correctAnswers[`q${i}`]}"]`);
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            
            if (correctOption && correctOption.parentElement) {
                correctOption.parentElement.style.color = '#2f855a';
                correctOption.parentElement.style.fontWeight = 'bold';
            }
            
            if (selectedOption && selectedOption !== correctOption && selectedOption.parentElement) {
                selectedOption.parentElement.style.color = '#e53e3e';
            }
        }
        
        // Highlight true/false answers
        for (let i = 1; i <= 10; i++) {
            const correctOption = document.querySelector(`input[name="tf${i}"][value="${correctAnswers[`tf${i}`]}"]`);
            const selectedOption = document.querySelector(`input[name="tf${i}"]:checked`);
            
            if (correctOption && correctOption.parentElement) {
                correctOption.parentElement.style.color = '#2f855a';
                correctOption.parentElement.style.fontWeight = 'bold';
                correctOption.parentElement.style.background = '#c6f6d5';
                correctOption.parentElement.style.borderColor = '#68d391';
            }
            
            if (selectedOption && selectedOption !== correctOption && selectedOption.parentElement) {
                selectedOption.parentElement.style.color = '#e53e3e';
                selectedOption.parentElement.style.background = '#fed7d7';
                selectedOption.parentElement.style.borderColor = '#fc8181';
            }
        }
    }

    // Reset form functionality
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Try Again';
    resetBtn.style.cssText = `
        display: block;
        width: 150px;
        margin: 20px auto;
        padding: 10px;
        background: #718096;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        transition: background 0.3s ease;
    `;
    resetBtn.addEventListener('mouseenter', () => {
        resetBtn.style.background = '#4a5568';
    });
    resetBtn.addEventListener('mouseleave', () => {
        resetBtn.style.background = '#718096';
    });
    resetBtn.addEventListener('click', function() {
        form.reset();
        resultsContainer.style.display = 'none';
        
        // Reset all styling
        document.querySelectorAll('.option label, .true-false-option').forEach(element => {
            element.style = '';
        });
    });

    resultsContainer.appendChild(resetBtn);
});
