let usuario = prompt("Ingrese su nombre");

let importe = 0;

let cuotas = 0;

let porcentaje = 0;

let montoFinal = 0;

let valorCuota = 0;

do {
  importe = prompt("Ingrese importe");
} while (isNaN(importe));

do {
  cuotas = parseInt(prompt("Ingrese cantidad de cuotas: 3, 6, 12"));
} while (cuotas !== 3 && cuotas !== 6 && cuotas !== 12);

switch (cuotas) {
  case 3:
    porcentaje = 7;
    break;
  case 6:
    porcentaje = 10;
    break;
  case 12:
    porcentaje = 15;
    break;
  default:
    porcentaje = 0;
}
montoFinal = importe + (importe * porcentaje) / 100;

valorCuota = montoFinal / cuotas;
alert("El valor de su cuota es: " + valorCuota);
