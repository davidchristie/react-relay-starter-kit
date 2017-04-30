import Relay from 'react-relay'

export default class RegisterMutation extends Relay.Mutation {
  getConfigs () {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL `
        fragment on CreateUserPayload {
          changedUser {
            id
            username
            createdAt
            modifiedAt
          }
        }
      `]
    }]
  }

  getFatQuery () {
    return Relay.QL`
      fragment on CreateUserPayload {
        changedUser {
          id
          username
          createdAt
          modifiedAt
        }
      }
    `
  }

  getMutation () {
    return Relay.QL`
      mutation {
        createUser
      }
    `
  }

  getOptimisticResponse () {
    return {
      changedUser: {
        username: this.props.createUser
      }
    }
  }

  getVariables () {
    return {
      username: this.props.input.username,
      password: this.props.input.password
    }
  }
}

RegisterMutation.fragments = {
  user: () => Relay.QL`
    fragment on CreateUserPayload {
      changedUser {
        id
        username
        createdAt
        modifiedAt
      }
    }
  `
}

RegisterMutation.initialVariables = {
  input: null
}
