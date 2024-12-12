document.querySelectorAll('.Hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', function () {
        // Get the image source from the hotspot's data attribute
        const imgSrc = this.getAttribute('data-img-src');
        
        // Find the image with the matching src attribute
        const targetImage = document.querySelector(`.image-gallery img[src='${imgSrc}']`);
        
        if (targetImage) {
            // Scroll the image into view
            targetImage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Optionally, add a temporary highlight
            targetImage.classList.add('highlight');
            setTimeout(() => targetImage.classList.remove('highlight'), 1000);
        }
    });
});

// Quiz Data - Michelangelo Art Questions
const michelangeloQuizData = [
    {
        question: "Which famous chapel ceiling did Michelangelo paint between 1508 and 1512?",
        options: [
            "Sistine Chapel",
            "St. Peter's Basilica",
            "Florence Cathedral",
            "St. Paul's Cathedral"
        ],
        correct: 0,
        explanation: "Michelangelo painted the Sistine Chapel ceiling between 1508-1512, creating one of the most significant works in Western art history."
    },
    {
        question: "Which famous scene is depicted in the center of the Sistine Chapel ceiling?",
        options: [
            "The Last Supper",
            "The Creation of Adam",
            "The Last Judgment",
            "The Birth of Venus"
        ],
        correct: 1,
        explanation: "The Creation of Adam is perhaps the most iconic scene from the Sistine Chapel ceiling, showing God giving life to Adam."
    },
    {
        question: "What is Michelangelo's most famous sculpture?",
        options: [
            "The Thinker",
            "Venus de Milo",
            "David",
            "The Pietà"
        ],
        correct: 2,
        explanation: "The David, completed between 1501-1504, is considered Michelangelo's masterpiece of sculpture."
    },
    {
        question: "In which city can you find Michelangelo's David?",
        options: [
            "Rome",
            "Florence",
            "Venice",
            "Milan"
        ],
        correct: 1,
        explanation: "The David is housed in the Galleria dell'Accademia in Florence, Italy."
    },
    {
        question: "What material did Michelangelo prefer to work with in his sculptures?",
        options: [
            "Bronze",
            "Marble",
            "Wood",
            "Clay"
        ],
        correct: 1,
        explanation: "Michelangelo preferred working with marble, believing that the sculpture already existed within the block - he just had to free it."
    },
    {
        question: "Which of these works was completed by Michelangelo when he was just 24?",
        options: [
            "David",
            "The Last Judgment",
            "Pietà",
            "Moses"
        ],
        correct: 2,
        explanation: "The Pietà, showing Mary holding the dead Christ, was completed in 1499 when Michelangelo was 24 years old."
    },
    {
        question: "What unique feature can be found on Michelangelo's Moses sculpture?",
        options: [
            "Horns",
            "Wings",
            "Crown",
            "Sword"
        ],
        correct: 0,
        explanation: "Moses is depicted with horns, based on a mistranslation of the Hebrew word 'karan' in the Bible."
    },
    {
        question: "How many years did it take Michelangelo to complete the Sistine Chapel ceiling?",
        options: [
            "2 years",
            "4 years",
            "6 years",
            "8 years"
        ],
        correct: 1,
        explanation: "The Sistine Chapel ceiling took four years to complete, from 1508 to 1512."
    }
];

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
    initAnimations();
});

function initQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;

    let currentQuestion = 0;
    let score = 0;
    let answeredQuestions = new Set();

    function displayQuestion() {
        const question = michelangeloQuizData[currentQuestion];
        
        quizContainer.innerHTML = `
            <div class="quiz-progress">
                <div class="progress-bar" style="width: ${(currentQuestion + 1) / michelangeloQuizData.length * 100}%"></div>
            </div>
            <div class="quiz-question animate-on-scroll">
                <h3>${question.question}</h3>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" data-index="${index}">${option}</button>
                    `).join('')}
                </div>
                <div class="question-counter">
                    Question ${currentQuestion + 1} of ${michelangeloQuizData.length}
                </div>
            </div>
        `;

        // Add event listeners to options
        document.querySelectorAll('.option-btn').forEach(button => {
            button.addEventListener('click', handleAnswer);
        });
    }

    function handleAnswer(e) {
        if (answeredQuestions.has(currentQuestion)) return;

        const selectedIndex = parseInt(e.target.dataset.index);
        const question = michelangeloQuizData[currentQuestion];
        const correct = selectedIndex === question.correct;

        // Visual feedback
        e.target.classList.add(correct ? 'correct' : 'incorrect');
        
        // Show explanation
        const explanationDiv = document.createElement('div');
        explanationDiv.className = `explanation ${correct ? 'correct' : 'incorrect'}`;
        explanationDiv.innerHTML = `
            <p>${correct ? '✓ Correct!' : '✗ Incorrect!'}</p>
            <p>${question.explanation}</p>
        `;
        quizContainer.querySelector('.quiz-question').appendChild(explanationDiv);

        // Update score and mark question as answered
        if (correct) score++;
        answeredQuestions.add(currentQuestion);

        // Show next button
        const nextButton = document.createElement('button');
        nextButton.className = 'quiz-btn next-btn';
        nextButton.textContent = currentQuestion === michelangeloQuizData.length - 1 ? 'Show Results' : 'Next Question';
        nextButton.addEventListener('click', () => {
            currentQuestion++;
            if (currentQuestion < michelangeloQuizData.length) {
                displayQuestion();
            } else {
                showResults();
            }
        });
        quizContainer.querySelector('.quiz-question').appendChild(nextButton);
    }

    function showResults() {
        const percentage = (score / michelangeloQuizData.length) * 100;
        let message = '';
        
        if (percentage === 100) {
            message = "Perfect! You're a true Michelangelo expert!";
        } else if (percentage >= 80) {
            message = "Excellent! You have a great knowledge of Michelangelo's work!";
        } else if (percentage >= 60) {
            message = "Good job! You know quite a bit about Michelangelo!";
        } else {
            message = "Keep learning! Michelangelo's art has so much to discover!";
        }

        quizContainer.innerHTML = `
            <div class="quiz-results show">
                <h2>Quiz Complete!</h2>
                <div class="score-circle">
                    <span class="score-number">${score}</span>
                    <span class="score-total">/${michelangeloQuizData.length}</span>
                </div>
                <p class="score-message">${message}</p>
                <button class="quiz-btn retry-btn" onclick="location.reload()">Try Again</button>
                <div class="share-results">
                    <p>Share your results:</p>
                    <div class="social-buttons">
                        <button onclick="shareResults('twitter')" class="share-btn twitter">Twitter</button>
                        <button onclick="shareResults('facebook')" class="share-btn facebook">Facebook</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Start the quiz
    displayQuestion();
}

// Share results function
function shareResults(platform) {
    const text = `I just took the Michelangelo Art Quiz! Test your knowledge too!`;
    const url = window.location.href;
    
    if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
    }
}

// Animation initialization
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}
