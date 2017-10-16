import { SET_TOKEN, LOGOUT, SET_INFO, SET_ITEM } from './mutation-types'

export default {
  [SET_TOKEN] (state, res) {
    state.info = Object.assign(state.info, res)
    localStorage.setItem('info', JSON.stringify(res))
  },
  [LOGOUT] (state) {
    state.info = {
      user_id: '',
      mobile: '',
      token: 0
    }
    localStorage.removeItem('info')
  },
  [SET_INFO] (state, payload) {
    state.info = Object.assign(state.info, payload)
  },
  [SET_ITEM] (state, payload) {
    state.info = Object.assign(state.info, payload)
  }
}
