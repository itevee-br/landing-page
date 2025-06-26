// hamburguer
const hamburguer = document.querySelector('.hamburguer');
const navLinks = document.querySelector('.nav-links');

hamburguer.addEventListener('click', () => {
    hamburguer.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Animação ao rolar
const aboutSection = document.querySelector('.about-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

observer.observe(aboutSection);

// Carrossel aprimorado
const items = Array.from(document.querySelectorAll('.carousel-item'));
const total = items.length;
let current = 0;

function updateCarousel() {
    items.forEach((item, i) => {
        item.classList.remove('prev', 'active', 'next', 'slide-left', 'slide-right');
        // cálculo de posição relativa
        const rel = (i - current + total) % total;
        if (rel === 0) {
            item.classList.add('active');
        } else if (rel === 1) {
            item.classList.add('next');
        } else if (rel === total - 1) {
            item.classList.add('prev');
        }
    });
}

// avança
function goNext() {
    current = (current + 1) % total;
    updateCarousel();
}

// retrocede
function goPrev() {
    current = (current - 1 + total) % total;
    updateCarousel();
}

// Event listeners para os botões
document.querySelector('.carousel-btn.next')?.addEventListener('click', goNext);
document.querySelector('.carousel-btn.prev')?.addEventListener('click', goPrev);

// autoplay
let auto = setInterval(goNext, 5000);
const wrapper = document.querySelector('.carousel-wrapper');
if (wrapper) {
    wrapper.addEventListener('mouseenter', () => clearInterval(auto));
    wrapper.addEventListener('mouseleave', () => auto = setInterval(goNext, 5000));
}

// inicializa
updateCarousel();


// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Fecha o menu mobile se estiver aberto
            if (window.innerWidth <= 768) {
                document.querySelector('.hamburguer').classList.remove('active');
                document.querySelector('.nav-links').classList.remove('active');
            }
            
            // Scroll suave
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Ajuste para a navbar fixa
                behavior: 'smooth'
            });
        }
    });
});