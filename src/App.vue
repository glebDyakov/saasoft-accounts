<template>
  <v-app>
    <v-app-bar>
        <v-toolbar-title>Учетные записи</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="handleClick">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
