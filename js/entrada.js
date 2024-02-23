var controllerOptions = { enableGestures: true };

// Función para comprobar que estamos sobre el elemento html dado como parámetro
function esta_dentro(x, y, elemento) {
    return (x >= elemento.left && x <= elemento.right && y >= elemento.top && y <= elemento.bottom);
}

// Para controlar que la mano estaba abierta y pasa a cerrada
let manoAbiertaAnterior = false;
function GestoManoCerradaDetectado(frame) {
    var cierre_mano = frame.hands[0].grabStrength;
    //si la mano esta abierta...
    if (cierre_mano <= 0.5) {
        manoAbiertaAnterior = true;
    }
    if (manoAbiertaAnterior) {
        //comprobamos si la hemos cerrado
        return (cierre_mano >= 0.8);
    }
    return false;
}

function ManoCerrada(frame) {
    var cierre_mano = frame.hands[0].grabStrength;

    return cierre_mano >= 0.8;
}

var reconocer_gesto = false;

window.onload = function () {
    //niciamos un temporizador de dos segundos
    setTimeout(function () {
        reconocer_gesto = true;
    }, 1200);
};

var calcular_posicion_botones = true;
var botones_menu;
var botones_comedor;
var botones_zonacomun;
var botones_dentrocomedor;


// Para el gesto de zoom
let indiceIzquierdo = true;
let indiceDerecho = true;

let newWidth = 1;

//manejamos cada frame
Leap.loop(controllerOptions, function (frame) {
    // -------------------- SOLO TRATAMOS UNA MANO --------------------
    if (frame.hands.length == 1) {
        var boton1 = document.getElementById("cursord1");
        // Configuramos el estilo del cursor de dos manos para que no sea visible
        boton1.style.display = "none";
        var boton2 = document.getElementById("cursord2");
        // Configuramos el estilo del cursor de dos manos para que no sea visible
        boton2.style.display = "none";

        //se ha detectado al menos una mano, tomamos la posicion de la palma
        var punto = frame.hands[0].palmPosition;
        //normalizamos usando la caja de interaccion, ya que nos será de gran ayuda a la hora manejar interfaces 2D
        var iBox = frame.interactionBox;
        var punto_normalizado = iBox.normalizePoint(punto, true);
        /*Calculamos sus coordenadas en la ventana del navegador, usando un nuevo sistema de referencia, 
        que utiliza como origen el borde superior izquierdo de la ventana del navegador.
        */
        //alto y ancho de la ventana del navegador
        document.documentElement.style.transform = `scale(1)`;
        var appWidth = window.innerWidth;
        var appHeight = window.innerHeight;
        var posX = punto_normalizado[0] * appWidth;
        //invertimos el eje Y, ya que en el sist.ref de la ventana, se utiliza como eje Y el eje del sist.ref de Leap invertido
        var posY = ((1 - punto_normalizado[1]) * appHeight) * 1.5; 

        //posicionamos el puntero
        var cursor = document.getElementById("cursor");
        cursor.style.display = "block";
        cursor.style.left = posX + 'px';
        cursor.style.top = posY + 'px';

        // obtenemos la página html donde nos encontramos
        var titulo_pagina = document.title;

        // ------------------------ GESTOS CON UNA SOLA MANO -------------------------------
        if (frame.gestures.length > 0) {
            var gesture = frame.gestures[0];
            // ------------------------ GESTO CÍRCULO -------------------------------
            if (gesture.type === "circle" && reconocer_gesto) {


                var circleRadius = gesture.radius;

                var radioMinimo = 35;

                if (circleRadius > radioMinimo) {
                    switch (titulo_pagina) {
                        case "menu":
                            window.location.href = "../html/inicio.html";
                            break;

                        case "proximamente":
                        case "zonascomunes":
                        case "profes":
                        case "comedor":
                        case "tramites":
                        case "serviciosexternos":
                        case "docencia":
                            window.location.href = "../html/menu.html";
                            break;

                        // Estamos en el menú de un día
                        case "lunes":
                        case "martes":
                        case "miercoles":
                        case "jueves":
                        case "viernes":
                        case "menucomer":
                        case "menullevar":
                            window.location.href = "../../html/comedor.html";
                            break;

                        // Estamos en alguna asignatura
                        case "npi":
                        case "pl":
                        case "ptc":
                        case "ss":
                        case "tic":
                        case "vc":
                            window.location.href = "../../html/profes.html";
                            break;

                        // Estamos siguiendo alguna ruta
                        case "biblioteca1":
                        case "biblioteca2":
                        case "biblioteca3":
                        case "biblioteca4":
                        case "biblioteca5":
                        case "cafeteria1":
                        case "cafeteria2":
                        case "cafeteria3":
                        case "comedor1":
                        case "comedor2":
                        case "comedor3":
                        case "comedor4":
                        case "comedor5":
                        case "conserjeria1":
                        case "conserjeria2":
                        case "conserjeria3":
                        case "estudiantes1":
                        case "estudiantes2":
                        case "estudiantes3":
                        case "salon1":
                        case "salon2":
                        case "salon3":
                        case "salon4":
                            window.location.href = "../../html/zonascomunes.html";
                            break;

                        // Estamos en información de algún trámite
                        case "citasecretaria1":
                        case "citasecretaria2":
                        case "citasecretaria3":
                        case "citasecretaria4":
                        case "certificadonotas1":
                        case "certificadonotas2":
                        case "solicitudgeneral1":
                        case "solicitudgeneral2":
                        case "solicitudgeneral3":
                            window.location.href = "../../html/tramites.html";
                            break;

                        // Estamos en información de alguna ruta de servicio externo
                        case "churreria":
                        case "deportivos":
                        case "practicasempresa":
                        case "rectorado":
                            window.location.href = "../../html/serviciosexternos.html";
                            break;

                        // Estamos en información de docencia
                        case "horario1":
                        case "horario2":
                            window.location.href = "../../html/docencia.html";
                            break;
                    }

                }

            }
            // ------------------------ GESTO SWIPE ------------------------------
            if (gesture.type === "swipe" && reconocer_gesto) {
                var swipeDirection = '';

                // Verificamos la dirección del swipe
                if (gesture.direction[0] > 0) {
                    swipeDirection = "izquierda";
                } else {
                    swipeDirection = "derecha";
                }

                // --------------------- SWIPE HACIA LA DERECHA ---------------------
                if (swipeDirection === "derecha") {
                    switch (titulo_pagina) {
                        case "lunes":
                            window.location.href = "martes.html";
                            break;
                        case "martes":
                            window.location.href = "miercoles.html";
                            break;
                        case "miercoles":
                            window.location.href = "jueves.html";
                            break;
                        case "jueves":
                            window.location.href = "viernes.html";
                            break;
                        case "viernes":
                            window.location.href = "lunes.html";
                            break;

                        case "biblioteca1":
                            window.location.href = "biblioteca2.html";
                            break;
                        case "biblioteca2":
                            window.location.href = "biblioteca3.html";
                            break;
                        case "biblioteca3":
                            window.location.href = "biblioteca4.html";
                            break;
                        case "biblioteca4":
                            window.location.href = "biblioteca5.html";
                            break;
                        case "cafeteria1":
                            window.location.href = "cafeteria2.html";
                            break;
                        case "cafeteria2":
                            window.location.href = "cafeteria3.html";
                            break;
                        case "comedor1":
                            window.location.href = "comedor2.html";
                            break;
                        case "comedor2":
                            window.location.href = "comedor3.html";
                            break;
                        case "comedor3":
                            window.location.href = "comedor4.html";
                            break;
                        case "comedor4":
                            window.location.href = "comedor5.html";
                            break;
                        case "conserjeria1":
                            window.location.href = "conserjeria2.html";
                            break;
                        case "conserjeria2":
                            window.location.href = "conserjeria3.html";
                            break;
                        case "estudiantes1":
                            window.location.href = "estudiantes2.html";
                            break;
                        case "estudiantes2":
                            window.location.href = "estudiantes3.html";
                            break;
                        case "salon1":
                            window.location.href = "salon2.html";
                            break;
                        case "salon2":
                            window.location.href = "salon3.html";
                            break;
                        case "salon3":
                            window.location.href = "salon4.html";
                            break;

                        case "citasecretaria1":
                            window.location.href = "citasecretaria2.html";
                            break;
                        case "citasecretaria2":
                            window.location.href = "citasecretaria3.html";
                            break;
                        case "citasecretaria3":
                            window.location.href = "citasecretaria4.html";
                            break;
                        case "certificadonotas1":
                            window.location.href = "certificadonotas2.html";
                            break;
                        case "solicitudgeneral1":
                            window.location.href = "solicitudgeneral2.html";
                            break;
                        case "solicitudgeneral2":
                            window.location.href = "solicitudgeneral3.html";
                            break;

                        case "horario1":
                                window.location.href = "horario2.html";
                                break;
                    }

                    // --------------------- SWIPE HACIA LA IZQUIERDA ---------------------
                } else {
                    switch (titulo_pagina) {
                        case "lunes":
                            window.location.href = "viernes.html";
                            break;
                        case "martes":
                            window.location.href = "lunes.html";
                            break;
                        case "miercoles":
                            window.location.href = "martes.html";
                            break;
                        case "jueves":
                            window.location.href = "miercoles.html";
                            break;
                        case "viernes":
                            window.location.href = "jueves.html";
                            break;

                        case "biblioteca2":
                            window.location.href = "biblioteca1.html";
                            break;
                        case "biblioteca3":
                            window.location.href = "biblioteca2.html";
                            break;
                        case "biblioteca4":
                            window.location.href = "biblioteca3.html";
                            break;
                        case "biblioteca5":
                            window.location.href = "biblioteca4.html";
                            break;
                        case "cafeteria2":
                            window.location.href = "cafeteria1.html";
                            break;
                        case "cafeteria3":
                            window.location.href = "cafeteria2.html";
                            break;
                        case "comedor2":
                            window.location.href = "comedor1.html";
                            break;
                        case "comedor3":
                            window.location.href = "comedor2.html";
                            break;
                        case "comedor4":
                            window.location.href = "comedor3.html";
                            break;
                        case "comedor5":
                            window.location.href = "comedor4.html";
                            break;
                        case "conserjeria2":
                            window.location.href = "conserjeria1.html";
                            break;
                        case "conserjeria3":
                            window.location.href = "conserjeria2.html";
                            break;
                        case "estudiantes2":
                            window.location.href = "estudiantes1.html";
                            break;
                        case "estudiantes3":
                            window.location.href = "estudiantes2.html";
                            break;
                        case "salon2":
                            window.location.href = "salon1.html";
                            break;
                        case "salon3":
                            window.location.href = "salon2.html";
                            break;
                        case "salon4":
                            window.location.href = "salon3.html";
                            break;

                        case "citasecretaria2":
                            window.location.href = "citasecretaria1.html";
                            break;
                        case "citasecretaria3":
                            window.location.href = "citasecretaria2.html";
                            break;
                        case "citasecretaria4":
                            window.location.href = "citasecretaria3.html";
                            break;
                        case "certificadonotas2":
                            window.location.href = "certificadonotas1.html";
                            break;
                        case "solicitudgeneral2":
                            window.location.href = "solicitudgeneral1.html";
                            break;
                        case "solicitudgeneral3":
                            window.location.href = "solicitudgeneral2.html";
                            break;

                        case "horario2":
                                window.location.href = "horario1.html";
                                break;
                    }
                }


            }
        }

        // -------------------- GESTO SELECCIONAR CERRANDO PUÑO --------------
        // en función del documento HTML abierto, se hará una cosa u otra....

        switch (titulo_pagina) {
            // --------------------- INICIO ---------------------
            case "inicio":
                //calculamos la posicion del boton a acceder
                var boton = document.getElementById("acceso");
                var pos_boton = boton.getBoundingClientRect();
                if (esta_dentro(posX, posY, pos_boton)) {
                    if (GestoManoCerradaDetectado(frame)) {
                        window.location.href = "../html/menu.html";
                    }
                }
                else {
                    //cuando estemos fuera del boton, reiniciamos
                    manoAbiertaAnterior = false;
                }
                break;

            // --------------------- MENÚ DE OPCIONES ---------------------
            case "menu":
                //tomamos la posicion de las diferentes opciones seleccionables dentro del menú
                if (calcular_posicion_botones) {
                    botones_menu = document.getElementsByClassName('opciones_menu');
                    calcular_posicion_botones = false;
                }

                Array.from(botones_menu).forEach(function (opcion) {
                    if (esta_dentro(posX, posY, opcion.getBoundingClientRect())) {
                        if (GestoManoCerradaDetectado(frame)) {
                            switch (opcion.id) {
                                case "menu5":
                                    window.location.href = "../html/proximamente.html";
                                    break;
                                case "menu4":
                                    window.location.href = "../html/profes.html";
                                    break;
                                case "menu6":
                                    window.location.href = "../html/zonascomunes.html";
                                    break;
                                case "menu3":
                                    window.location.href = "../html/comedor.html";
                                    break;
                                case "menu2":
                                    window.location.href = "../html/tramites.html";
                                    break;
                                case "menu7":
                                    window.location.href = "../html/serviciosexternos.html";
                                    break;

                                case "menu1":
                                    window.location.href = "../html/docencia.html";
                                    break;
                            }
                        }

                    }
                });
                break;

            // --------------------- COMEDOR (SELECCIÓN DE DÍAS) ---------------------
            case "comedor":
                //tomamos la posicion de las diferentes opciones seleccionables dentro del menú
                if (calcular_posicion_botones) {
                    botones_comedor = document.getElementsByClassName('opciones_comedor');
                    calcular_posicion_botones = false;
                }

                Array.from(botones_comedor).forEach(function (opcion) {
                    if (esta_dentro(posX, posY, opcion.getBoundingClientRect())) {
                        if (GestoManoCerradaDetectado(frame)) {
                            switch (opcion.id) {
                                case "lunes":
                                    window.location.href = "../html/comedor/lunes.html";
                                    break;
                                case "martes":
                                    window.location.href = "../html/comedor/martes.html";
                                    break;
                                case "miercoles":
                                    window.location.href = "../html/comedor/miercoles.html";
                                    break;
                                case "jueves":
                                    window.location.href = "../html/comedor/jueves.html";
                                    break;
                                case "viernes":
                                    window.location.href = "../html/comedor/viernes.html";
                                    break;
                                case "salir":
                                    window.location.href = "../html/menu.html";
                                    break;
                            }
                        }

                    }
                });
                break;

            // --------------------- ZONASCOMUNES (SELECCIÓN DE ESPACIOS COMUNES) ---------------------
            case "zonascomunes":
                //tomamos la posicion de las diferentes opciones seleccionables dentro del menú
                if (calcular_posicion_botones) {
                    botones_zonacomun = document.getElementsByClassName('opciones_zonacomun');
                    calcular_posicion_botones = false;
                }

                Array.from(botones_zonacomun).forEach(function (opcion) {
                    if (esta_dentro(posX, posY, opcion.getBoundingClientRect())) {
                        if (GestoManoCerradaDetectado(frame)) {
                            switch (opcion.id) {
                                case "comedor":
                                    window.location.href = "../html/zonascomunes/comedor1.html";
                                    break;
                                case "cafeteria":
                                    window.location.href = "../html/zonascomunes/cafeteria1.html";
                                    break;
                                case "biblioteca":
                                    window.location.href = "../html/zonascomunes/biblioteca1.html";
                                    break;
                                case "salaestudiantes":
                                    window.location.href = "../html/zonascomunes/estudiantes1.html";
                                    break;
                                case "salondeactos":
                                    window.location.href = "../html/zonascomunes/salon1.html";
                                    break;
                                case "salir":
                                    window.location.href = "../html/menu.html";
                                    break;
                            }
                        }

                    }
                });
                break;

            // --------------------- PROFESORES (SELECCIÓN DE ASIGNATURAS) ---------------------
            case "profes":
                //tomamos la posicion de las diferentes opciones seleccionables dentro del menú
                if (calcular_posicion_botones) {
                    botones_zonacomun = document.getElementsByClassName('opciones_profesor');
                    calcular_posicion_botones = false;
                }

                Array.from(botones_zonacomun).forEach(function (opcion) {
                    if (esta_dentro(posX, posY, opcion.getBoundingClientRect())) {
                        if (GestoManoCerradaDetectado(frame)) {
                            switch (opcion.id) {
                                case "npi":
                                    window.location.href = "../html/profes/NPI.html";
                                    break;
                                case "pl":
                                    window.location.href = "../html/profes/PL.html";
                                    break;
                                case "ptc":
                                    window.location.href = "../html/profes/PTC.html";
                                    break;
                                case "ss":
                                    window.location.href = "../html/profes/SS.html";
                                    break;
                                case "tic":
                                    window.location.href = "../html/profes/TIC.html";
                                    break;
                                case "vc":
                                    window.location.href = "../html/profes/VC.html";
                                    break;
                                case "salir":
                                    window.location.href = "../html/menu.html";
                                    break;
                            }
                        }

                    }
                });
                break;

            // --------------------- TRÁMITES (SELECCIÓN DE TRÁMITES) ---------------------
            case "tramites":
                //tomamos la posicion de las diferentes opciones seleccionables dentro del menú
                if (calcular_posicion_botones) {
                    botones_zonacomun = document.getElementsByClassName('opciones_tramites');
                    calcular_posicion_botones = false;
                }

                Array.from(botones_zonacomun).forEach(function (opcion) {
                    if (esta_dentro(posX, posY, opcion.getBoundingClientRect())) {
                        if (GestoManoCerradaDetectado(frame)) {
                            switch (opcion.id) {
                                case "solicitudgeneral":
                                    window.location.href = "../html/tramites/solicitudgeneral1.html";
                                    break;
                                case "certificadonotas":
                                    window.location.href = "../html/tramites/certificadonotas1.html";
                                    break;
                                case "citasecretaria":
                                    window.location.href = "../html/tramites/citasecretaria1.html";
                                    break;
                                case "salir":
                                    window.location.href = "../html/menu.html";
                                    break;
                            }
                        }

                    }
                });
                break;

            // --------------------- SERVICIOS EXTERNOS (SELECCIÓN DE SERVICIOS EXTERNOS) ---------------------
            case "serviciosexternos":
                //tomamos la posicion de las diferentes opciones seleccionables dentro del menú
                if (calcular_posicion_botones) {
                    botones_zonacomun = document.getElementsByClassName('opciones_serviciosexternos');
                    calcular_posicion_botones = false;
                }

                Array.from(botones_zonacomun).forEach(function (opcion) {
                    if (esta_dentro(posX, posY, opcion.getBoundingClientRect())) {
                        if (GestoManoCerradaDetectado(frame)) {
                            switch (opcion.id) {
                                case "rectorado":
                                    window.location.href = "../html/rutas/rectorado.html";
                                    break;
                                case "espaciosdeportivos":
                                    window.location.href = "../html/rutas/deportivos.html";
                                    break;
                                case "practicasempresa":
                                    window.location.href = "../html/rutas/practicasempresa.html";
                                    break;
                                case "churreria":
                                    window.location.href = "../html/rutas/churreria.html";
                                    break;
                                case "salir":
                                    window.location.href = "../html/menu.html";
                                    break;
                            }
                        }

                    }
                });
                break;

            // --------------------- PROXIMAMENTE (SELECCIÓN DE VUELTA ATRÁS) ---------------------
            case "proximamente":
                //tomamos la posicion de las diferentes opciones seleccionables dentro del menú
                if (calcular_posicion_botones) {
                    botones_zonacomun = document.getElementsByClassName('opciones_proximamente');
                    calcular_posicion_botones = false;
                }

                Array.from(botones_zonacomun).forEach(function (opcion) {
                    if (esta_dentro(posX, posY, opcion.getBoundingClientRect())) {
                        if (GestoManoCerradaDetectado(frame)) {
                            switch (opcion.id) {
                                case "salir":
                                    window.location.href = "../html/menu.html";
                                    break;
                            }
                        }

                    }
                });
                break;

            // --------------------- MENÚS DE CADA DÍA DEL COMEDOR (SELECCIÓN DE OPCIONES) ---------------------
            case "lunes":
            case "martes":
            case "miercoles":
            case "jueves":
            case "viernes":
                //tomamos la posicion de las diferentes opciones seleccionables dentro del menú
                if (calcular_posicion_botones) {
                    botones_dentrocomedor = document.getElementsByClassName('opciones_comedor');
                    calcular_posicion_botones = false;
                }

                Array.from(botones_dentrocomedor).forEach(function (opcion) {
                    if (esta_dentro(posX, posY, opcion.getBoundingClientRect())) {
                        if (GestoManoCerradaDetectado(frame)) {
                            switch (opcion.id) {
                                case "comer":
                                    window.location.href = "menucomer.html";
                                    break;
                                case "llevar":
                                    window.location.href = "menullevar.html";
                                    break;
                                case "salir":
                                    window.location.href = "../../html/comedor.html";
                                    break;
                            }
                        }

                    }
                });
                break;

            // --------------------- OPCIÓN DE SALIR DENTRO DE CADA ASIGNATURA ---------------------
            case "npi":
            case "pl":
            case "ptc":
            case "ss":
            case "tic":
            case "vc":
                //tomamos la posicion de las diferentes opciones seleccionables dentro del menú
                if (calcular_posicion_botones) {
                    botones_dentrocomedor = document.getElementsByClassName('opciones_profesor');
                    calcular_posicion_botones = false;
                }

                Array.from(botones_dentrocomedor).forEach(function (opcion) {
                    if (esta_dentro(posX, posY, opcion.getBoundingClientRect())) {
                        if (GestoManoCerradaDetectado(frame)) {
                            switch (opcion.id) {
                                case "salir":
                                    window.location.href = "../../html/profes.html";
                                    break;
                            }
                        }

                    }
                });
                break;
        };
    }

    // ------------------ GESTO ZOOM CON DEDOS ÍNDICES ----------------
    // -------------------- TRATAMOS LAS DOS MANOS --------------------

    if (frame.hands.length >= 2) {
        var boton = document.getElementById("cursor");
        // Configuramos el estilo del cursor de una mano para que no sea visible
        boton.style.display = "none";

        // obtenemos la mano derecha
        var primeraMano = frame.hands[0];

        if (primeraMano.type === "left") {
            var left_hand = frame.hands[0];
            var right_hand = frame.hands[1];
        } else {
            var left_hand = frame.hands[1];
            var right_hand = frame.hands[0];
        }

        // obtenemos los puntos de la palma de cada mano
        var puntoizquierda = left_hand.palmPosition;
        var puntoderecha = right_hand.palmPosition;

        var iBox = frame.interactionBox;
        var punto_normalizadoizquierda = iBox.normalizePoint(puntoizquierda, true);
        var punto_normalizadoderecha = iBox.normalizePoint(puntoderecha, true);

        var appWidth = window.innerWidth;
        var appHeight = window.innerHeight;
        var posXizquierda = punto_normalizadoizquierda[0] * appWidth;
        var posYizquierda = (1 - punto_normalizadoizquierda[1]) * appHeight;
        var posXderecha = punto_normalizadoderecha[0] * appWidth;
        var posYderecha = (1 - punto_normalizadoderecha[1]) * appHeight;

        //posicionamos los punteros
        var cursord1 = document.getElementById("cursord1");
        cursord1.style.display = "block";
        cursord1.style.left = posXizquierda + 'px';
        cursord1.style.top = posYizquierda + 'px';

        var cursord2 = document.getElementById("cursord2");
        cursord2.style.display = "block";
        cursord2.style.left = posXderecha + 'px';
        cursord2.style.top = posYderecha + 'px';

        // miramos si tenemos los dos indices extendidos y ninguno de los otros dedos extendidos
        indiceIzquierdo = left_hand.fingers[1].extended;
        indiceDerecho = right_hand.fingers[1].extended;

        for (let i = 0; i < 5; i++) {
            if (i != 1) {
                indiceIzquierdo = !left_hand.fingers[i].extended;
                indiceDerecho = !right_hand.fingers[i].extended;
            }
        }

        // Si ambas manos tienen solo esos dedos arriba, podemos proceder a realizar el zoom
        if (indiceIzquierdo && indiceDerecho) {
            // El nuevo ancho de la imagen será la distancia entre las dos manos en el eje X, dividido del tamaño de la página y dividido por el máximo factor de zoom que queremos
            newWidth = Math.abs(posXderecha - posXizquierda) / (window.innerWidth / 1.8);
            // document.documentElement.style.zoom = newWidth;
            document.documentElement.style.transform = `scale(${newWidth})`;
        }
    }

});