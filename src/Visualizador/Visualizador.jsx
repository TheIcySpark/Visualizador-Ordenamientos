import React from 'react';
import "./Visualizador.css";
import {burbuja} from '../Algoritmos/burbuja.js'
import {seleccion} from '../Algoritmos/seleccion.js'
import {insercion} from '../Algoritmos/insercion.js'
import {merge} from '../Algoritmos/merge.js'
import {quick} from '../Algoritmos/quick.js'

export default class Visualizador extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            arreglo: [],
            timers: [],
        };
    }

    ordenamiento_finalizado(){
        const barras = document.getElementsByClassName("barraArreglo");
        for(let i = 0; i < barras.length; i++){
            this.state.timers.push(setTimeout(() =>{
                barras[i].style.backgroundColor = '#2E8B57';
                if(i == barras.length - 1){
                    document.getElementById("boton_detener_ordenamiento").disabled = true;
                    document.getElementById("boton_arreglo_aleatorio").disabled = false;
                    document.getElementById("rango_elementos").disabled = false;
                    document.getElementById('boton_iniciar_ordenamiento').disabled = false;
                    document.getElementById('seleccion_algoritmo_ordenamiento').disabled = false;
                    this.state.timers = [];
                }
            }, i * 10))
        }
    }

    mostrar_animaciones(animaciones){
        const barras = document.getElementsByClassName("barraArreglo")
        let velocidad_ordenamiento = document.getElementById("velocidad_ordenamiento").value;
        let maxima_velocidad_ordenamiento = document.getElementById("velocidad_ordenamiento").max;
        velocidad_ordenamiento = Math.abs(velocidad_ordenamiento - maxima_velocidad_ordenamiento) + 1;
        for(let i = 0; i < animaciones.length ; i++){
            this.state.timers.push(setTimeout(() =>{
                barras[animaciones[i].p1].style.backgroundColor = '#80ced6';
                barras[animaciones[i].p2].style.backgroundColor = '#80ced6';
                setTimeout(() =>{
                    barras[animaciones[i].p1].style.backgroundColor = '#c83349';
                    barras[animaciones[i].p2].style.backgroundColor = '#c83349';
                    barras[animaciones[i].p1].style.height = `${animaciones[i].vp1}px`
                    barras[animaciones[i].p2].style.height = `${animaciones[i].vp2}px`

                    this.state.arreglo[animaciones[i].p1] = animaciones[i].vp1;
                    this.state.arreglo[animaciones[i].p2] = animaciones[i].vp2;
                    if(i == animaciones.length - 1) this.ordenamiento_finalizado();
                }, velocidad_ordenamiento / 2);
            }, i * velocidad_ordenamiento));
        }
    }

    agregar_Event_listeners(){
        let seleccion_algoritmo_ordenamiento = document.getElementById('seleccion_algoritmo_ordenamiento');
        let velocidad_ordenamiento = document.getElementById("velocidad_ordenamiento");
        let boton_arreglo_aleatorio = document.getElementById('boton_arreglo_aleatorio');
        let rango_elementos = document.getElementById('rango_elementos');
        let boton_detener_ordenamiento = document.getElementById('boton_detener_ordenamiento');
        let texto_elementos = document.getElementById('texto_elementos');
        let boton_iniciar_ordenamiento = document.getElementById("boton_iniciar_ordenamiento");
        boton_arreglo_aleatorio.onclick = () =>{
            this.formatearArreglo();
        }
        velocidad_ordenamiento.addEventListener("change", () =>{
                let reiniciar = this.state.timers.length > 0;
                this.detener_ordenamiento();
                if(reiniciar){
                    let boton_arreglo_aleatorio = document.getElementById('boton_arreglo_aleatorio');
                    let rango_elementos = document.getElementById('rango_elementos');
                    let boton_detener_ordenamiento = document.getElementById('boton_detener_ordenamiento');
                    let boton_iniciar_ordenamiento = document.getElementById("boton_iniciar_ordenamiento");

                    boton_detener_ordenamiento.disabled = true;
                    boton_arreglo_aleatorio.disabled = true;
                    rango_elementos.disabled = true;
                    boton_iniciar_ordenamiento.disabled = true;
                    seleccion_algoritmo_ordenamiento.disabled = true;
                    
                    this.state.timers.push(setTimeout(() =>{
                        this.iniciar_ordenamiento();
                    }, 1100))
                }
        })
        rango_elementos.addEventListener("input", () =>{
            this.formatearArreglo();
            texto_elementos.value = 
                    rango_elementos.value;
        });
        boton_detener_ordenamiento.addEventListener("click", () =>{
            this.detener_ordenamiento();
        });

        boton_iniciar_ordenamiento.addEventListener("click", () =>{
            this.iniciar_ordenamiento();
        })
    }

    iniciar_ordenamiento(){
        let seleccion_algoritmo_ordenamiento = document.getElementById('seleccion_algoritmo_ordenamiento');
        let boton_arreglo_aleatorio = document.getElementById('boton_arreglo_aleatorio');
        let rango_elementos = document.getElementById('rango_elementos');
        let boton_detener_ordenamiento = document.getElementById('boton_detener_ordenamiento');
        let boton_iniciar_ordenamiento = document.getElementById("boton_iniciar_ordenamiento");

        boton_detener_ordenamiento.disabled = false;
        boton_arreglo_aleatorio.disabled = true;
        rango_elementos.disabled = true;
        boton_iniciar_ordenamiento.disabled = true;
        seleccion_algoritmo_ordenamiento.disabled = true;
        
        switch(seleccion_algoritmo_ordenamiento.value){
            case 'burbuja':
                this.mostrar_animaciones(burbuja(this.state.arreglo));
                break;
            case 'seleccion':
                this.mostrar_animaciones(seleccion(this.state.arreglo));
                break
            case 'insecion':
                this.mostrar_animaciones(insercion(this.state.arreglo));
                break;
            case 'merge':
                this.mostrar_animaciones(merge(this.state.arreglo));
                break;
            case 'quick':
                this.mostrar_animaciones(quick(this.state.arreglo));
                break;
        }
    }

    detener_ordenamiento(){
        let seleccion_algoritmo_ordenamiento = document.getElementById('seleccion_algoritmo_ordenamiento');
        let boton_arreglo_aleatorio = document.getElementById('boton_arreglo_aleatorio');
        let rango_elementos = document.getElementById('rango_elementos');
        let boton_detener_ordenamiento = document.getElementById('boton_detener_ordenamiento');
        let boton_iniciar_ordenamiento = document.getElementById("boton_iniciar_ordenamiento");
        for(let i = 0; i < this.state.timers.length; i++){
            clearTimeout(this.state.timers[i]);
        }
        this.state.timers = [];
        boton_detener_ordenamiento.disabled = true;
        boton_arreglo_aleatorio.disabled = false;
        rango_elementos.disabled = false;
        boton_iniciar_ordenamiento.disabled = false;
        seleccion_algoritmo_ordenamiento.disabled = false;
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