let ejecutarSimuladorBtn = document.getElementById("ejecutar-simulador");
let tBodyRegistros = document.getElementById("registros");
let btnLimpiarRegistros = document.getElementById("limpiar-registros");
let btnLimpiarUltimoRegistro = document.getElementById(
  "limpiar-ultimo-registro"
);

let registros = [];

ejecutarSimuladorBtn.addEventListener("click", ejecutarSimulador);
btnLimpiarRegistros.addEventListener("click", limpiarRegistros);
btnLimpiarUltimoRegistro.addEventListener("click", limpiarUltimoRegistro);

function ejecutarSimulador() {
  let usuario = prompt("Ingrese su nombre");
  let producto = prompt("Ingrese nombre producto");
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

  const registro = {
    usuario: usuario,
    producto: producto,
    importe: importe,
    cuotas: cuotas,
    interes: porcentaje,
    montoFinal: montoFinal,
    valorCuota: valorCuota,
  };

  registros.push(registro);

  cargarTablaRegistros(registros);
}

function limpiarRegistros() {
  if (registros.length === 0) {
    alert("No hay registros para eliminar");
  } else {
    registros = [];
    tBodyRegistros.innerHTML = "";
  }
}

function limpiarUltimoRegistro() {
  console.log("registros antes", registros);
  if (registros.length === 0) {
    alert("No hay registros para eliminar");
  } else {
    registros.pop();
    cargarTablaRegistros(registros);
  }
}

function cargarTablaRegistros(registros) {
  if (registros.length > 0) {
    tBodyRegistros.innerHTML = "";
    registros.forEach((registro) => {
      tBodyRegistros.innerHTML += `
                        <tr>
                          <td class="text-center"> ${registro.usuario} </td>
                          <td class="text-center"> ${registro.producto} </td>
                          <td class="text-center"> $${registro.importe} </td>
                          <td class="text-center"> ${registro.cuotas} </td>
                          <td class="text-center"> ${registro.interes}% </td>
                          <td class="text-center"> $${registro.montoFinal} </td>
                          <td class="text-center"> $${registro.valorCuota.toFixed(
                            2
                          )} </td>
                        </tr>`;
    });
  } else {
    tBodyRegistros.innerHTML = "";
  }
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
