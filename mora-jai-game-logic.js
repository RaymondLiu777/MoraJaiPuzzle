class MoraJaiBox {
    // Static functions for configuring colors
    static colors = {}
    static puzzles = {}

    static adjacent = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    static clockwiseRotation = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

    static registerColor(color, action) {
        if(!(color in MoraJaiBox.colors)) {
            MoraJaiBox.colors[color] = {
                name: color,
                action: action,
            }
        }
        else {
            console.log("Error color already registered:", color)
        }
    }

    static registerLevel(level, next, grid, goal) {
        if(!(level in MoraJaiBox.puzzles)) {
            MoraJaiBox.puzzles[level] = {
                name: level,
                next: next,
                grid: grid,
                goal: goal,
            }
        }
        else {
            console.log("Error puzzle already registered:", color)
        }
    }

    static inGrid(row, col, grid) {
        return row >= 0 && row < grid.length && col >= 0 && col < grid.length;
    }

    constructor(size) {
        console.log(MoraJaiBox.colors)
        // Create grid
        this.size = size;
        this.grid = new Array();
        for(let i = 0; i < size; i++) {
            let row = new Array();
            for(let j = 0; j < size; j++) {
                row.push(MoraJaiBox.colors.gray.name);
            }
            this.grid.push(row);
        }
        // Create corners
        this.corners = {
            tl: {
                goal: "gray",
                clicked: false,
            },
            tr: {
                goal: "gray",
                clicked: false,
            },
            bl: {
                goal: "gray",
                clicked: false,
            },
            br: {
                goal: "gray",
                clicked: false,
            }
        }
        // Solved Gamestate
        this.solved = false;
        this.levelName = "";

        this.loadLevel("master-bedroom");
    }

    loadPuzzle(puzzle, goal) {
        // Validate colors
        let valid = true;
        if(puzzle.length != 3) {
            valid = false;
        }
        for(let i = 0; i < puzzle.length; i++) {
            if(puzzle[i].length != 3) {
                valid = false;
            }
            for(let j = 0; j < puzzle[i].length; j++) {
                if(!(puzzle[i][j] in MoraJaiBox.colors)) {
                    valid = false
                }
            }
        }
        if(goal.length != 4) {
            valid = false;
        }
        for(let i = 0; i < goal.length; i++) {
            if(!(goal[i] in MoraJaiBox.colors)) {
                valid = false;
            }
        }
        if(!valid) {
            console.log("Invalid puzzle", puzzle, goal);
            return;
        }
        this.grid = structuredClone(puzzle);
        this.corners = {
            tl: {
                goal: goal[0],
                clicked: false,
            },
            tr: {
                goal: goal[1],
                clicked: false,
            },
            bl: {
                goal: goal[2],
                clicked: false,
            },
            br: {
                goal: goal[3],
                clicked: false,
            }
        }
        this.start = structuredClone(puzzle);
        this.solved = false;
    }

    loadLevel(levelName) {
        if(levelName in MoraJaiBox.puzzles) {
            this.levelName = levelName;
            this.loadPuzzle(MoraJaiBox.puzzles[levelName].grid, MoraJaiBox.puzzles[levelName].goal)
        }
    }

    nextLevel() {
        if(this.levelName in MoraJaiBox.puzzles) {
            let nextLevel = MoraJaiBox.puzzles[this.levelName].next;
            if(nextLevel in MoraJaiBox.puzzles) {
                this.loadLevel(nextLevel);
            }
        }
    }

    clickGrid(row, col) {
        let old_grid = this.grid;
        this.grid = structuredClone(old_grid);
        MoraJaiBox.colors[this.grid[row][col]].action(row, col, this.grid);
    }
    
    clickCorner(location) {
        if(location == "tl" && this.grid[0][0] == this.corners[location].goal) {
            this.corners[location].clicked = true; 
        }
        else if(location == "tr" && this.grid[0][this.grid.length - 1] == this.corners[location].goal) {
            this.corners[location].clicked = true; 
        }
        else if(location == "bl" && this.grid[this.grid.length - 1][0] == this.corners[location].goal) {
            this.corners[location].clicked = true; 
        }
        else if(location == "br" && this.grid[this.grid.length - 1][this.grid.length - 1] == this.corners[location].goal) {
            this.corners[location].clicked = true; 
        }
        else {
            this.resetPuzzle();
        }
        // Check for win
        this.solved = true;
        for(const location of ["tl", "tr", "bl", "br"]) {
            if(!this.corners[location].clicked) {
                this.solved = false;
            }
        }
    }

    resetPuzzle() {
        this.grid = structuredClone(this.start);
        for(const location of ["tl", "tr", "bl", "br"]) {
            this.corners[location].clicked = false;
        }
        this.solved = false;
    }

}

// Does nothing if clicked
MoraJaiBox.registerColor("gray", function(row, col, grid) {});

// Move row to the right
MoraJaiBox.registerColor("black", function(row, col, grid) {
    let lastColor = grid[row][grid.length - 1]
    for(let j = grid.length - 2; j >= 0; j--) {
        grid[row][(j+1)%grid.length] = grid[row][j];
    }
    grid[row][0] = lastColor;
});

// Change White to Black and Black to Red
MoraJaiBox.registerColor("red", function(row, col, grid) {
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid.length; j++) {
            if(grid[i][j] == MoraJaiBox.colors.black.name) {
                grid[i][j] = MoraJaiBox.colors.red.name;
            }
            if(grid[i][j] == MoraJaiBox.colors.white.name) {
                grid[i][j] = MoraJaiBox.colors.black.name;
            }
        }
    }
});

// Make adjacent gray squares white
MoraJaiBox.registerColor("white", function(row, col, grid) {
    for (let [x, y] of MoraJaiBox.adjacent) {
        let new_row = row + x;
        let new_col = col + y;
        if(MoraJaiBox.inGrid(new_row, new_col, grid)) {
            if(grid[new_row][new_col] == MoraJaiBox.colors.gray.name) {
                grid[new_row][new_col] = MoraJaiBox.colors.white.name;
            }
            else if(grid[new_row][new_col] == MoraJaiBox.colors.white.name) {
                grid[new_row][new_col] = MoraJaiBox.colors.gray.name;
            }
        }
    }
    grid[row][col] = MoraJaiBox.colors.gray.name;
});

// Swap with opposite tile
MoraJaiBox.registerColor("green", function(row, col, grid) {
    let size = grid.length;
    let swapRow = size - row - 1;
    let swapCol = size - col - 1;
    let swapColor = grid[swapRow][swapCol];
    grid[swapRow][swapCol] = grid[row][col];
    grid[row][col] = swapColor;
});

// Swap with tile above
MoraJaiBox.registerColor("yellow", function(row, col, grid) {
    if(row > 0) {
        let swapColor = grid[row - 1][col];
        grid[row - 1][col] = grid[row][col];
        grid[row][col] = swapColor;
    }
});

// Swap with tile below
MoraJaiBox.registerColor("purple", function(row, col, grid) {
    if(row < grid.length - 1) {
        let swapColor = grid[row + 1][col];
        grid[row + 1][col] = grid[row][col];
        grid[row][col] = swapColor;
    }
});

// Move all tiles around it in a clockwise rotation
MoraJaiBox.registerColor("pink", function(row, col, grid) {
    // Calculate all nearby positions that are on the grid
    let validPosition = [];
    for (let [x, y] of MoraJaiBox.clockwiseRotation) {
        if(MoraJaiBox.inGrid(row + x, col + y, grid)) {
            validPosition.push([row + x, col + y]);
        }
    }
    // Rotate clockwise
    let lastColor = grid[validPosition[validPosition.length - 1][0]][validPosition[validPosition.length - 1][1]];
    for (let i = validPosition.length - 2; i >= 0; i--) {
        grid[validPosition[i+1][0]][validPosition[i+1][1]] = grid[validPosition[i][0]][validPosition[i][1]];
    }
    grid[validPosition[0][0]][validPosition[0][1]] = lastColor;
});

// Turn into the color of the most frequent adjacent tile color
MoraJaiBox.registerColor("orange", function(row, col, grid) {
    // Count nearby colors
    let nearbyColors = {}
    for (let [x, y] of MoraJaiBox.adjacent) {
        let new_row = row + x;
        let new_col = col + y;
        if(MoraJaiBox.inGrid(new_row, new_col, grid)) {
            let color = grid[new_row][new_col];
            if(!(color in nearbyColors)) {
                nearbyColors[color] = 0;
            }
            nearbyColors[color] += 1;
        }
    }
    // Calculate majority
    let majorityColor = "";
    let majorityCount = 0;
    let tie = false;
     for (let [color, count] of Object.entries(nearbyColors)) {
        if (count > majorityCount) {
            majorityCount = count;
            majorityColor = color;
            tie = false;
        } else if (count === majorityCount) {
            tie = true;
        }
    }
    if (!tie) {
        grid[row][col] = majorityColor;
    }
});