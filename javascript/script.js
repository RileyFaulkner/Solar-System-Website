// Quiz code
const questions = [
  { question: 'Which planet is known as the "Red Planet"?', options: ['Mercury', 'Mars', 'Jupiter'], answer: 'Mars' },
  { question: 'Which planet is the largest?', options: ['Earth', 'Saturn', 'Jupiter'], answer: 'Jupiter' },
  { question: 'Which planet is closest to the Sun?', options: ['Mercury', 'Venus', 'Mars'], answer: 'Mercury' },
  { question: 'Which planet has beautiful rings?', options: ['Saturn', 'Uranus', 'Neptune'], answer: 'Saturn' },
  { question: 'Which planet rotates on its side?', options: ['Uranus', 'Venus', 'Earth'], answer: 'Uranus' }
];

let currentQuestion = 0;

function showQuestion() {
  const quizSection = document.getElementById('quiz');
  quizSection.innerHTML = `<h2>Quick Quiz</h2>
    <p>${questions[currentQuestion].question}</p>
    ${questions[currentQuestion].options.map(opt => 
      `<button class="quiz-btn" onclick="checkAnswer('${opt}')">${opt}</button>`).join('')}
    <p id="result"></p>`;
}

function checkAnswer(answer) {
  const result = document.getElementById('result');
  const correctAnswer = questions[currentQuestion].answer;

  if (answer === correctAnswer) {
    result.textContent = `✅ Correct! The answer is ${correctAnswer}.`;
    result.style.color = '#00ff00';
  } else {
    result.textContent = `❌ Incorrect. The correct answer is ${correctAnswer}.`;
    result.style.color = '#ff4d4d';
  }

  const buttons = document.querySelectorAll('.quiz-btn');
  buttons.forEach(btn => btn.disabled = true);

  setTimeout(() => {
    currentQuestion = (currentQuestion + 1) % questions.length;
    showQuestion();
  }, 2000);
}

showQuestion();

// Dropdown animation
document.querySelectorAll('.dropdown').forEach(dropdown => {
  const menuItems = dropdown.querySelectorAll('.dropdown-content li');

  dropdown.addEventListener('mouseenter', () => {
    menuItems.forEach((item, index) => {
      item.classList.remove('drop-out');
      item.style.animationDelay = `${index * 0.05}s`;
      item.classList.add('drop-in');
    });
  });

  dropdown.addEventListener('mouseleave', () => {
    menuItems.forEach((item, index) => {
      item.classList.remove('drop-in');
      item.style.animationDelay = `${index * 0.05}s`;
      item.classList.add('drop-out');
    });
  });
});
