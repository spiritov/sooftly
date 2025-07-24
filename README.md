## sooftly - simple obs overlay for tourneys (localstorage yay)

This repo includes the GitHub Pages site in its codebase (`/build`), made with Svelte.
It's created for use with tf2 rocket / sticky jump tournaments, but you're welcome to use it for other cases if you find it useful!
![image](https://github.com/user-attachments/assets/98c934e0-ca7d-41eb-802c-1472e1a28a33)


## usage

1. Add [https://spiritov.github.io/sooftly/build/overlay.html](https://spiritov.github.io/sooftly/build/overlay.html) as a browser source in your OBS Scene. (Sources -> Add -> Browser -> Paste URL)
2. Add [https://spiritov.github.io/sooftly/build/index.html](https://spiritov.github.io/sooftly/build/index.html) as a custom browser dock in your OBS window. (Docks -> Custom Browser Docks -> Paste URL)

That's all, you should now be able to use the buttons and inputs on the custom browser dock's page to interact with the overlay. Make sure to add a background source under it.

## features

- right click to remove single option buttons.
- maps, players, flags, and stages are always saved (for the dock).
- `localStorage` is used to communicate between the dock and source.
