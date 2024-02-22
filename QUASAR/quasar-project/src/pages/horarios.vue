<template>
  <q-page class="flex flex-center">
    <q-card class="mi-tarjeta">
      <q-card-section>
        <div class="text-h6">Turno x - Conformación de Turnos</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-tabs
          v-model="pestaña"
          denso
          class="text-gris"
          color-activo="primary"
          color-indicador="primary"
          alinear="justificar"
          indicador-estrecho
        >
          <q-tab name="dia" label="HOY" />
          <q-tab name="semana" label="SEMANA" />
          <q-tab name="mes" label="MES" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="pestaña" animado>
          <q-tab-panel name="dia">
            <div class="q-col-gutter-md row">
              <div v-for="(grupo, indice) in grupos" :key="indice" class="col-4">
                <q-card>
                  <q-card-section>
                    <div class="text-h6">{{ grupo.nombre }}</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                    <div v-for="(turno, indiceTurno) in grupo.turnos" :key="indiceTurno">
                      {{ turno.tipo }} - {{ turno.hora }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="semana">
            <div class="q-col-gutter-md row">
              <div v-for="(grupo, indice) in grupos" :key="indice" class="col-4">
                <q-card>
                  <q-card-section>
                    <div class="text-h6">{{ grupo.nombre }}</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                    <div v-for="(turno, indiceTurno) in grupo.turnos" :key="indiceTurno">
                      {{ turno.tipo }} - {{ turno.hora }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="mes">
            <!-- Contenido de la vista mensual aquí -->
            <div class="q-col-gutter-md row">
              <div v-for="(grupo, indice) in grupos" :key="indice" class="col-4">
                <q-card>
                  <q-card-section>
                    <div class="text-h6">{{ grupo.nombre }}</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                    <div v-for="(turno, indiceTurno) in grupo.turnos" :key="indiceTurno">
                      {{ turno.tipo }} - {{ turno.hora }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const pestaña = ref('mes');

    const grupos = [];

    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();

    for (let i = 0; i < 31; i++) {
      const copiaFechaActual = new Date(fechaActual);
      copiaFechaActual.setDate(fechaActual.getDate() + i);

      const diaDeLaSemana = obtenerDiaDeLaSemana(copiaFechaActual.getDay());
      const diaDelMes = copiaFechaActual.getDate();
      const mes = obtenerNombreDelMes(copiaFechaActual.getMonth());

      // Simulando datos de turnos para cada día
      const turnos = [
        { tipo: 'Turno 1', hora: '8:00 AM' },
        { tipo: 'Turno 2', hora: '2:00 PM' },
        // Puedes agregar más turnos según tus necesidades
      ];

      grupos.push({
        nombre: `${diaDeLaSemana} ${diaDelMes} de ${mes}`,
        turnos: turnos,
      });
    }

    function obtenerDiaDeLaSemana(indiceDia) {
      const diasDeLaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      return diasDeLaSemana[indiceDia];
    }

    function obtenerNombreDelMes(indiceMes) {
      const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
        'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
      ];
      return meses[indiceMes];
    }

    return {
      pestaña,
      grupos,
    };
  },
};
</script>

<style scoped>

</style>






<!-- const groups = [
{
  name: 'G1',
  shifts: [
    { type: 'NOCTURNO', time: 'TGJ1' },
    { type: 'NOCTURNO', time: 'TGJ2' },
  ],
},
{
  name: 'G1',
  shifts: [
    { type: 'NOCTURNO', time: 'TGJ1' },
    { type: 'NOCTURNO', time: 'TGJ2' },
  ],
},
{
  name: 'G1',
  shifts: [
    { type: 'NOCTURNO', time: 'TGJ1' },
    { type: 'NOCTURNO', time: 'TGJ2' },
  ],
},
{
  name: 'G1',
  shifts: [
    { type: 'NOCTURNO', time: 'TGJ1' },
    { type: 'NOCTURNO', time: 'TGJ2' },
  ],
},
{
  name: 'G1',
  shifts: [
    { type: 'NOCTURNO', time: 'TGJ1' },
    { type: 'NOCTURNO', time: 'TGJ2' },
  ],
},
{
  name: 'G1',
  shifts: [
    { type: 'NOCTURNO', time: 'TGJ1' },
    { type: 'NOCTURNO', time: 'TGJ2' },
  ],
},
{
  name: 'G1',
  shifts: [
    { type: 'NOCTURNO', time: 'TGJ1' },
    { type: 'NOCTURNO', time: 'TGJ2' },
  ],
},
{
  name: 'G1',
  shifts: [
    { type: 'NOCTURNO', time: 'TGJ1' },
    { type: 'NOCTURNO', time: 'TGJ2' },
  ],
},
{
  name: 'G1',
  shifts: [
    { type: 'NOCTURNO', time: 'TGJ1' },
    { type: 'NOCTURNO', time: 'TGJ2' },
  ],
},
{
  name: 'G1',
  shifts: [
    { type: 'NOCTURNO', time: 'TGJ1' },
    { type: 'NOCTURNO', time: 'TGJ2' },
  ],
},
// Add more groups here
]; -->
