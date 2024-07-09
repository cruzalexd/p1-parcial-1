class Disco {
  /**
   * @param Clase Disco
   * @param {string} nombre del album o disco
   * @param {string} autor o banda
   * @param {number} codigo unico del disco
   * @param {cancion} Tipo de dato cancion	
   */
  constructor(nombre, autor, numero, portada, pistas) {
    this.nombreDisco = nombre;
    this.autorDisco = autor;
    this.codigoDisco = numero;
    this.portada = portada;
    this.pistas = pistas;
  }




  registrarDisco() {

    let nombreDisco;
    do {
      nombreDisco = prompt("Ingrese el 'Nombre' del disco");
    } while (this.validarString(nombreDisco));

    let autorDisco;
    do {
      autorDisco = prompt("Ingrese el nombre del autor del disco");
    } while (this.validarString(autorDisco));

    let codigoDisco;
    do {
      codigoDisco = parseInt(prompt("Ingrese el codigo del disco, debe ser un numero entre 0 y 999"));
    } while (this.validarNumero(codigoDisco) || (this.validarNoRepetir(codigoDisco)));//Aca falta agregar la validacion del numero repetido

    let portada;
    do {
      portada = prompt("Ingrese la direccion de la portada del disco");
    } while (this.validarString(portada));

    //Aca tengo que hacer el push de estos datos
    let pistas = [];//Esto es una variable local   
    do {
      /*  this.cargarCancion(); */

      let nombreCancion;
      do {
        nombreCancion = prompt("Ingrese el nombre de la cancion");
      } while (this.validarString(nombreCancion));

      let duracionCancion;
      do {
        duracionCancion = parseInt(prompt("Ingrese la duracion de la cancion"));
      } while (this.validarDuracion(duracionCancion));

      let cancioncita = new Cancion(nombreCancion, duracionCancion);
      pistas.push(cancioncita);
      //console.log(pistas);

    } while (confirm("Desea cargar otra cancion?"));
    rokola.push(new Disco(nombreDisco, autorDisco, codigoDisco, portada, pistas))//Esto debe ir aca, sino no pushea los datos

  }




  imprimirDisco() {
    //let html="";
    //document.getElementById("discos").innerHTML = html;//Este va sin el mas, es para borrar la pantalla.
    let html = `<div class="card mx-2 mb-2" style="width: 25rem;">
      <div class="card-header text-bg-dark">
        <p class="card-text text-white text-center fs-5"> ID Disco - ${this.codigoDisco}</p>
      </div>
      <img src="${this.portada}" class="card-img-top rounded-0" alt="${this.nombreDisco}">
      <div class="card-body text-bg-dark">
        <h3 class="card-title ">${this.nombreDisco}</h3>
        <p class="card-title fs-4">${this.autorDisco}</p>
        
      </div>
      <ul class="list-group list-group-flush">`
    /* for(let pista of this.pistas){//Esto simple funciona
      
      html+=`<li class="list-group-item">${pista.nombre}</li>`;

    }   */


    for (let pista of this.pistas) {
      let tiempoconvertido = this.convertirTiempo(pista.duracion); //Ver si se pasa sin ()

      /* if(pista.duracion<180){
        html+=`<li class="container-fluid list-group-item fs-5">${pista.nombre} - ${tiempoconvertido}</li>`;
      }else{
        html+=`<li class="container-fluid list-group-item text-danger fs-5">${pista.nombre} - ${tiempoconvertido}</li>`;
      }
 */
      //
      if (pista.duracion < 180) {
        html += `<li class="container list-group-item fs-5">
        <div class="row">
          <div class="col-9">
            <p class="card-text fs-5"> ${pista.nombre}</p> 
          </div>
          <div class="col-3">
            <p class="card-text fs-5">${tiempoconvertido}</p>
          </div>
        <div>
        </li>`;
      } else {
        html += `<li class="container list-group-item">
        <div class="row">
          <div class="col-9">
            <p class="card-text text-danger fs-5">${pista.nombre}</p>  
          </div>
          <div class="col-3 ">
            <p class="card-text text-danger fs-5"> ${tiempoconvertido}</p>
          </div>
        <div>
        </li>`;
      }



      // 
    }
    html += `</ul>
      <div class="card-footer text-bg-dark">
        
          <p class="card-text text-white fs-5"> Cancion mas larga:  ${this.buscarMaximaCancion()}</p>
        
        <p class="card-text text-white fs-5">Canciones del Album: ${this.contadorDeCanciones()}</p>
        <p class="card-text text-white fs-5">Duracion del Album: ${this.duracionAlbum()}</p>
      </div>    
    </div>`;



    //Probar la linea a continuacion
    document.getElementById("discos").innerHTML += html;
    // - ${pista.duracion}
  }

  //Validaciones
  validarString(palabra) {
    //console.log("Entro aca");
    //console.log(palabra.length);
    if (palabra.length === 0) {
      alert(`${palabra} tiene una longitud de 0`);
      return true;
    } else if (palabra.trim().length == 0) {
      alert(`EL dato cargado '${palabra}' no contiene caracteres`);
      return true;
    } else if (!isNaN(palabra)) {
      alert(`${palabra} no es una palabra, es un numero`);
      return true;
    } else {
      return false;
    }
  }

  validarNumero(numero) {
    if (numero.length === 0) {
      alert(`${numero} tiene una longitud de 0`);
      return true;
      /*}else if(numero.trim().length == 0){
        alert(`EL numero cargado '${numero}' no contiene caracteres`);
        return true;*/
    } else if (isNaN(numero)) {
      alert(`${numero} no es un numero, es una palabra`);
      return true;
    } else if (numero < 0) {
      alert(`${numero} es menor a 0`);
      return true;
    } else if (numero > 999) {
      alert(`${numero} es mayor a 999`);
      return true;
    } else {
      return false;
    }
  }

  validarDuracion(duracion) {
    if (duracion.length === 0) {
      alert(`${duracion} tiene una longitud de 0`);
      return true;
      /*}else if(duracion.trim().length == 0){//No se puede usar la funcion trim() con un numero
        alert(`EL numero cargado '${duracion}' no contiene caracteres`);
        return true;*/
    } else if (isNaN(duracion)) {
      alert(`${duracion} no es un numero, es una palabra`);
      return true;
    } else if (duracion < 0) {
      alert(`${duracion} es menor a 0`);
      return true;
    } else if (duracion > 7200) {
      alert(`${duracion} es mayor a 7200`);
      return true;
    } else {
      return false;
    }

  }

  validarNoRepetir(codigo) {
    for (let disco of rokola) {
      if (codigo == disco.codigoDisco) {
        alert(`El codigo ${codigo} ya existe y le pertenece al album ${disco.nombreDisco}`);
        return true;
      }
    }
    return false;
  }

  //metodo para el cambio de color de la cancion



  //Metodo para minutos y segundos
  convertirTiempo(duracion) {
    let minutos = Math.floor(duracion / 60);
    let segundos = duracion % 60;
    if (minutos < 10 && segundos >= 10) {
      return `0${minutos}:${segundos}`;
    } else if (minutos < 10 && segundos < 10) {
      return `0${minutos}:0${segundos}`;
    } else if (minutos >= 10 && segundos < 10) {
      return `${minutos}:0${segundos}`;
    } else {
      return `${minutos}:${segundos}`;
    }
  }


  convertirTiempoAlbum(duracion) {
    let hora = Math.floor(duracion / 3600);
    let minutos = (Math.floor(duracion / 60) - hora * 60);
    let segundos = duracion % 60;

    if (hora < 10) {
      if (minutos < 10 && segundos >= 10) {
        return `0${hora}:0${minutos}:${segundos}`;
      } else if (minutos < 10 && segundos < 10) {
        return `0${hora}:0${minutos}:0${segundos}`;
      } else if (minutos >= 10 && segundos < 10) {
        return `0${hora}:${minutos}:0${segundos}`;
      } else {
        return ` 0${hora}:${minutos}:${segundos}`;
      }
    } else {
      if (minutos < 10 && segundos >= 10) {
        return `${hora}:0${minutos}:${segundos}`;
      } else if (minutos < 10 && segundos < 10) {
        return `${hora}:0${minutos}:0${segundos}`;
      } else if (minutos >= 10 && segundos < 10) {
        return `${hora}:${minutos}:0${segundos}`;
      } else {
        return ` ${hora}:${minutos}:${segundos}`;
      }


    }


  }

  //Metodo para consultar la duracion de todas las canciones.
  duracionAlbum() {
    let acumulador = 0;
    for (let pista of this.pistas) {
      acumulador += pista.duracion;
    }
    return this.convertirTiempoAlbum(acumulador);
  }

  contadorDeCanciones() {
    let contador = 0;
    for (let pista in this.pistas) {
      contador++;
    }
    return contador;
  }

  buscarMaximaCancion() {
    let maxima = 0;
    let indicador = 0;

    for (let indice in this.pistas) {
      if (this.pistas[indice].duracion > maxima) {
        indicador = indice;
        maxima = this.pistas[indice].duracion;
      }
    }
    return `${this.pistas[indicador].nombre} - ${this.convertirTiempo(this.pistas[indicador].duracion)}`;
  }


}//Cierre de la clase Disco