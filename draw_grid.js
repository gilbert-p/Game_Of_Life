window.addEventListener("DOMContentLoaded", function () {

    // let cell = document.createElement("div");

    // cell.classList.add("row");

    // let game_board = document.getElementById("game-board");

    // game_board.appendChild(cell);
    // let cell_2 = document.createElement("div")
    // cell_2.classList.add("row");
    // game_board.appendChild(cell_2);

    const initialize_grid_dom = (row_size, column_size) => {
        let game_board = document.getElementById("game-board");
        for (let rr = 0; rr < row_size; rr++) {
            let curr_row = document.createElement("div");
            curr_row.classList.add("row");
            game_board.appendChild(curr_row);

            for (let cc = 0; cc < column_size; cc++) {
                let rows = document.getElementsByClassName("row")[rr];

                let new_cell = document.createElement("div");

                new_cell.classList.add("cell");
                new_cell.id = `${cc + 1}`;

                rows.appendChild(new_cell);

            }

        }
    };

    initialize_grid_dom(30, 20);

});