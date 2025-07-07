$(document).ready(function () {
    // Event listeners
    $('#formUsuarios').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        validarFormulario();
    });

    $('#inputNombre').on('input', function() { validarCampo($(this), validarNombre, 'El Nombre es requerido.'); });
    $('#inputUsuario').on('input', function() { validarCampo($(this), validarUsuario, 'El Usuario es requerido.'); });
    $('#inputEmail').on('input', function() { validarCampo($(this), validarEmail, 'Email requerido y debe tener un formato válido.'); });
    $('#inputFechaIngreso').on('input', function() { validarCampo($(this), validarFechaIngreso, 'Fecha de Ingreso requerida y debe tener formato dd/MM/yyyy.'); });

    $('#btnCancelar').on('click', limpiarFormulario); // 

    // Initialize date picker if you decide to use jQuery UI DatePicker (optional)
    // For this example, we'll just use a text input and validate string.
    // If you want to use DatePicker, you would include its CSS and JS and uncomment below:
    // $('#inputFechaIngreso').datepicker({
    //     dateFormat: 'dd/mm/yy',
    //     onSelect: function() {
    //         validarCampo($(this), validarFechaIngreso, 'Fecha de Ingreso requerida y debe tener formato dd/MM/yyyy.');
    //     }
    // });
});

// Function to validate the entire form 
function validarFormulario() {
    let isValid = true;

    isValid = validarCampo($('#inputNombre'), validarNombre, 'El Nombre es requerido.') && isValid;
    isValid = validarCampo($('#inputUsuario'), validarUsuario, 'El Usuario es requerido.') && isValid;
    isValid = validarCampo($('#inputEmail'), validarEmail, 'Email requerido y debe tener un formato válido.') && isValid;
    isValid = validarCampo($('#inputFechaIngreso'), validarFechaIngreso, 'Fecha de Ingreso requerida y debe tener formato dd/MM/yyyy.') && isValid;
    // Gender and Website are not required, so no validation needed for them here.

    if (isValid) {
        // Simulate data submission 
        alert('Datos de usuario guardados correctamente (simulado).');
        // Optionally, clear the form after successful "submission"
        limpiarFormulario();
    } else {
        alert('Por favor, corrige los errores en el formulario.');
    }
}

// Helper function to apply/remove validation styles and messages 
function validarCampo(element, validationFunction, errorMessage) {
    const feedbackElement = element.next('.invalid-feedback'); // Assumes feedback is immediately after the input
    if (validationFunction(element.val())) {
        element.removeClass('is-invalid').addClass('is-valid');
        feedbackElement.text(''); // Clear previous error message
        return true;
    } else {
        element.removeClass('is-valid').addClass('is-invalid');
        feedbackElement.text(errorMessage);
        return false;
    }
}

// Validation functions [cite: 95, 96, 97, 98]
function validarNombre(nombre) {
    return nombre.trim() !== ''; // Required 
}

function validarUsuario(usuario) {
    return usuario.trim() !== ''; // Required 
}

function validarFechaIngreso(fecha) {
    // Required, format "dd/MM/yyyy" 
    if (fecha.trim() === '') {
        return false;
    }
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(fecha)) {
        return false;
    }
    // Optional: Further date validity check (e.g., valid day for month)
    const parts = fecha.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function validarEmail(email) {
    // Required, valid email structure 
    if (email.trim() === '') {
        return false;
    }
    // Basic email regex (can be made more robust if needed)
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Function to clear the form fields 
function limpiarFormulario() {
    $('#formUsuarios')[0].reset(); // Resets all form fields
    $('#formUsuarios input').removeClass('is-invalid is-valid'); // Clear validation styles
    $('#formUsuarios select').removeClass('is-invalid is-valid'); // Clear validation styles for select
    $('.invalid-feedback').text(''); // Clear all error messages
}