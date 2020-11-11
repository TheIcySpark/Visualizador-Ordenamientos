import React from 'react';
import "./Visualizador.css";
import {burbuja} from '../Algoritmos/burbuja.js'

export default class Visualizador extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            arreglo: [],
            timers: []
        };
    }

    ordenamiento_finalizado(color_final){
        const barras = document.getElementsByClassName("barraArreglo");
        for(let i = 0; i < barras.length; i++){
            this.state.timers.push(setTimeout(() =>{
                barras[i].style.backgroundColor = color_final;
                if(i == barras.length - 1){
                    document.getElementById("boton_detener_ordenamiento").disabled = true;
                    document.getElementById("boton_arreglo_aleatorio").disabled = false;
                    document.getElementById("rango_elementos").disabled = false;
                    document.getElementById('boton_iniciar_ordenamiento').disabled = false;
                    this.state.timers = [];
                }
            }, i * 10))
        }
    }

    mostrar_animaciones(animaciones, color_comparacion, color_sin_comparacion, color_final){
        const barras = document.getElementsByClassName("barraArreglo")
        for(let i = 0; i < animaciones.length ; i++){
            this.state.timers.push(setTimeout(() =>{
                barras[animaciones[i].b].style.backgroundColor = color_comparacion;
                barras[animaciones[i].a].style.backgroundColor = color_comparacion;
                setTimeout(() =>{
                    barras[animaciones[i].b].style.backgroundColor = color_sin_comparacion;
                    barras[animaciones[i].a].style.backgroundColor = color_sin_comparacion;
                    if(animaciones[i].intercambiar){
                        [barras[animaciones[i].a].style.height , barras[animaciones[i].b].style.height] =
                                [barras[animaciones[i].b].style.height ,
                                barras[animaciones[i].a].style.height]

                        let aux = this.state.arreglo[animaciones[i].b];
                        this.state.arreglo[animaciones[i].b] = this.state.arreglo[animaciones[i].a];
                        this.state.arreglo[animaciones[i].a] = aux
                    }
                    if(i == animaciones.length - 1){
                        this.ordenamiento_finalizado(color_final);
                    }
                }, document.getElementById("velocidad_ordenamiento").value / 2);
            }, i * document.getElementById("velocidad_ordenamiento").value));
        }
    }

    agregar_Event_listeners(){
        let boton_arreglo_aleatorio = document.getElementById('boton_arreglo_aleatorio');
        let rango_elementos = document.getElementById('rango_elementos');
        let boton_detener_ordenamiento = document.getElementById('boton_detener_ordenamiento');
        let texto_elementos = document.getElementById('texto_elementos');
        let boton_iniciar_ordenamiento = document.getElementById("boton_iniciar_ordenamiento");
        boton_arreglo_aleatorio.onclick = () =>{
            this.formatearArreglo();
        }
        rango_elementos.addEventListener("input", () =>{
            this.formatearArreglo();
            texto_elementos.value = 
                    rango_elementos.value;
        });
        boton_detener_ordenamiento.addEventListener("click", () =>{
            for(let i = 0; i < this.state.timers.length; i++){
                clearTimeout(this.state.timers[i]);
            }
            this.state.timers = [];
            boton_detener_ordenamiento.disabled = true;
            boton_arreglo_aleatorio.disabled = false;
            rango_elementos.disabled = false;
            boton_iniciar_ordenamiento.disabled = false;
        });
        boton_iniciar_ordenamiento.addEventListener("click", () =>{
            boton_detener_ordenamiento.disabled = false;
            boton_arreglo_aleatorio.disabled = true;
            rango_elementos.disabled = true;
            boton_iniciar_ordenamiento.disabled = true;
            
            const algoritmo = document.getElementById('seleccion_algoritmo_ordenamiento').value;
            switch(algoritmo){
                case 'burbuja':
                    this.mostrar_animaciones(burbuja(this.state.arreglo), "blue", "red", "green");
                    break;
                default:
                    break;
            }
        })
    }

    componentDidMount(){
        this.formatearArreglo()
        this.agregar_Event_listeners();
    }

    formatearArreglo(){
        const arreglo = [];
        this.setState({arreglo});
        const tam = document.getElementById('rango_elementos').value;
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