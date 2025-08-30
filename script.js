let audioActual = null;
let cancionActual = null;

document.addEventListener('DOMContentLoaded', function() {
    inicializarReproductor();
    inicializarAnimaciones();
    inicializarObservadores();
});

function inicializarReproductor() {
    reproducirAutomaticamente();
    
    document.getElementById('musicToggle').addEventListener('click', function() {
        document.getElementById('musicList').classList.toggle('show');
    });
    
    document.addEventListener('click', function(event) {
        const musicMenu = document.querySelector('.music-menu');
        if (!musicMenu.contains(event.target)) {
            document.getElementById('musicList').classList.remove('show');
        }
    });
}

function inicializarAnimaciones() {
    dibujarFlores();
    
    window.addEventListener('resize', function() {
        clearTimeout(this.redibujarTimeout);
        this.redibujarTimeout = setTimeout(dibujarFlores, 200);
    });
}

function inicializarObservadores() {
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
}

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
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

function dibujarFlores() {
    const canvas = document.getElementById('floresCanvas');
    if (!canvas.getContext) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F7FA');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    ctx.beginPath();
    ctx.arc(50, 50, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(100, 80, 20, 0, Math.PI * 2);
    ctx.arc(130, 70, 25, 0, Math.PI * 2);
    ctx.arc(160, 80, 20, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(300, 60, 15, 0, Math.PI * 2);
    ctx.arc(320, 50, 20, 0, Math.PI * 2);
    ctx.arc(340, 60, 15, 0, Math.PI * 2);
    ctx.fill();
    
    const alturaPasto = 80;
    ctx.fillStyle = '#7CB342';
    ctx.fillRect(0, height - alturaPasto, width, alturaPasto);
    
    const coloresFlores = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEB'];
    
    const numFlores = 12;
    const espacioEntreFlores = width / (numFlores + 1);
    
    for (let i = 1; i <= numFlores; i++) {
        const x = i * espacioEntreFlores;
        const y = height - alturaPasto / 2 + (Math.random() * 10 - 5);
        const color = coloresFlores[i % coloresFlores.length];
        dibujarFlor(ctx, x, y, color);
    }
}

function dibujarFlor(ctx, x, y, color) {
    const alturaTallo = 50;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + alturaTallo);
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.ellipse(x - 8, y + 15, 6, 3, Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = '#66BB6A';
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(x + 8, y + 25, 6, 3, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    
    const numPetals = 6;
    const radius = 15;
    
    for (let i = 0; i < numPetals; i++) {
        const angle = (i * 2 * Math.PI) / numPetals;
        const petalX = x + radius * Math.cos(angle);
        const petalY = y + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(petalX, petalY, 10, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
    
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
}

//Dios, Assembly y la Patria
/*Edrem*/