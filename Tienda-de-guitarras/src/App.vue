<script setup>
    import {ref, reactive, onMounted} from 'vue'
    import {db} from './data/guitarras'
    import Guitarra from './components/Guitarra.vue';
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'

    const guitarras = ref([])
    const carrito =ref([])
    
    onMounted(() => {
        guitarras.value = db
    })

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
</script>

<template>
    <Header 
    v-bind:carrito="carrito" 
    @decrementar-cantidad = "decrementarCantidad" 
    @incrementar-cantidad = "incrementarCantidad"/>
    <main class="container-xl mt-5">
        <h2 class="text-center">Nuestra Colección</h2>
        <div class="row mt-5">
            <Guitarra 
            v-for="guitarra in guitarras"
            v-bind:guitarra="guitarra"
            @agregarCarrito = "agregarCarrito"
            />
        </div>
    </main>
    <Footer></Footer>
</template>


