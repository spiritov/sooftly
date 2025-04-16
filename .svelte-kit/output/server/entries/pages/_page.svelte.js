import { d as attr_class, e as escape_html, f as attr, h as stringify, i as ensure_array_like, c as pop, p as push } from "../../chunks/index.js";
const SvelteMap = globalThis.Map;
function RemovableItem($$payload, $$props) {
  let {
    name,
    isFlag = false,
    sel = false,
    onSelect = null,
    onRemove = null
  } = $$props;
  $$payload.out += `<button${attr_class(`button ${stringify(sel ? "border-violet-400 bg-violet-300" : "")}`, "svelte-9w7yk0")}><span>${escape_html(name)}</span> `;
  if (isFlag) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<img class="ml-1 flex h-6 self-center"${attr("src", `https://countryflagsapi.netlify.app/flag/${stringify(name)}.svg`)}${attr("alt", name)}>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></button>`;
}
function _page($$payload, $$props) {
  push();
  let arrow = "˅";
  let categories = new SvelteMap([
    ["player", []],
    ["flag", []],
    ["map", []],
    [
      "stage",
      [
        "Round 1",
        "Round 2",
        "Quarterfinals",
        "Semifinals",
        "Finals",
        "Grand Finals",
        "Loser's Quarters",
        "Loser's Semis",
        "Loser's Finals"
      ]
    ]
  ]);
  let sel_best_of = 1;
  let sel_map = -1;
  let sel_left_player = -1;
  let sel_rght_player = -1;
  let sel_left_flag = -1;
  let sel_rght_flag = -1;
  let sel_stage = -1;
  categories.get("map")[sel_map];
  let left_player = categories.get("player")[sel_left_player];
  let rght_player = categories.get("player")[sel_rght_player];
  let left_score = 0;
  let rght_score = 0;
  let left_pr = "";
  let rght_pr = "";
  let left_flag = categories.get("flag")[sel_left_flag];
  let rght_flag = categories.get("flag")[sel_rght_flag];
  categories.get("stage")[sel_stage];
  function removeItem(evt, cat, i) {
    evt.preventDefault();
    categories.set(cat, categories.get(cat).toSpliced(i, 1));
    localStorage.setItem(cat, JSON.stringify(categories.get(cat)));
  }
  const each_array_1 = ensure_array_like({ length: 5 });
  const each_array_2 = ensure_array_like(categories.get("map"));
  const each_array_3 = ensure_array_like(categories.get("player"));
  const each_array_4 = ensure_array_like(categories.get("flag"));
  const each_array_5 = ensure_array_like(categories.get("player"));
  const each_array_6 = ensure_array_like(categories.get("flag"));
  const each_array_7 = ensure_array_like(categories.get("stage"));
  $$payload.out += `<div class="block bg-zinc-800 svelte-64yon1"><div class="w-full justify-center svelte-64yon1"><div class="mt-8 w-2xl flex-col rounded-md bg-zinc-300/10 p-4 text-center text-lg svelte-64yon1"><div class="mb-8 justify-center text-violet-300 svelte-64yon1">tourney overlay helper</div> <!---->`;
  {
    $$payload.out += `<button class="flex w-96 cursor-pointer self-center">${escape_html(arrow)} toggle</button>`;
  }
  $$payload.out += `<!----> `;
  {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(categories);
    $$payload.out += `<div class="w-96 flex-col gap-1 self-center svelte-64yon1"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [cat, array] = each_array[$$index];
      $$payload.out += `<div class="relative justify-center svelte-64yon1">`;
      if (cat == "flag") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<a target="_blank" href="https://countryflagsapi.netlify.app/country-list"><div class="absolute left-0 transition-colors hover:text-violet-300 svelte-64yon1">add ${escape_html(cat)} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="ml-1 flex size-5 h-full self-center"><path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z"></path><path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z"></path></svg></div></a>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<div class="absolute left-0 svelte-64yon1">add ${escape_html(cat)}</div>`;
      }
      $$payload.out += `<!--]--> <button class="absolute right-0 cursor-pointer transition-colors hover:text-red-400 hover:underline">remove all</button> `;
      if (cat == "flag") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<input placeholder="alpha-2 code" class="input svelte-64yon1">`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<input class="input svelte-64yon1">`;
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--> <div class="gap-2 svelte-64yon1"><span>font</span> <button${attr_class(`button ${stringify("bg-violet-300")}`, "svelte-64yon1")}>Ubuntu Mono</button> <button${attr_class(`font-outfit button ${stringify("")}`, "svelte-64yon1")}>Outfit</button></div></div>`;
  }
  $$payload.out += `<!--]--> <div class="relative mt-8 w-96 justify-center gap-2 self-center svelte-64yon1"><span class="absolute left-0">best of</span> <!--[-->`;
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    $$payload.out += `<button${attr_class(`button size-8 justify-center px-0 ${stringify(i === sel_best_of ? "border-violet-400 bg-violet-300" : "")}`, "svelte-64yon1")}>${escape_html(i * 2 + 1)}</button>`;
  }
  $$payload.out += `<!--]--></div> <div class="svelte-64yon1">map</div> <div class="flex-wrap gap-2 svelte-64yon1"><!--[-->`;
  for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
    let map = each_array_2[i];
    if (sel_map === i) {
      $$payload.out += "<!--[-->";
      RemovableItem($$payload, {
        name: map,
        sel: true,
        onSelect: () => {
          sel_map = i;
          localStorage.setItem("overlay_map", map);
        },
        onRemove: (e) => removeItem(e, "map", i)
      });
    } else {
      $$payload.out += "<!--[!-->";
      RemovableItem($$payload, {
        name: map,
        onSelect: () => {
          sel_map = i;
          localStorage.setItem("overlay_map", map);
        },
        onRemove: (e) => removeItem(e, "map", i)
      });
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div> <div class="mt-4 flex-row justify-between svelte-64yon1"><div class="basis-1/2 flex-col border-r-2 border-zinc-300/10 pr-2 svelte-64yon1"><div class="justify-center svelte-64yon1">left player</div> <div class="flex-wrap gap-2 svelte-64yon1"><!--[-->`;
  for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
    let player = each_array_3[i];
    if (sel_left_player === i) {
      $$payload.out += "<!--[-->";
      RemovableItem($$payload, {
        name: player,
        sel: true,
        onSelect: () => {
          sel_left_player = i;
          localStorage.setItem("left_player", left_player);
        },
        onRemove: (e) => removeItem(e, "player", i)
      });
    } else {
      $$payload.out += "<!--[!-->";
      RemovableItem($$payload, {
        name: player,
        onSelect: () => {
          sel_left_player = i;
          localStorage.setItem("left_player", left_player);
        },
        onRemove: (e) => removeItem(e, "player", i)
      });
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div> <div class="justify-center svelte-64yon1">flag</div> <div class="flex-wrap gap-2 svelte-64yon1"><!--[-->`;
  for (let i = 0, $$length = each_array_4.length; i < $$length; i++) {
    let flag = each_array_4[i];
    if (sel_left_flag === i) {
      $$payload.out += "<!--[-->";
      RemovableItem($$payload, {
        name: flag,
        isFlag: true,
        sel: true,
        onSelect: () => {
          sel_left_flag = i;
          localStorage.setItem("left_flag", left_flag);
        },
        onRemove: (e) => removeItem(e, "flag", i)
      });
    } else {
      $$payload.out += "<!--[!-->";
      RemovableItem($$payload, {
        name: flag,
        isFlag: true,
        onSelect: () => {
          sel_left_flag = i;
          localStorage.setItem("left_flag", left_flag);
        },
        onRemove: (e) => removeItem(e, "flag", i)
      });
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div> <div class="mt-4 svelte-64yon1"><div class="svelte-64yon1">map pr:</div> <input${attr("value", left_pr)} class="input svelte-64yon1"></div></div> <div class="basis-1/2 flex-col justify-items-center pl-2 svelte-64yon1"><div class="justify-center svelte-64yon1">right player</div> <div class="flex-wrap gap-2 svelte-64yon1"><!--[-->`;
  for (let i = 0, $$length = each_array_5.length; i < $$length; i++) {
    let player = each_array_5[i];
    if (sel_rght_player === i) {
      $$payload.out += "<!--[-->";
      RemovableItem($$payload, {
        name: player,
        sel: true,
        onSelect: () => {
          sel_rght_player = i;
          localStorage.setItem("rght_player", rght_player);
        },
        onRemove: (e) => removeItem(e, "player", i)
      });
    } else {
      $$payload.out += "<!--[!-->";
      RemovableItem($$payload, {
        name: player,
        onSelect: () => {
          sel_rght_player = i;
          localStorage.setItem("rght_player", rght_player);
        },
        onRemove: (e) => removeItem(e, "player", i)
      });
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div> <div class="justify-center svelte-64yon1">flag</div> <div class="flex-wrap gap-2 svelte-64yon1"><!--[-->`;
  for (let i = 0, $$length = each_array_6.length; i < $$length; i++) {
    let flag = each_array_6[i];
    if (sel_rght_flag === i) {
      $$payload.out += "<!--[-->";
      RemovableItem($$payload, {
        name: flag,
        isFlag: true,
        sel: true,
        onSelect: () => {
          sel_rght_flag = i;
          localStorage.setItem("rght_flag", rght_flag);
        },
        onRemove: (e) => removeItem(e, "flag", i)
      });
    } else {
      $$payload.out += "<!--[!-->";
      RemovableItem($$payload, {
        name: flag,
        isFlag: true,
        onSelect: () => {
          sel_rght_flag = i;
          localStorage.setItem("rght_flag", rght_flag);
        },
        onRemove: (e) => removeItem(e, "flag", i)
      });
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div> <div class="mt-4 svelte-64yon1"><div class="svelte-64yon1">map pr:</div> <input${attr("value", rght_pr)} class="input svelte-64yon1"></div></div></div> <div class="relative mt-4 justify-center svelte-64yon1"><div class="w-full justify-center svelte-64yon1"><button class="button size-8 justify-center rounded-r-none px-0 svelte-64yon1">+</button> <button class="button size-8 justify-center rounded-none bg-violet-300 px-0 svelte-64yon1">${escape_html(left_score)}</button> <button class="button size-8 justify-center rounded-l-none px-0 svelte-64yon1">-</button></div> <div class="absolute svelte-64yon1">score</div> <div class="w-full justify-center svelte-64yon1"><button class="button size-8 justify-center rounded-r-none px-0 svelte-64yon1">+</button> <button class="button size-8 justify-center rounded-none bg-violet-300 px-0 svelte-64yon1">${escape_html(rght_score)}</button> <button class="button size-8 justify-center rounded-l-none px-0 svelte-64yon1">-</button></div></div> <div class="svelte-64yon1">stage</div> <div class="flex-wrap gap-2 svelte-64yon1"><!--[-->`;
  for (let i = 0, $$length = each_array_7.length; i < $$length; i++) {
    let stage = each_array_7[i];
    if (sel_stage === i) {
      $$payload.out += "<!--[-->";
      RemovableItem($$payload, {
        name: stage,
        sel: true,
        onSelect: () => {
          sel_stage = i;
          localStorage.setItem("overlay_stage", stage);
        },
        onRemove: (e) => removeItem(e, "stage", i)
      });
    } else {
      $$payload.out += "<!--[!-->";
      RemovableItem($$payload, {
        name: stage,
        onSelect: () => {
          sel_stage = i;
          localStorage.setItem("overlay_stage", stage);
        },
        onRemove: (e) => removeItem(e, "stage", i)
      });
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div></div></div></div>`;
  pop();
}
export {
  _page as default
};
