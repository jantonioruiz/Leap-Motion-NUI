
document.addEventListener("DOMContentLoaded", function(){// Array con las URLs de tus GIFs
    var gifs = ["../images/despIzq.gif", "../images/despDcha.gif", "../images/atras.gif", "../images/zoom.gif", "../images/moverPulsar.gif"];
    var textos = ["Desplazar hacia la izquierda", "Desplazar hacia la derecha",
                    "Volver atrás", "Hacer zoom", "Hacer \"click\" en algún botón"]
    // Obtener el elemento de la imagen
    var imgElement = document.getElementById("GIFTutorial");
    var textElement = document.getElementById("textoGIF");

    // Función para cambiar el GIF cada cierto tiempo
    function cambiarGIF() {
        var indice = 0;

        // Utilizar setInterval para cambiar el GIF cada 3 segundos (3000 milisegundos)
        setInterval(function() {
            imgElement.src = gifs[indice];
            textElement.textContent = textos[indice]
            indice = (indice + 1) % gifs.length;
        }, 5000);
    }

    // Llamar a la función cuando la página se carga
    window.onload = cambiarGIF;
})
