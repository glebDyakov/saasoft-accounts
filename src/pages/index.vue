<template>
  <div>
    <v-row class="my-4 pa-2 bg-light-blue">
      <v-col cols="2">
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
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      no-data-text="Нет записей"
    >
      <template v-slot:item.labels="{ item }">
        <v-text-field maxlength="50" v-model="item.labels" solo></v-text-field>
      </template>
      <template v-slot:item.type="{ item }">
        <v-select
          item-title="text"
          item-value="value"
          v-model="item.type"
          :items="statusOptions"
          solo
        ></v-select>
      </template>
      <template v-slot:item.login="{ item }">
        <v-text-field v-model="item.login" solo></v-text-field>
      </template>
      <template v-slot:item.password="{ item }">
        <v-text-field v-if="item.type !== 'ldap'" :type="item.password.isVisible ? 'text' : 'password'" v-model="item.password.value" solo maxlength="100">
          <template v-slot:append-inner>
            <v-icon @click="item.password.isVisible = !item.password.isVisible">{{ item.password.isVisible ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
          </template>
        </v-text-field>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="removeAccount(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const props = defineProps({
    items: {
      type: Array,
      required: true
    }
  })
  const hint = 'Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;'
  const statusOptions = [
    {
      text: 'LDAP',
      value: 'ldap'
    },
    {
      text: 'Локальная',
      value: 'local'
    }
  ]
  const headers = [
    { title: 'Метки', value: 'labels' },
    { title: 'Тип записи', value: 'type' },
    { title: 'Логин', value: 'login' },
    { title: 'Пароль', value: 'password' },
    { title: '', value: 'actions' }
  ]

  const removeAccount = (item) => {
    const index = props.items.indexOf(item);
    if (index !== -1) {
      props.items.splice(index, 1);
    }
  }
</script>
