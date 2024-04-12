![](https://img.shields.io/badge/Foundry-v11-informational) ![GitHub All Releases](https://img.shields.io/github/downloads/Syrious/foundryvtt-quick-keys/total?label=Downloads+latest+release) [![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3DSyriousWorkshop%26type%3Dpatrons&style=flat)](https://patreon.com/SyriousWorkshop)

[Discord](https://discord.gg/VMqndcyUGS)

# Quick Keys
With this module, you can press and hold the hotkey to switch to the corresponding UI view, e.g. lighting, sounds, notes, drawings etc. 
Releasing the key lets you switch back to the view you came from.

Especially useful to quickly toggle lights.

#### Pinning the view
Tapping quickly three times the same key pins the corresponding view.

## Configuration
You can customize the keys in "Configure Controls" 

## Settings
You can set the delay for the 3-tap pinning in the setting. Default is 500.

## API
You can register your module with quick-keys.
Quick keys uses the `data-control` attribute. To add a quick key for your module, use the following
```javascript
game.modules.get("quick-keys").api.registerKey("data-control", "Name that gets displayed in Configure Controls", "The Key");
```

Here's we use sequencer as an example. The data-control attribute within the DOM is "sequencer" and we register the "H" key.
It is important, that the call has to be made in the 'init' phase.

We awkwardly leverage a timer, in case quick-keys has not yet been initialized. __If anyone knows of a better way, please let me know!__

```javascript
Hooks.once('init', () => {
    if (game.modules.has('quick-keys')) {
        // **** Change these ****
        let dataControl = "sequencer";
        let name = "Sequencer";
        let key = "KeyH";
        // **********************

        let count = 0;
        let checkApiInterval = setInterval(() => {
            let api = game.modules.get('quick-keys').api;

            if (api) {
                api.registerKey(dataControl, name, key);
                console.info(`${name} (${dataControl}) registered key '${key}' successfully with quick-keys`);
                clearInterval(checkApiInterval);
            } else if (count >= 500) {
                console.error("Cancel waiting for quick-keys initialization");
                clearInterval(checkApiInterval);
            } else {
                count++;
            }
        }, 1);
    }
});
```

![config.png](assets/config.png)

### Support
If you like to support my work find me on [Patreon](https://www.patreon.com/SyriousWorkshop).
