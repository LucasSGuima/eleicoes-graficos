<template>
    <div
        class="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div class="grid h-full max-w-lg grid-cols-1 mx-auto">
            <ThemeToggle />
        </div>
    </div>
</template>

<script>
    import ThemeToggle from './ThemeToggle.vue';

    export default {
        components: {
            ThemeToggle
        },
    };
</script>

<style scoped></style>