<script setup>
    import { useUserStore } from '@/stores/user';

    const user = useUserStore()

</script>
<template>
    <div class="flex justify-between">
        <h1 class="text-2xl lg:text-4xl font-black text-white">App Salón Barbería</h1>

        <div class="flex flex-col space-y-5">
            <div class="flex gap-2 items-center">
                <p class="text-white text-right">Hola: {{ user.getUserName }}</p>
                <button 
                    type="button"
                    class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-black rounded"
                    @click="user.logout"
                    >
                    Cerrar Sesión
                </button>
            </div>

            <nav class="flex gap-2 items-center justify-end">
                <RouterLink class="bg-blue-700 hover:bg-blue-600 p-2 text-white uppercase text-xs font-black rounded mr-5"
                    :to="{ name: 'my-appointments' }">Mis citas</RouterLink>
                <RouterLink class="bg-blue-700 hover:bg-blue-600 p-2 text-white uppercase text-xs font-black rounded"
                    :to="{ name: 'new-appointment' }">
                    Nueva Cita
                </RouterLink>
            </nav>

        </div>
    </div>

    <main class="mt-10">
        <RouterView />
    </main>
</template> 