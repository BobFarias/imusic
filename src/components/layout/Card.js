import React from 'react'

const Card = (props) => {

    const { tracks } = props;

        return (
            <div className="col-md-3 container-card card--content">
                <div className="mb-4">
                    <img alt="cover album" src={tracks.album.cover_xl} ></img>
                    <p>{tracks.title}</p>
                    <p>{tracks.album.title}  - {tracks.artist.name}</p>
                </div>
            </div>
        )
}

export default Card;
