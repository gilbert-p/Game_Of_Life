let is_active = false;
let current_icon = "";

let interval_timer = "";


let advance = function () {

    let play_button = document.getElementById("play");

    if (!is_active) {
        interval_timer = setInterval(update_display_grid, 150);

        play_button.removeChild(play_button.children[0]);

        //switch to pause icon
        play_button.appendChild(document.createElement("i"));
        play_button.children[0].classList.add("fas");
        play_button.children[0].classList.add("fa-pause");
        play_button.children[0].classList.add("fa-5x");

        is_active = !is_active;
    } else {

        clearInterval(interval_timer);
        play_button.removeChild(play_button.children[0]);

        //switch to play icon
        play_button.appendChild(document.createElement("i"));
        play_button.children[0].classList.add("far");
        play_button.children[0].classList.add("fa-play-circle");
        play_button.children[0].classList.add("fa-5x");

        is_active = !is_active;


    }
}

let play_button = document.getElementById("play").addEventListener("click", advance);