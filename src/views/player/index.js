import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playTrack, checkSignIn } from '../../actions';
import Spinner from 'react-spinkit';
import './index.css';

class index extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            songId: this.props.match.params.songId,
        }
    }
    
    componentWillMount() {
        this.props.checkSignIn();
        this.props.playTrack(this.state.songId)
    }

    render() {
        const { player } = this.props;
        if(player.type === "COMPLETE_SONG"){
            console.log(player);
            
            return (
                <div className="container">
                    <div className="row">
                        <div className="col s12 box-player">
                            <div className="col s3"></div>
                            <div className="col s6">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={player.payload.album.images[0].url} />
                                        <span className="card-title">{player.payload.name}</span>
                                    </div>
                                    <div className="card-content">
                                        <p><strong> Album: </strong> {player.payload.albumPhoto}</p>
                                        <p><strong> Popularity: </strong> {player.payload.popularity}%</p>
                                    </div>
                                    <div className="card-action">
                                        <audio controls>
                                            <source src={ player.payload.preview_url } />
                                        </audio>
                                    </div>
                                </div>
                            </div>
                            <div className="col s3"></div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                <div className="row" >
                    <div className="col s12" >
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}

function mapStateToProps(state){
    return {
        routes: state.routes,
        player: state.player
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        checkSignIn,
        playTrack
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(index);