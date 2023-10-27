import { defineStore } from 'pinia'

export const useColorStore = defineStore('color', {
  state: () => ({
    isShow: false,
    header_position: 'absolute'
  }),
  actions: {
    routerChange() {
      console.log('action routerChange')
    }
  }
})