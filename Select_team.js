const teamButtons = document.querySelectorAll(".team-button");
let selectedButton = null;

// Add click event listener to each team button
teamButtons.forEach(button => {
    button.addEventListener("click", function() {
        if (selectedButton) {
            selectedButton.classList.remove("pressed");
        }
        selectedButton = button;
        button.classList.add("pressed");
    });
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
