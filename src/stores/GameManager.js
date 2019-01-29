import React, { Component } from 'react';
import { observable, get } from 'mobx';
import { spaceShipSizes, enemySizes, shotSizes } from '../consts/sizes'
import { observable, action, computed } from 'mobx-react'



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
    @observable LaserShots = []

    @computed get isGameOn() {
        return this.spaceShips.length > 0
    }

    @action start = () => {
        this.drawInstance(new SpaceShip(300, 5))

        while (this.isGameOn())
        {

            // 
            // G A M E    O N
            //

        }
    }
    @action createLaserShot = (spaceShip) => {
        const newLaserShot = new LaserShot(spaceShip.x, spaceShip.y)
        this.drawInstance(newLaserShot)
        newLaserShot.fire()
    }

    @action drawInstance = instance => {
        if (instance instanceof LaserShot)
        {
            this.LaserShots.push(instance)
        }
        else if (instance instanceof Enemy)
        {
            this.enemies.push(instance)
        }
        else if (instance instanceof SpaceShip)
        {
            this.spaceShips.push(instance)
        }
    }

    @action kill(instance) {
        if (instance instanceof LaserShot)
        {
            this.LaserShots = this.LaserShots.filter(LaserShot => LaserShot.id !== instance.id)
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

    @action checkBorder(x, y) {
        if (x <= 0 || x >= 100 || y <= 0 || y >= 100)
        {
            return false
        }
    }

    @action checkEnemies(instance, x, y) {
        this.enemies.forEach(e => {
            if (e.x === x && e.y === y)
            {
                kill(instance instanceof SpaceShip ? instance : e)
            }
        })
    }


}


export default GameBoard
