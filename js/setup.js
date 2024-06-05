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
        $('#closePopup').on('click', () => { // Use arrow function here
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
        localStorage.removeItem('highscores'); // Remove the highscores from localStorage
        this.displayHighscores(); // Update the display
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
    
    // Get the bottom margin of the highscore_menu
    var highscoreMenuBottom = highscoreMenu.offsetTop + highscoreMenu.offsetHeight;
    
    // Add a little bit of space (e.g., 10 pixels) between the two elements
    var spaceBetween = 10; // You can adjust this value as needed
    
    // Set the top position of the removeJSON button to be just below the highscore_menu with added space
    removeJSON.style.top = highscoreMenuBottom + spaceBetween + "px";
}



