$(document).ready(function () {
  //new DataTable('#example');
  $('#example').DataTable({
    ajax:{
        url:'https://jsonplaceholder.typicode.com/users',
        dataSrc:''
    },
    columns:[
        {name:'id',data:'id'},
        {name:'Nombre',data:'name'},
        {name:'Usuario',data:'username'},
        {name:'Email',data:'email'},
        {name:'Teléfono',data:'phone'}
    ],
    language:{
        "emptyTable":"No hay datos disponibles",
        "search":"B&uacute;squeda: ",
        "info": "Mostrando _START_ al _END_ de _TOTAL_ datos",
        "infoFiltered":   "(filtrado de un total de _MAX_ datos)",
        "lengthMenu": 'Mostrar _MENU_ registros por p&aacute;gina',
        "loadingRecords": "Cargando...",
        "zeroRecords":    "No se han encontrado resultados",
        "infoEmpty":      "Mostrando 0 al 0 de 0 datos",
        "paginate": {
        "first":      "Primero",
        "last":       "&Uacute;ltimo",
        "next":       "Siguiente",
        "previous":   "Anterior"
    },
    }
  });
});