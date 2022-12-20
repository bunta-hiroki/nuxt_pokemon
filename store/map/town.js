export const state = () => ({
  maptip: [
    [1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1],
    [0, 2, 0, 0, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
  ],
  peoples: [
    {
      name: 'トレーナー3',
      talk: 'さしすせそ',
      position: {
        x: 6,
        y: 9
      },
      direction: 'right',
      peopleNumber: 4
    },
    {
      name: 'トレーナー4',
      talk: 'たちつてと',
      position: {
        x: 3,
        y: 5
      },
      direction: 'up',
      peopleNumber: 5
    },
  ],
  moves: [
    {
      destination: 'homeTown',
      type: 1,
      beforePosition: {
        x: 4,
        y: 4
      },
      afterPosition: {
        x: 5,
        y: 5
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