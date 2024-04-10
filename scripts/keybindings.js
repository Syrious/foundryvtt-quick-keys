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

function registerKey(action, name, key) {
    let keys = [];

    if (key) {
        keys = [
            {
                key: key
            }
        ]
    }

    game.keybindings.register(MODULE_NAME, action, {
        name: name,
        editable: keys,

        onDown: () => {
            change(action)
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
    registerKey(NOTES, "Notes-View", "KeyN");
}

Hooks.once('setup', async () => {
    setupKeys();
});