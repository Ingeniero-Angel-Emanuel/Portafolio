// MENU RESPONSIVE
function mostrarOcultarMenu() {
    let nav = document.getElementById("nav");
    if (nav.className === "") {
        nav.className = "responsive";
    } else {
        nav.className = "";
    }
}

function seleccionar() {
    // Ocultar el menú una vez que selecciono una opción
    document.getElementById("nav").className = "";
}

// SMOOTH SCROLLING
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ANIMACIÓN DE BARRAS DE PROGRESO
function efectoHabilidades() {
    const skills = document.getElementById("skills");
    const distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    
    if (distancia_skills >= 300) {
        let habilidades = document.getElementsByClassName("progreso");
        
        // Technical Skills
        habilidades[0].classList.add("autocad");
        habilidades[2].classList.add("plc");
        habilidades[3].classList.add("arduino");
        habilidades[4].classList.add("python");
        
        // Professional Skills
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("liderazgo");
        habilidades[7].classList.add("resolucion");
        habilidades[8].classList.add("trabajo");
    }
}

// DETECCIÓN DE SCROLLING PARA ANIMACIONES
window.onscroll = function() {
    efectoHabilidades();
    changeHeaderBackground();
    showScrollButton();
}

// CAMBIAR FONDO DEL HEADER AL HACER SCROLL
function changeHeaderBackground() {
    const header = document.querySelector('.contenedor-header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(30, 35, 38, 0.98)';
        header.style.backdropFilter = 'blur(15px)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.4)';
    } else {
        header.style.background = 'rgba(30, 35, 38, 0.9)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
}

// MOSTRAR/OCULTAR BOTÓN DE SCROLL TO TOP
function showScrollButton() {
    const scrollButton = document.querySelector('.arriba');
    if (window.scrollY > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.transform = 'translateX(-50%) translateY(0)';
    } else {
        scrollButton.style.opacity = '0.7';
        scrollButton.style.transform = 'translateX(-50%) translateY(5px)';
    }
}

// INTERSECTION OBSERVER PARA ANIMACIONES
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animaciones específicas para cada sección
            if (entry.target.classList.contains('sobremi')) {
                animatePersonalInfo();
            }
            if (entry.target.classList.contains('portfolio')) {
                animateProjects();
            }
            if (entry.target.classList.contains('curriculum')) {
                animateTimeline();
            }
        }
    });
}, observerOptions);

// OBSERVAR TODAS LAS SECCIONES
document.addEventListener('DOMContentLoaded', function() {
    // Preparar elementos para animación
    const sections = document.querySelectorAll('section, .skills, .contacto');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// ANIMACIÓN DE INFORMACIÓN PERSONAL
function animatePersonalInfo() {
    const intereses = document.querySelectorAll('.interes');
    intereses.forEach((interes, index) => {
        setTimeout(() => {
            interes.style.transform = 'scale(1.1)';
            setTimeout(() => {
                interes.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// ANIMACIÓN DE PROYECTOS DEL PORTAFOLIO
function animateProjects() {
    const proyectos = document.querySelectorAll('.proyecto');
    proyectos.forEach((proyecto, index) => {
        setTimeout(() => {
            proyecto.style.opacity = '1';
            proyecto.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
    });
}

// ANIMACIÓN DE TIMELINE DEL CURRICULUM
function animateTimeline() {
    const items = document.querySelectorAll('.curriculum .item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 300);
    });
}

// EFECTO PARALLAX SUAVE
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Aplicar parallax al fondo de inicio
    const inicio = document.querySelector('.inicio::before');
    if (inicio) {
        document.querySelector('.inicio').style.transform = `translateY(${rate}px)`;
    }
});

// EFECTO DE ESCRITURA PARA EL TÍTULO
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Agregar cursor parpadeante al final
            element.innerHTML += '<span class="cursor">|</span>';
            setTimeout(() => {
                const cursor = element.querySelector('.cursor');
                if (cursor) {
                    cursor.style.animation = 'blink 1s infinite';
                }
            }, 500);
        }
    }
    
    type();
}

// INICIALIZAR EFECTOS CUANDO LA PÁGINA CARGA
window.addEventListener('load', () => {
    // Efecto de escritura en el título principal
    const mainTitle = document.querySelector('.contenido-banner h1');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        setTimeout(() => {
            typeWriter(mainTitle, originalText, 100);
        }, 1000);
    }
    
    // Crear partículas flotantes
    createFloatingParticles();
    
    // Animar elementos iniciales
    animateInitialElements();
});

// VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CONTACTO
function setupContactForm() {
    const contactButton = document.querySelector('.contacto button');
    if (contactButton) {
        contactButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener todos los campos del formulario
            const inputs = document.querySelectorAll('.contacto input, .contacto textarea');
            let allFilled = true;
            let hasErrors = false;
            
            // Validar cada campo
            inputs.forEach(input => {
                const value = input.value.trim();
                
                // Remover clases de error previas
                input.classList.remove('error', 'success');
                
                if (!value) {
                    allFilled = false;
                    input.classList.add('error');
                    input.style.borderColor = '#FF6B6B';
                    input.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
                } else {
                    // Validación específica para email
                    if (input.type === 'email' || input.placeholder.toLowerCase().includes('email')) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            hasErrors = true;
                            input.classList.add('error');
                            input.style.borderColor = '#FF6B6B';
                            input.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
                            return;
                        }
                    }
                    
                    // Campo válido
                    input.classList.add('success');
                    input.style.borderColor = '#1CB698';
                    input.style.boxShadow = '0 0 10px rgba(28, 182, 152, 0.3)';
                }
            });
            
            if (allFilled && !hasErrors) {
                // Simular envío exitoso
                this.innerHTML = 'Mensaje Enviado <i class="fa-solid fa-check"></i>';
                this.style.background = 'linear-gradient(135deg, #1CB698, #00A085)';
                this.style.borderColor = '#1CB698';
                this.disabled = true;
                
                // Mostrar mensaje de éxito
                showNotification('¡Mensaje enviado correctamente!', 'success');
                
                // Resetear formulario después de 3 segundos
                setTimeout(() => {
                    this.innerHTML = 'Enviar Mensaje <i class="fa-regular fa-paper-plane"></i>';
                    this.style.background = 'transparent';
                    this.style.borderColor = '#1CB698';
                    this.disabled = false;
                    
                    inputs.forEach(input => {
                        input.value = '';
                        input.classList.remove('success', 'error');
                        input.style.borderColor = 'rgba(28, 182, 152, 0.3)';
                        input.style.boxShadow = 'none';
                    });
                }, 3000);
            } else {
                // Mostrar error
                this.innerHTML = 'Complete todos los campos <i class="fa-solid fa-exclamation"></i>';
                this.style.background = 'linear-gradient(135deg, #FF6B6B, #E85A5A)';
                this.style.borderColor = '#FF6B6B';
                
                showNotification('Por favor, complete todos los campos correctamente', 'error');
                
                setTimeout(() => {
                    this.innerHTML = 'Enviar Mensaje <i class="fa-regular fa-paper-plane"></i>';
                    this.style.background = 'transparent';
                    this.style.borderColor = '#1CB698';
                }, 2000);
            }
        });
    }
}

// SISTEMA DE NOTIFICACIONES
function showNotification(message, type = 'info') {
    // Remover notificación existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fa-solid fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        ${type === 'success' ? 
            'background: linear-gradient(135deg, rgba(28, 182, 152, 0.9), rgba(0, 160, 133, 0.9));' : 
            'background: linear-gradient(135deg, rgba(255, 107, 107, 0.9), rgba(232, 90, 90, 0.9));'
        }
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// CREAR PARTÍCULAS FLOTANTES DECORATIVAS
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    // Crear partículas
    for (let i = 0; i < 15; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    const colors = ['#1CB698', '#FF6B6B', '#00A085', '#E85A5A'];
    const shapes = ['circle', 'square', 'triangle'];
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 6 + 2; // 2-8px
    const duration = Math.random() * 15 + 10; // 10-25s
    const delay = index * 2; // Escalonamiento
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        opacity: 0.4;
        left: ${Math.random() * 100}%;
        top: 100%;
        border-radius: ${shape === 'circle' ? '50%' : shape === 'triangle' ? '0' : '2px'};
        animation: floatUp ${duration}s infinite linear;
        animation-delay: ${delay}s;
        box-shadow: 0 0 10px ${color}40;
    `;
    
    if (shape === 'triangle') {
        particle.style.background = 'transparent';
        particle.style.borderLeft = `${size/2}px solid transparent`;
        particle.style.borderRight = `${size/2}px solid transparent`;
        particle.style.borderBottom = `${size}px solid ${color}`;
        particle.style.width = '0';
        particle.style.height = '0';
    }
    
    container.appendChild(particle);
    
    // Remover partícula después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            // Crear nueva partícula
            setTimeout(() => createParticle(container, index), Math.random() * 5000);
        }
    }, (duration + delay) * 1000);
}

// AÑADIR ANIMACIÓN CSS PARA LAS PARTÍCULAS
function addParticleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.4;
            }
            90% {
                opacity: 0.4;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        .cursor {
            display: inline-block;
            margin-left: 2px;
            color: #1CB698;
        }
        
        .notification i {
            font-size: 16px;
        }
    `;
    document.head.appendChild(style);
}

// ANIMAR ELEMENTOS INICIALES
function animateInitialElements() {
    // Animar logo
    const logo = document.querySelector('.logo a');
    if (logo) {
        logo.style.animation = 'glow 2s ease-in-out infinite alternate';
    }
    
    // Animar iconos de redes sociales
    const socialIcons = document.querySelectorAll('.redes a');
    socialIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.transform = 'translateY(0)';
            icon.style.opacity = '1';
        }, index * 200);
    });
}

// EFECTOS DE HOVER MEJORADOS
function setupHoverEffects() {
    // Efecto hover para proyectos
    const proyectos = document.querySelectorAll('.proyecto');
    proyectos.forEach(proyecto => {
        proyecto.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02) rotateY(2deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        proyecto.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        });
    });
    
    // Efecto hover para skills
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            const progreso = this.querySelector('.progreso');
            if (progreso) {
                progreso.style.boxShadow = '0 0 20px rgba(28, 182, 152, 0.6)';
            }
        });
        
        skill.addEventListener('mouseleave', function() {
            const progreso = this.querySelector('.progreso');
            if (progreso) {
                progreso.style.boxShadow = '0 0 10px rgba(28, 182, 152, 0.4)';
            }
        });
    });
}

// CONTADOR ANIMADO PARA NÚMEROS
function animateCounters() {
    const counters = document.querySelectorAll('.progreso span');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + '%';
        }, 16);
    });
}

// LAZY LOADING PARA IMÁGENES (si las hay)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// INICIALIZACIÓN COMPLETA
document.addEventListener('DOMContentLoaded', function() {
    // Configurar todos los efectos y funcionalidades
    setupContactForm();
    addParticleAnimation();
    setupHoverEffects();
    setupLazyLoading();
    
    // Añadir clase para animaciones CSS
    document.body.classList.add('loaded');
    
    console.log('Portafolio de Angel Emanuel cargado correctamente ✨');
});

// MANEJO DE ERRORES GLOBAL
window.addEventListener('error', function(e) {
    console.error('Error en el portafolio:', e.error);
});

// OPTIMIZACIÓN DE RENDIMIENTO
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimizar eventos de scroll
window.onscroll = debounce(function() {
    efectoHabilidades();
    changeHeaderBackground();
    showScrollButton();
}, 10);