import axios from "axios";
import { TrackHandler, Client } from 'spotify-sdk';

let client = Client.instance
client.settings = {
    clientId: '152afb7431ac4e439c3b4aff4021e5fd',
    secretId: '62187a7c994a4fa580ae3b1d982576ce',
    scopes: ['user-follow-modify user-follow-read user-library-read user-top-read'],
    redirect_uri: 'http://localhost:3000/'
}

export const checkSignIn = () => {
    return (dispatch, getState) => {
        if(sessionStorage.token){
            client.token = sessionStorage.token
        }else if(window.location.hash.split('&')[0].split('=')[1]){
            sessionStorage.token = window.location.hash.split('&')[0].split('=')[1]
            client.token = sessionStorage.token
        }else{
            client.login()
                .then( url => {
                    window.location.href = url
                })
        }
    }
}

const startFetch = () => { return ( {type: 'IS_FETCHING', isFetching: true} )}
const errorFetch = (error) => { return ( {type: 'ERROR_FETCH', isFetching: false, error} )}
const completeFetch = (data) => { return ( {type: 'COMPLETE_FETCH', isFetching: false, payload: data} )}

export const search = (trackName) => {
    return ( dispatch, getState ) => {
        dispatch(startFetch())
        let track = new TrackHandler()
        track.search(trackName, { limit: 6 })
            .then( trackCollection => {
                dispatch(completeFetch(trackCollection));
            })
            .catch( error => {
                dispatch(errorFetch(error))
            } )
    }
}

const completeSong = ( data ) => { return { type: 'COMPLETE_SONG', success: true, payload: data } }

export const playTrack = (songId) => {
    return (dispatch, getState ) => {
        dispatch(startFetch());
        axios.get('https://api.spotify.com/v1/tracks/'.concat( songId ), {
            headers: { "Authorization": "Bearer " + client.token}
        })
        .then( response => {
            dispatch(completeSong(response.data))
        })
        .catch( error => {
            console.log(error);
        })
    }
}