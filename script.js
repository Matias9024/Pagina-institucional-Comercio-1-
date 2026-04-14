// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // Carrusel de Bachilleratos
    const carousel = document.getElementById('academicCarousel');
    const cards = carousel.querySelectorAll('.academic-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Crear indicadores
    function createIndicators() {
        for (let i = 0; i < totalCards; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Actualizar carrusel
    function updateCarousel() {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
        
        // Actualizar clases de las tarjetas
        cards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentIndex) {
                card.classList.add('active');
            }
        });
        
        // Actualizar indicadores
        const indicators = indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
        });
    }
    
    // Ir a una diapositiva específica
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Siguiente diapositiva
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }
    
    // Anterior diapositiva
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }
    
    // Event listeners del carrusel
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play del carrusel (opcional)
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Pausar auto-play al pasar el mouse
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Touch/swipe support para móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    }
    
    // Modal de información detallada
    const modalOverlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const verMasBtns = document.querySelectorAll('.ver-mas-btn');
    
    // Información detallada de cada bachillerato
    const bachilleratosInfo = {
        informatica: {
            icon: 'fas fa-laptop-code',
            title: 'Bachillerato Técnico en Informática',
            description: 'Forma profesionales capaces de diseñar, implementar y mantener sistemas informáticos.',
            duracion: '3 años',
            perfil: {
                ingreso: ['Interés en tecnología', 'Habilidades matemáticas', 'Creatividad', 'Capacidad de resolución'],
                egreso: ['Desarrollo de software', 'Administración de redes', 'Mantenimiento de sistemas', 'Análisis de datos']
            },
            materias: [
                'Programación I, II, III',
                'Bases de Datos',
                'Redes Informáticas',
                'Sistemas Operativos',
                'Desarrollo Web',
                'Seguridad Informática',
                'Hardware y Software',
                'Proyectos de Software'
            ],
            laborales: [
                'Programador',
                'Administrador de Sistemas',
                'Analista de Soporte Técnico',
                'Desarrollador Web',
                'Técnico en Redes'
            ]
        },
        electrotecnia: {
            icon: 'fas fa-bolt',
            title: 'Bachillerato Técnico en Electrotecnia',
            description: 'Prepara técnicos especializados en instalaciones eléctricas y sistemas de control.',
            duracion: '3 años',
            perfil: {
                ingreso: ['Interés en electricidad', 'Habilidades manuales', 'Precisión', 'Seguridad'],
                egreso: ['Instalaciones eléctricas', 'Mantenimiento industrial', 'Control automático', 'Electrónica']
            },
            materias: [
                'Electricidad Básica',
                'Electrotecnia',
                'Instalaciones Eléctricas',
                'Electrónica',
                'Máquinas Eléctricas',
                'Control Industrial',
                'Seguridad Eléctrica',
                'Automatización'
            ],
            laborales: [
                'Electricista',
                'Técnico en Mantenimiento',
                'Instalador Eléctrico',
                'Operador de Máquinas',
                'Técnico en Control'
            ]
        },
        administracion: {
            icon: 'fas fa-briefcase',
            title: 'Bachillerato Técnico en Administración de Negocios',
            description: 'Forma líderes empresariales con conocimientos en gestión y administración.',
            duracion: '3 años',
            perfil: {
                ingreso: ['Liderazgo', 'Comunicación', 'Análisis', 'Trabajo en equipo'],
                egreso: ['Gestión empresarial', 'Marketing', 'Recursos humanos', 'Planificación estratégica']
            },
            materias: [
                'Administración I, II',
                'Contabilidad',
                'Marketing',
                'Recursos Humanos',
                'Economía',
                'Legislación Comercial',
                'Gestión de Proyectos',
                'Emprendimiento'
            ],
            laborales: [
                'Administrador',
                'Gerente de Ventas',
                'Recursos Humanos',
                'Asistente Gerencial',
                'Emprendedor'
            ]
        },
        salud: {
            icon: 'fas fa-heartbeat',
            title: 'Bachillerato Técnico en Salud',
            description: 'Prepara técnicos para el cuidado de la salud y atención primaria.',
            duracion: '3 años',
            perfil: {
                ingreso: ['Vocación de servicio', 'Empatía', 'Responsabilidad', 'Trabajo bajo presión'],
                egreso: ['Atención primaria', 'Primeros auxilios', 'Salud comunitaria', 'Promoción de la salud']
            },
            materias: [
                'Anatomía y Fisiología',
                'Primeros Auxilios',
                'Enfermería Básica',
                'Salud Pública',
                'Farmacología',
                'Nutrición',
                'Psicología General',
                'Ética Profesional'
            ],
            laborales: [
                'Técnico en Enfermería',
                'Promotor de Salud',
                'Auxiliar de Farmacia',
                'Cuidador de Salud',
                'Atención Primaria'
            ]
        },
        marketing: {
            icon: 'fas fa-bullhorn',
            title: 'Bachillerato Técnico en Marketing',
            description: 'Forma especialistas en estrategias de mercado y comunicación comercial.',
            duracion: '3 años',
            perfil: {
                ingreso: ['Creatividad', 'Comunicación', 'Análisis', 'Sociabilidad'],
                egreso: ['Estrategias de marketing', 'Publicidad', 'Análisis de mercado', 'Ventas']
            },
            materias: [
                'Marketing Digital',
                'Publicidad',
                'Comunicación',
                'Investigación de Mercado',
                'Branding',
                'Redes Sociales',
                'Ventas',
                'Comportamiento del Consumidor'
            ],
            laborales: [
                'Community Manager',
                'Publicista',
                'Vendedor',
                'Investigador de Mercado',
                'Estratega de Marketing'
            ]
        },
        contabilidad: {
            icon: 'fas fa-calculator',
            title: 'Bachillerato Técnico en Contabilidad',
            description: 'Prepara expertos en gestión financiera y contabilidad empresarial.',
            duracion: '3 años',
            perfil: {
                ingreso: ['Habilidades numéricas', 'Orden', 'Precisión', 'Ética'],
                egreso: ['Contabilidad financiera', 'Auditoría', 'Impuestos', 'Análisis financiero']
            },
            materias: [
                'Contabilidad I, II, III',
                'Costos',
                'Auditoría',
                'Tributación',
                'Finanzas',
                'Sistemas Contables',
                'Análisis Financiero',
                'Legislación Tributaria'
            ],
            laborales: [
                'Contador',
                'Auditor',
                'Asistente Financiero',
                'Analista de Costos',
                'Asesor Tributario'
            ]
        },
        diseno: {
            icon: 'fas fa-palette',
            title: 'Bachillerato Técnico en Diseño Gráfico',
            description: 'Forma creativos especializados en comunicación visual y diseño digital.',
            duracion: '3 años',
            perfil: {
                ingreso: ['Creatividad', 'Habilidades artísticas', 'Software de diseño', 'Comunicación visual'],
                egreso: ['Diseño gráfico', 'Edición digital', 'Branding', 'Ilustración']
            },
            materias: [
                'Diseño Gráfico I, II',
                'Ilustración Digital',
                'Edición de Imágenes',
                'Diseño Web',
                'Branding',
                'Tipografía',
                'Software de Diseño',
                'Proyectos de Diseño'
            ],
            laborales: [
                'Diseñador Gráfico',
                'Ilustrador',
                'Editor de Imágenes',
                'Diseñador Web',
                'Especialista en Branding'
            ]
        },
        cooperativismo: {
            icon: 'fas fa-users',
            title: 'Bachillerato Técnico en Cooperativismo',
            description: 'Forma líderes en gestión de cooperativas y economía social.',
            duracion: '3 años',
            perfil: {
                ingreso: ['Solidaridad', 'Liderazgo', 'Trabajo en equipo', 'Compromiso social'],
                egreso: ['Gestión cooperativa', 'Economía social', 'Desarrollo comunitario', 'Administración']
            },
            materias: [
                'Cooperativismo I, II',
                'Economía Social',
                'Gestión Cooperativa',
                'Legislación Cooperativa',
                'Desarrollo Comunitario',
                'Contabilidad Cooperativa',
                'Marketing Social',
                'Proyectos Cooperativos'
            ],
            laborales: [
                'Gerente de Cooperativa',
                'Asesor Cooperativo',
                'Promotor Social',
                'Administrador',
                'Desarrollador Comunitario'
            ]
        },
        asistencia: {
            icon: 'fas fa-hands-helping',
            title: 'Bachillerato Técnico en Asistencia',
            description: 'Prepara técnicos en atención al cliente y gestión administrativa.',
            duracion: '3 años',
            perfil: {
                ingreso: ['Servicio al cliente', 'Comunicación', 'Orden', 'Proactividad'],
                egreso: ['Atención al cliente', 'Secretariado', 'Gestión administrativa', 'Comunicación']
            },
            materias: [
                'Atención al Cliente',
                'Secretariado Ejecutivo',
                'Gestión Administrativa',
                'Comunicación Empresarial',
                'Ofimática',
                'Protocolo y Etiqueta',
                'Gestión de la Información',
                'Relaciones Humanas'
            ],
            laborales: [
                'Asistente Administrativo',
                'Secretario/a',
                'Atención al Cliente',
                'Recepcionista',
                'Auxiliar de Gestión'
            ]
        }
    };
    
    // Función para mostrar el modal
    function showModal(bachilleratoKey) {
        const info = bachilleratosInfo[bachilleratoKey];
        if (!info) return;
        
        const modalContent = `
            <div class="modal-header">
                <div class="modal-icon">
                    <i class="${info.icon}"></i>
                </div>
                <h2>${info.title}</h2>
                <p>${info.description}</p>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-clock"></i> Duración</h3>
                <p>${info.duracion}</p>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-user-graduate"></i> Perfil del Ingresante</h3>
                <ul>
                    ${info.perfil.ingreso.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-graduation-cap"></i> Perfil del Egresado</h3>
                <ul>
                    ${info.perfil.egreso.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-book"></i> Materias Principales</h3>
                <ul>
                    ${info.materias.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-briefcase"></i> Salida Laboral</h3>
                <div class="modal-grid">
                    ${info.laborales.map(item => `
                        <div class="modal-grid-item">
                            <h4>${item}</h4>
                            <p>Oportunidad laboral en el sector</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar el modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners para el modal
    verMasBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const bachillerato = btn.dataset.bachillerato;
            showModal(bachillerato);
        });
    });
    
    modalClose.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Inicializar carrusel
    createIndicators();
    updateCarousel();
    startAutoPlay();
    
    // Menú móvil (hamburger)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Scroll suave para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Animación de elementos al hacer scroll (fade-in)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Agregar clase fade-in a elementos que queremos animar
    const animateElements = document.querySelectorAll('.academic-card, .facility-item, .stat, .about-text, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Validación básica
            if (!name || !email || !message) {
                showNotification('Por favor, completa todos los campos obligatorios.', 'error');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor, ingresa un email válido.', 'error');
                return;
            }
            
            // Simular envío del formulario
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular respuesta del servidor
            setTimeout(() => {
                showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type) {
        // Eliminar notificaciones existentes
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        if (type === 'success') {
            notification.style.background = '#27ae60';
        } else if (type === 'error') {
            notification.style.background = '#e74c3c';
        }
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }
    
    // Botón "Conoce Más" del hero
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const aboutSection = document.querySelector('#nosotros');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Contador animado para estadísticas
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Formatear el número
            if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Iniciar contadores cuando sean visibles
    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                
                if (text.includes('1500')) {
                    animateCounter(entry.target, 1500);
                } else if (text.includes('50')) {
                    animateCounter(entry.target, 50);
                } else if (text.includes('98')) {
                    animateCounter(entry.target, 98);
                }
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Efecto parallax suave en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroIcon = document.querySelector('.hero-icon');
        if (heroIcon) {
            heroIcon.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Validación de inputs del formulario en tiempo real
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Eliminar mensaje de error anterior
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        field.classList.remove('error');
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'Este campo es obligatorio');
            isValid = false;
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Ingresa un email válido');
                isValid = false;
            }
        } else if (field.type === 'tel' && value) {
            const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Ingresa un número de teléfono válido');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        field.style.borderColor = '#e74c3c';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    // Agregar estilos para campos con error
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group textarea.error {
            border-color: #e74c3c !important;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            border-color: #3498db !important;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    // Preloader simple (opcional)
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Sistema de Noticias
    class NoticiasManager {
        constructor() {
            this.noticiasGrid = document.getElementById('noticiasGrid');
            this.noticiasPagination = document.getElementById('noticiasPagination');
            this.filtroBtns = document.querySelectorAll('.filtro-btn');
            this.modalOverlay = document.getElementById('modalOverlay');
            this.modalBody = document.getElementById('modalBody');
            this.modalClose = document.getElementById('modalClose');
            
            this.categoriaActual = 'todos';
            this.paginaActual = 1;
            this.noticiasPorPagina = 6;
            
            this.init();
        }
        
        init() {
            this.cargarNoticias();
            this.setupEventListeners();
        }
        
        setupEventListeners() {
            // Event listeners para filtros
            this.filtroBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.filtroBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.categoriaActual = e.target.dataset.categoria;
                    this.paginaActual = 1;
                    this.cargarNoticias();
                });
            });
            
            // Event listener para cerrar modal
            if (this.modalClose) {
                this.modalClose.addEventListener('click', () => this.cerrarModal());
            }
            
            if (this.modalOverlay) {
                this.modalOverlay.addEventListener('click', (e) => {
                    if (e.target === this.modalOverlay) {
                        this.cerrarModal();
                    }
                });
            }
            
            // Cerrar modal con ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modalOverlay.classList.contains('active')) {
                    this.cerrarModal();
                }
            });
        }
        
        obtenerNoticiasFiltradas() {
            if (this.categoriaActual === 'todos') {
                return obtenerNoticiasPorCategoria();
            }
            return obtenerNoticiasPorCategoria(this.categoriaActual);
        }
        
        cargarNoticias() {
            const noticias = this.obtenerNoticiasFiltradas();
            const totalNoticias = noticias.length;
            const totalPages = Math.ceil(totalNoticias / this.noticiasPorPagina);
            
            // Ajustar página actual si es necesario
            if (this.paginaActual > totalPages) {
                this.paginaActual = totalPages || 1;
            }
            
            const startIndex = (this.paginaActual - 1) * this.noticiasPorPagina;
            const endIndex = startIndex + this.noticiasPorPagina;
            const noticiasPagina = noticias.slice(startIndex, endIndex);
            
            this.renderizarNoticias(noticiasPagina);
            this.renderizarPaginacion(totalPages);
        }
        
        renderizarNoticias(noticias) {
            if (!this.noticiasGrid) return;
            
            if (noticias.length === 0) {
                this.noticiasGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                        <i class="fas fa-newspaper" style="font-size: 4rem; color: #ddd; margin-bottom: 1rem;"></i>
                        <h3 style="color: #666; margin-bottom: 0.5rem;">No hay noticias disponibles</h3>
                        <p style="color: #999;">No se encontraron noticias en esta categoría.</p>
                    </div>
                `;
                return;
            }
            
            this.noticiasGrid.innerHTML = noticias.map(noticia => `
                <article class="noticia-card ${noticia.destacado ? 'destacado' : ''}" data-id="${noticia.id}">
                    <div style="overflow: hidden; height: 200px;">
                        <img src="${noticia.imagen}" alt="${noticia.titulo}" class="noticia-imagen" onerror="this.src='https://picsum.photos/seed/default/400/250.jpg'">
                    </div>
                    <div class="noticia-contenido">
                        <span class="noticia-categoria ${noticia.categoria}">${noticia.categoria}</span>
                        <h3 class="noticia-titulo">${noticia.titulo}</h3>
                        <p class="noticia-extracto">${noticia.contenido}</p>
                        <div class="noticia-meta">
                            <div class="noticia-fecha">
                                <i class="far fa-calendar"></i>
                                <span>${formatearFecha(noticia.fecha)}</span>
                            </div>
                            <div class="noticia-autor">${noticia.autor}</div>
                        </div>
                    </div>
                </article>
            `).join('');
            
            // Agregar event listeners a las tarjetas de noticias
            const noticiaCards = this.noticiasGrid.querySelectorAll('.noticia-card');
            noticiaCards.forEach(card => {
                card.addEventListener('click', () => {
                    const noticiaId = parseInt(card.dataset.id);
                    this.mostrarDetalleNoticia(noticiaId);
                });
            });
        }
        
        renderizarPaginacion(totalPages) {
            if (!this.noticiasPagination) return;
            
            if (totalPages <= 1) {
                this.noticiasPagination.innerHTML = '';
                return;
            }
            
            let paginationHTML = '';
            
            // Botón anterior
            paginationHTML += `
                <button class="pagination-btn" ${this.paginaActual === 1 ? 'disabled' : ''} data-page="${this.paginaActual - 1}">
                    <i class="fas fa-chevron-left"></i>
                </button>
            `;
            
            // Números de página
            for (let i = 1; i <= totalPages; i++) {
                if (i === 1 || i === totalPages || (i >= this.paginaActual - 1 && i <= this.paginaActual + 1)) {
                    paginationHTML += `
                        <button class="pagination-btn ${i === this.paginaActual ? 'active' : ''}" data-page="${i}">
                            ${i}
                        </button>
                    `;
                } else if (i === this.paginaActual - 2 || i === this.paginaActual + 2) {
                    paginationHTML += `<span style="padding: 0.5rem;">...</span>`;
                }
            }
            
            // Botón siguiente
            paginationHTML += `
                <button class="pagination-btn" ${this.paginaActual === totalPages ? 'disabled' : ''} data-page="${this.paginaActual + 1}">
                    <i class="fas fa-chevron-right"></i>
                </button>
            `;
            
            this.noticiasPagination.innerHTML = paginationHTML;
            
            // Agregar event listeners a los botones de paginación
            const paginationBtns = this.noticiasPagination.querySelectorAll('.pagination-btn');
            paginationBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const page = parseInt(btn.dataset.page);
                    if (page && page !== this.paginaActual) {
                        this.paginaActual = page;
                        this.cargarNoticias();
                        // Scroll al inicio de la sección de noticias
                        document.getElementById('noticias').scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        }
        
        mostrarDetalleNoticia(noticiaId) {
            const noticia = obtenerNoticiaPorId(noticiaId);
            if (!noticia) return;
            
            const modalContent = `
                <div class="noticia-modal">
                    <div class="noticia-modal-header">
                        <img src="${noticia.imagen}" alt="${noticia.titulo}" class="noticia-modal-imagen" onerror="this.src='https://picsum.photos/seed/default/800/400.jpg'">
                        <div class="noticia-modal-categoria ${noticia.categoria}">${noticia.categoria}</div>
                        <h2 class="noticia-modal-titulo">${noticia.titulo}</h2>
                    </div>
                    <div class="noticia-modal-body">
                        <div class="noticia-modal-meta">
                            <div class="noticia-fecha">
                                <i class="far fa-calendar"></i>
                                <span>${formatearFecha(noticia.fecha)}</span>
                            </div>
                            <div class="noticia-autor">
                                <i class="far fa-user"></i>
                                <span>${noticia.autor}</span>
                            </div>
                        </div>
                        <div class="noticia-modal-contenido">
                            ${noticia.contenido}
                        </div>
                    </div>
                </div>
            `;
            
            if (this.modalBody) {
                this.modalBody.innerHTML = modalContent;
                this.modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
        
        cerrarModal() {
            if (this.modalOverlay) {
                this.modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    }
    
    // Inicializar el sistema de noticias
    const noticiasManager = new NoticiasManager();
    
    console.log('Colegio Comercio 1 - Sitio web cargado exitosamente');
});
