import React from 'react';
import "./Visualizador.css";
import {burbuja} from '../Algoritmos/burbuja.js'

export default class Visualizador extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            arreglo: [],
        };
    }


    ordenamiento_finalizado(){
        const barras = document.getElementsByClassName("barraArreglo");
        for(let i = 0; i < barras.length; i++){
            setTimeout(() =>{
                barras[i].style.backgroundColor = "green";
            }, i * document.getElementById("velocidad_ordenamiento").value)
        }
        console.log(barras);
    }

    pruebas_animacion(){
        const animaciones = burbuja(this.state.arreglo);
        const barras = document.getElementsByClassName("barraArreglo")
        for(let i = 0; i < animaciones.length ; i++){
            setTimeout(() =>{
                barras[animaciones[i].b].style.backgroundColor = "blue";
                barras[animaciones[i].a].style.backgroundColor = "blue";
                setTimeout(() =>{
                    barras[animaciones[i].b].style.backgroundColor = "red";
                    barras[animaciones[i].a].style.backgroundColor = "red";
                    if(animaciones[i].intercambiar){
                        [barras[animaciones[i].b].style.height, barras[animaciones[i].a].style.height] = 
                                [barras[animaciones[i].a].style.height, 
                                barras[animaciones[i].b].style.height]
                    }
                    if(i == animaciones.length - 1){
                        this.ordenamiento_finalizado();
                    }
                }, document.getElementById("velocidad_ordenamiento").value / 2)
            }, i * document.getElementById("velocidad_ordenamiento").value)
        }
    }

    ordenamiento_burbuja(){
        this.pruebas_animacion();
    }

    componentDidMount(){
        this.formatearArreglo()
        document.getElementById('boton_arreglo_aleatorio').onclick = () =>{
            this.formatearArreglo();
        }
        document.getElementById('elementos_range').addEventListener("input", () =>{
            this.formatearArreglo();
            document.getElementById('elementos_text').value = 
                    document.getElementById('elementos_range').value;
        })
        const iniciar_ordenamiento = document.getElementById('iniciar_ordenamiento');
        iniciar_ordenamiento.addEventListener("click", () =>{
            iniciar_ordenamiento.disabled = true;
            iniciar_ordenamiento.classList.add("disabled");
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
        const {arreglo} = this.state;
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