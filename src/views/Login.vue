<template>

  <section class="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat bg-[url('https://picsum.photos/1920/1080')]">
    <div class="absolute inset-0 bg-black opacity-70"></div>

    <div class="z-40 w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
      <form class="space-y-6" action="#" @submit.prevent="login">

        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Login</h5>

        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu email</label>
          <input type="email" name="email" id="email" v-model="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required />
        </div>

        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sua senha</label>
          <input type="password" name="password" id="password" v-model="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>

        <button type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Login
        </button>

      </form>
    </div>
    
  </section>
</template>

<script>
  export default {

    data() {
      return {
        email: '',
        password: ''
      }
    },

    methods: {
      // async login() {
      //   try {
      //     const response = await fetch('https://api.seu-backend.com/login', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({
      //         email: this.email,
      //         password: this.password,
      //       }),
      //     });
      //     if (response.ok) {
      //       const data = await response.json();
      //       localStorage.setItem('token', data.token);
      //       this.$router.push('/admin');
      //     } else {
      //       alert('Login failed');
      //     }
      //   } catch (error) {
      //     alert('Error: ' + error.message);
      //   }
      // }

      async login() {
        if (this.email === 'admin@admin.com' && this.password === 'senha') {
          // Simulando token recebido da API
          const fakeToken = 'fake-token';
          localStorage.setItem('token', fakeToken);
          this.$router.push('/admin'); // Redireciona para a dashboard
        } else {
          alert('Credenciais inválidas! Tente "admin@example.com" e "password".');
        }
      }

    }
  }
</script>