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
      :items="accountsStore.accounts"
      hide-default-footer
      no-data-text="Нет записей"
    >
      <template #[`item.labels`]="{ item }">
        <v-text-field maxlength="50" v-model="item.labels.value" solo @blur="handleLabels(item)" />
      </template>
      <template #[`item.type`]="{ item }">
        <v-select
          item-title="text"
          item-value="value"
          v-model="item.type"
          :items="statusOptions"
          solo
          @update:modelValue="saveData"
        />
      </template>
      <template #[`item.login`]="{ item }">
        <v-text-field v-model="item.login" solo maxlength="100" required :rules="[rules.required]" @blur="saveData" />
      </template>
      <template #[`item.password`]="{ item }">
        <v-text-field v-if="item.type !== 'ldap'" :type="item.password.isVisible ? 'text' : 'password'" v-model="item.password.value" solo maxlength="100" required :rules="[rules.required]" @blur="saveData">
          <template #append-inner>
            <v-icon @click="item.password.isVisible = !item.password.isVisible">{{ item.password.isVisible ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
          </template>
        </v-text-field>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn icon @click="removeAccount(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAccountsStore } from '@/stores/accounts';
import { Account } from '@/models/Account';

  const accountsStore = useAccountsStore();

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

  const removeAccount = (account: Account) => {
    accountsStore.remove(account)
  }

  const handleLabels = (account: Account) => {
    accountsStore.parseLabels(account)
  }

  const rules = {
    required: (value: string) => !!value || 'Поле обязательное',
  }

  const saveData = () => {
    accountsStore.saveData()
  }
</script>
