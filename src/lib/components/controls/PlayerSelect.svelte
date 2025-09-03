<script>
  import { categories, settings } from '$lib/stores/settings.svelte';
  import ButtonOption from './selectables/ButtonOption.svelte';
  import InputPR from './inputs/InputPR.svelte';
  import Score from './selectables/Score.svelte';

  let { side } = $props();
  let useBorder = $derived(side === 'left');
  let nameIndex = $state(-1);
  let flagIndex = $state(-1);
  let teamIndex = $state(-1);

  function setIndex(category, index) {
    const key = side + category;
    settings[key] = categories.get(category.toLowerCase())[index];
    switch (category) {
      case 'Name':
        nameIndex = index;
        break;
      case 'Flag':
        flagIndex = index;
        break;
      case 'Team':
        teamIndex = index;
        break;
    }
  }

  function removeOption(event, category, index) {
    const values = categories.get(category);
    event.preventDefault();
    categories.set(category, values.toSpliced(index, 1));
  }
</script>

<div class="flex w-full flex-col gap-2 {useBorder ? 'border-palegrey border-r-2' : ''}">
  <span>{side} name</span>
  <div class="flex flex-wrap gap-1 px-2">
    {#each categories.get('name') as name, index}
      {#if name.steamid}
        <ButtonOption
          withSteamID={name.steamid}
          name={name.name}
          selected={index === nameIndex}
          onclick={() => setIndex('Name', index)}
          oncontextmenu={(event) => removeOption(event, 'name', index)}
        />
      {:else}
        <ButtonOption
          name={name.name}
          selected={index === nameIndex}
          onclick={() => setIndex('Name', index)}
          oncontextmenu={(event) => removeOption(event, 'name', index)}
        />
      {/if}
    {/each}
  </div>

  <span>flag</span>
  <div class="flex flex-wrap gap-1 px-2">
    {#each categories.get('flag') as flag, index}
      <ButtonOption
        name={flag}
        withFlag={true}
        selected={index === flagIndex}
        onclick={() => setIndex('Flag', index)}
        oncontextmenu={(event) => removeOption(event, 'flag', index)}
      />
    {/each}
  </div>

  {#if settings.useTeams}
    <span>team</span>
    <div class="flex flex-wrap gap-1 px-2">
      {#each categories.get('team') as team, index}
        <ButtonOption
          name={team}
          selected={index === teamIndex}
          onclick={() => setIndex('Team', index)}
          oncontextmenu={(event) => removeOption(event, 'team', index)}
        />
      {/each}
    </div>
  {/if}

  {#if settings.usePR}
    <InputPR bind:value={settings[side + 'PR']} />
  {/if}

  <div class="flex w-full justify-center">
    <Score {side} />
  </div>
</div>
