// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização
    initializeApp();
    
    // Navegação mobile
    initMobileNavigation();
    
    // Animações de scroll
    initScrollAnimations();
    
    // Modal de produtos
    initProductModals();
    
    // Formulário de contato
    initContactForm();
    
    // Efeitos especiais
    initSpecialEffects();
    
    // Loading screen
    initLoadingScreen();
    
    // Header scroll effect
    initHeaderScrollEffect();
});

// Inicialização principal
function initializeApp() {
    console.log('🍰 Ateliê D\'Lissa - Site carregado com sucesso!');
    
    // Adiciona classes para animações
    document.body.classList.add('loaded');
    
    // Smooth scroll para links internos
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
}

// Navegação mobile
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Animações de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animação especial para contadores
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    document.querySelectorAll('.produto-card, .galeria-item, .stat-item, .valor-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Animação de contadores
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const suffix = element.textContent.includes('+') ? '+' : '';
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Modal de produtos
function initProductModals() {
    const produtos = [
        {
            nome: 'Brigadeiros Gourmet',
            descricao: 'Brigadeiros artesanais feitos com chocolate belga premium, disponíveis em diversos sabores únicos como pistache, maracujá, café e muito mais. Cada brigadeiro é cuidadosamente moldado à mão e decorado com ingredientes selecionados.',
            preco: 'R$ 25,00',
            imagem: 'images/brigadeiros.jpg',
            detalhes: 'Caixa com 12 unidades • Validade: 7 dias • Ingredientes premium'
        },
        {
            nome: 'Maçãs do Amor',
            descricao: 'Maçãs frescas cobertas com chocolate ao leite ou branco, decoradas com confeitos coloridos, castanhas ou coco ralado. Uma explosão de sabores que combina a acidez da maçã com a doçura do chocolate.',
            preco: 'R$ 30,00',
            imagem: 'images/macas_amor.jpg',
            detalhes: 'Unidade • Maçãs selecionadas • Chocolate premium'
        },
        {
            nome: 'Brownies Artesanais',
            descricao: 'Brownies úmidos e intensos feitos com chocolate 70% cacau, nozes e um toque especial de flor de sal. Textura perfeita entre o cremoso e o consistente, derretendo na boca a cada mordida.',
            preco: 'R$ 40,00',
            imagem: 'images/trufas.jpg',
            detalhes: 'Fatia generosa • Chocolate 70% • Nozes premium'
        },
        {
            nome: 'Trufas Elegantes',
            descricao: 'Trufas sofisticadas com recheios cremosos de sabores exclusivos como champagne, licor de avelã, frutas vermelhas e chocolate amargo. Cada trufa é uma pequena obra de arte gastronômica.',
            preco: 'R$ 50,00',
            imagem: 'images/trufas_elegantes.jpg',
            detalhes: 'Caixa com 8 unidades • Sabores exclusivos • Apresentação elegante'
        },
        {
            nome: 'Bolachas Decoradas',
            descricao: 'Bolachas amanteigadas decoradas com glacê real em designs personalizados para ocasiões especiais. Cada bolacha é pintada à mão com técnicas artísticas que transformam o doce em arte comestível.',
            preco: 'R$ 60,00',
            imagem: 'images/bolachas_decoradas.jpg',
            detalhes: 'Kit com 6 unidades • Design personalizado • Glacê real'
        },
        {
            nome: 'Mini Bolos',
            descricao: 'Mini bolos individuais com massa fofa e coberturas elaboradas, perfeitos para celebrações íntimas. Disponíveis em sabores como red velvet, limão siciliano, chocolate com morango e baunilha.',
            preco: 'R$ 70,00',
            imagem: 'images/mini_bolos.jpg',
            detalhes: 'Kit com 4 unidades • Sabores variados • Decoração artesanal'
        }
    ];
    
    // Cria modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-body">
                <img src="" alt="" class="modal-image">
                <div class="modal-info">
                    <h3 class="modal-title"></h3>
                    <p class="modal-description"></p>
                    <span class="modal-price"></span>
                    <p class="modal-details"></p>
                    <button class="btn btn-primary modal-order">Fazer Pedido</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Event listeners para botões "Ver Detalhes"
    document.querySelectorAll('.btn-ver-mais').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const produto = produtos[index];
            if (produto) {
                showProductModal(produto);
            }
        });
    });
    
    // Fecha modal
    modal.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Botão de pedido no modal
    modal.querySelector('.modal-order').addEventListener('click', () => {
        modal.style.display = 'none';
        document.querySelector('#contato').scrollIntoView({ behavior: 'smooth' });
    });
    
    function showProductModal(produto) {
        modal.querySelector('.modal-image').src = produto.imagem;
        modal.querySelector('.modal-image').alt = produto.nome;
        modal.querySelector('.modal-title').textContent = produto.nome;
        modal.querySelector('.modal-description').textContent = produto.descricao;
        modal.querySelector('.modal-price').textContent = produto.preco;
        modal.querySelector('.modal-details').textContent = produto.detalhes;
        modal.style.display = 'block';
    }
}

// Formulário de contato
function initContactForm() {
    const form = document.querySelector('.contato-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = form.querySelector('#nome').value.trim();
            const email = form.querySelector('#email').value.trim();
            const mensagem = form.querySelector('#mensagem').value.trim();
            
            if (!nome || !email || !mensagem) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Simula envio
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Validação em tempo real
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', validateField);
            field.addEventListener('input', clearFieldError);
        });
    }
}

// Validação de campo
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove erro anterior
    clearFieldError(e);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'E-mail inválido');
        return false;
    }
    
    return true;
}

// Limpa erro do campo
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Mostra erro no campo
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#E91E63';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.5rem';
    
    field.parentNode.appendChild(errorDiv);
}

// Validação de e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(45deg, #4CAF50, #66BB6A)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(45deg, #F44336, #EF5350)';
    } else {
        notification.style.background = 'linear-gradient(45deg, #2196F3, #42A5F5)';
    }
    
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Efeitos especiais
function initSpecialEffects() {
    // Partículas flutuantes
    createFloatingParticles();
    
    // Efeito parallax no hero
    initParallaxEffect();
    
    // Hover effects nos cards
    initCardHoverEffects();
}

// Partículas flutuantes
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'sparkle';
    
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    
    particle.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: 100%;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(45deg, #E91E63, #FF6B9D);
        border-radius: 50%;
        animation: floatUp ${animationDuration}s linear infinite;
        animation-delay: ${delay}s;
        opacity: 0.7;
    `;
    
    container.appendChild(particle);
    
    // Remove e recria a partícula
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container);
        }
    }, (animationDuration + delay) * 1000);
}

// Adiciona CSS para animação das partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .error {
        border-color: #E91E63 !important;
        box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1) !important;
    }
    
    .modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: center;
    }
    
    .modal-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 15px;
    }
    
    .modal-info h3 {
        color: #E91E63;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    
    .modal-info p {
        color: #6D4C41;
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    
    .modal-price {
        font-size: 1.5rem;
        font-weight: 700;
        color: #E91E63;
        display: block;
        margin-bottom: 1rem;
    }
    
    .modal-details {
        font-size: 0.9rem;
        color: #8D6E63;
        font-style: italic;
        margin-bottom: 1.5rem;
    }
    
    @media (max-width: 768px) {
        .modal-body {
            grid-template-columns: 1fr;
        }
        
        .modal-image {
            height: 200px;
        }
    }
`;
document.head.appendChild(style);

// Efeito parallax
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero.querySelector('.hero-decoration')) {
            hero.querySelector('.hero-decoration').style.transform = `translateY(${rate}px)`;
        }
    });
}

// Hover effects nos cards
function initCardHoverEffects() {
    document.querySelectorAll('.produto-card, .galeria-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Loading screen
function initLoadingScreen() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p style="margin-top: 1rem; color: #E91E63; font-weight: 500;">Carregando delícias...</p>
        </div>
    `;
    
    document.body.appendChild(loading);
    
    // Remove loading após 2 segundos
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            if (loading.parentNode) {
                loading.parentNode.removeChild(loading);
            }
        }, 500);
    }, 2000);
}

// Header scroll effect - REMOVIDO para manter header sempre fixo e simples
function initHeaderScrollEffect() {
    // Header agora permanece sempre fixo no topo com design simples
    // Sem efeitos de mudança baseados no scroll
    console.log('Header fixo inicializado');
}

// Galeria lightbox
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.querySelectorAll('.galeria-item').forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    showLightbox(img.src, img.alt);
                }
            });
        });
    }, 100);
});

function showLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10002;
        backdrop-filter: blur(10px);
    `;
    
    lightbox.innerHTML = `
        <div style="position: relative; max-width: 90%; max-height: 90%;">
            <img src="${src}" alt="${alt}" style="max-width: 100%; max-height: 100%; border-radius: 10px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
            <button style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 2rem; cursor: pointer; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.2);">&times;</button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Fecha lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.tagName === 'BUTTON') {
            document.body.removeChild(lightbox);
        }
    });
    
    // ESC para fechar
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(lightbox);
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

// Integração WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.querySelectorAll('.social-link').forEach(link => {
            if (link.querySelector('.fa-whatsapp')) {
                link.href = 'https://wa.me/5511999999999?text=Olá! Gostaria de fazer um pedido no Ateliê D\'Lissa';
                link.target = '_blank';
            }
        });
    }, 100);
});

// Performance optimization
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

// Otimiza eventos de scroll
const optimizedScrollHandler = debounce(() => {
    // Scroll handlers otimizados aqui
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

console.log('🎉 Ateliê D\'Lissa - Todas as funcionalidades carregadas!');

