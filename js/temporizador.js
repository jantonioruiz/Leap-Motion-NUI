//1 minuto de tiempo de espera
const tiempoEspera = 1000 * 60 * 1;

//Función para redirigir a la portada
function redirigirPagina() {
	var titulo_pagina = document.title;

	switch (titulo_pagina) {
		case "comedor":
		case "menu":
		case "profes":
		case "proximamente":
		case "zonascomunes":
		case "tramites":
		case "serviviosexternos":
		case "docencia":
			window.location.href = "inicio.html"
		break;

		default:
			window.location.href = "../../html/inicio.html"
		break;
	}
	
}
//Cuando se acabe el tiempo de espera, vuelve a la portada
setTimeout(redirigirPagina, tiempoEspera);
