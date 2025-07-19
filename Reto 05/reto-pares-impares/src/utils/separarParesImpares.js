/**
 * Separa un array de números en pares e impares
 * @param {number[]} numeros - Array de números a separar
 * @returns {Object} Objeto con arrays pares e impares
 */
export function separarParesImpares(numeros) {
  const pares = numeros.filter(n =>n % 2 === 0);
  const impares = numeros.filter(n => n % 2 === 1);

  return { pares, impares};
}



export default separarParesImpares;