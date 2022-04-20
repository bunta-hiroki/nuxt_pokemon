class Pokemon {
  constructor(name, hp, attack, deffence, type, exp, pokeimg, skills, levelUpSkills) {
    this.name = name
    this.hp = hp
    this.maxHp = hp
    this.attack = attack
    this.deffence = deffence
    this.type = type
    this.level = 1
    this.exp = exp
    this.moribund = false
    this.pokeimg = pokeimg
    this.skills = skills
    // this.levelUpSkills = []
    this.levelUpSkills = levelUpSkills
  }

  calculateStatus() {
    // 能力値＝(種族値×2＋個体値＋努力値÷4)×レベル÷100＋レベル＋10
    this.hp = Math.round(this.hp * 2 * this.level / 100 + this.level + 10)
    this.maxHp = this.hp

    // 能力値＝{(種族値×2＋個体値＋努力値÷4)×レベル÷100＋5}×性格補正
    this.attack = Math.round((this.attack * 2 ) * this.level / 100 + 5)
    this.deffence = Math.round((this.deffence * 2 ) * this.level / 100 + 5)
  }
} 

export class Pikachuu extends Pokemon {
  constructor(name, hp, attack, deffence, type, exp, pokeimg, skills, levelUpSkills) {
    super(
      name = 'ピカチュウ',
      hp = 35,
      attack = 55,
      deffence = 40,
      type = 'Electricity',
      exp = 2,
      pokeimg = `url(${require('@/assets/img/pikachuu.png')})`,
      skills = [
        '電気ショック',
        'たいあたり'
      ],
      levelUpSkills = [
        {
          level: 2,
          skillName: '10まんボルト'
        },
        {
          level: 3,
          skillName: '1000まんボルト'
        },
      ]
    )
  }  
}

export class Hitokage extends Pokemon {
  constructor(name, hp, attack, deffence, type, exp, pokeimg, skills, levelUpSkills) {
    super(
      name = 'ヒトカゲ',
      hp = 39,
      attack = 52,
      deffence = 43,
      type = 'fire',
      exp = 10,
      pokeimg = `url(${require('@/assets/img/hitokage.png')})`,
      skills = [
        'ひのこ',
        'たいあたり'
      ],
      levelUpSkills = [
        {
          level: 2,
          skillName: 'きりさく'
        },
        {
          level: 3,
          skillName: 'かえんほうしゃ'
        },
      ]
    )
  }
}

export class Kabigon extends Pokemon {
  constructor(name, hp, attack, deffence, type, exp, pokeimg, skills, levelUpSkills) {
    super(
      name = 'カビゴン',
      hp = 160,
      attack = 110,
      deffence = 65,
      type = 'normal',
      exp = 10,
      pokeimg = `url(${require('@/assets/img/kabigon.png')})`,
      skills = [
        'ずつき',
        'たいあたり'
      ],
      levelUpSkills = [
        {
          level: 2,
          skillName: 'かみつく'
        },
        {
          level: 3,
          skillName: 'のしかかり'
        },
      ]
    )
  }
}

export class Eevee extends Pokemon {
  constructor(name, hp, attack, deffence, type, exp, pokeimg, skills, levelUpSkills) {
    super(
      name = 'イーブイ',
      hp = 55,
      attack = 55,
      deffence = 50,
      type = 'normal',
      exp = 10,
      pokeimg = `url(${require('@/assets/img/eevee.png')})`,
      skills = [
        'なきごえ',
        'たいあたり'
      ],
      levelUpSkills = [
        {
          level: 2,
          skillName: 'でんこうせっか'
        },
        {
          level: 3,
          skillName: 'スピードスター'
        },
      ]
    )
  }
}

// export class Metamon extends Pokemon {
//   constructor(name, hp, attack, deffence, type, exp, pokeimg, skills) {
//     super(
//       name = 'メタモン',
//       hp = 48,
//       attack = 48,
//       deffence = 48,
//       type = 'normal',
//       exp = 10,
//       pokeimg = `url(${require('@/assets/img/metamon.png')})`,
//       skills = [
//         'たいあたり'
//       ],
//       levelUpSkills = [
//         {
//           level: 2,
//           skillName: '10まんボルト'
//         },
//         {
//           level: 3,
//           skillName: '1000まんボルト'
//         },
//       ]
//     )
//   }
// }

export class Zenigame extends Pokemon {
  constructor(name, hp, attack, deffence, type, exp, pokeimg, skills, levelUpSkills) {
    super(
      name = 'ゼニガメ',
      hp = 44,
      attack = 48,
      deffence = 65,
      type = 'water',
      exp = 10,
      pokeimg = `url(${require('@/assets/img/zenigame.png')})`,
      skills = [
        'みずでっぽう',
        'たいあたり'
      ],
      levelUpSkills = [
        {
          level: 2,
          skillName: 'アクアテール'
        },
        {
          level: 3,
          skillName: 'ハイドロポンプ'
        },
      ]
    )
  }
}

export class Husigidane extends Pokemon {
  constructor(name, hp, attack, deffence, type, exp, pokeimg, skills, levelUpSkills) {
    super(
      name = 'フシギダネ',
      hp = 45,
      attack = 49,
      deffence = 49,
      type = 'weed',
      exp = 10,
      pokeimg = `url(${require('@/assets/img/husigidane.png')})`,
      skills = [
        'はっぱカッター',
        'たいあたり'
      ],
      levelUpSkills = [
        {
          level: 2,
          skillName: 'とっしん'
        },
        {
          level: 3,
          skillName: 'ソーラービーム'
        },
      ]
    )
  }
}

export class Myutsu extends Pokemon {
  constructor(name, hp, attack, deffence, type, exp, pokeimg, skills, levelUpSkills) {
    super(
      name = 'ミュウツー',
      hp = 106,
      attack = 110,
      deffence = 90,
      type = 'normal',
      exp = 10,
      pokeimg = `url(${require('@/assets/img/myutsu.png')})`,
      skills = [
        'ねんりき',
        'たいあたり'
      ],
      levelUpSkills = [
        {
          level: 2,
          skillName: 'サイコカッター'
        },
        {
          level: 3,
          skillName: 'サイコブレイク'
        },
      ]
    )
  }
}