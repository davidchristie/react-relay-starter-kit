import Relay from 'react-relay'

import LoginMutation from '../mutations/LoginMutation'
import RegisterMutation from '../mutations/RegisterMutation'

export function register (username, password) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new RegisterMutation({
      input: {
        password,
        username
      },
      user: null
    }), {
      onFailure: transaction => reject(transaction.getError().message),
      onSuccess: data => resolve(login(username, password))
    })
  })
}

export function login (username, password) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new LoginMutation({
      input: {
        password,
        username
      },
      user: null
    }), {
      onFailure: transaction => reject(transaction.getError().message),
      onSuccess: data => resolve(data)
    })
  })
}
