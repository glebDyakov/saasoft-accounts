<template>
  <v-row class="mt-4 pa-2 bg-light-blue">
    <v-col cols="">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">mdi-help-circle</v-icon>
        </template>
        <span>{{ hint }}</span>
      </v-tooltip>
    </v-col>
    <v-col cols="10">
      <span>{{ hint }}</span>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  const hint = 'Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;'
</script>
