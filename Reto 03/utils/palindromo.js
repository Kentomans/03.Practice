import { invertirCadena } from "./invertir.js";

export function palindromo(texto) {

    const getInvertido = invertirCadena(texto);

    if(getInvertido === texto){
        return true
    }else{
        return false
    };
   
}