import {change, restore} from "./main.js";

const MODULE_NAME = "quick-keys";

const TOKEN = "token";
const MEASURE = "measure";
const TILES = "tiles";
const DRAWINGS = "drawings";
const WALLS = "walls";
const LIGHTING = "lighting";
const SOUNDS = "sounds";
const NOTES = "notes";


Hooks.once('setup', async () => {
    setupKeys();
    setupApi()
    // This won't work here since UI is not there, yet
   // register3rdParty()
});

Hooks.once('ready', async () => {
    // This won't work here either because registering keys can only be done in setup phase
    // register3rdParty()
});



function setupApi() {
    game.modules.get(MODULE_NAME).api = {
        registerKey: function (dataControl, displayName, key) {
            return registerKey(dataControl, displayName, key);
        }
    }
}

function registerKey(dataControl, name, key) {
    let keys = [];

    if (key) {
        keys = [
            {
                key: key
            }
        ]
    }

    game.keybindings.register(MODULE_NAME, dataControl, {
        name: name,
        editable: keys,

        onDown: () => {
            change(dataControl)
        },
        onUp: () => {
            restore()
        },

        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
}

function register3rdParty() {
    const controls = ui.controls.controls
    controls.forEach(control => {
        console.log(control)
        if (![TOKEN, MEASURE, TILES, DRAWINGS, WALLS, LIGHTING, SOUNDS, NOTES].includes(control)) {
            let name = control.name;
            registerKey(control,name.charAt(0).toUpperCase() + name.slice(1) + "-View")
        }
    });

}

function setupKeys() {
    registerKey(TOKEN, "Token-View");
    registerKey(MEASURE, "Measure-View", "KeyE");
    registerKey(TILES, "Tiles-View");
    registerKey(DRAWINGS, "Drawings-View", "KeyF");
    registerKey(WALLS, "Walls-View");
    registerKey(LIGHTING, "Lighting-View", "KeyQ");
    registerKey(SOUNDS, "Sounds-View", "KeyP");
    registerKey(NOTES, "Notes-View", "KeyN");
}