import Relay from 'react-relay'

class LoginMutation extends Relay.Mutation {
  getConfigs () {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL `
        fragment on LoginUserPayload {
          token
          user {
            id
            username
          }
        }
      `]
    }]
  }

  getFatQuery () {
    return Relay.QL`
      fragment on LoginUserPayload {
        token
        user {
          id
          username
        }
      }
    `
  }

  getMutation () {
    return Relay.QL`
      mutation {
        loginUser
      }
    `
  }

  getOptimisticResponse () {
    return {
      loginUser: this.props.loginUser
    }
  }

  getVariables () {
    return {
      username: this.props.input.username,
      password: this.props.input.password
    }
  }
}

LoginMutation.fragments = {
  user: () => Relay.QL`
  fragment on LoginUserPayload {
    token
    user {
      id
      username
    }
  }
  `
}

LoginMutation.initialVariables = {
  input: null
}

export default LoginMutation
