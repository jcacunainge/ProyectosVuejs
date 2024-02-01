<template>
  <q-page class="q-pa-md">
    <q-table
      title="Estudiantes"
      :rows="informacion"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-acciones="props">
        <q-td :props="props">
          <q-btn @click="editarEstudiante(props.row.id)" icon="edit" label="Editar" flat class="bg-primary text-white" size="sm" />
          <q-btn @click="eliminarEstudiante(props.row.id)" icon="delete" label="Eliminar" color="negative" flat class="bg-red q-ml-sm text-white" size="sm" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>

  import { defineComponent, ref, onMounted } from 'vue';
  import informacionService from 'src/services/Servicios'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router'

  const { listarDatos, eliminarDatos } = informacionService()



  const columns = [
    { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
    { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
    { name: 'apellido', align: 'center', label: 'Apellido', field: 'apellido', sortable: true },
    { name: 'profesion', align: 'center', label: 'Profesión', field: 'profesion', sortable: true },
    { name: 'telefono', align: 'center', label: 'Télefono', field: 'telefono', sortable: true },
    { name: 'acciones', align: 'center', label: 'Acciones', field: 'acciones', sortable: false }
  ]

  export default defineComponent ({
    name: 'home',
    setup() {

      const informacion = ref([])
      const  $q  = useQuasar()
      const router = useRouter()

      onMounted( () => {
        traerInformacion()
      })

      const traerInformacion = async () => {
        try {
          const data  = await listarDatos()
          informacion.value = data
        } catch (error) {
          console.error('mensaje de error:', error.message);
        }
      }

      const editarEstudiante = (id) => {
        console.log('ID del estudiante a eliminar:', id);
        router.push({ name:'editar', params: { id } })

      }

      const eliminarEstudiante = async (id) => {
        // Lógica para eliminar estudiante
        console.log('Eliminar estudiante con ID:', id);
        try {
          $q.dialog({
          title: 'Eliminar',
          message: '¿Desea eliminar la información de este estudiante?',
          cancel: true,
          persistent: true
        }).onOk( async () => {
          await eliminarDatos(id)
          $q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'check',
            message: 'Información eliminada',
            timeout: 2000 })
          await traerInformacion()
        })
        } catch (error) {
          $q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'time',
            message: 'No se pudo eliminar la información del estudiante',
            timeout: 2000
          })
        }
      }

      return {
        columns,
        informacion,
        editarEstudiante,
        eliminarEstudiante
      }
    }
  })
</script>
