import { observable, action } from 'mobx'

import Enemy from './Enemy'
import LaserShot from './LaserShot'
import SpaceShip from './SpaceShip'


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
            this.drawInstance(new Enemy(-x, y))

        }
        
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

        this.isGameOver = true
        this.finishLevel = false

        alert("start new game loser!")
        this.start()

    }

    @action start = () => {

        setTimeout(()=>this.finishLevel = false, 2000);
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
            instance.y += 50
            this.enemies.push(instance)
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
            console.log("x y ", instance.x, " ", instance.y)
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
        this.enemies.forEach(e => {
            if (e.x + instance.x + 70 >= this.boardWidth && Math.abs(e.y - instance.y + 25) <= 50) {
                if (instance instanceof LaserShot) {
                    this.enemyPerLevel--
                    this.playerInfo.score += 10
                }
                this.kill(instance)
                this.kill(e)
            }
        })
    }
}

const game = new GameManager()
export default game