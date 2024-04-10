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