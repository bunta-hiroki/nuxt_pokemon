export const state = () => ({
  maptip: [
    [1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0],
    [0, 2, 0, 0, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  peoples: [
    {
      name: 'トレーナー',
      talk: 'こんにちは',
      position: {
        x: 1,
        y: 2
      },
      direction: 'left',
      peopleNumber: 0
    },
    {
      name: 'トレーナー2',
      talk: 'こんばんは',
      position: {
        x: 3,
        y: 2
      },
      direction: 'right',
      peopleNumber: 1
    },
  ],
  moves: [
    {
      destination: 'harbor',
      type: 1,
      beforePosition: {
        x: 6,
        y: 6
      },
      afterPosition: {
        x: 2,
        y: 2
      }
    }
  ]
})

export const getters = {
  getMaptip (state) {
    return state.maptip
  },
  getPeoples (state) {
    return state.peoples
  },
  getMoves (state) {
    return state.moves
  }
}