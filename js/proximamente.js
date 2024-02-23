document.addEventListener('DOMContentLoaded', function () {
    // Establecemos la fecha de finalización 
    var countDownDate = new Date("Jan 31, 2024 00:00:00").getTime();

    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Actualizamos los elementos HTML con los valores calculados
        document.getElementById("days").innerHTML = padZero(days);
        document.getElementById("hours").innerHTML = padZero(hours);
        document.getElementById("minutes").innerHTML = padZero(minutes);
        document.getElementById("seconds").innerHTML = padZero(seconds);

        // Si el contador llega a cero, mostramos un mensaje de página disponible
        if (distance < 0) {
            clearInterval(x);
            document.querySelector('.countdown').innerHTML = '<p>La página está disponible ahora. ¡Bienvenido!</p>';
        }
    }, 1000);

    function padZero(number) {
        return (number < 10) ? "0" + number : number;
    }
});