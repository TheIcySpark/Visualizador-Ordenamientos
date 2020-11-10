import React from 'react';
import "./Visualizador.css";

export default class Visualizador extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            arreglo: [],
        };
    }

    pruebas_animacion(){
        console.log("pruebas de animacion");
        const barras = document.getElementsByClassName("barraArreglo")
        barras[1].style.backgroundColor = "blue";
    }

    ordenamiento_burbuja(){
        this.pruebas_animacion();
    }

    componentDidMount(){
        this.formatearArreglo()
        document.getElementById('boton_arreglo_aleatorio').onclick = () =>{
            this.formatearArreglo();
        }
        document.getElementById('elementos_range').addEventListener("change", () =>{
            this.formatearArreglo();
            document.getElementById('elementos_text').value = 
                    document.getElementById('elementos_range').value;
        })
        document.getElementById('iniciar_ordenamiento').addEventListener("click", () =>{
            const algoritmo = document.getElementById('algoritmo_ordenamiento').value;
            switch(algoritmo){
                case 'burbuja':
                    this.ordenamiento_burbuja();
                    break;
                default:
                    break;
            }
        })
    }

    formatearArreglo(){
        const arreglo = [];
        const tam = document.getElementById('elementos_range').value;
        for(let i = 1; i <= tam; i++){
            arreglo.push(enteroAleatorio(1,500));
        }
        this.setState({arreglo});
    }
    
    
    
    render(){
        const {arreglo, referencias} = this.state;
        const ancho = parseInt((805 / arreglo.length) + 1);
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