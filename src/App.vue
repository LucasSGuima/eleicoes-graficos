<template>
  <div id="app" class="flex flex-col items-center justify-center w-full h-screen">
    <VoteRace />
    <BottomNavigation />
  </div>
</template>

<script>
  import VoteRace from './components/VoteRace.vue';
  import BottomNavigation from './components/BottomNavigation.vue';

  export default {
    components: {
      VoteRace,
      BottomNavigation
    },
  };
</script>