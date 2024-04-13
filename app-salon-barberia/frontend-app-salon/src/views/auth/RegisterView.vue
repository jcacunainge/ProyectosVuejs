<script setup>
    import { inject } from 'vue'
    import { reset } from '@formkit/vue'
    import AuthApi from '../../api/AuthApi'
    const toast = inject('toast')
    //Obtener los datos del formulario
    const handleSubmit = async ({ password_confirm, ...formData}) =>{
        try { 
           const { data } = await AuthApi.register(formData)
           toast.open({
                message: data.msg,
                type: 'success'
            })
            reset('registerForm')
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }
</script>

<template>
    <div>
        <h1 class="text-2xl font-extrabold text-white text-center ">Crea una cuenta</h1>
        <p class="text-1xl text-white text-center"> Crea una cuenta en Appsalon</p>
    </div>
    <FormKit
        id="registerForm"
        type="form"
        :actions="false"
        incomplete-message="Reviza los campos obligatorios"
        @submit="handleSubmit"
    >
        <FormKit
            type="text"
            name="name"
            label="* Nombre:"
            placeholder="Ingresa tu nombre"
            validation="required|length:3"
            :validation-messages=" {
                required: 'El nombre es obligatorio',
                length: 'El nombre es muy corto'
            }"
        />
        <FormKit
            type="email"
            name="email"
            label="* Email:"
            placeholder="Ingresa tu email"
            validation="required|email"
            :validation-messages=" {
               required: 'El email es obligatorio',
                email: 'El email no es válido'
            }"
        />
        <FormKit
            type="password"
            name="password"
            label="* Password:"
            placeholder="Password de Usuario - Min 8 Caracteres"
            validation="required|length:8"
            :validation-messages=" {
                required: 'Este campo es obligatorio',
                length: 'El password debe contener al menos 8 caracteres'
            }"
        />
        <FormKit
            type="password"
            name="password_confirm"
            label="* Repetir password:"
            placeholder="Repite el password"
            validation="required|confirm"
            :validation-messages=" {
                required: 'Este campo es obligatorio',
                confirm: 'Los password no son iguales'
            }"
        />

        <FormKit type="submit">Crear Cuenta</FormKit>


    </FormKit>
</template>