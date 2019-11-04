import React from 'react'

const Albuns = (props) => {

    const { album } = props;

    return (
        <div className="col container-album">
            <div className="row row-album-info">
                <div className="col-lg-4 col-md-4 col-sm-6 container-album-img" >
                    <img alt="album-img" src={album[0].artworkUrl100} ></img>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-6 " >
                    <h4>{album[0].collectionCensoredName}</h4>
                    <p>{album[0].artistName} - {album[0].trackCount} tracks</p>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 " >
                    <ul className="list-group songs-group">
                        {
                            album[1].results.map(songs => (
                                songs.wrapperType === 'track' ?
                                    <li className="" key={songs.trackId}>
                                        <span>{songs.trackNumber}</span>
                                        {songs.trackName}
                                    </li> : null
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Albuns;
