<script setup>
    import { onMounted, reactive } from 'vue';
    import ClienteService from '../services/ClienteService';
    import RouterLink from '../components/UI/RouterLink.vue'
    import { FormKit } from '@formkit/vue'
    import { useRoute, useRouter } from 'vue-router'
    import Heading from '../components/UI/Heading.vue';

    defineProps({
        titulo: {
            type: String
        }
    })

    const router = useRouter()
    //Obtenemos el Id , para tener la información del formulario
    const route = useRoute()
    const { id } = route.params

    const formData = reactive({
    })

    onMounted(() => {
        ClienteService.obtenerCliente(id)
        .then(({data}) => {
            Object.assign(formData, data)
        })
        .catch(error => console.log(error))
    })

    const handleSubmit = (data) => {
        ClienteService.actualizarCliente(id, data)
        .then(respuesta => {
                //Redirecionar
                router.push({name:'inicio'})
            })
            .catch(error => console.log("Error"))
    }
</script>
<template>
    <div>
        <div class="flex justify-end">
            <router-link to="inicio">
                Volver
            </router-link>
        </div>
        <Heading>{{ titulo }}</Heading>

        <div class="mx-auto mt-10 bg-white shadow">
            <div class="mx-auto md:w-2/3 py-10 px-3 ">
                
                <FormKit 
                    type="form"
                    submit-label="Guardar Cambios"
                    incomplete-message = "No se pudo enviar, reviza los campos por favor"
                    @submit="handleSubmit"
                    :value="formData"
                    >
                        
                    <!-- para que tenga ese efecto hay que instalar theme y configuarlo -->
                    <FormKit
                        type="text"
                        label="Nombre:"
                        name="nombre"
                        placeholder="Nombre del cliente"
                        help="Ingrese el nombre del cliente que desea agregar"
                        validation="required"
                        :validation-messages="{required:'Este campo es obligatorio'}"
                        v-model="formData.nombre"
                    />

                    <FormKit
                        type="text"
                        label="Apellidos:"
                        name="apellido"
                        placeholder="Apellidos del cliente"
                        help="Ingrese los apellidos del cliente que desea agregar"
                        validation="required"
                        :validation-messages="{required:'Este campo es obligatorio'}"
                        v-model="formData.apellido"

                    />

                    <FormKit
                        type="email"
                        label="Email:"
                        name="email"
                        placeholder="Email del cliente"
                        help="Ingrese el email del cliente que desea agregar"
                        validation="required|email"
                        :validation-messages="{required:'Este campo es obligatorio', email: 'Ingresa un email válido'}"
                        v-model="formData.email"
                    />

                    <FormKit
                        type="number"
                        label="Telefono:"
                        name="telefono"
                        placeholder="Teléfono: XXX-XXX-XXXX"
                        help="Ingrese el número del cliente que desea agregar"
                        validation="require"
                        :validation-messages="{required:'Este campo es obligatorio'}"
                        v-model="formData.telefono"
                    />

                    <FormKit
                        type="text"
                        label="Empresa:"
                        name="empresa"
                        placeholder="Empresa del cliente"
                        help="Ingrese el nombre de la empresa"
                        v-model="formData.empresa"
                    />

                    <FormKit
                        type="text"
                        label="Cargo:"
                        name="cargo"
                        placeholder="Empresa del cliente"
                        help="Ingrese el cargo del cliente"
                        v-model="formData.cargo"
                    />

                </FormKit>
            </div>
        </div>
    </div>
</template>

<style>
    .formkit-wrapper{
        max-width: 100%;
    }
</style>