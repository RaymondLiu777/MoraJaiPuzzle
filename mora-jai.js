document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    console.log(cell.dataset.index);
  });
});