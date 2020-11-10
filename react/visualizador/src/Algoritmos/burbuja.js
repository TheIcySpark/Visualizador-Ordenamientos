export function burbuja(arreglo){
    const copia_arreglo = arreglo;
    const animaciones = []
    for(var i = 0; i < copia_arreglo.length; i++){
        for(var j = 1; j < copia_arreglo.length-i; j++){
            if(copia_arreglo[j - 1] > arreglo[j]){
                animaciones.push({'a': j-1, 'b': j, 'intercambiar': true});
                [copia_arreglo[j-1], copia_arreglo[j]] = [copia_arreglo[j], copia_arreglo[j-1]]
            }else{
                animaciones.push({'a': j-1, 'b': j, 'intercambiar': false});
            }
        }
    }
    return animaciones;
}