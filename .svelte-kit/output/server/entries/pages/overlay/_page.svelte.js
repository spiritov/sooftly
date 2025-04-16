import { i as ensure_array_like, d as attr_class, e as escape_html, h as stringify } from "../../../chunks/index.js";
function _page($$payload) {
  let left_pr = "-";
  let rght_pr = "-";
  let max_score = 2;
  let left_player = "";
  let rght_player = "";
  let left_score = 0;
  let rght_score = 0;
  let map = "";
  let stage = "";
  let font = "mono";
  const each_array = ensure_array_like({ length: left_score });
  const each_array_1 = ensure_array_like({ length: max_score - left_score });
  const each_array_2 = ensure_array_like({ length: rght_score });
  const each_array_3 = ensure_array_like({ length: max_score - rght_score });
  $$payload.out += `<div${attr_class(`font-${stringify(font)} block`, "svelte-vaijsv")}><div class="relative h-24 w-full svelte-vaijsv"><div class="relative ml-auto h-full basis-1/2 flex-row-reverse gap-8 bg-gradient-to-l from-orange-300/50 from-15% to-black/10 to-45% svelte-vaijsv"><div class="mr-36 w-24 flex-col items-center justify-center svelte-vaijsv"><div class="text-3xl svelte-vaijsv">PR</div> <div class="text-4xl svelte-vaijsv">${escape_html(left_pr)}</div></div> <div class="flex-row-reverse items-center gap-2 svelte-vaijsv"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    $$payload.out += `<div class="size-10 border-4 border-white/50 bg-orange-300 transition-colors duration-1000 starting:border-white/50 starting:bg-orange-300/0 svelte-vaijsv"></div>`;
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    $$payload.out += `<div class="size-10 border-4 border-white/50 transition-colors starting:border-white/50 starting:bg-orange-300/0 svelte-vaijsv"></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="absolute left-0 svelte-vaijsv">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="ml-4 h-24 items-center text-5xl svelte-vaijsv">${escape_html(left_player)}</div></div></div> <div class="relative mr-auto h-full basis-1/2 gap-8 bg-gradient-to-r from-orange-300/50 from-15% to-black/10 to-45% svelte-vaijsv"><div class="ml-36 w-24 flex-col items-center justify-center svelte-vaijsv"><div class="text-3xl svelte-vaijsv">PR</div> <div class="text-4xl svelte-vaijsv">${escape_html(rght_pr)}</div></div> <div class="flex-row items-center gap-2 svelte-vaijsv"><!--[-->`;
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    $$payload.out += `<div class="size-10 border-4 border-white/50 bg-orange-300 transition-colors duration-1000 starting:border-white/50 starting:bg-orange-300/0 svelte-vaijsv"></div>`;
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
    $$payload.out += `<div class="size-10 border-4 border-white/50 transition-colors starting:border-white/50 starting:bg-orange-300/0 svelte-vaijsv"></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="absolute right-0 flex-row-reverse svelte-vaijsv">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="mr-4 h-24 items-center text-5xl svelte-vaijsv">${escape_html(rght_player)}</div></div></div></div> <div class="h-[540px] w-full bg-white/40 svelte-vaijsv"><div class="size-full basis-1/2 items-center justify-center border-r-[1px] border-orange-300/50 svelte-vaijsv">960x540px</div> <div class="size-full basis-1/2 items-center justify-center border-l-[1px] border-orange-300/50 svelte-vaijsv">960x540px</div></div> <div class="w-full justify-center svelte-vaijsv"><div class="min-w-96 flex-col items-center justify-center rounded-b-[4.5rem] bg-orange-300/50 py-2 svelte-vaijsv"><div class="svelte-vaijsv">${escape_html(map)}</div> <div class="opacity-85 svelte-vaijsv">${escape_html(stage)}</div></div></div></div>`;
}
export {
  _page as default
};
