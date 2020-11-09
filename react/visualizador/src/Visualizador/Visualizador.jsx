import React from 'react';
import "./Visualizador.css";

export default class Visualizador extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            arreglo: []
        };
    }

    componentDidMount(){
        this.formatearArreglo()
    }

    formatearArreglo(){
        const arreglo = [];
        for(let i = 1; i <= 250; i++){
            arreglo.push(enteroAleatorio(1,500));
        }
        this.setState({arreglo});
    }
    
    
    render(){
        const {arreglo} = this.state;
        const ancho = parseInt((805 / arreglo.length) + 1);
        console.log(ancho);
        return(
            <>
                {arreglo.map(function(valor, indice){
                    return (
                    <div className = "barraArreglo" key = {indice} 
                    style = {{height: `${valor}px`, width: `${ancho}%` }}>
                    </div>)
                })}
            </>
        );
    }
}


function enteroAleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}