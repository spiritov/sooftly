> ## sooftly - simple obs overlay for tourneys (localstorage yay)
![image](https://github.com/user-attachments/assets/b3944d9a-2008-4d7e-8220-b4b843e194ed)

## controls
![image](https://github.com/user-attachments/assets/09d931d6-ffd8-40ad-981c-a1a3eec78fda)
- all options update the overlay immediately
- right click to remove button options
- the `use single POV` option acts as a standard overlay for one screen.
- names, flags, maps, and stages are saved via browser `localStorage`, but the options selected aren't
> [!NOTE]
>  if you've used a previous version and the overlay doesn't work properly, try clearing your `localStorage`
>  > in obs, this is done in the browser dock with Right Click -> Inspect -> Application -> Local storage -> Clear All

## usage for obs
1. Docks -> Custom Browser Docks
2. set [https://spiritov.github.io/sooftly/build/controls](https://spiritov.github.io/sooftly/build/controls) for URL
3. Sources -> Add Source -> Browser
4. set [https://spiritov.github.io/sooftly/build/overlay](https://spiritov.github.io/sooftly/build/overlay) for URL, ideally 1920x1080 for dimensions, and remove any custom css unless you'd like to override styles
5. add a background below the overlay. the background from the image above can be used as browser source [from this link](https://spiritov.github.io/web-snippets/jumple%20active%20background/index.html)

## development
This overlay is made with Svelte, builds with `adapter-static`, and uses Tailwind for styling.

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
    └── overlay
        └── +page.svelte
```
the controls page makes use of components to help make editing or adding controls easier. the overlay page just uses snippets. if you're wanting to expand on the overlay controls or styling..
- add associated settings you want to control in `settings.svelte.js`
- edit or expand upon the controls page / components
- add html on the overlay page for your new settings
