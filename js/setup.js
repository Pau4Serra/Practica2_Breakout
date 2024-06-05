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
        let highscoreTable = `
            <h2 id="top5">TOP 5</h2>
            <table id="table_highscores">
                <thead>
                    <tr>
                        <th class="title_highscores">NAME</th>
                        <th class="title_highscores">SCORE</th>
                    </tr>
                </thead>
                <tbody>`;
        highscores.forEach(highscore => {
            highscoreTable += `
                <tr>
                    <td class="points">${highscore.name}</td>
                    <td class="points">${highscore.score} points</td>
                </tr>`;
        });
        highscoreTable += `
                </tbody>
            </table>`;
        $('.highscore').html(highscoreTable);
        $('.highscore_menu').html(highscoreTable);
    }

    clickPopup(overlay, popup) {
        //console.log(joc.puntuacio);
        $('body').append(overlay).append(popup);
        $('#closePopup').on('click', () => {
            //console.log("entra");
            let playerName = $('#playerName').val();
            if (playerName) {
                this.updateHighscores(playerName, Math.round(joc.puntuacio));
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

    resetJSON() {
        localStorage.removeItem('highscores');
        this.displayHighscores();
    }
}

$('#removeJSON').on('click', function() {
    setup.resetJSON();
});

$(document).ready(function() {
    positionRemoveJSON();
});

function positionRemoveJSON() {
    
    var highscoreMenu = document.querySelector(".highscore_menu");
    var removeJSON = document.getElementById("removeJSON");
    var highscoreMenuBottom = highscoreMenu.offsetTop + highscoreMenu.offsetHeight;
    var spaceBetween = 10;

    removeJSON.style.top = highscoreMenuBottom + spaceBetween + "px";
}



