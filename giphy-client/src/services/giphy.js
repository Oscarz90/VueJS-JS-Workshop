import axios from 'axios';
const BASE = `https://api.giphy.com/v1/gifs/search?`

/**
 * Receives a search term to look for gifs on giphy
 * @param {*} searchTerm 
 * @return {promise} Returns a gif's list
 * TODO:
 * Replace search's body to async-await format functions
 * FIXME:
 * Create constants for the BASE URI, PUBLIC API KEY, ....
 */
const search = (searchTerm)=>new Promise((resolve,reject)=>{
  console.time("Getting GIFS from Giphy")
  axios
  .get(
    `https://api.giphy.com/v1/gifs/search?&api_key=dc6zaTOxFJmzC&q=${searchTerm}&limit=5`
  ).then(result=>{
    console.groupEnd("Getting GIFS from Giphy")
    resolve(result)
  }).catch(error=>{
    console.groupEnd("Getting GIFS from Giphy")
    reject(error)
  })
})

export default {
  search
}