// קוד ה-JavaScript הראשי שלך
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackMessage = document.getElementById('feedback-message');
const nextButton = document.getElementById('next-button');

let currentQuestion = null;

// פונקציה לבחירת שאלה אקראית והצגתה
function loadRandomQuestion() {
    // בחר שאלה אקראית מהמערך
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];

    // נקה את האפשרויות וההודעות הקודמות
    optionsContainer.innerHTML = '';
    feedbackMessage.textContent = '';
    nextButton.style.display = 'none';

    // הצג את השאלה
    questionText.textContent = currentQuestion.question;

    // צור עותק של מערך האפשרויות וערבב אותו
    const shuffledOptions = [...currentQuestion.options];
    shuffledOptions.sort(() => Math.random() - 0.5);

    // צור כפתורים עבור אפשרויות התשובה המעורבבות
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => checkAnswer(button, option));
        optionsContainer.appendChild(button);
    });
}

// פונקציה לבדיקת התשובה של המשתמש
function checkAnswer(selectedButton, selectedOption) {
    const isCorrect = selectedOption === currentQuestion.answer;
    
    // סמן את כל הכפתורים כלא פעילים
    document.querySelectorAll('.option-button').forEach(button => {
        button.disabled = true;
    });

    if (isCorrect) {
        selectedButton.classList.add('correct');
        feedbackMessage.textContent = 'כל הכבוד! תשובה נכונה 🎉';
    } else {
        selectedButton.classList.add('incorrect');
        feedbackMessage.textContent = `טעות. התשובה הנכונה היא: ${currentQuestion.answer}`;
        // הדגש את התשובה הנכונה אם קיימת
        document.querySelectorAll('.option-button').forEach(button => {
            if (button.textContent === currentQuestion.answer) {
                button.classList.add('correct');
            }
        });
    }

    // הצג את כפתור "לשאלה הבאה"
    nextButton.style.display = 'block';
}

// טען שאלה ראשונית
document.addEventListener('DOMContentLoaded', loadRandomQuestion);

// הוסף מאזין לאירוע לחיצה על כפתור "לשאלה הבאה"
nextButton.addEventListener('click', loadRandomQuestion);
