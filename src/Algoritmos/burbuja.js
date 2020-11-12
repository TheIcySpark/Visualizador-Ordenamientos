export function burbuja(arreglo){
    const copia_arreglo = [...arreglo];
    const animaciones = []
    let intercambio = false;
    for(var i = 0; i < copia_arreglo.length; i++){
        intercambio = false;
        for(var j = 1; j < copia_arreglo.length-i; j++){
            if(copia_arreglo[j - 1] > copia_arreglo[j]){
                animaciones.push({'a': j-1, 'b': j, 'intercambiar': true});
                let aux = copia_arreglo[j-1];
                copia_arreglo[j-1] = copia_arreglo[j];
                copia_arreglo[j] = aux;
                intercambio = true;
            }else{
                animaciones.push({'a': j-1, 'b': j, 'intercambiar': false});
            }
        }
        if(!intercambio) break;
    }
    return animaciones;
}