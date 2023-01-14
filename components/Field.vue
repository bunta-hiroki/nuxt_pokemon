<template>
  <div class="field">
    <div class="fieldWrapper" :style="{width: `${maptipSize * showMap.x}px`, height: `${maptipSize * showMap.y}px`}">
      <div class="maptipWrapper" :style="fieldStyle">
        <ul class="maptip" :style="{gridTemplateColumns: `repeat(${maptip[0].length || 1}, 30px)`}">
          <li v-for="(maptipLine, maptipLineIndex) in maptip" :key="`maptipLine${maptipLineIndex}`">
            <ul>
              <li v-for="(tip, tipIndex) in maptipLine" :key="`tip${tipIndex}`" :style="{backgroundImage: 'url(' + require(`/assets/img/maptip${tip}.png`) + ')'}">
              </li>
            </ul>
          </li>
        </ul>
        <ul class="people">
          <li v-for="(people, peopleIndex) in peoples" :key="`people${peopleIndex}`" :style="peoplesStyle(people, peopleIndex)">
          </li>
        </ul>
        <ul class="move">
          <li v-for="(move, moveIndex) in moves" :key="`move${moveIndex}`" :style="movesStyle(move, moveIndex)">
          </li>
        </ul>
      </div>
      <div class="player" :style="playerStyle"></div>
      <!-- <div class="peoples" :style="peoplesStyle"></div> -->
    </div>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  data() {
    return {
      currentPosition: {
        x: 4,
        y: 4
      },
      currentDirection: 'down',
      peopleIndex: '',
      maptipSize: 30,
      showMap: {
        x: 11,
        y: 11
      },
      peoples: [],
      moves: [
        // {
        //   destination: 'town',
        //   type: 1,
        //   beforePosition: {
        //     x: 2,
        //     y: 2
        //   },
        //   afterPosition: {
        //     x: 3,
        //     y: 3
        //   }
        // }
      ],
      otherPeoples: {
        // hometownpeoples: [
        //   {
        //     name: 'トレーナー',
        //     talk: 'こんにちは',
        //     position: {
        //       x: 1,
        //       y: 2
        //     },
        //     direction: 'left',
        //     peopleNumber: 0
        //   },
        //   {
        //     name: 'トレーナー2',
        //     talk: 'こんばんは',
        //     position: {
        //       x: 3,
        //       y: 2
        //     },
        //     direction: 'right',
        //     peopleNumber: 1
        //   },
        // ],
        // citypeoples: [
        //   {
        //     name: 'トレーナー',
        //     talk: 'アイウエオ',
        //     position: {
        //       x: 5,
        //       y: 5
        //     },
        //     direction: 'up',
        //     peopleNumber: 2
        //   },
        //   {
        //     name: 'トレーナー2',
        //     talk: 'かきくけこ',
        //     position: {
        //       x: 9,
        //       y: 2
        //     },
        //     direction: 'down',
        //     peopleNumber: 3
        //   },
        // ],
        // townpeoples: [
        //   {
        //     name: 'トレーナー3',
        //     talk: 'さしすせそ',
        //     position: {
        //       x: 6,
        //       y: 9
        //     },
        //     direction: 'right',
        //     peopleNumber: 4
        //   },
        //   {
        //     name: 'トレーナー4',
        //     talk: 'たちつてと',
        //     position: {
        //       x: 3,
        //       y: 5
        //     },
        //     direction: 'up',
        //     peopleNumber: 5
        //   },
        // ],
        // harbor: [
        //   {
        //     name: 'トレーナー3',
        //     talk: 'さしすせそ',
        //     position: {
        //       x: 6,
        //       y: 9
        //     },
        //     direction: 'right',
        //     peopleNumber: 4
        //   },
        //   {
        //     name: 'トレーナー4',
        //     talk: 'たちつてと',
        //     position: {
        //       x: 3,
        //       y: 5
        //     },
        //     direction: 'up',
        //     peopleNumber: 5
        //   },
        // ],
        // notPeoples: []
      },
      notMoveMap: [1, 2],
      maptip: [
        // [1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0],
        // [0, 2, 0, 0, 1, 1, 2, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
        // [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      // otherMap: {
      //   homeTown: {
      //     maptip: [
      //       [1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0],
      //       [0, 2, 0, 0, 1, 1, 2, 0, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
      //       [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //       [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //       [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
      //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      //     ],
      //   },
      //   town: {
      //     maptip: [
      //       [1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1],
      //       [0, 2, 0, 0, 1, 1, 2, 0, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 2, 0, 0, 4, 0],
      //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //       [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      //       [0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0],
      //       [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 3, 0, 1, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
      //     ],
      //   },
      //   harbor: {
      //     maptip: [
      //       [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
      //       [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
      //       [0, 0, 0, 0, 4, 0, 2, 0, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 3, 2, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      //       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      //     ],
      //   }
      // },
    }
  },

  computed: {
    fieldStyle() {
      if (this.maptip[0]) {
        const row = this.maptip[0].length,
              x = this.maptipSize * this.currentPosition.x * -1,
              y = this.maptipSize * this.currentPosition.y * -1,
              top = this.maptipSize * Math.floor(this.maptip.length / 2),
              left = this.maptipSize * Math.floor(this.maptip[0].length / 2)
  
        return {
          transform: `translate(${x}px, ${y}px)`,
          top: `${top}px`,
          left: `${left}px`
        }
      }
    },
    playerStyle() {
      const left = this.maptipSize * Math.floor(this.showMap.x / 2),
            top = this.maptipSize * Math.floor(this.showMap.y / 2)
      return {
        width: `${this.maptipSize}px`,
        height: `${this.maptipSize}px`,
        left: `${left}px`,
        top: `${top}px`,
        backgroundImage: 'url(' + require(`/assets/img/player-${this.currentDirection}.png`) + ')'
      }
    },
  },
  methods: {
    peoplesStyle(people) {
      const peoplesLeft = this.maptipSize * people.position.x,
            peoplesTop = this.maptipSize * people.position.y

      return {
        width: `${this.maptipSize}px`,
        height: `${this.maptipSize}px`,
        left: `${peoplesLeft}px`,
        top: `${peoplesTop}px`,
        // backgroundImage: 'url(' + require(`/assets/img/people${peopleIndex}-${people.direction}.png`) + ')'
        backgroundImage: 'url(' + require(`/assets/img/people${people.peopleNumber}-${people.direction}.png`) + ')'
      }
    },
    movesStyle(move) {
      const movesLeft = this.maptipSize * move.beforePosition.x,
            movesTop = this.maptipSize * move.beforePosition.y

      return {
        width: `${this.maptipSize}px`,
        height: `${this.maptipSize}px`,
        left: `${movesLeft}px`,
        top: `${movesTop}px`,
        // backgroundImage: 'url(' + require(`/assets/img/people${peopleIndex}-${people.direction}.png`) + ')'
        backgroundImage: 'url(' + require(`/assets/img/move${move.type}.png`) + ')'
      }
    },
    changeMapData(mapName) {
      const isOnMoveData = () => {
        return this.moves.find(move => {
          return move.beforePosition.x === this.currentPosition.x && move.beforePosition.y === this.currentPosition.y
        })
      } 
      if (mapName || isOnMoveData()) {
        const moveData = isOnMoveData()
        let toMapName = mapName || moveData.destination

        this.maptip.splice(0, this.maptip.length)
        const getMaptip = this.$store.getters[`map/${toMapName}/getMaptip`]
        for (let i = 0; i < getMaptip.length; i++) {
          this.maptip.push(getMaptip[i]) 
        }

        this.peoples.splice(0, this.peoples.length)
        const peoples = this.$store.getters[`map/${toMapName}/getPeoples`]
        for (let i = 0; i < peoples.length; i++) {
          this.peoples.push(peoples[i]) 
        }

        this.moves.splice(0, this.moves.length)
        const moves = this.$store.getters[`map/${toMapName}/getMoves`]
        for (let i = 0; i < moves.length; i++) {
          this.moves.push(moves[i]) 
        }

        // peoples.forEach(people => {
        //   this.peoples.push(people)
        // })

        if (moveData) {
          this.currentPosition.x = moveData.afterPosition.x
          this.currentPosition.y = moveData.afterPosition.y
        }
      }

    }
  },
  created() {
    this.changeMapData(`homeTown`)
  },
  mounted() {

    // this.peoples = this.$store.getters[`map/homeTown/getPeoples`]
    // this.maptip = this.$store.getters[`map/homeTown/getMaptip/maptip`]

    // console.log(this.$store.getters[`map/homeTown/getMaptip`]) 

    // this.peoples = this.otherPeoples.hometownpeoples
    // this.maptip = this.otherMap.homeTown.maptip

    document.addEventListener('keydown', e => {
     if(Math.floor(Math.random() * 10) ===  1) {
       alert("ポケモンが現れた！！")
       document.querySelector('.pokemon').classList.add('active')
       document.querySelector('.field').classList.add('active')
     }

      const isOnPeople = (x, y) => {
        return this.peoples.some(people => {
          return people.position.x === x && people.position.y === y
        })
      } 

      if (e.key === 'z') {
        this.peoples.forEach(people => {      
          if(
            people.position.x === this.currentPosition.x - 1 && 
            people.position.y === this.currentPosition.y &&
            this.currentDirection === "left" &&
            people.direction === "right" 
            ) {
            alert(people.talk)
          } else if(
            people.position.x === this.currentPosition.x + 1 && 
            people.position.y === this.currentPosition.y &&
            this.currentDirection === "right" &&
            people.direction === "left" 
            ) {
            alert(people.talk)
          } else if(
            people.position.x === this.currentPosition.x && 
            people.position.y === this.currentPosition.y - 1 &&
            this.currentDirection === "up" &&
            people.direction === "down" 
            ) {
            alert(people.talk)
          } else if(
            people.position.x === this.currentPosition.x && 
            people.position.y === this.currentPosition.y + 1 &&
            this.currentDirection === "down" &&
            people.direction === "up" 
            ) {
            alert(people.talk)
          }
        })
        
      }

      switch (e.key) {
        case 'ArrowUp':
          if (this.currentPosition.y > 0) {
            if(
              !isOnPeople(this.currentPosition.x, this.currentPosition.y - 1) && 
              !this.notMoveMap.includes(this.maptip[this.currentPosition.x][this.currentPosition.y - 1])
            ) {
              this.currentPosition.y--
            }
          }
          this.currentDirection = 'up'
          break;
        case 'ArrowDown':
           if (this.currentPosition.y < this.maptip[0].length - 1) {
             if(
               !isOnPeople(this.currentPosition.x, this.currentPosition.y + 1) && 
               !this.notMoveMap.includes(this.maptip[this.currentPosition.x][this.currentPosition.y + 1])
              ) {
                this.currentPosition.y++
              }
           }
          this.currentDirection = 'down'
          break;
        case 'ArrowRight':
          if (this.currentPosition.x < this.maptip[0].length - 1) {
            if(
              !isOnPeople(this.currentPosition.x + 1, this.currentPosition.y) && 
              !this.notMoveMap.includes(this.maptip[this.currentPosition.x + 1][this.currentPosition.y]) 
            ) {
              this.currentPosition.x++
            }
          }
          this.currentDirection = 'right'
          break;
        case 'ArrowLeft':
          if (this.currentPosition.x > 0) {
            if(
              !isOnPeople(this.currentPosition.x - 1, this.currentPosition.y) &&
              !this.notMoveMap.includes(this.maptip[this.currentPosition.x - 1][this.currentPosition.y]) 
              ) {
                this.currentPosition.x--
              }
          }
          this.currentDirection = 'left'
          break;
      }

      this.changeMapData()

      // if(this.maptip[this.currentPosition.x][this.currentPosition.y] === 3) {
      //   this.maptip = this.otherMap.town.maptip
      //   this.peoples = this.otherPeoples.townpeoples
      // }
      // if(this.maptip[this.currentPosition.x][this.currentPosition.y] === 3) {
      //   this.maptip = this.$store.getters['map/homeTown/getMaptip']
      //   this.peoples = this.otherPeoples.hometownpeoples
      // }
      // if(this.maptip[this.currentPosition.x][this.currentPosition.y] === 4) {
      //   this.maptip = this.otherMap.harbor.maptip
      //   this.peoples = this.otherPeoples.notPeoples
      // } 
      // if(this.maptip[this.currentPosition.x][this.currentPosition.y] === 4) {
      //   this.maptip = this.otherMap.homeTown.maptip
      //   this.peoples = this.otherPeoples.hometownpeoples
      // }



    })
  },
}
</script>
