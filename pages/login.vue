<template>
   <form class="form-control max-sm:p-5" @submit.prevent="handleSubmit">
      <p class="text-4xl">登入帳號</p>
      <input type="email" placeholder="信箱" v-model="email" />
      <input type="password" placeholder="密碼" v-model="password" />
      <button v-if="!isPending" class="btn">登入</button>
      <button v-if="isPending" class="btn" disabled>登入中..</button>
      <div class="error" v-if="error">{{ error }}</div>
   </form>
</template>
<script setup>
   import useLogin from '@/composables/useLogin'
   const email = ref('')
   const password = ref('')
   const { error, isPending, login } = useLogin()
   const router = useRouter()
   const handleSubmit = async () => {
      await login(email.value, password.value)
      if (!error.value) {
         router.push('/')
      }
   }
</script>
<style scoped></style>
