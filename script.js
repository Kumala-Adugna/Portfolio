document.addEventListener("DOMContentLoaded", () => {
    
    // elements needed for mobile menu interactions
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");
    
    // ==========================================
    // 1. SMOOTH SCROLLING INTERPOLATION LOGIC
    // ==========================================
    
    // Select ALL anchor elements whose href attributes start with '#'
    const navLinks = document.querySelectorAll('a[href^="#"]');

    // Loop through each interactive element to apply smooth scroll logic
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            
            // Extract the anchor path targets (e.g., "#contact")
            const targetId = link.getAttribute("href");

            // Ignore raw placeholder hash links to prevent unexpected jumps
            if (targetId === "#") return;

            if (targetId && targetId.startsWith("#")) {
                const targetSection = document.querySelector(targetId);

                // SAFETY CHECK: Only intercept and scroll if the target element exists in your HTML
                if (targetSection) {
                    event.preventDefault(); // Halt instant browser jump cuts
                    
                    // [UPDATED FOR MOBILE UX] Auto-close the mobile side drawer when a link is clicked
                    if (hamburger && navMenu) {
                        hamburger.classList.remove("active");
                        navMenu.classList.remove("active");
                    }
                    
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                } else {
                    console.warn(`Target section "${targetId}" was not found in the HTML DOM structure.`);
                }
            }
        });
    });

    // ==========================================
    // 2. INTERACTIVE TERMINAL TYPEWRITER ENGINE
    // ==========================================
    
    const words = ["Full-Stack Developer.", "CSE Student."];
    const targetSpan = document.getElementById("typewriter-text");
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!targetSpan) return; 
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            targetSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; 
        } else {
            targetSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; 
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; 
            isDeleting = true;
        } 
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; 
            typingSpeed = 500; 
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // ==========================================
    // [NEW] 3. MOBILE HAMBURGER MENU ENGINE
    // ==========================================
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            // Toggles the 'X' animation effect on the bars
            hamburger.classList.toggle("active");
            // Toggles the slide-in visibility of the mobile links menu drawer
            navMenu.classList.toggle("active");
        });
    }

    // ==========================================
    // DYNAMIC SKILL BARS PERCENTAGE INJECTOR
    // ==========================================
    const skillItems = document.querySelectorAll('.skill-bar-item');
    
    skillItems.forEach(item => {
        const fillElement = item.querySelector('.bar-fill');
        const percentageText = item.querySelector('.bar-percentage');
        
        if (fillElement && percentageText) {
            // Automatically grab the width style (e.g., "85%") and set it as text
            const widthValue = fillElement.style.width;
            percentageText.textContent = widthValue;
        }
    });
});