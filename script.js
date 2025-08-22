let audioActual = null;
let cancionActual = null;

const canciones = [
    'musica/totoro.mp3',
    'musica/laVieEnRose.mp3',
    'musica/springDay.mp3',
    'musica/HowlsMovingCastleTheme.mp3',
    'musica/HappyBirthday.mp3'
];

function reproducirAutomaticamente() {
    const audioPlayer = document.getElementById('audioPlayer');
    
    audioPlayer.src = 'musica/totoro.mp3';
    audioPlayer.volume = 0.3;

    const promesaReproduccion = audioPlayer.play();
    
    if (promesaReproduccion !== undefined) {
        promesaReproduccion.catch(error => {
            console.log('Reproducción automática prevenida por el navegador:', error);
            mostrarMensajeReproduccion();
        });
    }
    
    audioActual = audioPlayer;
}

document.getElementById('musicToggle').addEventListener('click', function() {
    document.getElementById('musicList').classList.toggle('show');
});

document.addEventListener('click', function(event) {
    const musicMenu = document.querySelector('.music-menu');
    if (!musicMenu.contains(event.target)) {
        document.getElementById('musicList').classList.remove('show');
    }
});

function playSong(ruta, elemento) {
    const audioPlayer = document.getElementById('audioPlayer');
    
    if (audioActual) {
        audioActual.pause();
        if (cancionActual) {
            cancionActual.querySelector('i').className = 'fas fa-play-circle';
        }
    }
    
    if (audioActual && audioPlayer.src.includes(ruta)) {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            elemento.querySelector('i').className = 'fas fa-play-circle';
        } else {
            audioPlayer.play();
            elemento.querySelector('i').className = 'fas fa-pause-circle';
        }
    } else {
        audioPlayer.src = ruta;
        audioPlayer.play();
        elemento.querySelector('i').className = 'fas fa-pause-circle';
    }
    
    audioActual = audioPlayer;
    cancionActual = elemento;
    
    audioPlayer.onended = function() {
        elemento.querySelector('i').className = 'fas fa-play-circle';
        audioActual = null;
        cancionActual = null;
    };
}

function mostrarMensajeReproduccion() {
    const mensaje = document.createElement('div');
    mensaje.style.position = 'fixed';
    mensaje.style.top = '20px';
    mensaje.style.left = '50%';
    mensaje.style.transform = 'translateX(-50%)';
    mensaje.style.backgroundColor = 'rgba(0,0,0,0.8)';
    mensaje.style.color = 'white';
    mensaje.style.padding = '10px 20px';
    mensaje.style.borderRadius = '5px';
    mensaje.style.zIndex = '1000';
    mensaje.innerHTML = 'Haz clic en el icono de música para reproducir';
    document.body.appendChild(mensaje);
    
    setTimeout(() => {
        document.body.removeChild(mensaje);
    }, 5000);
}

function enviarWhatsApp() {
    const mensaje = "Acepto una salida a comer postres";
    const url = `https://wa.me/986604448/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

function crearConfeti() {
    const colores = ['#D6C6E6', '#F5AFB0', '#9B6EE0', '#85c1e9', '#F5AFB0'];
    const container = document.body;
    
    for (let i = 0; i < 50; i++) {
        const confeti = document.createElement('div');
        confeti.className = 'confeti';
        confeti.style.left = Math.random() * 100 + 'vw';
        confeti.style.animationDelay = Math.random() * 5 + 's';
        confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        confeti.style.width = (5 + Math.random() * 10) + 'px';
        confeti.style.height = (5 + Math.random() * 10) + 'px';
        confeti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confeti.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(confeti);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    crearConfeti();
    reproducirAutomaticamente();
    
    const elementos = document.querySelectorAll('.animado');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    }, { threshold: 0.1 });
    
    elementos.forEach(el => {
        el.style.opacity = 0;
        el.style.transition = 'opacity 0.5s ease-in-out';
        observer.observe(el);
    });
});