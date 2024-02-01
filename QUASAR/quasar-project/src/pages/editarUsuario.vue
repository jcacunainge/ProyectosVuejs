<template>
    <q-page class="q-pa-md q-container" style="max-width: 800px; margin: 0 auto;" flat>
        <h5>Registrar un nuevo estudiante</h5>
        <q-form
        
        class="row q-col-gutter-md"
        @submit.prevent="onSubmited"
        ref="myForm"
        >
            <q-input
                class="col-12 col-sm-6"
                outlined
                v-model="form.nombre"
                label="Ingresa un nombre: *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Ingresa tu nombre']"
            />
            <q-input
                class="col-12 col-sm-6"
                outlined
                v-model="form.apellido"
                label="Ingresa tus apellido *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Ingresa tu apellido']"
            />
            <q-select
                class="col-12 col-sm-6"
                v-model="form.profesion"
                outlined
                label="Selecciona una profesión *"
                :options="profesionesOptions"
                lazy-rules
                :rules="[ val => val !== null && val !== undefined || 'Selecciona una profesión']"
            />
            <q-input
                class="col-12 col-sm-6"
                outlined
                v-model="form.correo"
                label="Ingresa un correo electrónico *"
                lazy-rules
                :rules="[
                    val => val && val.length > 0 || 'Por favor, ingresa tu correo electrónico',
                    val => /\S+@\S+\.\S+/.test(val) || 'Por favor, ingresa un correo electrónico válido'
                ]"
            />
            <q-input
                class="col-sm-6"
                outlined
                type="number"
                v-model="form.telefono"
                label="Número de teléfono *"
                lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Por favor, ingrese su número de teléfono',
                    val => /^\d{10}$/.test(val) || 'El número de teléfono debe tener 10 dígitos'
                ]"
            />
            <div class="col-12">
            <q-btn label="Guardar Información" icon="save" type="submit" color="primary" />
            <q-btn label="Cancelar" color="negative" class="float-right" :to="{ name:'home' }" />
            </div>
        </q-form>
    </q-page>
</template>
  
<script>
    import { useQuasar } from 'quasar'
    import { ref, defineComponent, onMounted } from 'vue'
    import informacionService from 'src/services/Servicios'
    import { useRouter, useRoute } from 'vue-router'
    
    export default defineComponent ({
        name: 'registro',
        setup() {
            // Desestructurar directamente $q
            const  $q  = useQuasar()

            const form = ref ({
                nombre: '',
                apellido: '',
                profesion: '',
                correo: '',
                telefono: '',
            })

            const profesionesOptions = [
                'Ingeniero',
                'Doctor',
                'Administrador',
                'Piloto',
                'Otra Profesión'
            ]

            const { actualizarDatos, obtenerDatosId } = informacionService() 
            const router = useRouter()
            const route = useRoute()


            onMounted( async () => {
                if (route.params.id) {
                    const response = await obtenerDatosId(route.params.id)
                    form.value = response
                }

            })
            const onSubmited = async () => {
                try {
                    await actualizarDatos(form.value)
                    $q.notify({
                        color: 'green-4',
                        textColor: 'white',
                        icon: 'check',
                        message: 'Información actualizada correctamente',
                        timeout: 500
                    })
                    router.push( {name:'home' })
                } catch (error) {
                    console.log(error)
                    
                }  
            }
            return {
                form,
                profesionesOptions, 
                onSubmited,
            }
        }
    })
</script>