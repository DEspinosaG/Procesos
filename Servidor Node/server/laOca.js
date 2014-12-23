var LaOca=function(tablero, coleccionFichas,numeroJugadores){
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
	this.terminarJuego=function(ganador){
		this.fase=new FaseFIN(this, ganador);
	}
	this.iniciarJuego();
}

function FaseInicio(juego){
	this.titulo="Inicio";
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
	this.titulo="Jugando";
	this.juego=juego;
		this.asignarFicha=function(jugador){
			console.log("Ahora no se puede escoger ficha");
	}

	this.lanzar=function(jugador){
		jugador.turno.lanzar(jugador);		
	}
}

function FaseFIN(juego, jugador){
		this.titulo="Fin";
		this.juego=juego;
		this.ganador=jugador;
		this.asignarFicha=function(jugador){
			console.log("Fin del Juego. Ganador "+this.ganador.nombre);
		}
		this.lanzar=function(jugador){
			console.log("Fin del Juego. Ganador "+this.ganador.nombre);
		}
}

var Tablero=function(){
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
		this.asignarCasilla(31, new Pozo(31));
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

//Pozo. Si vas primero te comes 3 turnos, si alguien va delante de ti te comes 2.
function Pozo(miposcion){
	this.titulo="Pozo";
	this.cae=function(ficha){
		var coleccionJugando=ficha.jugador.juego.coleccionJugadores;
		 	this.descanso=3;
			this.index;
			this.jugadores=coleccionJugando;
				for	(index = 0; index < this.jugadores.length; index++) {
    				if (this.jugadores[index].ficha.casilla.posicion>miposcion){
    					this.descanso=2;
    				}
				}
		 ficha.jugador.descanso=this.descanso; 
		 
		 console.log("Al fondo del pozo,"+ficha.jugador.descanso+" turnos descansando.");
		 ficha.cambiarTurno();
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
	this.contador=2;
	this.cae=function(ficha){
		console.log("Caíste en la Posada, 2 turnos de descanso.");
		ficha.jugador.descanso=this.contador;
		ficha.cambiarTurno();
	}
}

function Dados(){
	this.titulo="Dados";
	this.limite=6;
	this.dibujo=Math.floor((Math.random() * this.limite) + 1);
	this.cae=function(ficha){
		console.log("Avanzo lo que me dice el dado dibujado "+this.dibujo);
		ficha.moverSinCaer(ficha.getPosicion()+this.dibujo);
		ficha.cambiarTurno();
	}
}

function Laberinto(){
	this.titulo="Laberinto";
	this.cae=function(ficha){
		console.log("Caíste en el Laberinto");
		ficha.jugador.laberinto=true;
		ficha.cambiarTurno();
	}
}

function Carcel(){
	this.titulo="Carcel";
	this.contador=3;
	this.cae=function(ficha){
		console.log("Caíste en la Cárcel, 3 turnos arrestado.");
		ficha.jugador.descanso=this.contador;
		ficha.cambiarTurno();
	}
}

function Calavera(){
	this.titulo="Calavera";
	this.principio=1;
	this.cae=function(ficha){
		console.log("Caíste en la Calavera");
		ficha.moverSinCaer(this.principio);
		ficha.cambiarTurno();
	}
}

function Final(){
	this.titulo="Final";
	this.cae=function(ficha){
		console.log("Ganaste "+ficha.jugador.nombre);
		ficha.terminarJuego();
	}

}

var Ficha=function(color){
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
	this.terminarJuego=function(){
		this.jugador.terminarJuego();
	}
}

function MeToca(){
	this.lanzar=function(jugador){
		if (jugador.descanso>0){
			console.log("El jugador descansa, no tira dado.");
			jugador.descanso=jugador.descanso-1;
			jugador.cambiarTurno;
		}
		else if (jugador.laberinto==true){
			var numero=Math.round(Math.random()*5+1);
			if (numero>3){
				console.log("Tirada de Dado: "+numero+". Sales del Laberinto");
				jugador.ficha.mover(numero);
				jugador.laberinto=false;
			}
			else {console.log("Tirada de Dado: "+numero+".No sales, no saco mas de 3.");}
			
		}
		else{
			var numero=Math.round(Math.random()*5+1);
			console.log("Tirada: "+numero);
			jugador.ficha.mover(numero);
		}
		
	}
}

function NoMeToca(){
	this.lanzar=function(jugador){
		console.log("No es tu turno");
	}
}

var Jugador=function(nombre,juego){
	this.nombre=nombre;
	this.ficha=undefined;
	this.juego=juego;
	this.descanso=0;
	this.laberinto=false;
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
	this.terminarJuego=function(){
		this.juego.terminarJuego(this);
	}
}

module.exports.Jugador=Jugador;
module.exports.Ficha=Ficha;
module.exports.Tablero=Tablero;
module.exports.LaOca=LaOca;