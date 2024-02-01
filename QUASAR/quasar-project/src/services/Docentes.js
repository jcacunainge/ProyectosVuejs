import useApi from "src/composables/UseApi";

export default function informacionDocente(){
    
    const { listarDatos, obtenerDatosId, enviarDatos, actualizarDatos, eliminarDatos } = useApi('informacion-docentes')

    return {
        listarDatos,
        obtenerDatosId,
        enviarDatos,
        actualizarDatos,
        eliminarDatos
    }
}