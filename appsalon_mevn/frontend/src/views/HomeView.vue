<script setup>
    const authRoutes = [
        { name: 'register', text: 'Crear una cuenta' },
        { name: 'login', text: 'Iniciar Sesión' }
    ]
</script>

<template>
     <h1 class="mt-10 text-4xl font-extrabold text-white text-center mb-5">BIENVENIDOS A APPSALON</h1>
    <p class="text-3xl text-white text-center mb-10">Si deseas cambiar tu look, mejorar tu apariencia y lucir mejor has venido al lugar indicado, crea una cuenta y comienza a agendar tus sesiones de belleza</p>
    <div class=" mx-auto lg:w-3/5">
        <RouterView></RouterView>
        <nav class=" mt-10 flex flex-col items-center lg:flex-row lg:justify-between lg:space-y-0 ">
            <RouterLink 
                v-for="authRoutes in authRoutes"
                class="uppercase font-bold text-white text-center bg-blue-500 hover:bg-blue-600 rounded-lg  p-2 lg:w-2/5"
                :to="{name: authRoutes.name}"
            >
            {{ authRoutes.text }}
            </RouterLink>
        </nav>
    </div>
</template> 