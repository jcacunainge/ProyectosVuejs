<script setup>
    import { onMounted, inject } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
    import AuthApi from '../../api/AuthApi'


    const toast = inject('toast')
    const route = useRoute()
    const router = useRouter()
    const { token } = route.params

    onMounted( async () => {
        try {
            const { data } = await AuthApi.verifyAccount(token)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            setTimeout(() =>{
                router.push({name:'login'})
            }, 5000)
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    })

</script>

<template>
     <h1 class="text-2xl font-extrabold text-white text-center ">Verificar Cuenta</h1>
</template>