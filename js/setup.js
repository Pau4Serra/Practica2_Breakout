
function updateHighscores(name, score) {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({ name: name, score: score });
    highscores.sort((a, b) => b.score - a.score);
    if (highscores.length > 5) highscores.pop();
    localStorage.setItem('highscores', JSON.stringify(highscores));
}

function displayHighscores() {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    let highscoreTable = '<h2>Highscores</h2><ul style="list-style-type: none; padding: 10px; text-align: left;">';
    highscores.forEach(highscore => {
        highscoreTable += `<li>${highscore.name}: ${highscore.score} points</li>`;
    });
    highscoreTable += '</ul>';
    $('#highscore').html(highscoreTable);
}
