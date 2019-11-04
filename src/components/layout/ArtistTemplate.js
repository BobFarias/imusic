import React, { Component } from 'react'

import Albuns from './Albuns'
import Spinner from './Spinner';

export default class ArtistTemplate extends Component {

    //funcao para concatenar o array com a lista de musicas junto com os respectivos albuns
    renderListofAlbuns() {

        const { data, musicsArtist } = this.props.value;

        let dataAlbum = data.results;
        let dataSongs = musicsArtist;

        let zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);

        let albunsAndSongs = zip(dataAlbum, dataSongs);

        return (
            albunsAndSongs.map(item => (
                <Albuns key={item[0].collectionId} album={item} />
            ))
        )


    }

    render() {

        const { data, title, musicsArtist, clipArtist } = this.props.value;
        return (
            <div className="container">
                <h3 className="text-left mb-4">{title}</h3>
                <div className="container body-album" >
                    <div className="row">
                        <div className="container container-info-artist col-lg-6 col-md-6 col-sm-12">
                            <h1>{data.results[0].artistName}</h1>
                            <span className="badge badge-pill badge-light">
                                <i className="fas fa-music"></i>{data.results[0].primaryGenreName}
                            </span>
                            <br></br>
                            <br></br>
                            <h4>Top Videos:</h4>
                            {
                                clipArtist.results.map(video => (<React.Fragment key={video.trackId}>
                                    <div className="container-video">
                                        <video className="previewVideos" src={video.previewUrl} controls></video>
                                        <p><b>{video.trackName}</b> | {video.collectionCensoredName}</p>
                                        <p>{video.artistName}</p>
                                    </div>
                                </React.Fragment>))
                            }
                        </div>
                        <div className="container container-album-artist col-lg-6 col-md-6 col-sm-12">
                            {musicsArtist.length === 5 ? this.renderListofAlbuns() : <Spinner/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
