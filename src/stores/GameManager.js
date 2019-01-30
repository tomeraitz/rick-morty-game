// import React, { Component } from 'react';
// import { observable, get } from 'mobx';
import { observable, action } from 'mobx'//computed

// import { spaceShipSizes, enemySizes, shotSizes } from '../consts/sizes'

import Enemy from './Enemy'
import LaserShot from './LaserShot'
import SpaceShip from './SpaceShip'
// import { finished } from 'stream';


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
    @observable enemyPerLevel
    @observable boardHeight
    @action game = () => {
        console.log("game on")
        this.enemies.forEach(e => {
            if (e.x + 50 <= this.boardWidth) {
                e.x += 1
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
            this.checkEnemies(s) //check hits
        })
    }
    createEnemies = (num) => {
        for (let i = 0; i < (num); i++) {
            let m = 50 + Math.floor(Math.random() * 600)
            this.drawInstance(new Enemy(0, m))
        }
    }
    @action start = () => {
        if (this.spaceShips.length === 0) {
            this.drawInstance(new SpaceShip(0, 50, 3, 0, 1))
        }
        this.spaceShips.forEach(s => {
            this.enemyPerLevel = s.level * 4
            this.createEnemies(s.level * 4)
        })
        this.interval_id = setInterval((this.game), 1)
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
            if (this.laserShots.length === 0) {
                this.laserShots.push(instance)
            }
            else {
                while (this.laserShots[this.laserShots.length - 1].x > 100) {
                    this.laserShots.push(instance)
                }
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
    setNewLevel = () => {
        this.spaceShips.forEach(s => s.level++)
        this.start()
    }
    @action kill(instance) {
        console.log('this.enemyPerLevel', this.enemyPerLevel)
        if (instance instanceof LaserShot) {
            this.laserShots = this.laserShots.filter(laserShot => laserShot.id !== instance.id)
        }
        else if (instance instanceof Enemy) {
            this.enemies = this.enemies.filter(enemy => enemy.id !== instance.id)
            if (this.enemies.length === 0) {
                if (this.enemyPerLevel > 0) {
                    this.createEnemies(this.enemyPerLevel)
                }
                else {
                    alert("Good job")
                    this.setNewLevel()
                }
            }
        }
        else if (instance instanceof SpaceShip) {
            let ship = this.spaceShips.find(spaceShip => spaceShip.id === instance.id)
            if (ship.life === 0 || this.enemyPerLevel === 0) {
                this.gameOver()
            }
            else {
                ship.life--
                this.enemyPerLevel--
            }
        }
    }

    @action checkEnemies(instance) {
        this.enemies.forEach(e => {
            if (e.x + instance.x + 70 >= this.boardWidth && Math.abs(e.y - instance.y + 25) <= 50) {
                if (instance instanceof LaserShot) {
                    let ship = this.spaceShips.find(spaceShip => spaceShip.id === instance.shipID)
                    this.enemyPerLevel--
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
