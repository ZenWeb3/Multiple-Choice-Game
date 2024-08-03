// Defining constants for the buttons and the score text for functionality
const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn"); // Correct ID casing
const finalScore = document.querySelector("#finalScore");

// Assuming mostRecentScore is a variable holding the score value
const mostRecentScore = localStorage.getItem("mostRecentScore") || 0;
finalScore.innerText = mostRecentScore;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MaxHighScore = 5;

// Disable the save button if the username input is empty initially
saveScoreBtn.disabled = !username.value.trim();

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value.trim(); // Use trim() to avoid spaces being counted as valid input
});

const saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: parseInt(mostRecentScore), // Convert score to a number
        name: username.value.trim() // Use trim() to remove spaces from the name
    };

    highScores.push(score);

    // Sort the scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Keep only the top `MaxHighScore` scores
    highScores.splice(MaxHighScore);

    // Store the updated high scores in localStorage
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // Redirect to the home page
    window.location.assign('./index.html');
};

// Add event listener to save score button
saveScoreBtn.addEventListener('click', saveHighScore);
