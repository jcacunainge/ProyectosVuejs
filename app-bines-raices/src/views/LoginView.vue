<script setup>
    import { useForm, useField } from 'vee-validate';
    import { loginSchema as validationSchema } from '../validation/loginSchema'
    import { useAuthStore } from '../stores/auth'

    const { handleSubmit } = useForm({ validationSchema })
    // const auth = useFirebaseAuth();
    const auth = useAuthStore()


    const email = useField('email');
    const password = useField('password');

    const submit = handleSubmit( (values) => {
        auth.login(values)
        
    })

</script>

<template>

    <v-card
        flat
        max-width="600"
        class="mx-auto mt-6 text-center my-10">
        <v-card-title
        class="text-h4 font-weight-bold">
            Iniciar Sesión
        </v-card-title>

        <v-alert
            v-if="auth.hasError"
            class="my-5"
            type="error"
            :title="auth.errorMsg"
        ></v-alert>

        <v-form class="mt-10">
            <v-text-field
                type="email"
                label="Email:"
                class="mb-5 text-left"
                bg-color="blue-grey-lighten-5"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                >

            </v-text-field>

            <v-text-field
                type="password"
                label="Contraseña:"
                class="mb-5 text-left"
                bg-color="blue-grey-lighten-5"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
                >

            </v-text-field>

            <v-btn 
                block
                color="pink-accent-3"
                class="mb-7"
                @click="submit"
                >
                Iniciar Sesión
            </v-btn>
        </v-form>
    </v-card>
  
</template>