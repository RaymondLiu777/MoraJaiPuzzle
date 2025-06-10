function updateGrid() {
  // Update colors of all the cells
  document.querySelectorAll('.cell').forEach(cell => {
    let location = convertToRowCol(cell.dataset.index);
    let color = getComputedStyle(document.documentElement)
                .getPropertyValue('--game-' + moraJai.grid[location[0]][location[1]])
                .trim();
    cell.style.backgroundColor = color;
  });
  // Update colors for corner buttons
  document.querySelectorAll('.corner-button').forEach(cornerButton => {
    let location = cornerButton.dataset.index;
    let goalColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--game-' + moraJai.corners[location].goal)
                .trim();
    let buttonColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--game-' + (!moraJai.corners[location].clicked ? "gray" : moraJai.corners[location].goal))
                .trim();
    cornerButton.style.borderColor = goalColor;
    cornerButton.style.backgroundColor = buttonColor;
  });
};

function convertToRowCol(number) {
  number = number - 1;
  return [Math.floor(number/moraJai.size), number % moraJai.size];
}

var buttonClick = new Audio('assets/button-click.mp3');
var boxUnlock = new Audio('assets/box-unlock.mp3');

moraJai = new MoraJaiBox(3)
updateGrid();

// Grid buttons click events
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    // Play sound then update grid
    buttonClick.play();
    setTimeout(function () {
      let location = convertToRowCol(cell.dataset.index); 
      moraJai.clickGrid(location[0], location[1]);
      updateGrid();
    }, 150);
  });
});

// Corner buttons click events 
document.querySelectorAll('.corner-button').forEach(cornerButton => {
  cornerButton.addEventListener('click', () => {
    // Play sound and then update the grid after .15 seconds
    buttonClick.play();
    setTimeout(function () {
      moraJai.clickCorner(cornerButton.dataset.index);
      updateGrid();
      // Check if solved
      if(moraJai.solved) {
        // Play unlocking sound and open box after .3 seconds
        setTimeout(function () {
          boxUnlock.play();
          setTimeout(function () {
            document.querySelector('.box-top').classList.add('hide-top');
            document.querySelector('.box-top-back').classList.add('hide-top');
          }, 300);
        }, 300);
      }
    }, 150);
  });
});

// Allowance token click event, if clicked close box and reset puzzle
document.querySelector('.allowance-token').addEventListener('click', () => {
  document.querySelector('.box-top').classList.remove('hide-top');
  document.querySelector('.box-top-back').classList.remove('hide-top');
  setTimeout(function () {
    boxUnlock.play();
  }, 600);
  moraJai.resetPuzzle();
  updateGrid();
});