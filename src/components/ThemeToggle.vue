<template>
    <div class="flex items-center justify-center">
        <button @click="toggleTheme" type="button" class="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
            <span v-if="isDarkMode">🌙</span>
            <span v-else>☀️</span>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'ThemeToggle',
        data() {
            return {
                isDarkMode: false,
            };
        },
        created() {
            // Verifica o modo inicial (com base nas preferências do sistema ou no estado anterior)
            this.isDarkMode = localStorage.theme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.applyTheme();
        },
        methods: {
            toggleTheme() {
                this.isDarkMode = !this.isDarkMode;
                this.applyTheme();
            },
            applyTheme() {
                if (this.isDarkMode) {
                    document.documentElement.classList.add('dark');
                    localStorage.theme = 'dark';
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.theme = 'light';
                }
            },
        },
    };
</script>

<style scoped>
    button {
        transition: background-color 0.3s ease, color 0.3s ease;
    }
</style>