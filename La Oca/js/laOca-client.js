
var j1;
var j2;
var game;

function empezar(){


	tablero=new Tablero();
	coleccionFichas=[new Ficha("roja"),new Ficha("azul")];
	game = new LaOca(tablero,coleccionFichas,2);

	$('#j1').append('<b id="NameJugador1">Introducca el nombre del Jugador 1 : </b> <input type="text" name="nombre" id="nombrej1"/><button id="btn1">Confirmar Nombre</button>');


	$("#btn1").click(function(){
    	$("#NameJugador1").append(" <b>Jugador en Espera de Rival</b>.");
  	});
}