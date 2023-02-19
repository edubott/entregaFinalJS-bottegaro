let registrosJson;
let registros;

let ejecutarSimuladorBtn = document.getElementById("ejecutar-simulador");
let tBodyRegistros = document.getElementById("registros");
let btnLimpiarRegistros = document.getElementById("limpiar-registros");
let btnLimpiarUltimoRegistro = document.getElementById(
  "limpiar-ultimo-registro"
);
let formSimulador = document.getElementById("form-simulador");
let alertaRegistroExitoso = document.getElementById("registro-exitoso");
let alertaSinRegistros = document.getElementById("sin-registros");

formSimulador.addEventListener("submit", ejecutarSimulador);
btnLimpiarRegistros.addEventListener("click", limpiarRegistros);
btnLimpiarUltimoRegistro.addEventListener("click", limpiarUltimoRegistro);

obtenerJson("./db.json")
  .then((data) => {
    registrosJson = data;
    let registrosLocalStorage = obtenerDatosLocalStorage();

    if (registrosLocalStorage) {
      let ids = new Set(registrosJson.map((registro) => registro.id));
      registros = [
        ...registrosJson,
        ...registrosLocalStorage.filter((registro) => !ids.has(registro.id)),
      ];
    }
    cargarTablaRegistros(registros);
    localStorage.setItem("registros", JSON.stringify(registros));
  })
  .catch((error) => console.log(error));

function ejecutarSimulador(event) {
  event.preventDefault();
  let usuario = document.getElementById("usuario").value;
  let producto = document.getElementById("producto").value;
  let importe = parseInt(document.getElementById("importe").value);
  let cuotas = parseInt(document.getElementById("cuotas").value);
  let porcentaje = 0;
  let montoFinal = 0;
  let valorCuota = 0;
  let ultimoRegistro = registros.at(-1);

  porcentaje = calcularPorcentaje(porcentaje, cuotas);
  montoFinal = calcularMontoFinal(importe, porcentaje);
  valorCuota = calcularValorCuota(montoFinal, cuotas);

  const registro = {
    id: ultimoRegistro.id + 1,
    usuario: usuario,
    producto: producto,
    importe: importe,
    cuotas: cuotas,
    interes: porcentaje,
    montoFinal: montoFinal,
    valorCuota: valorCuota,
  };

  registros.push(registro);

  localStorage.setItem("registros", JSON.stringify(registros));
  mostrarAlerta(alertaRegistroExitoso);
  cargarTablaRegistros(registros);
  limpiarFormulario();
}

function limpiarRegistros() {
  if (registros.length === 0) {
    mostrarAlerta(alertaSinRegistros);
  } else {
    registros = [];
    localStorage.removeItem("registros");
    tBodyRegistros.innerHTML = "";
  }
}

function limpiarUltimoRegistro() {
  if (registros.length === 0) {
    mostrarAlerta(alertaSinRegistros);
  } else {
    registros.pop();
    localStorage.setItem("registros", JSON.stringify(registros));
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

function obtenerDatosLocalStorage() {
  let datos = localStorage.getItem("registros");
  if (datos) {
    return JSON.parse(datos);
  } else {
    return [];
  }
}

async function obtenerJson(url) {
  const response = await fetch(url);
  return await response.json();
}

function limpiarFormulario() {
  document.getElementById("usuario").value = "";
  document.getElementById("producto").value = "";
  document.getElementById("importe").value = "";
  document.getElementById("cuotas").value = "3";
}

function mostrarAlerta(alerta) {
  alerta.style.display = "inline";
  setTimeout(() => {
    alerta.style.display = "none";
  }, 1500);
}
