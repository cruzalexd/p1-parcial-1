
let rokola = [];//Este objeto me va a guardar todo


//Prueba Fetch
fetch("discos.json")
.then(response => response.json())
.then(json => {
  if(json != undefined){
    /*this.libros = json;*/
    for(let dato of json){//Esto arregla la falla anterior
      rokola.push(new Disco(dato.nombre,dato.artista,dato.id,dato.portada, dato.pistas));
    }

  }
});

//FIN prueba Fetch




function cargarDisco(){
  //registrarDisco();
  let unDisco = new Disco();
  unDisco.registrarDisco();//Esto me llama al metodo registrar Disco, 
  //rokola.push(unDisco);
}

function mostrarDisco(){
  limpiarPantalla();
  for(let element of rokola){//Hice hasta aca.
    element.imprimirDisco();
  }
}

function limpiarPantalla(){
  document.getElementById("discos").innerHTML = "";//Limpia la pantalla
}