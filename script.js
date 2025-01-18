const herosDraggable = document.querySelectorAll('.hero');
let currentDroppable = null;

herosDraggable.forEach((hero) => {
  const startDrag = (event) => {
    // For mobile/touch, we use touch events, otherwise mouse events
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;

    let shiftX = clientX - hero.getBoundingClientRect().left;
    let shiftY = clientY - hero.getBoundingClientRect().top;

    hero.style.position = 'absolute';
    hero.style.zIndex = 1000;
    document.body.append(hero);

    moveAt(clientX, clientY);

    function moveAt(pageX, pageY) {
      hero.style.left = pageX - shiftX + 'px';
      hero.style.top = pageY - shiftY + 'px';
    }

    function onMove(event) {
      // For mobile/touch, use touch coordinates
      const pageX = event.pageX || event.touches[0].pageX;
      const pageY = event.pageY || event.touches[0].pageY;

      moveAt(pageX, pageY);

      hero.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX || event.touches[0].clientX, event.clientY || event.touches[0].clientY);
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

    // Add appropriate event listeners for mouse or touch
    const onEnd = (endEvent) => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchend', onEnd);
    };

    // Listen to mouse/touchmove events
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove);

    // Listen for mouse/touch end
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);
  };

  // Use touchstart or mousedown depending on the input type
  hero.addEventListener('mousedown', startDrag);
  hero.addEventListener('touchstart', startDrag);

  // Prevent default drag behavior
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

