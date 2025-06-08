class MoraJaiBox {
    constructor(size) {
        // set up colors
        this.colors = {
            gray: { name: "gray", action: this.gray.bind(this) },
            black: { name: "black", action: this.black.bind(this) },
            red: { name: "red", action: this.red.bind(this) },
            white: { name: "white", action: this.white.bind(this) },
        };
        // Name to color array
        this.nameToColor = {};
        for (const [key, value] of Object.entries(this.colors)) {
            this.nameToColor[value.name] = value;
        }
        console.log(this.nameToColor);
        // Create grid
        this.size = size;
        this.grid = new Array();
        for(let i = 0; i < size; i++) {
            let row = new Array();
            for(let j = 0; j < size; j++) {
                row.push(this.colors.gray.name);
            }
            this.grid.push(row);
        }
        this.grid[1][1] = this.colors.white.name;
    }

    click(row, col) {
        let old_grid = this.grid;
        this.grid = structuredClone(old_grid);
        this.colors[this.grid[row][col]].action(row, col, old_grid);
    }

    gray(row, col, old_grid) {
        // Does nothing if clicked
    }

    black(row, col, old_grid) {
        // Move row to the right
        for(let j = 0; j < this.size; j++) {
            this.grid[row][(j+1)%size] = old_grid[row][j];
        }
    }

    red(row, col, old_grid) {
        // Change White to Black and Black to Red
        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                if(old_grid[i][j] == this.colors.black.name) {
                    this.grid[i][j] == this.colors.red.name;
                }
                if(old_grid[i][j] == this.colors.white.name) {
                    this.grid[i][j] == this.colors.black.name;
                }
            }
        }
    }

    white(row, col, old_grid) {
        // Make adjacent gray squares white
        let adjacent = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        for (let [x, y] of adjacent) {
            let new_row = row + x;
            let new_col = col + y;
            if(new_row >= 0 && new_row < this.size && new_col >= 0 && new_col < this.size) {
                if(old_grid[new_row][new_col] == this.colors.gray.name) {
                    this.grid[new_row][new_col] = this.colors.white.name;
                }
                else if(old_grid[new_row][new_col] == this.colors.white.name) {
                    this.grid[new_row][new_col] = this.colors.gray.name;
                }
            }
        }
        this.grid[row][col] = this.colors.gray.name;
    }

}