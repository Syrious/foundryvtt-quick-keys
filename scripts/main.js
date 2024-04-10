CONFIG.debug.hooks = false;

let lastActive
let lastKeyPressed;
let keyPressedProcessed = false;
let bodyElement;

Hooks.once('ready', async () => {
    bodyElement = document.querySelector('.vtt.game');
});

window.addEventListener('keydown', function (event) {
    if (document.activeElement === bodyElement && event.key === 'q' && !keyPressedProcessed) {
        console.log(bodyElement)

        lastActive = document.querySelector('.scene-control.active').dataset.control;
        lastKeyPressed = event.key;
        keyPressedProcessed = true;

        activateElement("lighting");
    }
});

window.addEventListener('keyup', function (event) {

    if (lastKeyPressed && event.key === lastKeyPressed) {
        activateElement(lastActive);

        lastActive = null;
        lastKeyPressed = null;
        keyPressedProcessed = false;
    }
});


function activateElement(param) {
    const element = document.querySelector(`[data-control="${param}"]`);
    if (element) {
        element.click();
    }
}

// .dataset.control