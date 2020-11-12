export function seleccion(arreglo){
    const copia_arreglo = [...arreglo];
    const animaciones = [];
    let animacion = {};
    let posicion_menor;
    for(let i = 0; i < copia_arreglo.length - 1; i++){
        posicion_menor = i;
        for(let j = i + 1; j < copia_arreglo.length; j++){
            animacion = {};
            animacion.p1 = j;
            animacion.vp1 = copia_arreglo[j];
            animacion.p2 = posicion_menor;
            animacion.vp2 = copia_arreglo[posicion_menor];
            animaciones.push(animacion);
            if(copia_arreglo[j] < copia_arreglo[posicion_menor]){
                posicion_menor = j;
            }
        }
        if(posicion_menor != i){
            animacion = {};
            animacion.p1 = i;
            animacion.vp1 = copia_arreglo[posicion_menor];
            animacion.p2 = posicion_menor;
            animacion.vp2 = copia_arreglo[i];
            animaciones.push(animacion);

            [copia_arreglo[i], copia_arreglo[posicion_menor]] = [
                    copia_arreglo[posicion_menor], copia_arreglo[i]]
        }
    }
    console.log(copia_arreglo)
    return animaciones;
}