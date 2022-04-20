<template>
  <div class="field">
    <div class="fieldWrapper" :style="{width: `${maptipSize * showMap.x}px`, height: `${maptipSize * showMap.y}px`}">
      <div class="maptipWrapper" :style="fieldStyle">
        <ul class="maptip" :style="{gridTemplateColumns: `repeat(${maptip[0].length}, 30px)`}">
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
      </div>
      <div class="player" :style="playerStyle"></div>
      <div class="peoples" :style="peoplesStyle"></div>
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
      // peoplesCurrentDirection: 'down',
      peopleIndex: '',
      maptipSize: 30,
      showMap: {
        x: 11,
        y: 11
      },
      maptip: [
        [1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0],
        [0, 2, 0, 0, 1, 1, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      notMoveMap: [1, 2],
      otherMap: {
        town: {
          maptip: [
            [1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1],
            [0, 2, 0, 0, 1, 1, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
          ],
          peoples: [
            {
              name: 'トレーナー3',
              talk: 'こんにちは',
              position: {
                x: 7,
                y: 2
              },
              direction: 'left'
            },
            {
              name: 'トレーナー4',
              talk: 'こんにちは',
              position: {
                x: 3,
                y: 5
              },
              direction: 'left'
            },
          ]
        }
      },
      peoples: [
        {
          name: 'トレーナー',
          talk: 'こんにちは',
          position: {
            x: 7,
            y: 2
          },
          direction: 'left'
        },
        {
          name: 'トレーナー2',
          talk: 'こんにちは',
          position: {
            x: 3,
            y: 5
          },
          direction: 'right'
        },
      ],
    }

  },

  computed: {
    fieldStyle() {
      const row = this.maptip[0].length,
            x = this.maptipSize * this.currentPosition.x * -1,
            y = this.maptipSize * this.currentPosition.y * -1,
            top = this.maptipSize * Math.floor(this.maptip.length / 2),
            left = this.maptipSize * Math.floor(this.maptip[0].length / 2)
      return {
        // gridTemplateColumns: `repeat(${row}, 30px)`,
        transform: `translate(${x}px, ${y}px)`,
        top: `${top}px`,
        left: `${left}px`
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
    peoplesStyle(people, peopleIndex) {
      const peoplesLeft = this.maptipSize * people.position.x,
            peoplesTop = this.maptipSize * people.position.y
      return {
        width: `${this.maptipSize}px`,
        height: `${this.maptipSize}px`,
        left: `${peoplesLeft}px`,
        top: `${peoplesTop}px`,
        // backgroundImage: 'url(' + require(`/assets/img/trainer-${this.peoplesCurrentDirection}.png`) + ')'
        backgroundImage: 'url(' + require(`/assets/img/people${peopleIndex}-${people.direction}.png`) + ')'
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', e => {
     if(Math.floor(Math.random() * 200) ===  1) {
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
        console.log('z')
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
            // if(this.maptip[`${this.currentPosition.x}`][`${this.currentPosition.y}`] === 1) {
            //   this.currentPosition.y++
            // }
            // if(this.maptip[`${this.currentPosition.x}`][`${this.currentPosition.y}`] === 2) {
            //   this.currentPosition.y++
            // }
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

              // if(this.maptip[`${this.currentPosition.x}`][`${this.currentPosition.y}`] === 1) {
              //   this.currentPosition.y--
              // }
              // if(this.maptip[`${this.currentPosition.x}`][`${this.currentPosition.y}`] === 2) {
              //   this.currentPosition.y--
              // }
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
            // if(this.maptip[`${this.currentPosition.x}`][`${this.currentPosition.y}`] === 1) {
            //   this.currentPosition.x--
            // }
            // if(this.maptip[`${this.currentPosition.x}`][`${this.currentPosition.y}`] === 2) {
            //   this.currentPosition.x--
            // }
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

            // if(this.maptip[`${this.currentPosition.x}`][`${this.currentPosition.y}`] === 1) {
            //   this.currentPosition.x++
            // }
            // if(this.maptip[`${this.currentPosition.x}`][`${this.currentPosition.y}`] === 2) {
            //   this.currentPosition.x++
            // }
          }
          this.currentDirection = 'left'
          break;
      }


    })
  }
}
</script>
