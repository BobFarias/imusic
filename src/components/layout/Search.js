import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../globalstate';

export default class Search extends Component {

    state = {
        name: '',
        data: {},
        songsAlbum: [],
        videoArtist: []
    }

    //listener do form que irá realizar a pesquisa
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    //função a ser executada quando o usuário pesquisar a artista
    //parametros dispatch = arrow function declarada no globalstate.js
    //parametro event = o input do usuáro
    handleSubmit = (dispatch, event) =>{
        event.preventDefault();

        //coreeção para trocar o espaço por "+"
        const artist = {
            artistName : this.state.name.replace(/ /g,"+")
        }

        

        axios.get('https://itunes.apple.com/search?term='+artist.artistName+"&entity=album&limit=5")
            .then(res => {
                //necessário o forEach para poder acessar o nome do artista e fazer a validação se está chegando o dado que o usuário pesquisou
                res.data.results.forEach(item =>{
                    if(item.artistName.toLowerCase() === this.state.name.toLowerCase()){
                        
                        this.setState({data: res.data});

                        //get nas musicas dos albuns que foi pego acima
                        axios.get('https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id='+item.collectionId+'&entity=song')
                        .then(res => {
                            //concatenando os resultados no state de songsAlbum
                            this.setState({songsAlbum:[...this.state.songsAlbum, res.data]});

                             //get dos vídeos do artista
                            axios.get('https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term='+artist.artistName+'&entity=musicVideo&limit=5')
                            .then(res => {

                                this.setState({videoArtist: res.data});
                                
                                //declarando o type que será enviado pelo dispatch e novos state para serem atualizados
                                dispatch({
                                    type: 'SEARCH_ARTIST',
                                    payload: this.state.data,
                                    artistName: artist.artistName,
                                    songsArtist: this.state.songsAlbum,
                                    videoArtist: this.state.videoArtist,
                                })
                                //limpar o input da pesquisa
                                this.setState({name: ''});
                            });
                        });                        
                        
                    } else{
                        return
                    }
                })
                
                this.setState({songsAlbum:[]});
                this.setState({videoArtist:[]});

            })
            .catch(err => console.log(err))

    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="container-search">
                            <div className="container-head">
                                    <h1>Procure seu cantor favorito:</h1>
                                    <h4>E descubra quais são seus 5 álbuns mais vendidos:</h4>
                            </div>
                            <div className="container">
                                <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input
                                        required
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Artist Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange} />
                                    <button type="submit" className="btn btn-dark">
                                        <i className="fas fa-search"></i> Pesquisar
                                    </button>
                                </div>
                            </form>
                            </div>
                        </div>
                    );
                }}
            </Consumer>
        )
    }
}
