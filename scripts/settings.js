Hooks.on('init', () => {
    let moduleId = "quick-keys";

    game.settings.register(moduleId, "delay-settings", {
        name: "Pin delay",
        label: "Pin delay",
        hint: "The time between three taps to pin the view",
        scope: "client",
        config: true,
        default: 500,
        type: Number,
        requiresReload: false,
        onChange: value => {
            maxDelay = value;
        }
    });

});

Hooks.once('ready', async () => {
  maxDelay = game.settings.get("quick-keys", "delay-settings");
});

export let maxDelay;
