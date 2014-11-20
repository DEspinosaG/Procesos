
function LaOca(tablero, coleccionFichas,numeroJugadores){
	this.tablero = tablero;
	this.coleccionFichas=coleccionFichas;
	this.coleccionJugadores=[];
	this.turno=undefined;
	this.fase=undefined;
	this.ganador=undefined;
	this.numeroJugadores=numeroJugadores;

	this.asignarFicha=function(jugador){
		var enc=false;
		for(f in this.coleccionFichas){
			if (this.coleccionFichas[f].libre){
				enc=true;
				this.coleccionFichas[f].libre=false;
				this.coleccionFichas[f].casilla=this.tablero.casillas[1];
				this.coleccionFichas[f].asignarJugador(jugador);
				jugador.ficha=this.coleccionFichas[f];
				this.coleccionJugadores.push(jugador);
				break;
			}
		};
		if (!enc){
			console.log("Ya no quedan fichas libres");
		}
	};
	this.setTurno=function(jugador){
		this.turno=jugador;
		jugador.turno=new MeToca();
	}
	this.cambiarTurno=function(jugador){
		var indice=this.coleccionJugadores.indexOf(jugador);
		var siguienteIndice=(indice+1)%(this.coleccionJugadores.length);
		this.setTurno(this.coleccionJugadores[siguienteIndice]);
		jugador.turno=new NoMeToca();
	}
	this.iniciarJuego=function(){
		this.fase=new FaseInicio(this);
	}

	this.iniciarJuego();
}

function FaseInicio(juego){
	this.juego=juego;
	this.asignarFicha=function(jugador){
		this.juego.asignarFicha(jugador);
		if (this.juego.coleccionJugadores.length==this.juego.numeroJugadores){
			this.juego.fase=new FaseJugar(this.juego);
		}
	}
	this.lanzar=function(jugador){
		console.log("Todavía no puedes lanzar los dados");
	}
}

function FaseJugar(juego){
	this.juego=juego;
		this.asignarFicha=function(jugador){
			console.log("Ahora no se puede escoger ficha");
	}

	this.lanzar=function(jugador){
		jugador.turno.lanzar(jugador);		
	}
}

function FaseFIN(juego, jugador){
		this.juego=juego;
		this.ganador=jugador;
		this.asignarFicha=function(jugador){
			console.log("Fin del Juego. Ganador "+this.ganador.nombre);
		}
		this.lanzar=function(jugador){
			console.log("Fin del Juego. Ganador "+this.ganador.nombre);
		}
		this.verGanador=function(jugador){
			console.log("Ganador "+this.ganador.nombre);
		}
}

function Tablero(){
	this.casillas=[];
	this.iniciarTablero=function(){
		this.casillas[0]="El Juego de la Oca";
		for(i=1;i<=63;i++){
			this.casillas[i]=new Casilla(i,this);
		}
	};

	this.asignarCasilla=function(posicion,tema){
		this.casillas[posicion].tema=tema;
	}

	this.configurarTablero=function(){
		this.asignarCasilla(6, new Puente(12));
		this.asignarCasilla(12,new Puente(6));
		this.asignarCasilla(19,new Posada());
		this.asignarCasilla(26,new Dados());
		this.asignarCasilla(53,new Dados());
		this.asignarCasilla(31, new Pozo());
		this.asignarCasilla(42,new Laberinto());
		this.asignarCasilla(52,new Carcel());
		this.asignarCasilla(58,new Calavera());	
		this.asignarCasilla(5,new Oca(9));
		this.asignarCasilla(9, new Oca(14));
		this.asignarCasilla(63, new Final());							
	}

	this.moverSinCaer=function(ficha,posicion){
		ficha.nuevaCasilla(this.casillas[posicion]);
	}

	this.desplazar=function(ficha,posicion){
		var nuevaPosicion=ficha.getPosicion()+posicion;
		if (nuevaPosicion > 63){
			nuevaPosicion = 63-nuevaPosicion%63;
		};
		return nuevaPosicion;
	}

	this.mover=function(ficha,posicion){
		var nuevaPosicion = this.desplazar(ficha,posicion);
		ficha.cae(this.casillas[nuevaPosicion]);
	}
	this.iniciarTablero();
	this.configurarTablero();
}

function Casilla(posicion, tablero){
	this.posicion=posicion;
	this.tema=new Normal();
	this.tablero=tablero;
	this.moverSinCaer=function(ficha,posicion){
		this.tablero.moverSinCaer(ficha,posicion);
	}
	this.mover=function(ficha,posicion){
		this.tablero.mover(ficha,posicion);
	}
	this.cae=function(ficha){
		this.tema.cae(ficha);
	}
}

function Normal(){
	this.titulo="Normal";
	this.cae=function(ficha){
		console.log("Casilla normal");
		ficha.cambiarTurno();
	}
}

function Puente(otroPuente){
	this.titulo="Puente";
	this.otroPuente=otroPuente;
	this.cae=function(ficha){
		//mover la ficha al otro puente y decirle que tire de nuevo
		console.log("De puente a puente y tiro porque me lleva la corriente");
		ficha.moverSinCaer(this.otroPuente);
	}
}

function Pozo(){
	this.titulo="Pozo";
	this.cae=fucntion(ficha){
		console.log("Al fondo del pozo");
		//Como compruebo donde esta el otro jugador ¿?
	}
}


function Oca(otraOca){
	this.titulo="Oca";
	this.otraOca=otraOca;
	this.cae=function(ficha){
		console.log("De Oca a Oca y tiro porque me toca");
		ficha.moverSinCaer(this.otraOca);
	}
}

function Posada(){
	this.titulo="Posada";
	this.cae=function(ficha){
		console.log("Caíste en la Posada");
		if ((ficha.jugador.descanso)>0){
			ficha.mover(ficha.getPosicion()+1);
			ficha.jugador.descanso=4;
		}
		ficha.jugador.descanso=ficha.jugador.descanso-1;
		ficha.cambiarTurno();
	}
}

function Dados(){
	this.titulo="Dados";
	this.dibujo=Math.floor((Math.random() * 6) + 1);
	this.cae=function(ficha){
		console.log("Avanzo lo que me dice el dado dibujado");
		ficha.moverSinCaer(ficha.getPosicion()+this.dibujo);
		ficha.cambiarTurno();
	}
}

function Laberinto(){
	this.titulo="Laberinto";
	this.salida=3;
	this.cae=function(ficha){
		console.log("Caíste en el Laberinto");
		//Como compruebo el dado que saco el jugador en esta tirada¿?
	}
}

function Carcel(){
	this.titulo="Carcel";
	this.contador=1;
	this.cae=function(ficha){
		console.log("Caíste en la Cárcel");
		if ((this.contador%4)==0){
			ficha.moverSinCaer(ficha.getPosicion()+1);
		}
		this.contador=this.contador+1;
		ficha.cambiarTurno();
	}
}

function Calavera(){
	this.titulo="Calavera";
	this.cae=function(ficha){
		console.log("Caíste en la Calavera");
		ficha.moverSinCaer(1);
		ficha.cambiarTurno();
	}
}

function Final(){
	this.titulo="Final";
	this.cae=function(ficha){

		console.log("Ganaste");
		ficha.jugador.juego.fase=new FaseFIN(ficha.jugador.juego, ficha.jugador);
	}

}

function Ficha(color){
	this.color=color;
	this.libre=true;
	this.casilla=undefined;
	this.jugador=undefined;
	this.asignarJugador=function(jugador){
		this.jugador=jugador;
	}
	this.moverSinCaer=function(posicion){
		this.casilla.moverSinCaer(this,posicion);
	}
	this.nuevaCasilla=function(casilla){
		this.casilla=casilla;
	}
	this.mover=function(posicion){
		this.casilla.mover(this,posicion);
	}
	this.getPosicion=function(){
		return this.casilla.posicion;
	}

	this.cae=function(casilla){
		this.casilla=casilla;
		this.casilla.cae(this);
	}
	this.cambiarTurno=function(){
		this.jugador.cambiarTurno();
	}
}

function MeToca(){
	this.lanzar=function(jugador){
		var numero=Math.round(Math.random()*5+1);
		console.log("Tirada: "+numero);
		jugador.ficha.mover(numero);
	}
}

function NoMeToca(){
	this.lanzar=function(jugador){
		console.log("No es tu turno");
	}
}

function Jugador(nombre,juego){
	this.nombre=nombre;
	this.ficha=undefined;
	this.juego=juego;
	this.descanso=3;
	this.turno=new NoMeToca();

	this.asignarFicha=function(){
		this.juego.fase.asignarFicha(this);
	}
	this.lanzar=function(){
		this.juego.fase.lanzar(this);
	}
	this.cambiarTurno=function(){
		this.juego.cambiarTurno(this);
	}
}