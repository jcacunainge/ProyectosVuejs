<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="username"
          label="Username or Email"
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          v-model="password"
          label="Password"
          :type="isPwd ? 'password' : 'text'"
          :rules="[val => !!val || 'Field is required']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn label="Login" color="primary" @click="login" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const $q = useQuasar();
    const username = ref('');
    const password = ref('');
    const isPwd = ref(true);

    const login = () => {
      if (username.value && password.value) {
        // Realiza la autenticación aquí
        $q.notify({
          message: 'Login successful',
          color: 'green',
        });
      } else {
        $q.notify({
          message: 'Please fill in all fields',
          color: 'red',
        });
      }
    };

    return { username, password, isPwd, login };
  },
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 500px;
}
</style>
