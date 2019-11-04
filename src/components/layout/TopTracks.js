import React, { Component } from 'react'

import { Consumer } from '../../globalstate';
import Card from './Card';
import ArtistTemplate from './ArtistTemplate';
import Spinner from './Spinner';

export default class TopTracks extends Component {
    render() {
        return (
           <Consumer>
                {value => {
                    const {data, title} = value; 
                    
                    //validacao de se os dados já realizaram o request
                    if(data.length === 0 || data === undefined){
                        return <Spinner/>
                    } else{
                        //validacao para retornar o layout da pesquisa ou a tela inicial
                        if(value.templateSearch){
                            return (
                                <ArtistTemplate value = {value}/>
                            );
                        } else {
                            return (<React.Fragment>
                               <div className = "container-toptracks">
                                   <h3 className="text-left mb-4">{title}</h3>
                                   <section className ="section-container" >
                                   {
                                       data.tracks.data.map(item =>(
                                           <Card key={item.id} tracks={item} />
                                       ))
                                   }
                                   </section>  
                               </div>
                           </React.Fragment>);
                        }
                    }
                }}
           </Consumer>
        )
    }
}