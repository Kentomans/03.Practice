export function invertirCadena(texto) {
  // TODO: funcionalidad para invertir una cadena de texto
  
  const txt = texto.toLowerCase();
  const invertido = txt.split("").reverse().join("");

  return invertido;

}