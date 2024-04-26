import { createStore } from 'vuex'

export default createStore({
  state: {
    userRole: 'visitor',
    updateValue: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      desc: '',
    },
    fileUrlList:[],
    mapList:[
      {
          "id": 1,
          "mapName": "潮州市",
          "percentage": "19.05",
          "color": "rgb(255,0,0)",
          "children": [
              {
                  "id": 11,
                  "mapName": "潮安区",
                  "percentage": "100.00",
                  "color": "rgb(255,0,0)"
              }
          ]
      },
      {
          "id": 2,
          "mapName": "广州市",
          "percentage": "66.66",
          "color": "rgb(255,85,85)",
          "children": [
              {
                  "id": 22,
                  "mapName": "海珠区",
                  "percentage": "64.29",
                  "color": "rgb(255,0,0)"
              },
              {
                  "id": 21,
                  "mapName": "天河区",
                  "percentage": "35.71",
                  "color": "rgb(255,85,85)"
              }
          ]
      },
      {
          "id": 3,
          "mapName": "东莞市",
          "percentage": "14.29",
          "color": "rgb(255,170,170)"
      }
  ],
    selectedMapComponent: '广东省'
  },
  mutations: {
  },
  actions: {},
  modules: {}
})
