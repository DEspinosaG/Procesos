var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var application_root= __dirname,
	path = require('path');
var modulo=require('./server/laOca.js');
var juego;

var app=exp();

app.use('/',exp.static(__dirname));

app.get("/",function(request,response){
	var contenido=fs.readFileSync("./index-juego.html");
	response.setHeader("Content-type","text/html");
	response.send(contenido);
});


app.get("/reset",function(request,response){
	inicializarJuego();
	var jsonData={
		"fase" : juego.fase.titulo
	};
	response.send(jsonData);
});

app.get("/ficha/:nombre",function(request,response){
	jugador = new modulo.Jugador(request.params.nombre,juego);
	jugador.asignarFicha();
	if (jugador.ficha){
        var jsonData={
            "color":jugador.ficha.color,
            "posicion":jugador.ficha.casilla.posicion
        };
        response.send(jsonData);
    }
    else{
        response.send("No hay mas huecos, sorry");
    }
})

app.listen(port,host);

function inicializarJuego(){
	tablero = new modulo.Tablero();
	var coleccionFichas=[new modulo.Ficha("roja"),new modulo.Ficha("azul"),new modulo.Ficha("verde")];
	juego = new modulo.LaOca(tablero,coleccionFichas,2);
}



