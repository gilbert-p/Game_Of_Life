const ROWS = 30;
const COLUMNS = 20;

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
        neighbors: function (_y, _x) {


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
                            bounded_input = check_bound_input(_y - 1, _x - 1);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }

                            bounded_input = {};
                            iterator++;
                            break;
                        case 1:
                            //top
                            bounded_input = check_bound_input(_y - 1, _x);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }

                            bounded_input = {};
                            iterator++;
                            break;
                        case 2:
                            //top-right diagonal 
                            bounded_input = check_bound_input(_y - 1, _x + 1);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }

                            bounded_input = {};
                            iterator++;
                            break;
                        case 3:
                            //left
                            bounded_input = check_bound_input(_y, _x - 1);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }

                            bounded_input = {};
                            iterator++;
                            break;
                        case 5:
                            //right
                            bounded_input = check_bound_input(_y, _x + 1);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }

                            bounded_input = {};
                            iterator++;
                            break;
                        case 6:
                            //bottom-left-diagonal
                            bounded_input = check_bound_input(_y + 1, _x - 1);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }

                            bounded_input = {};
                            iterator++;
                            break;
                        case 7:
                            //bottom
                            bounded_input = check_bound_input(_y + 1, _x);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }

                            bounded_input = {};
                            iterator++;
                            break;
                        case 8:
                            //bottom-right-diagonal
                            bounded_input = check_bound_input(_y + 1, _x + 1);
                            if (grid[bounded_input.y_val][bounded_input.x_val].alive) {
                                neighbor_count++;
                            }

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

const getNeighborCount = (y, x) => {
    return grid[y][x].neighbors(y, x);
}

//Applying game rules
const live_cell = (cell) => {


    let neighbor_count = getNeighborCount(cell.coord_y, cell.coord_x);

    //cell comes to life with 3 neighbors
    if (!cell.alive) {
        if (neighbor_count == 3) {
            cell.alive = true;
            return;
        } else {
            cell.alive = false;
            return;
        }
        //the latter checks are for live cells
    }
    if (neighbor_count < 2) {
        cell.alive = false;
        return;
    }
    if (neighbor_count >= 2) {
        if (neighbor_count < 4) {
            //cell stays alive 
            cell.alive = true;
            return;
        }
    }
    if (neighbor_count > 3) {
        cell.alive = false;
        return;
    }
}

const getGridWidth = () => {
    return COLUMNS;
}

const getGridHeight = () => {
    return ROWS;
}


const flip_state = (cell) => {
    cell.alive = !cell.alive;
}

const toggle_state = (y, x) => {
    grid[y][x].alive = !grid[y][x].alive;
    // console.log(`N count for (${y},${x}) is ${getNeighborCount(y,x)}`);
}

//Torordial Grid
const check_bound_input = (y, x) => {
    let coords = {
        x_val: 0,
        y_val: 0
    };
    if (x < 0) {
        coords.x_val = Math.abs(getGridWidth() + x);
    } else {
        coords.x_val = x % getGridWidth();
    }

    if (y < 0) {
        coords.y_val = Math.abs(getGridHeight() + y);

    } else {
        coords.y_val = y % getGridHeight();
    }

    return coords;

}

const updateGrid = () => {

    let col = COLUMNS;
    let rows = ROWS;
    let print_grid = [];
    let print_row = [];


    for (let rr = 0; rr < rows; rr++) {
        for (let cc = 0; cc < col; cc++) {

            live_cell(grid[rr][cc]);
        }
        print_grid.push(print_row);
        print_row = [];

    }
}


const get_grid = () => {
    return grid;
}

// const displayGrid = () => {

//     for (let row_index = 0; row_index < ROWS; row_index++) {
//         for (let col_index = 0; col_index < COLUMNS; col_index++) {

//             if (grid[row_index][col_index].alive) {
//                 process.stdout.write("X");
//             } else {
//                 process.stdout.write(" ");
//             }
//         }
//         console.log();
//     }
//     console.log();
// }

const initialize_live_cells = () => {
    flip_state(grid[2][4]);

    flip_state(grid[3][3]);
    flip_state(grid[4][3]);

    flip_state(grid[5][4]);

    flip_state(grid[5][5]);

    flip_state(grid[3][5]);
    flip_state(grid[4][5]);
}


createGrid(ROWS, COLUMNS);
// initialize_live_cells();

// setInterval(updateGrid, 1000);