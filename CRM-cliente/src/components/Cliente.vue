<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
const props = defineProps({
    cliente: {
        typeo:Object
    }
})

defineEmits(['actualizar-estado', 'eliminar.cliente'])

const nombreCliente = computed(() => {
    return props.cliente.nombre + ' ' + props.cliente.apellido
})

const estadoCliente = computed(() => {
    return props.cliente.estado

})
</script>

<template>
    <tr>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
            <p class="font-medium text-gray-900">{{ nombreCliente }}</p>
            <p class="text-gray-500">{{ cliente.email }}</p>
            <p class="text-gray-500">{{ cliente.telefono }}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{ cliente.empresa }}</p>
            <p class="text-gray-600">{{ cliente.cargo }}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm">
            <button
            class="inline-flex rounded-full px-3 text-xs font-semibold leading-5"
            :class="[estadoCliente ? 'bg-green-400 text-gren-800' : 'bg-red-400 text-red-800']"
            @click="$event => $emit('actualizar-estado', 
                {id: cliente.id, estado: cliente.estado})"
            >
                {{ estadoCliente ? 'Activo' : 'Inactivo' }}
            </button>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
            <router-link 
            :to="{name: 'editar-cliente', params: {id: cliente.id} }"
            class="text-indigo-600 hover:text-indigo-900 mr-5"
            >Editar</router-link>

            <button 
            class="text-red-600 hover:text-red-900"
            @click="$event => $emit('eliminar-cliente', cliente.id)">
                Eliminar
            </button>
        </td>
    </tr>
</template>
