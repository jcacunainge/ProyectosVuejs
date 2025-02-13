<script setup>
    import { inject } from 'vue'
    import { useRouter } from 'vue-router'
    import AuthAPI from '../../api/AuthAPI';

    const toast = inject('toast')
    const router = useRouter()

    const handleSubmit = async (formData) => {
        try {
            const { data: { token } } = await AuthAPI.login(formData)
            localStorage.setItem('AUTH_TOKEN', token)
            router.push({name: 'my-appointments'})
        } catch (error) {
            toast.open({
                message: error.response?.data?.msg,
                type: 'error'
            })
            console.log(error)
        }
    }
</script>
<template>
    <div class="">
        <h1 class="text-3xl font-extrabold text-white text-center ">Iniciar Sesión</h1>
        <p class="text-1xl text-white text-center mb-10">Si tienes una cuenta, inicia sesión</p>
    </div>
    <FormKit
        id="loginForm"
        type="form"
        :actions="false"
        incomplete-message="Reviza los campos obligatorios"
        @submit="handleSubmit"
    >
        <FormKit
            type="email"
            name="email"
            label="Email:"
            placeholder="Email de Usuario"
            validation="required|email"
            :validation-messages=" {
               required: 'El email es obligatorio',
                email: 'El email no es válido'
            }"
        />
        <FormKit
            type="password"
            name="password"
            label="Password:"
            placeholder="Password de Usuario"
            :validation-messages=" {
                required: 'Este campo es obligatorio',
            }"
        />
        <FormKit type="submit">Iniciar Sesión</FormKit>
    </FormKit>
</template>