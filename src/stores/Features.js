import { observable, action } from 'mobx'
import { Howl } from 'howler';

class Features {
    @observable showPopup = false
    @observable searchingForPlayer = false
    @observable soundOn = true


    @action playThemeSong = () => {
        let themeSong = require('../sounds/Rick and Morty 8-Bit Intro Adult Swim.mp3')

        let themePlay = new Howl({
            src: themeSong,
            loop: true,
            volume: 0.5
        })
        themePlay.play()

    }

    @action playDubdub = () => {
        let dubdubSound = require('../sounds/woo_vu_luvub_dub_dub.wav')
        let dubdubPlay = new Howl({
            src: dubdubSound
        });

        dubdubPlay.play()
    }

    @action shootSound = () => {
        let laserSound = require('../sounds/laseShot.wav')
        let laserPlay = new Howl({
            src: laserSound
        })

        laserPlay.play()
    }
}

const features = new Features()
export default features