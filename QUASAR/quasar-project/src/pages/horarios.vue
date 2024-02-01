<template>
  <q-page class="q-pa-md">
    <q-table 
      title="Horario Académico" 
      :rows="rows" 
      :columns="columns" 
      row-key="course"
    >
      <template v-slot:top-right>
        <q-btn flat icon="add" @click="" />
        <q-btn flat icon="refresh" @click="" />
      </template>
    </q-table>
  </q-page>
</template>
  
<script>
  import { ref, defineComponent, onMounted } from 'vue'

  const columns = [
    {
      name: 'course',
      required: true,
      label: 'Curso',
      align: 'left',
      field: row => row.course,
      format: val => `${val}`,
      sortable: true
    },
    { name: 'time', align: 'center', label: 'Horario', field: 'time', sortable: true },
    { name: 'instructor', label: 'Instructor', field: 'instructor', sortable: true },
    { name: 'room', label: 'Aula', field: 'room', sortable: true },
  ]

  const rows = [
    {
      course: 'Matemáticas',
      time: '8:00 AM - 9:30 AM',
      instructor: 'Profesor A',
      room: 'Aula 101',
    }

  ]

  export default defineComponent ({
    name: 'horarios',
    setup(){

      const agregarHorario = () => {

      }
      
      const refrecartabla = () => {

      }

      return {
        columns,
        rows,
        agregarHorario,
        refrecartabla,
      }

    }
    
  })

  


</script>
  