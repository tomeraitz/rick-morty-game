import { observable } from 'mobx'

class Features {
    @observable showPopup = false
    @observable searchingForPlayer = false

}

export default Features