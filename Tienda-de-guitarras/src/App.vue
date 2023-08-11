<script setup>
    import {ref, onMounted, watch} from 'vue'
    import {db} from './data/guitarras'
    import Guitarra from './components/Guitarra.vue';
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'

    const guitarras = ref([])
    const carrito =ref([])
    const guitarra = ref({})

    watch(carrito, () => {
        guardarLocalStorage()
    
    }, {
        deep:true,
        
    })

    const guardarLocalStorage = () =>{
        localStorage.setItem('carrito', JSON.stringify(carrito.value))
    }
    
    //Metodo ciclo de vida
    onMounted(() => {
        guitarras.value = db
        guitarra.value = db[3]

        const carritoStorage = localStorage.getItem('carrito')
        if(carritoStorage) {
                carrito.value = JSON.parse(carritoStorage)
            }
        }
    )

    const agregarCarrito = (guitarra) =>{
        //Validar si un producto ya existe en el carrito 
        const existeCarrito = carrito.value.findIndex(producto => producto.id === guitarra.id);
        if(existeCarrito >= 0){
            carrito.value[existeCarrito].cantidad++
        }else{
            guitarra.cantidad = 1
            //Añadimos los elementos al carrito
            carrito.value.push(guitarra)
        }
       
    }

    const decrementarCantidad = (id) => {
        //conocemos la indice de la guitarra
        const index = carrito.value.findIndex(producto => producto.id == id);
        //Valida para que no pueda ir menor a 1
        if(carrito.value[index].cantidad <= 1) return
        //restamos la cantidad pasandole el index para evitar quitar a otros elementos
        carrito.value[index].cantidad--
    }

    const incrementarCantidad = (id) => {
        const index = carrito.value.findIndex(producto => producto.id == id);
        if(carrito.value[index].cantidad >= 5) return
        carrito.value[index].cantidad++
    }

    const eliminarProducto = (id) => {
        carrito.value = carrito.value.filter(producto => producto.id !== id)
    }

    const vaciarCarrito = () =>{
        carrito.value = []
    }
</script>

<template>
    <Header 
    :carrito="carrito"
    :guitarra="guitarra"
    @decrementar-cantidad = "decrementarCantidad" 
    @incrementar-cantidad = "incrementarCantidad"
    @agregar-carrito = "agregarCarrito"
    @eliminar-producto = "eliminarProducto"
    @vaciar-carrito = "vaciarCarrito"
    />
    <main class="container-xl mt-5">
        <h2 class="text-center">Nuestra Colección</h2>
        <div class="row mt-5">
            <Guitarra 
            v-for="guitarra in guitarras"
            :key="guitarra.id"
            v-bind:guitarra="guitarra"
            @agregar-carrito = "agregarCarrito"
            />
        </div>
    </main>
    <Footer></Footer>
</template>


