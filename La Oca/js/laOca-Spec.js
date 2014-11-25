describe("El juego de la Oca...",function(){

	var juego;
	var coleccionFichas;
	var tablero;
	var jugador; 

	describe("En cuanto a la inicialización",function(){
		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.coleccionJugadores=[new Jugador("Uno"),new Jugador("Dos"),new Jugador("Tres")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);
		});

		it("...la variable juego debe estar definida",function(){
			expect(this.juego).toBeDefined();
		});

		it("...el juego debe tener un tablero",function(){
			expect(this.juego.tablero).toBeDefined();
		});

		it("...el tablero debe tener 64 elementos",function(){
			expect(this.juego.tablero.casillas.length).toEqual(64);
		});

		it("...el juego tiene una coleccion de fichas", function(){
			expect(this.juego.coleccionFichas).toBeDefined();
		});

		it("...la coleccion de fichas debe tener 3 fichas",function(){
			expect(this.juego.coleccionFichas.length).toEqual(3);
		});

		it("...inicialmente, todas las fichas están libres",function(){
			var a = 0;
			for (i=0;i<this.juego.coleccionFichas.length;i++) {
				if  (this.juego.coleccionFichas[i].libre) a++;
			}
			expect(a).toEqual(this.juego.coleccionFichas.length);
		});

		it("...el juego tiene una coleccion de jugadores",function(){
			expect(this.juego.coleccionJugadores).toBeDefined();
		});

		it("...el juego permite crear un jugador llamado Pepe",function(){
			this.jugador=new Jugador("Juan",this.juego);
			expect(this.jugador.nombre).toMatch("Juan");
		});

		it("...el juego permite asignar una ficha libre a Juan",function(){
			this.jugador=new Jugador("Juan",this.juego);
			this.jugador.asignarFicha();
			expect(this.jugador.ficha).toBeDefined();
		});
	});

	describe("Comprobar el tablero...",function(){
		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);
		});

		it("...las casillas 6 y 12 tienen Puente",function(){
			expect(this.tablero.casillas[6].tema.titulo).toEqual("Puente");
			expect(this.tablero.casillas[12].tema.titulo).toEqual("Puente");
		});

		it("...la casilla 19 tiene una Posada",function(){
			expect(this.tablero.casillas[19].tema.titulo).toEqual("Posada");			
		});

		it("...las casillas 26 y 53 tiene Dados",function(){
			expect(this.tablero.casillas[26].tema.titulo).toEqual("Dados");
			expect(this.tablero.casillas[53].tema.titulo).toEqual("Dados");
		});

		it("...la casilla 31 tiene Pozo",function(){
			expect(this.tablero.casillas[31].tema.titulo).toEqual("Pozo");
		});


		it("...la casilla 42 tiene Laberinto",function(){
			expect(this.tablero.casillas[42].tema.titulo).toEqual("Laberinto");
		});

		it("...la casilla 52 tiene Cárcel",function(){
			expect(this.tablero.casillas[52].tema.titulo).toEqual("Carcel");
		});

		it("...la casilla 58 tiene Calavera",function(){
			expect(this.tablero.casillas[58].tema.titulo).toEqual("Calavera");
		});

		it("...las casillas 5,9... tienen Oca",function(){
			expect(this.tablero.casillas[5].tema.titulo).toEqual("Oca");
			expect(this.tablero.casillas[9].tema.titulo).toEqual("Oca");
		})

		it("...la casilla 63 tiene Final",function(){
			expect(this.tablero.casillas[63].tema.titulo).toEqual("Final");
		});
	});

	describe("Comprobar el funcionamiento del tema Oca",function(){
		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);
		});
		it("...la Oca 5 te lleva hasta la casilla 9",function(){
			expect(this.tablero.casillas[5].tema.otraOca).toEqual(9);
		});
		it("...la Oca 9 te lleva hasta la casilla 14",function(){
			expect(this.tablero.casillas[9].tema.otraOca).toEqual(14);
		});
	})

	describe("Comprobar el funcionamiento del tema Puente",function(){
		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);
		});
		it("...el Puente 6 te lleva hasta la casilla 12",function(){
			expect(this.tablero.casillas[6].tema.otroPuente).toEqual(12);
		});
		it("...el Puente 12 te lleva hasta la casilla 6",function(){
			expect(this.tablero.casillas[12].tema.otroPuente).toEqual(6);
		});
	})

	describe("Comprobar el funcionamiento del tema Posada",function(){
		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);
		});
		it("...la Posada 19 te hace descansar 2 turnos",function(){
			expect(this.tablero.casillas[19].tema.contador).toEqual(2);
		});	
	})

	describe("Comprobar el funcionamiento del tema Dados",function(){
		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);
		});
		it("...Dados 26 te suma las casillas que marque el dibujo(aleatorio tipo jumanji) con limite 6.",function(){
			var  limite= this.tablero.casillas[26].tema.limite;
			expect(6).toEqual(this.tablero.casillas[26].tema.limite);
			for (i=0;i<limite;i++) {
				if  (this.tablero.casillas[26].tema.dibujo==i) {
					expect(i).toEqual(this.tablero.casillas[26].tema.dibujo);
				}
			}
			
		});
		it("...Dados 53 te suma las casillas que marque el dibujo(aleatorio tipo jumanji) con limite 6.",function(){
			var  limite= this.tablero.casillas[53].tema.limite;
			expect(6).toEqual(this.tablero.casillas[53].tema.limite);
			for (i=0;i<limite;i++) {
				if  (this.tablero.casillas[53].tema.dibujo==i) {
					expect(i).toEqual(this.tablero.casillas[53].tema.dibujo);
				}
			}
			
		});

	})

	describe("Comprobar el funcionamiento del tema Pozo",function(){
		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);
		});
		it("...Pozo 31 te hace descansar 3 turnos si vas primero, y 2 si no lo vas",function(){
			//Pendiente .... 
		});	
	})

	describe("Comprobar el funcionamiento del tema Laberinto",function(){
		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);
		});
		it("...Laberinto 42 te hace entrar en el laberinto",function(){
			//expect(this.tablero.casillas[42].tema......).toEqual(2);
			//Pendiente ...
		});	
	})

	describe("Comprobar el funcionamiento del tema Carcel",function(){
		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);
		});
		it("...Carcel 52 te hace descansar 3 turnos",function(){
			expect(this.tablero.casillas[3].tema.contador).toEqual(3);
		});	
	})

	describe("Comprobar el funcionamiento del tema Calavera",function(){
		beforeEach(function(){
			this.tablero = new Tablero();
			this.coleccionFichas=[new Ficha("roja"),new Ficha("azul"),new Ficha("verde")];
			this.juego = new LaOca(this.tablero, this.coleccionFichas);
		});
		it("...Calavera 58 te hace volver a la posicion 1",function(){
			expect(this.tablero.casillas[58].tema.principio).toEqual(1);
		});	
	})
})