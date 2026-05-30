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

Hooks.once('init', async () => {
    setupKeys();
    setupApi()
    // This won't work here since UI is not there, yet
    // register3rdParty()
});

let current;

Hooks.once('ready', async () => {
    // This won't work here either because registering keys can only be done in init phase
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
        keys = [{key: key}]
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
            registerKey(control, name.charAt(0).toUpperCase() + name.slice(1) + "-View")
        }
    });

}

export async function toggleManualRolls(showMessage = true) {
    const settingKey = Roll.DICE_CONFIGURATION_SETTING ?? "diceConfiguration";
    const settings = await game.settings.get("core", settingKey);

    let entries = Object.entries(settings);
    const newMode = entries.some(([key, value]) => value === "manual") ? "random" : "manual";

    for (const [key, value] of entries) {
        settings[key] = newMode;
    }

    await game.settings.set("core", settingKey, settings);

    if (showMessage) {
        ui.notifications.info("Set to " + newMode + " rolling mode.");
    }
}

function registerKeyForManualRollsToggle() {
    game.keybindings.register(MODULE_NAME, "manual-roll-toggle", {
        name: "Toggle Manual Rolls",
        editable: [{key: "KeyQ", modifiers: ["Control"]}],

        onDown: () => {
        },
        onUp: async () => {
            await toggleManualRolls(true);
        },
        restricted: false,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });

    game.keybindings.register(MODULE_NAME, "manual-roll-hold-toggle", {
        name: "Quick Toggle Manual Rolls",
        hint: "Holding this key will switch roll mode. Releasing will revert to previous mode.",
        editable: [],

        onDown: async () => {
            await toggleManualRolls(false);
        },
        onUp: async () => {
            await toggleManualRolls(false);
        },
        restricted: false,
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

    registerKeyForManualRollsToggle()
}