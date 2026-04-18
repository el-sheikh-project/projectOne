document.addEventListener('DOMContentLoaded', () => {
    // 1. تحديث السنة في الفوتر
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // 2. تفعيل القائمة الجانبية في الشاشات الصغيرة (Mobile Menu)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // تغيير أيقونة القائمة
            const icon = navToggle.querySelector('i');
            if(navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // إغلاق القائمة عند النقر على أي رابط
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // 3. تأثير شريط التنقل عند التمرير (Sticky Navbar)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. تحديث الرابط النشط بناءً على القسم الحالي (Scrollspy)
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-menu ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. تأثير الطباعة الديناميكي (Typing Effect)
    const typingText = document.querySelector('.typing-text');
    if(typingText) {
        const words = ['إلكتروميكانيكس', 'أنظمة تحكم', 'أتمتة صناعية'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if(isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typingSpeed = isDeleting ? 50 : 100;
            
            if(!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 2000; // وقت الانتظار قبل بدء المسح
            } else if(isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // وقت الانتظار قبل كتابة الكلمة الجديدة
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        // بَدء الحركة بعد تأخير بسيط
        setTimeout(typeEffect, 1000);
    }

    // 6. التعامل مع نموذج المراسلة (Contact Form)
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            // تأثير تحميل وهمي
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> جاري الإرسال...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> تم إرسال رسالتك بنجاح!';
                btn.style.backgroundColor = '#10B981'; // لون أخضر للنجاح
                btn.style.color = '#fff';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
