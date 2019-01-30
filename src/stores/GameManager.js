import React, {
    Component
} from 'react';
// import { observable, get } from 'mobx';
import {
    observable,
    action,
    computed
} from 'mobx'

import {
    spaceShipSizes,
    enemySizes,
    shotSizes
} from '../consts/sizes'

import Enemy from './Enemy'
import LaserShot from './LaserShot'
import SpaceShip from './SpaceShip'
import {
    finished
} from 'stream';


// <<Class>>
// GameBoard
// + spaceShip: Object
// + enemies: array
// +shots : array

// + drawNewInstance(): Instance on board
// + kill() : kill instance

// + start(): Loop not game over

// moveAll(enemies, shots)

// + moveExsitingInstance() : move existing instance

// +checkPoint () : check if there moving is available

// + gameOver() : check if game over

class GameManager {
    @observable spaceShips = []
    @observable enemies = []
    @observable laserShots = []
    @observable interval_id
    @observable boardWidth
    @observable boardHeight
    // @computed get isGameOn() {
    //     return this.spaceShips.length > 0
    // }
    @action game = () => {
        console.log("game on")
        this.enemies.forEach(e => {
            if (e.x + 50 <= this.boardWidth) {
                e.x += 1
            } else {
                this.kill(e)
            }

        })

        this.laserShots.forEach(l => {
            if (l.x + 50 <= this.boardWidth) {
                l.x += 15
                this.checkEnemies(l)
            } else {
                this.kill(l)
            }
        })

        this.spaceShips.forEach(s => {
            this.checkEnemies(s) //check hits
        })

    }

    @action start = () => {
        this.drawInstance(new SpaceShip(0, 50, 3, 0, 0))
        this.drawInstance(new Enemy(100, 100))
        this.drawInstance(new Enemy(20, 300))
        this.drawInstance(new Enemy(300, 20))
        this.interval_id = setInterval((this.game), 20)
    }

    gameOver() {
        console.log("game over")
        clearInterval(this.interval_id);
    }

    @action setBorders(height, width) {
        this.boardWidth = width
        this.boardHeight = height
    }

    @action drawInstance = instance => {
        if (instance instanceof LaserShot) {
            if (this.laserShots.length == 0) {
                this.laserShots.push(instance)
            } else {
                while (this.laserShots[this.laserShots.length - 1].x > 100) {
                    this.laserShots.push(instance)
                }
            }

        } else if (instance instanceof Enemy) {
            this.enemies.push(instance)
        } else if (instance instanceof SpaceShip) {
            this.spaceShips.push(instance)
        }
    }

    @action kill(instance) {
        console.log("kill")
        if (instance instanceof LaserShot) {
            console.log("kill laser")
            this.laserShots = this.laserShots.filter(laserShot => laserShot.id !== instance.id)
        } else if (instance instanceof Enemy) {
            console.log("kill enemy")
            this.enemies = this.enemies.filter(enemy => enemy.id !== instance.id)
        } else if (instance instanceof SpaceShip) {
            let ship = this.spaceShips.find(spaceShip => spaceShip.id === instance.id)
            ship.life--
            if (ship.life === 0) {
                this.gameOver()
                // alert("you are a loser!")
            }
        }
    }


    // const chackDistance = (A, B) => Math.sqrt(A.x * B.x + A.y * B.y)

    @action checkEnemies(instance) {

        this.enemies.forEach(e => {
            if (e.x + instance.x + 70 >= this.boardWidth &&
                Math.abs(e.y - instance.y + 25) <= 50) {
                if (instance instanceof LaserShot) {
                    let ship = this.spaceShips.find(spaceShip => spaceShip.id === instance.shipID)
                    ship.score += 10
                }
                this.kill(instance)
                this.kill(e)
            }
        })
    }
}


const game = new GameManager()
export default game