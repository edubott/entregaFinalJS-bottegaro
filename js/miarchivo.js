let ejecutarSimuladorBtn = document.getElementById("ejecutar-simulador");
let resultado = document.getElementById("resultado");

ejecutarSimuladorBtn.addEventListener("click", ejecutarSimulador);

function ejecutarSimulador() {
  resultado.innerText = "";

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

  porcentaje = calcularPorcentaje(porcentaje, cuotas);
  montoFinal = calcularMontoFinal(importe, porcentaje);
  valorCuota = calcularValorCuota(montoFinal, cuotas);

  resultado.innerText = `Usuario: ${usuario}, su valor de cuota es: ${valorCuota}`;
}

function calcularPorcentaje(porcentaje, cuotas) {
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
  return porcentaje;
}

function calcularMontoFinal(importe, porcentaje) {
  return parseInt(importe) + importe * (porcentaje / 100);
}

function calcularValorCuota(montoFinal, cuotas) {
  return montoFinal / cuotas;
}
