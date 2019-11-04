import React, { Component } from 'react'
import axios from 'axios';

const Context = React.createContext();

//declaração do método do reducer
//declaração dos Actions.type para reconhecer as ações do usuário
const reducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH_ARTIST':
            return{
                ...state,
                data: action.payload,
                templateSearch: true,
                searchName: action.artistName,
                musicsArtist: action.songsArtist,
                clipArtist: action.videoArtist,
                title: ''
            };
        default:
            return state;
    }
}

export class Provider extends Component {
    
    //declarar os states que serão utilizados nos componentes da aplicação
    //podemos chamar o dispatch de qualquer component para manipular esse state.
    state ={
        data: [],
        title: 'Melhores músicas',
        templateSearch: false,
        searchName: '',
        musicsArtist: [],
        clipArtist: [],
        dispatch: action => this.setState( state => reducer(state, action))
    }

    //get da API do dezer para request da playlist que aparece na tela inicial
    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/2886462886`)
        .then(res =>{ 
            // console.log(res.data);
            this.setState({data: res.data});    
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;