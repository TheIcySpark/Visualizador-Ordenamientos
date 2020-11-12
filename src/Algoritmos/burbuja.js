export function burbuja(arreglo){
    const copia_arreglo = [...arreglo];
    const animaciones = []
    let intercambio = false;
    let animacion = {};
    for(var i = 0; i < copia_arreglo.length; i++){
        intercambio = false;
        for(var j = 1; j < copia_arreglo.length-i; j++){
            animacion = {};
            if(copia_arreglo[j - 1] > copia_arreglo[j]){
                animacion.p1 = j - 1;
                animacion.vp1 = copia_arreglo[j];
                animacion.p2 = j;
                animacion.vp2 = copia_arreglo[j-1];
                animaciones.push(animacion);

                [copia_arreglo[j], copia_arreglo[j-1]] = [copia_arreglo[j-1], copia_arreglo[j]]
                intercambio = true;
            }else{
                animacion.p1 = j-1;
                animacion.vp1 = copia_arreglo[j-1];
                animacion.p2 = j;
                animacion.vp2 = copia_arreglo[j];
                animaciones.push(animacion);
            }
        }
        if(!intercambio) break;
    }
    return animaciones;
}