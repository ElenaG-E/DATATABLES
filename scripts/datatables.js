$(document).ready(function () {
    let dataTableInstance = null; // Variable para almacenar la instancia de DataTables
    let selectedDataType = 'users'; // Valor por defecto para el tipo de datos a cargar inicialmente

    // Función para cargar datos de usuarios desde la API
    function cargarUsuarios() {
        $.get('https://jsonplaceholder.typicode.com/users', function (data) {
            // Mapea los datos de la API a un formato de fila para la tabla
            const rows = data.map(u => [
                u.id,
                u.name,
                u.username,
                u.email,
                u.website
            ]);
            // Actualiza la tabla con las cabeceras y filas de usuarios
            actualizarTabla(['ID', 'Nombre', 'Usuario', 'Email', 'Sitio Web'], rows);
        }).fail(function() {
            // Manejo de errores si la carga falla
            console.error("Error al cargar usuarios.");
            // Aquí se podría mostrar un mensaje de error al usuario en la interfaz
        });
    }

    // Función para cargar datos de publicaciones desde la API
    // URL: https://jsonplaceholder.typicode.com/posts
    function cargarPosts() {
        $.get('https://jsonplaceholder.typicode.com/posts', function (data) {
            // Mapea los datos de la API a un formato de fila para la tabla
            const rows = data.map(p => [
                p.id,
                p.title,
                p.userId,
                p.body,
                '' // Columna vacía según el diseño de la imagen
            ]);
            // Actualiza la tabla con las cabeceras y filas de publicaciones
            actualizarTabla(['ID', 'Título', 'ID Usuario', 'Contenido', ''], rows);
        }).fail(function() {
            console.error("Error al cargar publicaciones.");
        });
    }

    // Función para cargar datos de comentarios desde la API
    // URL: https://jsonplaceholder.typicode.com/comments
    function cargarComentarios() {
        $.get('https://jsonplaceholder.typicode.com/comments', function (data) {
            // Mapea los datos de la API a un formato de fila para la tabla
            const rows = data.map(c => [
                c.id,
                c.name,
                c.email,
                c.body,
                '' // Columna vacía según el diseño de la imagen
            ]);
            // Actualiza la tabla con las cabeceras y filas de comentarios
            actualizarTabla(['ID', 'Nombre', 'Email', 'Comentario', ''], rows);
        }).fail(function() {
            console.error("Error al cargar comentarios.");
        });
    }

    // Función principal para actualizar la tabla con nuevos datos
    function actualizarTabla(headers, rows) {
        // Si ya existe una instancia de DataTables, la destruye para poder re-inicializarla
        if (dataTableInstance) {
            dataTableInstance.destroy();
            dataTableInstance = null; // Limpiar la instancia existente
        }

        // Vacía las cabeceras y el cuerpo actual de la tabla
        $('#tablaDatos thead').empty();
        $('#tablaDatos tbody').empty();

        // Construye las nuevas cabeceras de la tabla a partir del array 'headers'
        let ths = headers.map(h => `<th>${h}</th>`).join('');
        $('#tablaDatos thead').append(`<tr>${ths}</tr>`);

        // Llena el cuerpo de la tabla con las filas de datos
        rows.forEach(row => {
            let tds = row.map(d => `<td>${d}</td>`).join('');
            $('#tablaDatos tbody').append(`<tr>${tds}</tr>`);
        });

        // Inicializar DataTables con las opciones deseadas
        dataTableInstance = $('#tablaDatos').DataTable({
            paging: true,      // Habilita la paginación de la tabla
            searching: false,   // Deshabilita la barra de búsqueda
            info: false,        // Deshabilita la información de la tabla (ej. "Mostrando X de Y entradas")
            ordering: true,    // Habilita el ordenamiento de columnas al hacer clic en las cabeceras
            autoWidth: false,  // Deshabilita el ajuste automático del ancho de columna
            responsive: true,  // Habilita la responsividad de la tabla
            // Configuración del DOM para mostrar solo la tabla y la paginación en la parte inferior
            // 'r' es el procesamiento, 't' es la tabla, 'p' es la paginación
            dom: 'rt<"bottom"p><"clear">' // Eliminado 'f' (filtro/búsqueda), 'l' (selector de longitud) e 'i' (información)
        });
    }

    // Función para manejar la carga de datos según el tipo seleccionado (usuarios, posts, comentarios)
    function cargarDatosTabla(tipo) {
        if (tipo === 'users') {
            cargarUsuarios();
        } else if (tipo === 'posts') {
            cargarPosts();
        } else if (tipo === 'comments') {
            cargarComentarios();
        }
    }

    // Maneja la selección de un elemento en el dropdown
    $('.dropdown-item').on('click', function(e) {
        e.preventDefault(); // Previene el comportamiento por defecto del enlace (navegar)
        selectedDataType = $(this).data('value'); // Obtiene el valor del atributo 'data-value'
        $('#dropdownMenuButton').text($(this).text()); // Cambia el texto visible del botón del dropdown al elemento seleccionado
        // Opcional: podrías querer cargar los datos automáticamente al seleccionar una opción
        // cargarDatosTabla(selectedDataType);
    });

    // Evento click para el botón "Cargar Datos"
    $('#btnCargar').click(function () {
        // Llama a la función para cargar los datos basándose en el tipo seleccionado en el dropdown
        cargarDatosTabla(selectedDataType);
    });

    // Carga los datos de usuarios por defecto al cargar la página por primera vez
    cargarDatosTabla(selectedDataType);
});
