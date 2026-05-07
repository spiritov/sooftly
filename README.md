> ## sooftly - simple obs overlay for tourneys (localstorage yay)

> [!IMPORTANT]
> This overlay was originally created for specialized use in TF2 jump tournaments. I've archived it since I want to have a more general-purpose and easier to maintain version available, which can be found at [https://github.com/spiritov/sooft](https://github.com/spiritov/sooft)

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4318d835-1f35-4dbb-9422-55c11fba3e46" />

## controls
<img width="1378" height="988" alt="image" src="https://github.com/user-attachments/assets/b7487acd-fa46-41f3-bb46-6db46fad737d" />

## maps
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9b99a578-70cc-4e5a-8207-218a069977b4" />


- all options update the overlay immediately
- right click to remove button options
- the `use single POV` option acts as a standard overlay for one screen
- names, flags, teams, maps, and stages are saved via browser `localStorage`, but the options selected aren't
> [!NOTE]
> if you've used a previous version and the overlay doesn't work properly, try clearing your `localStorage`
> > in obs, this is done in the browser dock with Right Click -> Inspect -> Application -> Local storage -> Clear All

## usage for obs
1. Docks -> Custom Browser Docks
2. set [https://spiritov.github.io/sooftly/build/controls](https://spiritov.github.io/sooftly/build/controls) for URL
3. Sources -> Add Source -> Browser
4. set [https://spiritov.github.io/sooftly/build/overlay](https://spiritov.github.io/sooftly/build/overlay) for URL, ideally 1920x1080 for dimensions, and remove any custom css unless you'd like to override styles
5. add a background below the overlay. the background from the image above can be used as browser source [from this link](https://spiritov.github.io/web-snippets/jumple%20active%20background/index.html)
> [!NOTE]
> the maps page is optional, and generally intended for use with Tempus Network maps
6. Sources -> Add Source -> Browser
7. set [https://spiritov.github.io/sooftly/build/maps](https://spiritov.github.io/sooftly/build/maps) for URL
8. select the source -> Interact
9. use `r` key to reset map pick / bans, `left click` to pick, `right click` to ban

## development
this overlay is made with Svelte, builds with `adapter-static`, and uses Tailwind for styling

install local dependencies..
```console
npm i
```
run locally..
```console
npm run dev
```
build..
```console
npm run build
```
file tree from `src/`
```console
├── lib
│   ├── components/controls
│   │   ├── inputs/
│   │   └── selectables/
│   ├── css
│   │   ├── app.css
│   │   └── safelist.txt
│   ├── fonts/
│   └── stores
│       └── settings.svelte.js
└── routes
    ├── controls
    │   └── +page.svelte
    ├── overlay
    │   └── +page.svelte
    └── maps
        └── +page.svelte

```
the controls page makes use of components to help make editing or adding controls easier. the overlay page just uses snippets. if you're wanting to expand on the overlay controls or styling..
- add associated settings you want to control in `settings.svelte.js`
- edit or expand upon `controls/+page.svelte`
- add html on `overlay/+page.svelte` for your new settings
