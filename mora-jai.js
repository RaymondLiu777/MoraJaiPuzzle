document.querySelector('#load-puzzle').addEventListener('click', () => {
  boxUnlock.play();
  setTimeout(function () {
    document.querySelector('.box-top').classList.add('hide-top');
    document.querySelector('.box-top-back').classList.add('hide-top');
  }, 300);
});

document.querySelector('.allowance-token').addEventListener('click', () => {
  document.querySelector('.box-top').classList.remove('hide-top');
  document.querySelector('.box-top-back').classList.remove('hide-top');
  setTimeout(function () {
    boxUnlock.play();
  }, 700);
});

document.querySelectorAll('.corner-button').forEach(cornerButton => {
  cornerButton.addEventListener('click', () => {
    buttonClick.play();
    setTimeout(function () {
      moraJai.resetPuzzle();
      updateGrid();
    }, 150);
  });
});

document.querySelector('#play-puzzle').addEventListener('click', () => {
  updateGrid();
});

moraJai = new MoraJaiBox(3)
updateGrid();

var buttonClick = new Audio('assets/button-click.mp3');
var boxUnlock = new Audio('assets/box-unlock.mp3');

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    buttonClick.play();
    setTimeout(function () {
      let location = convertToRowCol(cell.dataset.index); 
      moraJai.click(location[0], location[1]);
      updateGrid();
    }, 150);
  });
});

function updateGrid() {
  document.querySelectorAll('.cell').forEach(cell => {
    let location = convertToRowCol(cell.dataset.index);
    let color = getComputedStyle(document.documentElement)
                .getPropertyValue('--game-' + moraJai.grid[location[0]][location[1]])
                .trim();
    cell.style.backgroundColor = color;
  })
}

function convertToRowCol(number) {
  number = number - 1;
  return [Math.floor(number/moraJai.size), number % moraJai.size];
}