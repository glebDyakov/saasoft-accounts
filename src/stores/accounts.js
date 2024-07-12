import { defineStore } from 'pinia';

const DATA_KEY = 'data'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [],
  }),
  actions: {
    loadData() {
      const data = localStorage.getItem(DATA_KEY)
      if (data) this.accounts = JSON.parse(data)
    },
    saveData() {
      localStorage.setItem(DATA_KEY, JSON.stringify(this.accounts))
    },
    add() {
      this.accounts.push({
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
    },
    remove(account) {
      const index = this.accounts.indexOf(account);
      if (index !== -1) {
        this.accounts.splice(index, 1);
        this.saveData()
      }
    },
    parseLabels(account) {
      account.labels.parsed = account.labels.value.split(';').map(text => ({
        text
      }))
      this.saveData()
    }
  },
});
