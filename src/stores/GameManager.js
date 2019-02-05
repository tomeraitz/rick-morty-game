import { observable, action } from 'mobx'

import Enemy from './Enemy'
import LaserShot from './LaserShot'
import SpaceShip from './SpaceShip'


import arrayImages from '../consts/ArrayImages'

import { Howl, Howler } from 'howler';
import Riggity from '../sounds/Riggity.wav'
import Balls from '../sounds/lick_my_balls.wav'
import rickBlech from '../sounds/rick-belching-rick-and-morty.mp3'
import rickportal from '../sounds/rickportal.wav'
import ticky from '../sounds/ricky_ticky_tabby_biatch.wav'
import dubdub from '../sounds/woo_vu_luvub_dub_dub.wav'

console.log(arrayImages)

class GameManager {
    @observable spaceShips = []
    @observable playerInfo = { life: 3, score: 0, level: 1 }
    @observable enemies = []
    @observable laserShots = []

    @observable interval_id
    @observable boardWidth
    @observable enemyPerLevel
    @observable boardHeight

    @observable finishLevel = false
    @observable isGameOver = false

    createEnemies = (num) => {
        for (let i = 1; i < (num + 1); i++) {
            let y = Math.floor(Math.random() * 400)
            let x = i * 50
            let index = Math.floor(Math.random() * arrayImages.length)
            let width = arrayImages[index].width
            let height = arrayImages[index].height
            let src = arrayImages[index].src
            this.drawInstance(new Enemy(index, - x, y, width, height, src))
        }
    }

    @action start = () => {
        this.sound()
        if (this.spaceShips.length === 0) {
            this.drawInstance(new SpaceShip(0, 50, 3, 0, 1))
        }
        this.spaceShips.forEach(s => {
            this.enemyPerLevel = s.level * 4
            this.createEnemies(s.level * 3)
        })
        this.interval_id = setInterval((this.game), 20)
    }
    setNewLevel = () => {
        this.finishLevel = true
        this.playerInfo.level++

        this.start()
    }

    gameOver() {
        clearInterval(this.interval_id);

        this.enemies = []
        this.spaceShips = []
        this.laserShots = []
        this.playerInfo = { life: 3, score: 0, level: 1 }

        this.isGameOver = true
        this.finishLevel = false

        alert("start new game loser!")
        this.start()

    }

    @action start = () => {

        setTimeout(() => this.finishLevel = false, 2000);
        if (this.spaceShips.length === 0) {
            this.drawInstance(new SpaceShip(0, 50))
        }
        this.enemyPerLevel = this.playerInfo.level * 4
        this.createEnemies(this.enemyPerLevel)
        this.interval_id = setInterval((this.game), 20)
    }

    @action game = () => {

        this.enemies.forEach(e => {
            if (e.x + 50 <= this.boardWidth) {
                e.x += this.playerInfo.level / 2
            }
            else {
                this.kill(e)
            }

        })

        this.laserShots.forEach(l => {
            if (l.x + 50 <= this.boardWidth) {
                l.x += 15
                this.checkEnemies(l)
            }
            else {
                this.kill(l)
            }
        })

        this.spaceShips.forEach(s => {
            this.checkEnemies(s)
        })

    }

    @action setBorders(height, width) {
        this.boardWidth = width
        this.boardHeight = height
    }

    @action drawInstance = instance => {

        if (instance instanceof LaserShot) {
            if (this.laserShots.length === 0) {
                this.laserShots.push(instance)
            }
        }

        else if (instance instanceof Enemy) {
            this.enemies.push(instance)
            console.log(this.enemies)
        }

        else if (instance instanceof SpaceShip) {
            this.spaceShips.push(instance)
        }

    }

    @action kill(instance) {

        if (instance instanceof LaserShot) {

            this.laserShots = this.laserShots.filter(laserShot => laserShot.id !== instance.id)
        }
        else if (instance instanceof Enemy) {
            this.enemies = this.enemies.filter(enemy => enemy.id !== instance.id)
            // console.log("x y ", instance.x, " ", instance.y)
            if (this.enemies.length === 0) {
                if (this.enemyPerLevel > 0) {
                    this.createEnemies(this.enemyPerLevel)
                }
                else {
                    this.setNewLevel()
                }
            }
        }

        else if (instance instanceof SpaceShip) {
            if (this.playerInfo.life === 1) {
                this.gameOver()
            }
            else {
                this.playerInfo.life--
                this.enemyPerLevel--
            }
        }
    }

    @action checkEnemies(instance) {
        let spaceShipBorder = this.charBorders()

        this.enemies.forEach(e => {
            if (e.x + instance.x + (spaceShipBorder.width + e.width) >= this.boardWidth && Math.abs(e.y - instance.y) <= spaceShipBorder.height) {
                if (instance instanceof LaserShot) {
                    this.enemyPerLevel--
                    this.playerInfo.score += 10
                }
                this.kill(instance)
                this.kill(e)
            }
        })
    }
    sound() {
        Howler.volume(1);
        const sounds = [[Riggity], [Balls], [rickBlech], [rickportal], [ticky], [dubdub]]
            .map((s) => new Howl({
                src: s
            }));

        const soundIndex = Math.floor(Math.random() * sounds.length)
        const sound = new Howl({
            src: sounds[soundIndex]
        });
        sounds[soundIndex].play();
    }

    @action charBorders = () => {
        let spaceShip = new SpaceShip()
        let border = spaceShip.charBorders()
        return border
    }
}

const game = new GameManager()
export default game