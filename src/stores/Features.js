import { observable } from 'mobx'

class Features {
    @observable showPopup = false
    @observable searchingForPlayer = false
    @observable gameFound = false

}

export default Features