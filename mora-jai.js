document.querySelector('#load-puzzle').addEventListener('click', () => {
  document.querySelector('.box-top').classList.add('hide-top');
  document.querySelector('.box-top-back').classList.add('hide-top');
});

document.querySelector('.allowance-token').addEventListener('click', () => {
  document.querySelector('.box-top').classList.remove('hide-top');
  document.querySelector('.box-top-back').classList.remove('hide-top');
});

document.querySelector('#play-puzzle').addEventListener('click', () => {
  updateGrid();
});

moraJai = new MoraJaiBox(3)
updateGrid();

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    let location = convertToRowCol(cell.dataset.index); 
    console.log(location);
    moraJai.click(location[0], location[1]);
    console.log(moraJai)
    updateGrid();
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