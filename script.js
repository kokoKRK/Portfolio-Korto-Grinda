document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    // Ouvrir le menu au survol
    navToggle.addEventListener('mouseenter', function() {
        navMenu.classList.add('active');
    });

    // Fermer le menu quand la souris quitte la zone de navigation
    document.querySelector('nav').addEventListener('mouseleave', function() {
        navMenu.classList.remove('active');
    });

    // Garder le menu ouvert pendant la navigation dans le menu
    navMenu.addEventListener('mouseenter', function() {
        navMenu.classList.add('active');
    });

    // Défilement fluide amélioré avec animation personnalisée
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 70;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const ease = easeInOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                function easeInOutCubic(t) {
                    return t < 0.5 
                        ? 4 * t * t * t 
                        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                }

                requestAnimationFrame(animation);
            }
        });
    });
}); 