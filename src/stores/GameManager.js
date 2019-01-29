import React, { Component } from 'react';
// import { observable, get } from 'mobx';
import { observable, action, computed } from 'mobx'

import { spaceShipSizes, enemySizes, shotSizes } from '../consts/sizes'

import Enemy from './Enemy'
import LaserShot from './LaserShot'
import SpaceShip from './SpaceShip'


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

    @computed get isGameOn() {
        return this.spaceShips.length > 0
    }

    @action start = () => {
        this.drawInstance(new SpaceShip(0, 50))
        this.drawInstance(new Enemy(110, 10))
        this.drawInstance(new Enemy(110, 50))
        this.drawInstance(new Enemy(110, 80))


        console.log("game")
        let count = 0
        while (count < 10000)
        {
            count++
            setTimeout(() => {
                // move
                this.enemies.forEach(e => {
                    e.x--
                })
                this.laserShots.forEach(l => {
                    this.checkEnemies(l)//check hit
                    l.x++
                })

                this.spaceShips.forEach(s => {
                    this.checkEnemies(s) //check hits
                })

            }, 100)

        }
    }
    // @action createLaserShot = (x, y) => {
    //     const newLaserShot = new LaserShot(x, y)
    //     this.drawInstance(newLaserShot)
    //     // newLaserShot.fire()
    // }

    @action drawInstance = instance => {
        if (instance instanceof LaserShot)
        {
            console.log("LaserShot")
            this.laserShots.push(instance)
        }
        else if (instance instanceof Enemy)
        {
            console.log("Enemy")
            this.enemies.push(instance)
        }
        else if (instance instanceof SpaceShip)
        {
            console.log("SpaceShip")
            this.spaceShips.push(instance)
        }
    }

    @action kill(instance) {
        if (instance instanceof LaserShot)
        {
            this.laserShots = this.laserShots.filter(laserShot => laserShot.id !== instance.id)
        }
        else if (instance instanceof Enemy)
        {
            this.enemies = this.enemies.filter(enemy => enemy.id !== instance.id)
        }
        else if (instance instanceof SpaceShip)
        {
            this.spaceShips.filter(spaceShip => spaceShip.id !== instance.id)
        }
    }


    // const chackDistance = (A, B) => Math.sqrt(A.x * B.x + A.y * B.y)

    @action checkBorder(x, y) {
        if (x <= 0 || x >= 100 || y <= 0 || y >= 100)
        {
            return false
        }
    }

    @action checkEnemies(instance) {
        this.enemies.forEach(e => {
            if (e.x === instance.x && e.y === instance.y)
            {
                this.kill(instance instanceof SpaceShip ? instance : e)
            }
        })
    }
}


const game = new GameManager()


export default game
