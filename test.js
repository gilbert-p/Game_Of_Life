const live_cell = (cell) => {

    console.log("neighbor_count: " + cell.neighbor_count);

    //cell comes to life with 3 neighbors
    if (!cell.alive) {
        if (cell.neighbor_count == 3) {
            console.log("revived")
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
            console.log("stays alive");
            //cell stays alive 
            return true;
        }
    }
    if (cell.neighbor_count > 3) {
        console.log("greater than 3");
        return false;
    }
}

const create_cell = (n) => {
    //y and x refers to row and column respectively
    let cell = {
        alive: false,
        neighbor_count: n
    }
    return cell;
};

let cell_test1 = create_cell(0);
let cell_test2 = create_cell(1);
let cell_test3 = create_cell(2);
let cell_test4 = create_cell(3);
let cell_test5 = create_cell(4);
let cell_test6 = create_cell(5);

console.log(cell_test5);
console.log(live_cell(cell_test4));