$(document).ready(function () {

    // Función para limpiar el formulario
    function clearForm() {
        $('#formUsuarios')[0].reset(); // Resetea todos los campos del formulario
        // Elimina las clases de validación y mensajes de feedback
        $('.form-control').removeClass('is-invalid is-valid');
        $('.invalid-feedback').text('');
    }

    // Función para validar el formato de email
    function isValidEmail(email) {
        // Expresión regular para validar el formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para validar el formato de fecha dd/MM/yyyy
    function isValidDate(dateString) {
        // Expresión regular para el formato dd/MM/yyyy
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(dateString)) {
            return false;
        }

        const parts = dateString.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        // Crea un objeto Date. El mes es 0-indexado en JavaScript (0 para Enero, 11 para Diciembre)
        const date = new Date(year, month - 1, day);

        // Comprueba si los valores de día, mes y año coinciden con los de la fecha creada
        // Esto valida si la fecha es real (ej. no 31 de Febrero)
        return date.getFullYear() === year &&
               date.getMonth() === month - 1 &&
               date.getDate() === day;
    }

    // Función para validar todos los campos del formulario
    function validateForm() {
        let isValid = true; // Bandera para saber si todo el formulario es válido

        // Validar Nombre
        const inputNombre = $('#inputNombre');
        const feedbackNombre = $('#feedbackNombre');
        if (inputNombre.val().trim() === '') {
            inputNombre.addClass('is-invalid').removeClass('is-valid');
            feedbackNombre.text('El Nombre es requerido.');
            isValid = false;
        } else {
            inputNombre.addClass('is-valid').removeClass('is-invalid');
            feedbackNombre.text('');
        }

        // Validar Usuario
        const inputUsuario = $('#inputUsuario');
        const feedbackUsuario = $('#feedbackUsuario');
        if (inputUsuario.val().trim() === '') {
            inputUsuario.addClass('is-invalid').removeClass('is-valid');
            feedbackUsuario.text('El Usuario es requerido.');
            isValid = false;
        } else {
            inputUsuario.addClass('is-valid').removeClass('is-invalid');
            feedbackUsuario.text('');
        }

        // Validar Fecha Ingreso
        const inputFechaIngreso = $('#inputFechaIngreso');
        const feedbackFechaIngreso = $('#feedbackFechaIngreso');
        if (inputFechaIngreso.val().trim() === '') {
            inputFechaIngreso.addClass('is-invalid').removeClass('is-valid');
            feedbackFechaIngreso.text('La Fecha de Ingreso es requerida.');
            isValid = false;
        } else if (!isValidDate(inputFechaIngreso.val().trim())) {
            inputFechaIngreso.addClass('is-invalid').removeClass('is-valid');
            feedbackFechaIngreso.text('Formato de fecha inválido. Use dd/MM/yyyy.');
            isValid = false;
        } else {
            inputFechaIngreso.addClass('is-valid').removeClass('is-invalid');
            feedbackFechaIngreso.text('');
        }

        // Validar Email
        const inputEmail = $('#inputEmail');
        const feedbackEmail = $('#feedbackEmail');
        if (inputEmail.val().trim() === '') {
            inputEmail.addClass('is-invalid').removeClass('is-valid');
            feedbackEmail.text('El Email es requerido.');
            isValid = false;
        } else if (!isValidEmail(inputEmail.val().trim())) {
            inputEmail.addClass('is-invalid').removeClass('is-valid');
            feedbackEmail.text('Formato de email inválido.');
            isValid = false;
        } else {
            inputEmail.addClass('is-valid').removeClass('is-invalid');
            feedbackEmail.text('');
        }

        // Género y Sitio Web no requieren validación de contenido, solo se pueden marcar como válidos si se desea
        // const inputSitioWeb = $('#inputSitioWeb');
        // if (inputSitioWeb.val().trim() !== '') {
        //     inputSitioWeb.addClass('is-valid').removeClass('is-invalid');
        // } else {
        //     inputSitioWeb.removeClass('is-valid is-invalid');
        // }

        // const selectGenero = $('#selectGenero');
        // if (selectGenero.val() !== '') {
        //     selectGenero.addClass('is-valid').removeClass('is-invalid');
        // } else {
        //     selectGenero.removeClass('is-valid is-invalid');
        // }


        return isValid;
    }

    // Evento para el botón Cancelar
    $('#btnCancelar').on('click', function() {
        clearForm();
    });

    // Evento para el envío del formulario (botón Guardar)
    $('#formUsuarios').on('submit', function(event) {
        event.preventDefault(); // Evita el envío por defecto del formulario

        if (validateForm()) {
            // Si el formulario es válido, simula el envío de datos
            // Muestra el modal de éxito
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            clearForm(); // Limpia el formulario después de la simulación de envío exitoso
        } else {
            console.log('Formulario inválido. Por favor, corrige los errores.');
            // Opcional: podrías mostrar un mensaje de error general si el formulario es inválido
        }
    });

    // Añadir validación en tiempo real al escribir o cambiar campos
    $('#inputNombre, #inputUsuario, #inputFechaIngreso, #inputEmail').on('input change', function() {
        // Vuelve a validar el campo específico para actualizar su estado
        validateForm(); // Llama a la validación completa para actualizar todos los estados
    });
});
