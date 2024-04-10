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
    game.keybindings.register(MODULE_NAME, TOKEN, {
        name: "Token-View",
        editable: [],
        onDown: () => {
            change(TOKEN)
        },
        onUp: () => {
            restore()
        },
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });

    game.keybindings.register(MODULE_NAME, MEASURE, {
        name: "Measure-View",
        editable: [
            {
                key: "KeyE"
            }
        ],
        onDown: () => {
            change(MEASURE)
        },
        onUp: () => {
            restore()
        },
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });

    game.keybindings.register(MODULE_NAME, TILES, {
        name: "Tiles-View",
        editable: [],
        onDown: () => {
            change(TILES)
        },
        onUp: () => {
            restore()
        },
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });

    game.keybindings.register(MODULE_NAME, DRAWINGS, {
        name: "Drawings-View",
        editable: [
            {
                key: "KeyF"
            }
        ],
        onDown: () => {
            change(DRAWINGS)
        },
        onUp: () => {
            restore()
        },
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register(MODULE_NAME, WALLS, {
        name: "Walls-View",
        editable: [],
        onDown: () => {
            change(WALLS)
        },
        onUp: () => {
            restore()
        },
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register(MODULE_NAME, LIGHTING, {
        name: "Lighting-View",
        editable: [
            {
                key: "KeyQ"
            }
        ],
        onDown: () => {
            change(LIGHTING)
        },
        onUp: () => {
            restore()
        },
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register(MODULE_NAME, SOUNDS, {
        name: "Sounds-View",
        editable: [
            {
                key: "KeyP"
            }
        ],
        onDown: () => {
            change(SOUNDS)
        },
        onUp: () => {
            restore()
        },
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register(MODULE_NAME, NOTES, {
        name: "Notes-View",
        editable: [
            {
                key: "KeyN"
            }
        ],
        onDown: () => {
            change(NOTES)
        },
        onUp: () => {
            restore()
        },
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });


    // game.keybindings.register(MODULE_NAME, "showNotification", {
    //     name: "My Settings Keybinding",
    //     hint: "A description of what will occur when the Keybinding is executed.",
    //     uneditable: [
    //         {
    //             key: "Digit1",
    //             modifiers: ["Control"]
    //         }
    //     ],
    //     editable: [
    //         {
    //             key: "F1"
    //         }
    //     ],
    //     onDown: () => { ui.notifications.info("Pressed!") },
    //     onUp: () => {},
    //     restricted: true,             // Restrict this Keybinding to gamemaster only?
    //     reservedModifiers: ["Alt"],  // On ALT, the notification is permanent instead of temporary
    //     precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    // });


});