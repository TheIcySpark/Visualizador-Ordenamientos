var copia_arreglo = [];
var animaciones = [];
var animacion = {};
export function quick(arreglo){
    copia_arreglo = [...arreglo];
    animaciones = [];
    quick_sort(0, copia_arreglo.length - 1);
    return animaciones;
}

function quick_sort(ini, fin){
    if(fin <= ini || ini >= fin) return;
    let pivote = fin;
    let posicion_actual = ini;
    while(posicion_actual < pivote){
        animacion = {};
        animacion.p1 = pivote;
        animacion.vp1 = copia_arreglo[pivote];
        animacion.p2 = posicion_actual;
        animacion.vp2 = copia_arreglo[posicion_actual];
        animaciones.push(animacion);
        if (copia_arreglo[posicion_actual] > copia_arreglo[pivote]){
            animacion = {};
            animacion.p1 = pivote - 1;
            animacion.vp1 = copia_arreglo[posicion_actual];
            animacion.p2 = posicion_actual;
            animacion.vp2 = copia_arreglo[pivote - 1];
            animaciones.push(animacion);

            [copia_arreglo[pivote - 1], copia_arreglo[posicion_actual]] = [
                copia_arreglo[posicion_actual], copia_arreglo[pivote - 1]]
                
            animacion = {};
            animacion.p1 = pivote;
            animacion.vp1 = copia_arreglo[pivote - 1];
            animacion.p2 = pivote - 1;
            animacion.vp2 = copia_arreglo[pivote];
            animaciones.push(animacion);
            [copia_arreglo[pivote], copia_arreglo[pivote - 1]] = [
                    copia_arreglo[pivote - 1], copia_arreglo[pivote]]
            pivote --;
        }else{
            posicion_actual ++;
        }
    }
    quick_sort(ini, pivote - 1);
    quick_sort(pivote + 1, fin);
    
}