$(document).ready(function () {
  $("#boton_Enviar").on("click", validarFormulario);
  $("#inputNombre").on("change", validarNombre);
  $('#inputRut').on('keypress',formatearRut);
});

function validarFormulario() {
  validarNombre();
}

function validarNombre() {
  if ($("#inputNombre").val() == "") {
    $("#inputNombre").addClass("is-invalid");
  } else {
    $("#inputNombre").removeClass("is-invalid");
  }
}

function formatearRut() {
  return /^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test($('#inputRut').val());
}