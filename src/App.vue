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
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useAccountsStore } from '@/stores/accounts';
  
  const accountsStore = useAccountsStore();
  
  const addAccount = () => {
    accountsStore.add();
  }

  onMounted(() => {
    accountsStore.loadData()
  })
</script>
