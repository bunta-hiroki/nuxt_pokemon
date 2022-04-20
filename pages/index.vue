<template>
  <div class="wrapper">
    <Field />
    <div class="pokemon">
      <div class="pokemonWrapper">
        <section class="enemy">
          <v-card
          class="enemyCard"
          elevation="20"
          >
          <v-responsive :aspect-ratio="1/1">
            <v-card>
              <v-responsive :aspect-ratio="1/1">
                <div class="enemyPokemonImg" :style="{'background-image': enemyData.pokeimg}"></div>
              </v-responsive>
            </v-card>
            <h2>{{ enemyData.name }}</h2>
            <div>lv:{{ enemyRandomLevel }}</div>
            <div class="hpGauge">
              <div class="hpGaugeValue" :style="currentHpGaugeValues(enemyData)"></div></div>
            <div class="hp">
              <h2>{{ enemyData.hp }}/</h2>
              <h2>{{ enemyData.maxHp }}</h2>
            </div>
            <div>
              <div>攻撃力:{{ enemyData.attack }}</div>
              <div>守備力:{{ enemyData.deffence }}</div>
              <div>経験値:{{ enemyData.exp }}</div>
            </div>
          </v-responsive>
          </v-card>
        </section>
        
        <section class="player">
          <v-card
          class="playerCard"
          elevation="20"
          >        
          <v-responsive :aspect-ratio="1/1">
            <v-card>
              <v-responsive :aspect-ratio="1/1">
                <div class="currentPlayerPokemonImg" :style="{'background-image': currentPokemonData.pokeimg}"></div>
              </v-responsive>
            </v-card>
            <h2>{{ currentPokemonData.name }}</h2>
            <div>lv:{{ currentPokemonData.level }}</div>
            <div class="hpGauge">
              <div class="hpGaugeValue" :style="currentHpGaugeValues(currentPokemonData)"></div>
            </div>
            <div class="hp">
              <h2>{{ currentPokemonData.hp }}/{{ currentPokemonData.maxHp }}</h2>
            </div>
            <div class="playerStatus">
              <div>
                <div>攻撃力:{{ currentPokemonData.attack }}</div>
                <div>守備力:{{ currentPokemonData.deffence }}</div>
                <div>経験値:{{ currentPokemonData.exp }}</div>
              </div>
            </div>
            </v-responsive>
          </v-card>
        </section>
      </div>

      <div class="logsWrapper">
        <v-card
        class="card"
        elevation="20"
        >
        <ul class="logs">
          <li v-for="(log, logIndex) in logList" :key="`log${logIndex}`" v-html="`${log}`"></li>
          <li v-if="playerAttackLog">
            {{currentPokemonData.name}}の{{ currentPokemonSkill }}!!<br>{{enemyData.name}}に{{playerDamage}}のダメージ!!
          </li>
          <li v-if="enemyAttackLog">{{enemyData.name}}の{{ enemyUseSkill }}!!{{currentPokemonData.name}}に{{enemyDamage}}のダメージ!!</li>
          <li v-if="throwMonsterBallfalse" class="modalNextButton" @click="encount">プレイヤーは{{enemyData.name}}にモンスターボールを投げたが、{{enemyData.name}}を捕まえられなかった!!</li>
          <li v-if="throwMonsterBallSuccess" class="modalNextButton" @click="encount">プレイヤーは{{enemyData.name}}にモンスターボールを投げた!...</li>
        </ul>
        </v-card>
      </div>
      <v-card
      class="playerSituationCard"
      elevation="20"
      v-if="playerSituationCardOpen"
      >  
        <div class="situation">
          <div v-if="throwMonsterBallSuccess" class="modalNextButton" @click="encount">プレイヤーは{{enemyData.name}}を捕まえた!!</div>
          <div v-if="lose" class="modalNextChallengeButton" @click="oneMore">もう戦えるポケモンがいません....もう一度チャレンジする</div>
          <div v-if="defeat" class="modalNextChallengeButton" @click="oneMore">負けました....もう一度チャレンジする</div>
          <div v-if="victory" class="modalNextButton" @click="encount">勝利!!!</div>
          <div v-if="aleartMoribund">このポケモンは瀕死状態です...</div>
          <div v-if="playerPokemonsOver">一度に持てるポケモンは６匹までです！
            <div @click="sendPcPokemon">ポケモンをpcに送る!</div>
            <div @click="pokemonEscape">ポケモンを逃す!</div>
          </div>
        </div>
      </v-card>

      <div class="text-center">
        <v-bottom-sheet
          v-model="pokemonSheet"
          inset
        >
          <v-sheet
            class="text-center"
            height="700px"
          >
            <v-btn
              class="mt-6"
              text
              color="error"
              @click="pokemonSheet = !pokemonSheet"
            >
              close
            </v-btn>
              <ul>
                <li v-for="(playerPokemon,index) in playerPokemons" :key="`playerPokemon${index}`" @click="pokemonChange(playerPokemon)">
                  <v-card
                  class="playerPokemonCard"
                  elevation="20"
                  @click="pokemonSheet = !pokemonSheet"
                  >
                    <div class="playerPokemonCardWrap">
                      <v-card>
                        <v-responsive :aspect-ratio="1/1">
                          <div class="playerPokemonImg"  :style="{'background-image': playerPokemon.pokeimg}"></div>
                        </v-responsive>
                      </v-card>
                      <div>{{ playerPokemon.name }}</div>
                      <div>lv:{{ playerPokemon.level }}</div> 

                      <div class="hpGauge">
                        <div class="hpGaugeValue playerPokemonCardHp" :style="currentHpGaugeValues(playerPokemon)"></div>
                      </div>
                    
                      <div>攻撃力:{{ playerPokemon.attack }}</div>
                      <div>守備力:{{ playerPokemon.deffence }}</div>
                      <div>経験値:{{ playerPokemon.exp }}</div>
                    </div>
                  </v-card>
                </li> 
              </ul>
            <div class="my-3">
              
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </div>

      <div class="playerButtons">

        <div class="text-center">
          <v-bottom-sheet
            v-model="attackSheet"
            inset
            class="attacksWrap"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="orange"
                dark
                v-bind="attrs"
                v-on="on"
              >
                攻撃
              </v-btn>
            </template>
            <v-sheet
              class="text-center"
              height="200px"
            >
              <v-btn
                class="mt-6"
                text
                color="error"
                @click="attackSheet = !attackSheet"
              >
                close
              </v-btn>
              <div class="my-3">
                <div class="attacks">
                  <v-card
                  class="attackCard"
                  elevation="20"
                  v-for="skill in currentPokemonData.skills" :key="`currentPokemonData${skill}`"
                  >
                    <button @click="playerAttack(skill)">{{ skill }}</button>
                  </v-card>
                </div>
              </div>
            </v-sheet>
          </v-bottom-sheet>
        </div>

        <div class="text-center">
          <v-bottom-sheet
            v-model="pokemonSheet"
            inset
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="orange"
                dark
                v-bind="attrs"
                v-on="on"
              >
                ポケモン
              </v-btn>
            </template>
            <v-sheet
              class="text-center"
              height="700px"
            >
              <v-btn
                class="mt-6"
                text
                color="error"
                @click="pokemonSheet = !pokemonSheet"
              >
                close
              </v-btn>
                <ul>
                  <li v-for="(playerPokemon,index) in playerPokemons" :key="`playerPokemon${index}`" @click="pokemonChange(playerPokemon)">
                    <v-card
                    class="playerPokemonCard"
                    elevation="20"
                    @click="pokemonSheet = !pokemonSheet"
                    >
                      <div class="playerPokemonCardWrap">
                        <v-card>
                          <v-responsive :aspect-ratio="1/1">
                            <div class="playerPokemonImg"  :style="{'background-image': playerPokemon.pokeimg}"></div>
                          </v-responsive>
                        </v-card>
                        <div>{{ playerPokemon.name }}</div>
                        <div>lv:{{ playerPokemon.level }}</div> 

                        <div class="hpGauge">
                          <div class="hpGaugeValue playerPokemonCardHp" :style="currentHpGaugeValues(playerPokemon)"></div>
                        </div>
                        
                        <div>攻撃力:{{ playerPokemon.attack }}</div>
                        <div>守備力:{{ playerPokemon.deffence }}</div>
                        <div>経験値:{{ playerPokemon.exp }}</div>
                      </div>
                    </v-card>
                  </li> 
                </ul>
              <div class="my-3">
                
              </div>
            </v-sheet>
          </v-bottom-sheet>
        </div>

        <div class="text-center">
          <v-bottom-sheet
            v-model="itemSheet"
            inset
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="orange"
                dark
                v-bind="attrs"
                v-on="on"
              >
                アイテム
              </v-btn>
            </template>
            <v-sheet
              class="text-center"
              height="200px"
            >
              <v-btn
                class="mt-6"
                text
                color="error"
                @click="itemSheet = !itemSheet"
              >
              close
              </v-btn>
              <div class="my-3">
                <div>
                    <v-card
                    class="itemCard"
                    elevation="20"
                    >
                      <button class="recovery" @click="recovery" v-if="useRecoverytimes">回復薬 {{ currentRecoveryTimes }}/20</button>
                    </v-card>

                    <v-card
                    class="itemCard"
                    elevation="20"
                    >
                      <button class="throwMonsterBall" @click="throwMonsterBall" v-if="useMonsterBall">モンスターボール {{ throwMonsterBallTimes }}/{{ numberOfMonsterBall }}</button>
                    </v-card>
                </div>
              </div>
            </v-sheet>
          </v-bottom-sheet>
        </div>

        <div class="text-center">
              <v-btn
                color="orange"
                dark
                @click="escape"
              >
                逃げる
              </v-btn>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { SwipeableBottomSheet } from "vue-swipeable-bottom-sheet"
import * as Pokemon from '@/class/pokemon'
import * as Skill from '@/class/skill'
export default {
  name: 'app',
  components: {
    SwipeableBottomSheet
  },

  data() {
    return {
      attackSheet: false,
      pokemonSheet: false,
      itemSheet: false,
      enemyData: '',
      enemyRandomLevel: '',
      currentRecoveryTimes: 0,
      recoveryTimes: 20,
      damageRange: .4,
      criticalHitRate: .1,
      currentPlayerHpGaugeValue: '',
      victory: false,
      defeat: false,
      lose: false,
      active: true,
      useRecoverytimes: true,
      gameClear: false,
      logList: [],
      throwMonsterBallTimes: 0,
      numberOfMonsterBall: 20,
      throwMonsterBallJudgement: '',
      throwMonsterBallSuccess: false,
      throwMonsterBallfalse: false,
      useMonsterBall: true,
      playerPokemonsOver: false,
      moribund: false,
      aleartMoribund: false,
      playerPokemons: [],
      pokemons: [],
      pcPokemons: [],
      pcPokemon: [],
      skillList: [],
      currentPokemonSkillValue: '',
      currentPokemonSkill: '',
      enemySkillsRandomnumber: '',
      enemyUseSkill: '',
      currentEnemySkill: '',
      currentEnemySkillValue: '',
      levelUpSkills: [],
      clickLookPlayerpokemons: false,
      clickLookTool: false,
      clickLookplayerAttack: false,
      maxPokemonNumber: 6,
      currentPokemonData: [],
      playerAttackLog: false,
      enemyAttackLog: false,
      enemyDamage: '',
      playerDamage: '',
      bottomSheet: false,
      bottomSheetTool: false,
      playerSituationCardOpen: false,
    }
  },
  methods: {
    damageCal(attackValue,attack,deffence) {
      // 技の威力×（レベル×2÷5+2）×物理攻撃力÷防御側の物理防御力÷50
      let damage = Math.floor(attackValue * (this.currentPokemonData.level * 2 / 5 + 2) * attack / deffence / 50)
          console.log(attackValue)
          console.log(this.currentPokemonData.level)
          console.log(deffence)

      if(damage <= 1){
        return 1;
      } else {
        return damage;
      }
    },
    judgment(){
      if(this.enemyData.hp <= 0){
        this.enemyData.hp = 0;
        this.victory = true
        this.playerSituationCardOpen = true    
        const beforePlayerLevel = JSON.stringify(this.currentPokemonData.level);
        this.currentPokemonData.exp += this.enemyData.exp;
        const afterPlayerLevel = Math.floor(this.currentPokemonData.exp / 10) + 1;
        if(beforePlayerLevel < afterPlayerLevel){
          this.currentPokemonData.attack += afterPlayerLevel * 2;
          this.currentPokemonData.deffence += afterPlayerLevel * 2;        
          this.currentPokemonData.level = afterPlayerLevel; 
        }
       document.querySelector('.pokemon').classList.remove('active')
       document.querySelector('.field').classList.remove('active')
      }
    },
    playerAttack(skill) {
      // const {
      //   enemyData,currentPokemonData
      // } = this
      this.currentPokemonSkill = this.skillList.find(skills => skills.name === skill).name
      this.currentPokemonSkillValue = this.skillList.find(skills => skills.name === skill).attackValue
      this.playerAttackLog = true
      this.enemyAttackLog = false
      this.throwMonsterBallfalse = false
      this.playerDamage = this.damageCal(this.currentPokemonSkillValue,this.currentPokemonData.attack,this.enemyData.deffence)
      this.enemyData.hp -= this.playerDamage
      this.clickLookplayerAttack = false
      this.aleartMoribund = false
      this.attackSheet = false
      this.judgment()

      if (this.enemyData.hp > 0){
        setTimeout(this.enemyAttack, 2000);     
      } 

      this.currentPokemonData.levelUpSkills.forEach(levelUpSkill  => {
        if(this.currentPokemonData.level >= levelUpSkill.level) {
          this.currentPokemonData.skills.push(levelUpSkill.skillName)
          this.currentPokemonData.levelUpSkills.shift()
          // console.log(this.currentPokemonData)
        }
      })

    },
    enemyAttack() {
      this.enemyAttackLog = true
      this.playerAttackLog = false
      this.throwMonsterBallfalse = false
      this.playerSituationCardOpen = false
      this.enemySkillsRandomnumber = Math.floor(Math.random() * this.enemyData.skills.length )
      this.enemyUseSkill = this.enemyData.skills[this.enemySkillsRandomnumber]
      this.currentEnemySkill = this.skillList.find(skills => skills.name === this.enemyUseSkill).name
      this.currentEnemySkillValue = this.skillList.find(skills => skills.name === this.enemyUseSkill).attackValue
      this.enemyDamage = Math.floor(this.damageCal(this.currentEnemySkillValue,this.enemyData.attack,this.currentPokemonData.deffence))
      // console.log(this.enemyDamage)
      this.currentPokemonData.hp -= this.enemyDamage

      if(this.currentPokemonData.hp <= 0){
        this.currentPokemonData.hp = 0;
        this.moribund = true
        this.playerSituationCardOpen = true
        this.pokemonSheet = true
      } 
      if(this.playerPokemons.every(playerPokemon => playerPokemon.hp === 0)) {
        this.modalNextChallengeButton = true
        this.moribund = false
        this.lose = true
        this.defeat = false
        this.playerSituationCardOpen = true
        document.querySelector('.pokemon').classList.remove('active')
        document.querySelector('.field').classList.remove('active')
      }
    },
    encount(e){
      this.victory = false
      this.throwMonsterBallSuccess = false
      this.playerAttackLog = false
      this.enemyAttackLog = false
      this.playerSituationCardOpen = false
      this.enemyDataSet()    
    },
    oneMore(e) {
      this.encount()
      this.defeat = false
      this.lose = false
      this.currentRecoveryTimes = 0
      this.currentPokemonData.exp = 0;      
      this.currentPokemonData.hp = this.currentPokemonData.maxHp
      this.currentPokemonData.level = 1
      this.useRecoverytimes = true
      this.useMagicRecoverytimes = true
    },
    recovery() {
      if (this.currentPokemonData.hp < this.currentPokemonData.maxHp) {
        this.currentRecoveryTimes += 1;
        this.currentPokemonData.hp = this.currentPokemonData.hp + 10;
        this.clickLookTool = false
        if(this.currentRecoveryTimes === this.recoveryTimes){
          this.useRecoverytimes = false
        }
      } 
      if (this.currentPokemonData.hp > this.currentPokemonData.maxHp) {
        this.currentPokemonData.hp = this.currentPokemonData.maxHp
      }
      setTimeout(this.enemyAttack, 2000);     

    },
    escape() {
      this.logList.splice(-this.logList.length)
      this.enemyDataSet()
      document.querySelector('.pokemon').classList.remove('active')
      document.querySelector('.field').classList.remove('active')
    },
    currentHpGaugeValues(data) {
      let color = 'blue'
      if (data.hp <= data.maxHp * .5) {
        color = 'yellow'     
      } else if (data.hp <= data.maxHp * .2) {
        color = 'red'   
      }
      return {
        width: `${data.hp / data.maxHp * 100}%`,
        backgroundColor: color
      }
    },
    enemyDataSet() {
      // console.log(this.pokemons)
      this.enemyData = this.deepCopy(this.pokemons[Math.floor(Math.random() * this.pokemons.length)])
      // this.enemyData = this.deepCopy(this.pokemons[0])
      this.enemyRandomLevel = Math.floor(Math.random() * 3 + 1)
      this.enemyData.level = this.enemyRandomLevel
      this.enemyData.maxHp = (this.enemyData.maxHp + (this.enemyRandomLevel - 1) * 2) 
      this.enemyData.hp = (this.enemyData.hp + (this.enemyRandomLevel - 1) * 2) 
      this.enemyData.attack = (this.enemyData.attack + (this.enemyRandomLevel - 1) * 2) 
      this.enemyData.deffence = (this.enemyData.deffence + (this.enemyRandomLevel - 1) * 2) 
      this.enemyData.exp = (this.enemyData.exp + (this.enemyRandomLevel - 1) * 2) 
    },
    throwMonsterBall() {
      this.throwMonsterBallTimes++
      this.clickLookTool = false

      if(Math.random() < .5){
        this.enemyAttackLog = false
        this.throwMonsterBallSuccess = true
        this.throwMonsterBallfalse = false
        this.playerSituationCardOpen = true

      } else {
        this.throwMonsterBallSuccess = false
        this.throwMonsterBallfalse = true
        setTimeout(this.enemyAttack, 2000);     
      }

      if(this.throwMonsterBallTimes === this.numberOfMonsterBall) {
        this.useMonsterBall = false
      }

      if(this.throwMonsterBallSuccess) {
        if(this.playerPokemons.length < this.maxPokemonNumber) {
          this.playerPokemons.push(this.deepCopy(this.enemyData))
        } else {
          this.playerPokemonsOver = true
          this.playerSituationCardOpen = true
        } 
      }
    },
    pokemonChange(pokemon) { 
      if (pokemon.hp > 0) {
        this.currentPokemonData = pokemon  
        this.moribund = false
        this.clickLookPlayerpokemons = false
        this.aleartMoribund = false
        this.playerSituationCardOpen = false    
      } else {
        this.aleartMoribund = true
      }
    },
    sendPcPokemon() {
      this.pcPokemons.push(this.enemyData)
      this.playerPokemonsOver = false
      this.throwMonsterBallSuccess = false
    },
    pokemonEscape() {
      this.throwMonsterBallSuccess = false
      this.playerPokemonsOver = false
    },
    clickAleartMoribund() {
      this.aleartMoribund = false
    },
    lookPlayerpokemons() {
      this.clickLookPlayerpokemons = true
    },
    closePlayerpokemons() {
      this.clickLookPlayerpokemons = false
      this.aleartMoribund = false
    },
    lookTool() {
      this.clickLookTool = true
    },
    closeTool() {
      this.clickLookTool = false
    },
    lookAttack() {
      this.clickLookplayerAttack = true
      this.bottomSheetTool = false
      this.bottomSheet = false
    },
    closeAttack() {
      this.clickLookplayerAttack = false
    },
    openBottomSheet(){
      this.bottomSheet = true
      this.bottomSheetTool = false
      this.clickLookplayerAttack = false

    },
    openTool() {
      this.bottomSheetTool = true
      this.bottomSheet = false
      this.clickLookplayerAttack = false

    },
    deepCopy(data){
      return JSON.parse(JSON.stringify(data))
    }
  },
  mounted: function() {
    Object.keys(Pokemon).forEach(key => {
      const pokemon = new Pokemon[key]
      pokemon.calculateStatus()
      // console.log(pokemon)
      this.pokemons.push(pokemon)
    })

    Object.keys(Skill).forEach(key => {
      this.skillList.push(new Skill[key])
    })

    this.enemyDataSet()
    this.currentPokemonData = this.deepCopy(this.pokemons.find(pokemon => pokemon.name === 'ピカチュウ'))
    this.playerPokemons.push(this.currentPokemonData)
    // 参照渡し
    // const a = {
    //   b: 0
    // }
    // const c = JSON.parse(JSON.stringify(a))
    // console.log(JSON.stringify(a))
    // console.log(this.deepCopy(a))
    // c.b = 1
    // console.log(a)
    // console.log(c)

  },
  computed: {
    playerName() {
      return '<span style="color:red;">' + this.currentPokemonData.name + "</span>"
    },
    enemyName() {
      return '<span style="color:blue;">' + this.enemyData.name + "</span>"
    }
  },  
}

</script>
