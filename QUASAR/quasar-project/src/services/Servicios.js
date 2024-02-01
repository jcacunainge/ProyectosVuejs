import useApi from "src/composables/UseApi";

export default function informacionService(){
    const { listarDatos, obtenerDatosId, enviarDatos, actualizarDatos, eliminarDatos } = useApi('posts')

    return {
        listarDatos,
        obtenerDatosId,
        enviarDatos,
        actualizarDatos,
        eliminarDatos
    }
}

