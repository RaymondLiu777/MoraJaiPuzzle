document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    console.log(cell.dataset.index);
  });
});

document.querySelector('#load-puzzle').addEventListener('click', () => {
  document.querySelector('.box-top').classList.add('hide-top');
  document.querySelector('.box-top-back').classList.add('hide-top');
});

document.querySelector('.allowance-token').addEventListener('click', () => {
  document.querySelector('.box-top').classList.remove('hide-top');
  document.querySelector('.box-top-back').classList.remove('hide-top');
});