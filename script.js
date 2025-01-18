const herosDraggable = document.querySelectorAll('.hero');
let currentDroppable = null;

herosDraggable.forEach((hero) => {
  hero.onmousedown = function(event) {

    let shiftX = event.clientX - hero.getBoundingClientRect().left;
    let shiftY = event.clientY - hero.getBoundingClientRect().top;

    hero.style.position = 'absolute';
    hero.style.zIndex = 1000;
    document.body.append(hero);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      hero.style.left = pageX - shiftX + 'px';
      hero.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      hero.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      hero.hidden = false;

      if (!elemBelow) return;

      let droppableBelow = elemBelow.closest('.droppable');
      if (currentDroppable != droppableBelow) {
        if (currentDroppable) { 
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) { 
          enterDroppable(currentDroppable);
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    hero.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      hero.onmouseup = null;
    };

  };

  hero.ondragstart = function() {
    return false;
  };
});

function enterDroppable(elem) {
  elem.style.background = 'pink';
}

function leaveDroppable(elem) {
  elem.style.background = '';
}
