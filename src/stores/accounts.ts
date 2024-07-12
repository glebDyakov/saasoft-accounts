import { defineStore } from 'pinia';
import { Account } from '@/models/Account'

const DATA_KEY = 'data'

interface AccountsState {
  accounts: Account[];
}

export const useAccountsStore = defineStore('accounts', {
  state: (): AccountsState => ({
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
      this.accounts.push(new Account())
    },
    remove(account: Account) {
      const index = this.accounts.indexOf(account);
      if (index !== -1) {
        this.accounts.splice(index, 1);
        this.saveData()
      }
    },
    parseLabels(account: Account) {
      account.labels.parsed = account.labels.value.split(';').map(text => ({
        text
      }))
      this.saveData()
    }
  },
});
