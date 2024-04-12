import {maxDelay} from "./settings.js";

CONFIG.debug.hooks = false;

let tabToSwitchBackTo
let lastManuallyActivatedTab
let bodyElement;

let keyPressTimestamps = [];

Hooks.once('ready', async () => {
    bodyElement = document.querySelector('.vtt.game');
});

export function change(viewToChangeTo) {
    if (document.activeElement === bodyElement) {
        //  tabToSwitchBackTo = document.querySelector('.scene-control.active').dataset.control;
        tabToSwitchBackTo = ui.controls.activeControl;

        accessibility();
        activateElement(viewToChangeTo);
        countTaps();
    }
}

export function restore() {
    if (tabToSwitchBackTo) {
        activateElement(tabToSwitchBackTo);
        tabToSwitchBackTo = null;
    }
}

function accessibility() {
    // This checks if the user manually switched to another tab in the meantime.
    // This consideration is especially essential for users who may need additional time to navigate due to accessibility needs ♥
    // If the user has switched tabs, we reset the taps counter and update the last manually activated tab.
    if (tabToSwitchBackTo !== lastManuallyActivatedTab) {
        lastManuallyActivatedTab = tabToSwitchBackTo;
        resetTapsCounter();
    }
}

function activateElement(param) {
    const element = document.querySelector(`[data-control="${param}"]`);
    if (element) {
        element.click();
    } else {
        console.log(`element ${param} not found`)
    }
}

function countTaps() {
    keyPressTimestamps.push(Date.now());

    if (keyPressTimestamps.length > 3) {
        keyPressTimestamps.shift();  // Keep only last 3 timestamps
    }

    const delay = keyPressTimestamps[2] - keyPressTimestamps[0];
    if (keyPressTimestamps.length === 3 && delay <= maxDelay) {
        // Key has been quickly tapped 3 times in a row.
        tabToSwitchBackTo = null;
        resetTapsCounter()
    }
}

function resetTapsCounter() {
    keyPressTimestamps = [];
}
