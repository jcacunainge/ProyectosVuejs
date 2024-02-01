<template>
  <q-page class="q-pa-md">
    <q-table title="Asignaturas y Horarios de Docentes" :rows="informacion" :columns="columns" row-key="instructor">
      <template v-slot:top-right>
        <q-btn flat icon="add" @click="abrirFormulario" />
        <q-btn flat icon="refresh" @click="refrescarPagina" />
      </template>
    </q-table>

    <q-dialog v-model="formularioAbierto">
      <q-card class="q-pa-lg">
        <q-form @submit.prevent="onSubmited" width="500px">
          <q-toolbar-title>
            Registre un nuevo docente
          </q-toolbar-title>
          <q-input 
            v-model="form.nombre_docente" 
            label="Docente:" 
            lazy-rules
              :rules="[val => val && val.length > 0 || 'Ingresa el nombre del docente']" 
          />
          <q-input 
            v-model="form.asignaturas" 
            label="Asignatura:" 
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Ingresa la asignatura']" 
          />
          <q-select
            v-model="form.horarios" 
            label="Horarios:"
            :options="lista_horarios" 
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Debes seleccionar un horarios']" 
          />

          <q-card-actions class=" flex justify-between">
            <q-btn class="q-mt-md" label="Cancelar" color="negative" @click="cerrarFormulario" />
            <q-btn class="q-mt-md" type="submit" label="Agregar" color="info" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue';
import informacionDocente from 'src/services/Docentes';
import { useRouter } from 'vue-router'


const columns = [
  { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
  { name: 'nombre_docente', align: 'center', label: 'Nombre Docente', field: 'nombre_docente', sortable: true },
  { name: 'asignaturas', align: 'center', label: 'asignaturas', field: 'asignaturas', sortable: true },
  { name: 'horarios', align: 'center', label: 'Horarios', field: 'horarios', sortable: true }
]

export default defineComponent({
  name: 'docentes',
  setup() {
    const formularioAbierto = ref(false);
    const informacion = ref([])
    const router = useRouter()

    const form = ref({
      nombre_docente: '',
      asignaturas: '',
      horarios: '',
    })

    const lista_horarios = [
      '8:30 AM a 11:30 AM', 
      '12:30 PM a 2:30 PM',   
      '3:30 PM a 4:30 PM',    
      '5:30 PM a 8:30 PM',  
      '8:30 AM a 9:30 AM',   
      '2:30 PM a 5:30 PM',  
                     
    ];


    onMounted(() => {
      traerInformacion()
    })

    const { listarDatos, enviarDatos, } = informacionDocente()
    const traerInformacion = async () => {
      try {
        const data = await listarDatos()
        informacion.value = data
      } catch (error) {
        console.error('mensaje de error:', error.message);
      }
    }

    const abrirFormulario = () => {
      formularioAbierto.value = true;
    };

    const cerrarFormulario = () => {
      formularioAbierto.value = false;
      form.nombre_docente.value = '';
      form.horarios.value = '';
      form.asignaturas.value = '';
    };

    const onSubmited = async () => {
      try {
        await enviarDatos(form.value)
        router.push({ name: 'docentes' })
        cerrarFormulario()
      } catch (error) {
        console.log(error)
      }
    }

    const refrescarPagina = () => {
      location.reload();
    }

    return {
      columns,
      informacion,
      formularioAbierto,
      form,
      lista_horarios,
      abrirFormulario,
      cerrarFormulario,
      onSubmited,
      refrescarPagina
    };
  },
});
</script>


  
  