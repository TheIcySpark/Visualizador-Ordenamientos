export function insercion(arreglo){
    const copia_arreglo = [...arreglo];
    const animaciones = [];
    let animacion = {};
    for(let i = 1; i < copia_arreglo.length; i++){
        if(copia_arreglo[i] < copia_arreglo[i - 1]){
            let pos = i;
            while(copia_arreglo[pos] < copia_arreglo[pos -1] &&
            pos >= 1){
                animacion = {};
                animacion.p1 = pos;
                animacion.vp1 = copia_arreglo[pos - 1];
                animacion.p2 = pos - 1;
                animacion.vp2 = copia_arreglo[pos];
                animaciones.push(animacion);

                [copia_arreglo[pos], copia_arreglo[pos - 1]] = [
                        copia_arreglo[pos - 1], copia_arreglo[pos]]
                pos--;
            }
        }else{
            animacion = {};
            animacion.p1 = i;
            animacion.vp1 = copia_arreglo[i];
            animacion.p2 = i - 1;
            animacion.vp2 = copia_arreglo[i - 1];
            animaciones.push(animacion);
        }
    }
    console.log(copia_arreglo);
    console.log(animaciones);

    return animaciones;
}