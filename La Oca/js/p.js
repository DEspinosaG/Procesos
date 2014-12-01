
var j1;
var j2;
var j3;
var j4;
var numJugadores=2;
var game;

//Metodo que me permite añadir jugadores hasta el tope, 4. Lo llama un boton del inicio. 
function unoMas(){
	var text;

	switch (numJugadores) {
    case 2:
        text = "El juego va comenzar con 3 jugadores";
        numJugadores=3;
        break;
    case 3:
        text = "El juego va comenzar con 4 jugadores";
        numJugadores=numJugadores+1;
        break;
    default:
    	numJugadores=4;
        text = "Lo siento no pueden añadir mas jugadores por el momento. Maximo 4.";
	}

	$('#texto').text(text); 
}

//Metodo asignado a un boton del inicio que pone el modelo del juego en marcha. 
function empezarJuego(){
	$('#inicio').remove();
	//$('#botonEmpezar').remove(button);
	$('#titulo').text("");
  $('#titulo').append('El Juego OCA-DEG se esta preparando con '+numJugadores+' Jugadores');
	$('#Textos').empty();
	empezar();

}

//Pongo el modelo del juego en marcha y al primer jugador.
function empezar(){
	
	tablero=new Tablero();
	coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("amarilla"),new Ficha("verde")];
	game = new LaOca(tablero,coleccionFichas,numJugadores);

	


  $('#j1').append('<b id="NameJugador1">Introducca el nombre del Jugador 1:</b> <input type="text" name="nombre" id="nombrej1" value="Jugador1"/><button id="btn1">Confirmar Nombre</button>');
 
   

	$("#btn1").click(function(){
		nombre=$('#nombrej1').val();
		j1=new Jugador(nombre, game);
		j1.asignarFicha();
		$("#Textos").empty();
		$("#Textos").append('<p id="tj1">Hola Jugador: '+j1.nombre+'</p>');
  		$('#nombrej1').remove();
  		$("#NameJugador1").remove();
  		$("#btn1").remove();
  		dos();
  	});
}

  //Inicializa al segundo jugador
	function dos(){
		$('#j2').append('<b id="NameJugador2">Introducca el nombre del Jugador 2:</b> <input type="text" name="nombre" id="nombrej2" value="Jugador2"/><button id="btn2">Confirmar Nombre</button>');
	
    $("#btn2").click(function(){
      nombre=$('#nombrej2').val();
      j2=new Jugador(nombre, game);
      j2.asignarFicha();

      $("#Textos").append('<p id="tj2">Hola Jugador: '+j2.nombre+'</p>');
    
      $('#nombrej2').remove();
      $("#NameJugador2").remove();
      $("#btn2").remove();
      if (2 < numJugadores) {
        tres();
      }else{
           
           jugar();
      } 
      
      
    });
  }
	
  //Inicializa a un tercer jugador
  function tres(){
    $('#j3').append('<b id="NameJugador3">Introducca el nombre del Jugador 3:</b> <input type="text" name="nombre" id="nombrej3" value="Jugador3"/><button id="btn3">Confirmar Nombre</button>');

    $("#btn3").click(function(){
    nombre=$('#nombrej3').val();
    j3=new Jugador(nombre, game);
    j3.asignarFicha();

    $("#Textos").append('<p id="tj3">Hola Jugador: '+j3.nombre+'</p>');
     
     $('#nombrej3').remove();
     $("#NameJugador3").remove();
     $("#btn3").remove();
     if (3 < numJugadores) {
        cuarto(); 
     }else{
        jugar();
     }
   });
  }

  function cuarto(){
    $('#j4').append('<b id="NameJugador4">Introducca el nombre del Jugador 4:</b> <input type="text" name="nombre" id="nombrej4" value="Jugador4"/><button id="btn4">Confirmar Nombre</button>');


    $("#btn4").click(function(){
      nombre=$('#nombrej4').val();
      j4=new Jugador(nombre, game);
      j4.asignarFicha();
    
      $("#Textos").append('<p id="tj4">Hola Jugador '+j4.nombre+'</p>');

      $('#nombrej4').remove();
      $("#NameJugador4").remove();
      $("#btn4").remove();
      

      //$("#tj4").delay(5000).fadeIn();
      setTimeout(jugar(), 5000);

    }); 

      
  }	

      //SEGUIR CON EL JUEGO....

      function jugar(){
      $('#Textos').empty();
      $('#titulo').text("");
      $('#titulo').append('Jugando a la OCA-DEG con '+numJugadores+' Jugadores');
    

    }

  

  
 
