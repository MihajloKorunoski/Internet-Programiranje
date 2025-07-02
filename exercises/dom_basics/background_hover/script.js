    function bgChange(bg){
      document.body.style.background = bg;
    }
    document.addEventListener('DOMContentLoaded', () => {
      const cells = document.querySelectorAll('.color-cell');
      cells.forEach(cell => {
        cell.addEventListener('mouseover', function (){
          bgChange(window.getComputedStyle(this).backgroundColor);
        })
        cell.addEventListener('mouseout', function(){
          bgChange('transparent');
        })
      })
    })
