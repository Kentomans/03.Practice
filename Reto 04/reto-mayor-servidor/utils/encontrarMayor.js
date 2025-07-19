
export function encontrarMayor(numeros) {


    if (!Array.isArray(numeros)) {
        return { error: 'Se esperaba un array' };
    }

    const convertidos = [];
    const invalidos = [];


    for (let i = 0; i<numeros.length; i++) {
        const convertido = Number(numeros[i]);
        if (isNaN(convertido)) {
            invalidos.push(numeros[i]);
        }
        convertidos.push(convertido);
    }

    if(invalidos.length>0){
        return { error: `${invalidos} no es valido(s).` };
    }
    

    const mayor = Math.max(...convertidos);

    const mayOmen = [...convertidos].sort((a, b) => b - a);


    return {
        numeros: convertidos,
        mayor_A_menor: mayOmen,
        mayor,

    };
}



export default encontrarMayor;