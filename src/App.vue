<template>
  <div id="app" class="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
    <VoteRace />
  </div>
</template>

<script>
  import VoteRace from './components/VoteRace.vue';

  export default {
    components: {
      VoteRace,
    },
  };
</script>