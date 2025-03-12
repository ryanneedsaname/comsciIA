// List of teams
const teams = ["ACSC Boys Volleyball","ACSC Girls Volleyball","ACSC Boys Soccer","ACSC Girls Soccer","ACSC Boys Basketball","ACSC Girls Basketball","SMA Boys Basketball 24-25","SMA Girls Basketball 24-25","SMP Boys Volleyball 24-25","SMP Girls Volleyball 24-25","SMA Boys Volleyball 24-25","SMA Girls Volleyball 24-25","SMA Boys Soccer 24-25","SMA Girls Soccer 24-25","SMP Boys Basketball 24-25","SMP Girls Basketball 24-25"];

const teamList = document.getElementById("team-list");
let selectedButton = null;

// Create team buttons dynamically
teams.forEach(team => {
    const button = document.createElement("button");
    button.textContent = team;
    button.classList.add("team-button");

    button.addEventListener("click", function() {
        if (selectedButton) {
            selectedButton.classList.remove("pressed");
        }
        selectedButton = button;
        button.classList.add("pressed");
    });

    teamList.appendChild(button);
});

// Reset selection when background or action buttons are clicked
document.body.addEventListener("click", function(event) {
    if (!event.target.classList.contains("team-button") &&
        !event.target.classList.contains("action-buttons") &&
        !event.target.closest(".action-buttons")) {
        if (selectedButton) {
            selectedButton.classList.remove("pressed");
            selectedButton = null;
        }
    }
});

// Action Buttons
document.getElementById("edit-team").addEventListener("click", resetSelection);
document.getElementById("track-stats").addEventListener("click", resetSelection);
document.getElementById("stats-sheet").addEventListener("click", resetSelection);

function resetSelection() {
    if (selectedButton) {
        selectedButton.classList.remove("pressed");
        selectedButton = null;
    }
}

function adjustFontSize() {
    const vw = window.innerWidth / 100;
    const vh = window.innerHeight / 100;
    
    // Set a dynamic font size based on viewport width and height
    document.documentElement.style.setProperty('--dynamic-font-size', `${Math.min(vw, vh) * 1.2}px`);
}

// Run on page load and window resize
window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', adjustFontSize);

document.addEventListener("DOMContentLoaded", function () {
    const selectTeamButton = document.querySelector('.touch-button');

    if (selectTeamButton) {
        selectTeamButton.addEventListener("click", async function () {
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxk3S-nMV3VebH6NRET5UpExRLmDR8UVOqKX6jjmzQoz3EI9GwdEyjJfm_Ac1tjm9pkew/exec';
            
            const formData = new FormData();
            formData.append('action', 'team_select');

            try {
                let response = await fetch(scriptURL, { method: 'POST', body: formData });
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                let responseMessage = await response.text();

                if (responseMessage.trim().toLowerCase() === 'redirect') {
                    window.location.href = 'select_team.html';
                } else {
                    console.error('Unexpected response:', responseMessage);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});

