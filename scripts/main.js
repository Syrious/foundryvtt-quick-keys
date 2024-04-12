CONFIG.debug.hooks = false;

let lastActive
let bodyElement;


Hooks.once('ready', async () => {
    bodyElement = document.querySelector('.vtt.game');
});

export function change(param) {
    if (document.activeElement === bodyElement) {
        //  lastActive = document.querySelector('.scene-control.active').dataset.control;
        lastActive = ui.controls.activeControl;
        activateElement(param);
    }
}

export function restore() {
    activateElement(lastActive);
    lastActive = null;
}

function activateElement(param) {
    const element = document.querySelector(`[data-control="${param}"]`);
    if (element) {
        element.click();
    } else {
        console.log(`element ${param} not found`)
    }
}