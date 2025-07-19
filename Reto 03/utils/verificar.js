export function verificarNumText(texto) {
    
    const numero = Number(texto);

    if (!isNaN(numero)) {
        return true;
    }

    return false;
}