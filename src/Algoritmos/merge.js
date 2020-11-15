var copia_arreglo = [];
var animaciones = [];
var animacion = {};
export function merge(arreglo){
    copia_arreglo = [...arreglo];
    animaciones = []
    merge_sort(0, copia_arreglo.length - 1);
    return animaciones;
}

function merge_sort(ini, fin){
    if(ini == fin) return;
    let m = parseInt((ini + fin) / 2);
    merge_sort(ini, m);
    merge_sort(m + 1, fin);
    let arreglo_auxiliar = [];
    let a = ini;
    let b = m + 1;
    while(a <= m && b <= fin){
        if(copia_arreglo[a] <= copia_arreglo[b]) arreglo_auxiliar.push(copia_arreglo[a++]);
        else arreglo_auxiliar.push(copia_arreglo[b++]);
    }
    while(a <= m) arreglo_auxiliar.push(copia_arreglo[a++]);
    while(b <= fin) arreglo_auxiliar.push(copia_arreglo[b++]);

    let pos = 0
    for(let i = ini; i <= fin; i++){
        copia_arreglo[i] = arreglo_auxiliar[pos++];
        animacion = {};
        animacion.p1 = i;
        animacion.vp1 = copia_arreglo[i];
        animacion.p2 = i;
        animacion.vp2 = copia_arreglo[i];
        animaciones.push(animacion);
    }
}