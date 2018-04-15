import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkSignIn, search } from '../../actions';
import Spinner from 'react-spinkit';

import './index.css';
import 'materialize-css/dist/css/materialize.min.css';
import SongItem from './SongItem';


class index extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            song: ''
        }
    }
    
    componentWillMount() {
        this.props.checkSignIn()
    }

    getTokenPath(){
        let path = window.location.href;
        return path.substring(path.indexOf("#"), path.length)
    }

    getResultsCard = () => { 

        let songs = this.props.songs;

        if(songs.length > 0){
            return  (
                <div className="card Index-results-card" >
                    <div className="card-content" >
                        <div className="container">
                            <div className="row">
                                {
                                    songs.map( (currentValue, index) => {
                                        return (
                                            <SongItem 
                                                key={index}
                                                songId={currentValue._id}
                                                tokenPath={this.getTokenPath()}
                                                albumPhoto={currentValue.album.images[0].url}
                                                albumName={currentValue.album.name}
                                                songName={currentValue.name}
                                                artistName={currentValue.artists[0].name}
                                                popularity={currentValue._popularity}
                                            />
                                        )
                                    } )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    getData(){
        const { songs } = this.props; 
        if(songs.type === 'IS_FETCHING'){
            return <Spinner name="double-bounce" />
        }else{
            return this.getResultsCard();
        }
    }
    
    render() {
        return (
            <div className="Index" >
                <div className="card" >
                    <div className="card-content" >
                        <div className="Index-searchBox" >
                            <input
                                type="text"
                                className="Index-searchBox-input"
                                placeholder="Cancion"
                                value={this.state.song}
                                onChange={ (e) => { this.setState({ song: e.target.value }) } }
                            />
                            <a 
                                className="waver-effect waver-light btn green" 
                                onClick={ () =>  this.props.search(this.state.song) }
                            >
                                <i className="fa fa-search" ></i>
                            </a>
                        </div>
                    </div>
                </div>
                {this.getData()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        routes: state.routes,
        songs: state.player
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        checkSignIn,
        search
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(index);