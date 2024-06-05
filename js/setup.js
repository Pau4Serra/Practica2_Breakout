class Setup {
    updateHighscores(name, score) {
        let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        highscores.push({ name: name, score: score });
        highscores.sort((a, b) => b.score - a.score);
        if (highscores.length > 5) highscores.pop();
        localStorage.setItem('highscores', JSON.stringify(highscores));
    }

    displayHighscores() {
        let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        let highscoreTable = '<h2>Highscores</h2><ul style="list-style-type: none; padding: 10px; text-align: left;">';
        highscores.forEach(highscore => {
            highscoreTable += `<li>${highscore.name}: ${highscore.score} points</li>`;
        });
        highscoreTable += '</ul>';
        $('#highscore').html(highscoreTable);
    }

    clickPopup(overlay, popup) {
        $('body').append(overlay).append(popup);
        $('#closePopup').on('click', function() {
            console.log("entra")
            let playerName = $('#playerName').val();
            if (playerName) {
                this.updateHighscores(playerName, Math.round(joc.puntuacio * joc.multi));
                this.displayHighscores();
                overlay.remove();
                popup.remove();
                setTimeout(() => {
                    location.reload();
                }, 100);
            } else {
                $('#errorMessage').show();
            }
        });
    }
}




