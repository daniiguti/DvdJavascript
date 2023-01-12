//HECHO POR: DANIEL GUTIÉRREZ BAENA

//VELOCIDAD REFRESCO EN MS
let velocidad_refresco = 1;

//Variables necesarias
let canvas
let ctx
let img

//Array que guarda los distintos dvd generados
let array_dvds = []

//Clase DVD
class DVD{
	constructor(x,y){
		this.x = x
		this.y = y
		this.direccionx = 1
		this.direcciony = 1
		this.color = generarColor()
	}
};

//Función principal
(function main(){

	//quitamos el margen al body
	document.body.style = "margin: 0px"

	//Obtenemos el canvas
	canvas = document.getElementById("lienzo")

	//Obtenemos el contexto del canvas (para poder pintar en él)
	ctx = canvas.getContext("2d")

	//Creamos la imagen que tiene el logo dvd
	img = new Image()
	img.src = 'dvd_logo.png';

	//Igualamos el tamaño del canvas al de la ventana
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	
	//cada vez que clickemos se crea un nuevo dvd
	document.addEventListener("click", crearDVD)

	//nos creamos el primer dvd
	let dvd = new DVD(1,1)
	array_dvds.push(dvd)

	//Llamamos al bucle que va refrescando la pantalla
	actualizar()
})();

//Funcion recursiva que repinta el canvas cada "velocidad_refresco" ms
function actualizar(){
	setTimeout( () => {

		//Dibujamos fondo negro
		ctx.fillStyle = '#000'
		ctx.fillRect(0,0,canvas.width, canvas.height)

		//array que recorre todos los dvds creados
		array_dvds.forEach( dvd => {	

			//Dibujamos el rectangulo
			ctx.fillStyle = dvd.color
			ctx.fillRect(dvd.x, dvd.y, 170, 90)

			//Dubujamos la imagen en el contexto pasandoles las posiciones de cada DVD,
			//con el mismo tamaño que el rectángulo
			ctx.drawImage(img, dvd.x, dvd.y, 170, 90)
			
			//Para que no se puedan generar en los bordes, si la dirección
			//está en los borde antes de que se mueva el objeto, 
			//lo generamos mas para adentro.
			//Comprobamos aqui porque solo necesitamos comprobarlo una vez,
			//de tal forma que si el dvd está en el borde la cambia la posición
			if(dvd.x + 170 > canvas.width){
				dvd.x = dvd.x - 170;
			}
			if(dvd.y + 90 > canvas.height){
				dvd.y = dvd.y - 90;
			}					
			
			//Movemos el rectángulo para la siguiente iteración
			mover(dvd)
		})		

		//Volvemos a iterar
		actualizar()

	}, velocidad_refresco)
}

//funcion que crea los DVD y los guarda en el array
function crearDVD(evt){	
	let dvd = new DVD(evt.x,evt.y)
	array_dvds.push(dvd)
}

//movemos el logo y cada vez que lo movemos comprobamos si choca con la pared
function mover(dvd) {
	comprobacionPared(dvd);
	dvd.x += dvd.direccionx
	dvd.y += dvd.direcciony
}

//Comprobamos la colision con las paredes
function comprobacionPared(dvd) {
	let dvd_height = 90;
	let dvd_width = 170;
	let cornerx = dvd.x;
	let cornery = dvd.y;
	let win_height = canvas.height;
	let win_width = canvas.width;

	//Si choca cambiamos el color
	//si choca en la x
	if (cornerx <= 0 || cornerx + dvd_width >= win_width) {
	    dvd.direccionx *= -1
	    update_color(dvd);
	}
    //si choca en la y
	if (cornery <= 0 || cornery + dvd_height >= win_height) {
	    dvd.direcciony *= -1
	    update_color(dvd);
	}
}

//cambiamos el color del dvd
function update_color(dvd) {
	dvd.color = generarColor()
}

//Devuelve un color RGB aleatorio
function generarColor(){
	r = Math.random() * 254
	g = Math.random() * 254
	b = Math.random() * 254

	return 'rgb('+r+','+g+','+b+')';
}


//GRACIAS VICTOR POR LA AYUDA :) 
//SI LEES ESTO PONME UN 10
