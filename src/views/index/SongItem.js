import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SongItem extends Component {
    render() {
        return (
            <div className="col s4">
                
                    <div className="card" >
                        <div className="card-image waves-effect waves-block waves-light">
                            <Link to={`/player/${this.props.songId}${this.props.tokenPath}`}>
                                <img src={this.props.albumPhoto} />
                            </Link>
                        </div>
                        <div className="card-content content-card-project">
                            <Link to={`/player/${this.props.songId}`}>
                                <span className="card-title activator grey-text text-darken-4">
                                    {this.props.songName}
                                </span>
                            </Link>
                            <p> <strong> popularity:  </strong> {this.props.popularity}% </p>
                        </div>
                    </div>
                
            </div>
        );
    }
}

SongItem.propTypes = {
    songId: PropTypes.string,
    tokenPath: PropTypes.string,
    albumPhoto: PropTypes.string,
    albumName: PropTypes.string,
    songName: PropTypes.string,
    artistName: PropTypes.string,
    popularity: PropTypes.number,
};

export default SongItem;