     const initialize_grid_dom = (row_size, column_size) => {
         let cell_count = 1;

         let game_board = document.getElementById("game-board");
         for (let rr = 0; rr < row_size; rr++) {
             let curr_row = document.createElement("div");
             curr_row.classList.add("row");
             game_board.appendChild(curr_row);

             for (let cc = 0; cc < column_size; cc++) {
                 let rows = document.getElementsByClassName("row")[rr];

                 let new_cell = document.createElement("div");

                 new_cell.classList.add("cell");
                 new_cell.classList.add("dead");
                 new_cell.id = `c-${cell_count}`;

                 cell_count++;
                 rows.appendChild(new_cell);
             }
         }
     };

     const toggle_cell_state = function (y, x) {
         toggle_state(y, x);
         update_display_grid(grid);
     };

     //add event listeners to every cell
     //cells can be referenced by the id pattern 'c-#' (eg. c-1)
     const add_cell_event_listeners = () => {
         let cell_list = document.getElementsByClassName("cell");
         let curr_row = 0;
         let column_tracker = 0;

         for (let cell_item = 0; cell_item < cell_list.length; cell_item++) {
             if (column_tracker > COLUMNS - 1) {
                 curr_row++;
                 column_tracker = 0;
             }

             let x_position = cell_item % COLUMNS;
             let y_position = curr_row;

             // cell_list[cell_item].onclick = toggle_cell_state(y_position, x_position);
             cell_list[cell_item].addEventListener("click", function () {
                 toggle_cell_state(y_position, x_position);
             });

             column_tracker++;
         }
     };

     const update_display_grid = () => {
         let cell_list = document.getElementsByClassName("cell");
         let curr_row = 0;
         let column_tracker = 0;

         for (let cell_item = 0; cell_item < cell_list.length; cell_item++) {
             //Restricts range of row traversal
             if (column_tracker > COLUMNS - 1) {
                 curr_row++;
                 column_tracker = 0;
             }

             //Restricts range of column traversal
             let x_position = cell_item % COLUMNS;
             let y_position = curr_row;

             let current_cell = grid[y_position][x_position];

             if (!current_cell.alive) {
                 cell_list[cell_item].classList.add("dead");
             } else {
                 cell_list[cell_item].classList.remove("dead");
             }

             column_tracker++;

             live_cell(current_cell);
         }
     };

     //create a function to show display cells based on dummy data

     initialize_grid_dom(ROWS, COLUMNS);
     add_cell_event_listeners();


     initialize_live_cells();

     setInterval(update_display_grid, 150);