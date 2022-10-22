import {useReducer} from 'react'
import githubReducer from './GithubReducer';
import { createContext } from "react";


const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUBTOKEN

export const GithubProvider = ({children}) => {
 const initialState = {
  users:[],
  user: {},
  repos: [],
  Loading: false
 }

 const [state, dispatch] = useReducer(githubReducer,initialState)

  // Get initial users (testing), and now it is search users
  const searchUsers = async (text) => {
    //Clear users from state
  
    setLoading()
    const params = new URLSearchParams(
    {
      q: text
    }  
    )
    const response = 
    await fetch(`${GITHUB_URL}/search/users?${params}`,{
      headers:{ 
        Authorization: `token ${GITHUB_TOKEN}`
      }
      })
  
    const {items} = await response.json()
    dispatch({
      type: 'GET_USERS',
      payload: items
    })
    }

// Copy Users
    const getUser = async (login) => {
      //Clear users from state
    
      setLoading()
   
      const response = await fetch(`${GITHUB_URL}/users/${login}`,{
        headers:{ 
          Authorization: `token ${GITHUB_TOKEN}`
        }
        })
    
        if (response.status === 404 )
        {
           window.location = '/notfound'
        }
        else {
          const data = await response.json()
          dispatch({
            type: 'GET_USER',
            payload: data
          })
        }
 
      }
 // Get user repos
  const getUserRepos = async (login) => {
        //Clear users from state
      
        setLoading()
       
        const params = new URLSearchParams(
          {
            sort: 'created',
            per_page:10
          }  
          )

        const response = 
        await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,{
          headers:{ 
            Authorization: `token ${GITHUB_TOKEN}`
          }
          })
      
        const data = await response.json()
       
        dispatch({
          type: 'GET_REPOS',
          payload: data
        })
        }
        
        
    const clearUsers = () => dispatch({type: 'CLEAR_USERS'})
    //Set Loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    return <GithubContext.Provider value={{
      users: state.users,
      Loading: state.Loading,
      user: state.user,
      repos: state.repos,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }}
    >{children}</GithubContext.Provider>
}

export default GithubContext