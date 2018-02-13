
//Funcion que nos muestra el formulario
function viewForm () {

    $('#imag').hide();
    document.getElementById('formulario_edit').setAttribute('style','visibility:visible');

}


//Funcion que nos envia los datos para crear
function enviardatos() {

    //creamos el fichero JSON
    var data = { 'nombre' : $('#name').val(), 'cores' : $('#cores').val(), 'memoria' : $('#memoria').val(), 'disco' : $('#disco').val() };
    var myJSON = JSON.stringify(data);

    //peticion AJAX POST
   $.ajax({
        type: "POST",
        dataType: 'json',
        url: 'https://appslim/slim/public/api.php/api/hosting/agregar',
        data: myJSON,
        success: function(response) {
        },
        error: function(response) {
            alert(JSON.stringify(response));
        }
    });


}


//Funcion que nos lista los hostins
function listaDatos() {

    $('#imag').hide();
    //peticion get y mostramos la lista
    $.ajax({
        url: "https://appslim/slim/public/api.php/api/hostings",
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            for (var i = 0; i < res.length; i += 1) {
                var id = res[i]["id"];
                var nombre = res[i]["nombre"];
                var cores = res[i]["cores"];
                var memoria = res[i]["memoria"];
                var disco = res[i]["disco"];
                //mostramos elementos
                document.write('<li>'+' ID: '+id+' NAME: ' + nombre + ' CORES: ' + cores + ' RAM:' + memoria + ' DISCO:' + disco + '</li></br>');
            }
        }
    });

}

//Funcion que muestra el formularo de delete
function deleteEntry() {

    $('#imag').hide();
    document.getElementById('delete_form').setAttribute('style', 'visibility:visible');
}


//funcion que elimina el registro segun la id
function delteentry() {


    //obtenermos el id
    var id = document.getElementById('id-del').value;

    //Si la id no esta vacia
    if(id==''){
        alert("id is empty");
    }else{
      $.ajax({
          type : "DELETE",
          url : "https://appslim/slim/public/api.php/api/hostings/borrar/"+id,
          success: function(resultMsg){
              alert("delete id:  "+id+" DONE");
              $('#delete_form').hide();

          },
          error : function(e) {
              alert("ERROR: ", e);
              console.log("ERROR: ", e);
          }
      });

    }

}

//mostramos el formulario delete modificado
function viewEdit() {

    $('#imag').hide();
    //mostrar id
    $('#formulario_edit').hide();
    document.getElementById('delete_form').setAttribute('style', 'visibility:visible');
    //valor button nuevo
    document.getElementById('button_del').innerHTML="EDIT";
    //valor al onclick
    document.getElementById("button_del").onclick = function() {editHosting()};
}


//Mostramos el formulario crear modificado para editar
function editHosting() {

    //mostramos el fom alta-edit y ocultamos el otro
    document.getElementById('formulario_edit').setAttribute('style','visibility:visible');
    $('#delete_form').hide();

    //valor nuevo al boton enviar
    document.getElementById('newedit').innerHTML="EDIT";
    document.getElementById("newedit").onclick = function() {buttonEditHosting()};


}



//funcion que envia la edicion
function buttonEditHosting() {


    //obtenmos el valor del button
    var val=$('#id-del').val();


    //obtenemos datos
    var data = { 'nombre' : $('#name').val(), 'cores' : $('#cores').val(), 'memoria' : $('#memoria').val(), 'disco' : $('#disco').val() };
    var myJSON = JSON.stringify(data);

    //peticion put
    $.ajax({
        url: "https://appslim/slim/public/api.php/api/hostings/actualizar/"+val,
        type: 'PUT',
        data: myJSON,
        dataType: 'json',
        success: function(result) {

        }
    });

    $('#formulario_edit').hide();
    resetButton();


}
//volvemos los botones a su valor original
function resetButton() {
    //valor nuevo al boton enviar
    //valor button nuevo
    document.getElementById('button_del').innerHTML="DELETE";
    document.getElementById("button_del").onclick = function() {delteentry()};
    document.getElementById('newedit').innerHTML="SEND";
    document.getElementById("newedit").onclick = function() {enviardatos()};

}