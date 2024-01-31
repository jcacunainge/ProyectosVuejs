<script setup>

    const authRoutes = [
        { name: 'register', text: 'Crear una cuenta' },
        { name: 'login', text: 'Iniciar Sesión' }
    ]
    
</script>

<template>
    <div class=" mx-auto lg:w-3/5">
        <RouterView></RouterView>
        <nav class=" mt-10 flex flex-col items-center lg:flex-row lg:justify-between lg:space-y-0">
            <RouterLink 
                v-for="authRoutes in authRoutes"
                class="uppercase font-bold text-white"
                :to="{name: authRoutes.name}"
            >
            {{ authRoutes.text }}
            </RouterLink>
        </nav>
    </div>
</template>