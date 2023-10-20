import { defineStore } from 'pinia'

export const useColorStore = defineStore('color', {
  state: () => ({
    header_position: 'absolute'
  }),
})