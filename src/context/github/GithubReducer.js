const githubReducer = (state, action) => {
  switch(action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        Loading: false
      }
      case 'GET_USER':
        return{
          ...state,
          user:action.payload,
          Loading:false
        }
      case 'GET_REPOS':
        return {
          ...state,
          repos:action.payload,
          Loading:false
        }
      case 'SET_LOADING':
        return {
          ...state,
          Loading:true
        }
        case 'CLEAR_USERS':
        return {
          ...state,
          users:[]
        }
    default:
      return state
  }
}
export default githubReducer