<template>
  <v-app>
    <v-app-bar>
        <v-toolbar-title>Учетные записи</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="addAccount">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-app-bar>
    <v-main>
      <router-view :items="items" />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const items = ref([])
  const addAccount = () => {
    items.value.push({
      labels: {
        value: '',
        parsed: [],
      },
      login: '',
      password: {
        isVisible: false,
        value: '',
      },
      type: 'ldap'
    })
  }
</script>
