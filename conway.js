const ROWS = 9;
const COLUMNS = 9;

let grid = [];
let generations = [];

const createGrid = (rows, col) => {

    let row_temp = [];


    for (let rr = 0; rr < rows; rr++) {
        for (let cc = 0; cc < col; cc++) {

            row_temp.push(create_cell(rr, cc));
        }
        grid.push(row_temp);
        row_temp = [];
    }
}



const create_cell = (y_pos, x_pos) => {
    //y and x refers to row and column respectively
    let cell = {
        alive: false,
        coord_x: x_pos,
        coord_y: y_pos,
        neighbors: function (y, x) {

            let square_bound = 3.
            let iterator = 0;
            let neighbor_list = [];
            let neighbor_count = 0;

            for (let uu = 0; uu < square_bound; uu++) {
                for (let nn = 0; nn < square_bound; nn++) {

                    let bounded_input = {};

                    // console.log("count: ", count);
                    switch (iterator) {
                        case 0:
                            //top-left diagonal
                            bounded_input = check_bound_input(y - 1, x - 1);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }
                            // neighbor_list.push(grid[bounded_input.y_val][bounded_input.x_val].alive);
                            bounded_input = {};
                            iterator++;
                            break;
                        case 1:
                            //top
                            bounded_input = check_bound_input(y - 1, x);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }
                            // neighbor_list.push(grid[bounded_input.y_val][bounded_input.x_val].alive);
                            bounded_input = {};
                            iterator++;
                            break;
                        case 2:
                            //top-right diagonal 
                            bounded_input = check_bound_input(y - 1, x + 1);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }
                            // neighbor_list.push(grid[bounded_input.y_val][bounded_input.x_val].alive);
                            bounded_input = {};
                            iterator++;
                            break;
                        case 3:
                            //left
                            bounded_input = check_bound_input(y, x - 1);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }
                            // neighbor_list.push(grid[bounded_input.y_val][bounded_input.x_val].alive);
                            bounded_input = {};
                            iterator++;
                            break;
                        case 5:
                            //right
                            bounded_input = check_bound_input(y, x + 1);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }
                            // neighbor_list.push(grid[bounded_input.y_val][bounded_input.x_val].alive);
                            bounded_input = {};
                            iterator++;
                            break;
                        case 6:
                            //bottom-left-diagonal
                            bounded_input = check_bound_input(y + 1, x - 1);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }
                            // neighbor_list.push(grid[bounded_input.y_val][bounded_input.x_val].alive);
                            bounded_input = {};
                            iterator++;
                            break;
                        case 7:
                            //bottom
                            bounded_input = check_bound_input(y + 1, x);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }
                            // neighbor_list.push(grid[bounded_input.y_val][bounded_input.x_val].alive);
                            bounded_input = {};
                            iterator++;
                            break;
                        case 8:
                            //bottom-right-diagonal
                            bounded_input = check_bound_input(y + 1, x + 1);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }
                            // neighbor_list.push(grid[bounded_input.y_val][bounded_input.x_val].alive);
                            bounded_input = {};
                            iterator++;
                            break;
                        default:
                            neighbor_list.push("current_cell");
                            iterator++;
                            break;
                    }
                }
            }
            return neighbor_count;
        },
    };
    return cell;
};

const live_cell = (cell) => {
    console.log("neighbor_count: " + cell.neighbor_count);

    //cell comes to life with 3 neighbors
    if (!cell.alive) {
        if (cell.neighbor_count == 3) {
            cell.alive = true;
            console.log("Revived");
            return true;
        } else {

            return false;
        }
        //the latter checks are for live cells
    }
    if (cell.neighbor_count < 2) {
        console.log("less than 2");
        return false;
    }
    if (cell.neighbor_count >= 2) {
        if (cell.neighbor_count < 4) {
            console.log("cell stays alive");
            //cell stays alive 
            return true;
        }
    }
    if (cell.neighbor_count > 3) {
        console.log("greater than 3");
        return false;
    }
}

const getGridWidth = () => {
    return grid[0].length;
}

const getGridHeight = () => {
    return grid.length;
}


const flip_state = (cell) => {
    cell.alive = !cell.alive;
}

const check_bound_input = (y, x) => {
    let coords = {
        x_val: 0,
        y_val: 0
    };
    if (x < 0) {
        coords.x_val = Math.abs(9 + x);
    } else {
        coords.x_val = x % getGridWidth();
    }

    if (y < 0) {
        coords.y_val = Math.abs(3 + y);

    } else {
        coords.y_val = y % getGridHeight();
    }

    return coords;

}

const displayGrid = () => {

    let col = grid[0].length;
    let rows = grid.length;

    for (let rr = 0; rr < rows; rr++) {
        for (let cc = 0; cc < col; cc++) {
            grid[rr][cc].neighbors;
            if (live_cell(grid[rr][cc])) {
                // process.stdout.write(`[1] `);

                process.stdout.write(`1 `);
            } else {
                process.stdout.write('0 ');
            }
        }
        console.log("");
    }
}



createGrid(ROWS, COLUMNS);

console.log("height: " + getGridHeight());

// displayGrid();
flip_state(grid[1][4]);

flip_state(grid[0][3]);
flip_state(grid[2][5]);
flip_state(grid[0][0]);
flip_state(grid[0][8]);
flip_state(grid[2][8]);


displayGrid();

console.log(grid[2][7].neighbors(2, 4));