// Contact me form
document.querySelector("#contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body : formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert("Message sent successfully!");
            form.reset();
        } else {
            response.json().then(data => {
                if (data.errors) {
                    alert(data.errors.map(error => error.message).join(", "));
                } else {
                    alert("Failed to send message, please try again.");
                }
            });
        }
    }).catch(() => {
        alert("Failed to send message, please try again.");
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToAnchor(this.getAttribute('href'));
    });
});

// Smooth Scroll to Anchor Function
function scrollToAnchor(targetId) {
    const targetElement = document.querySelector(targetId); // Find the target element by ID
    if (!targetElement) return;

    const header = document.querySelector('header'); // Find the header to account for its height
    const headerHeight = header ? header.offsetHeight : 0; // Get header height, default to 0 if header is not found

    // Calculate target position, adjusted for header height
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
    
    // Current scroll position
    const startPosition = window.scrollY;
    
    // Distance to scroll
    const distance = targetPosition - startPosition;

    // Scroll animation duration in milliseconds (changeable)
    const duration = 200; // <<--- You can change this value to adjust scroll speed

    let start = null;

    // Easing function for smoother scroll behavior
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // Step function for each frame of the animation
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        // Apply easing and scroll
        window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));

        // Continue animation as long as the duration has not been reached
        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }

    // Request animation frame to start the scroll animation
    window.requestAnimationFrame(step);
}

// Scroll-Linked Section Adjustment Function
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        // Scroll to the target section based on the href value of the anchor
        scrollToAnchor(this.getAttribute('href'));
    });
});


// Highlight navigation links
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navigation a');

    window.addEventListener('scroll', function () {
        let currentSection = '';
        const middleOfScreen = window.innerHeight / 3;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;

            if (sectionTop <= middleOfScreen && sectionTop + sectionHeight >= middleOfScreen) {
                currentSection = section.getAttribute('id');
            }
        });

        const scrollBottom = window.innerHeight + window.pageYOffset;
        const documentHeight = document.documentElement.offsetHeight;

        if (scrollBottom >= documentHeight - 1) {
            currentSection = 'contact';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });
});

// Fade-in animation for sections
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

function debounce(func, wait) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
}

// Handle navigation link clicks
const links = document.querySelectorAll('nav ul li a');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        scrollToAnchor(targetId);
    });
});

// Select the content div and the toggle button
const content = document.getElementById('content');
const toggleButton = document.getElementById('toggleButton');

function searchWebsite() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    
    let contentBlocks = document.querySelectorAll('.content');
    
    contentBlocks.forEach(function(block) {
        block.innerHTML = block.innerHTML.replace(/<span class="highlight">|<\/span>/g, "");

        if (block.textContent.toLowerCase().includes(input)) {
            let regex = new RegExp(`(${input})`, 'gi');
            block.innerHTML = block.innerHTML.replace(regex, '<span class="highlight">$1</span>');
        }
    });
}

// Show All Extension
function toggleGallery() {
    var extraGalleries = document.querySelector('.extra-galleries');
    var toggleBtn = document.getElementById('toggle-btn');

    extraGalleries.classList.toggle('open');

    if (extraGalleries.classList.contains('open')) {
        toggleBtn.textContent = "Show Less";
    } else {
        toggleBtn.textContent = "Show All";
    }
}

// Title Nav
function smoothScroll(target, duration) {
    const start = window.pageYOffset;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        window.scrollTo(0, start + distance * progress);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

const scrollToTop = () => {
    smoothScroll(document.body, 200);
};

// Form Max Characters
const maxNameLength = 30;
const maxEmailLength = 35;
const maxMessageLength = 200;

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

nameInput.addEventListener('input', () => {
    if (nameInput.value.length > maxNameLength) {
        nameInput.value = nameInput.value.slice(0, maxNameLength);
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.value.length > maxEmailLength) {
        emailInput.value = emailInput.value.slice(0, maxEmailLength);
    }
});

messageInput.addEventListener('input', () => {
    const currentLength = messageInput.textContent.length;
    
    messageCount.textContent = `${currentLength}/${maxMessageLength}`;
    
    if (currentLength > maxMessageLength) {
        messageInput.textContent = messageInput.textContent.slice(0, maxMessageLength);
        placeCaretAtEnd(messageInput);
    }
});

// script.js (JavaScript for Modals)
document.addEventListener('DOMContentLoaded', function () {
    const impressumModal = document.getElementById("impressumModal");
    const privacyPolicyModal = document.getElementById("privacyPolicyModal");

    // Open Impressum Modal
    document.getElementById("openImpressum").onclick = function () {
        impressumModal.style.display = "block";
    }

    // Open Privacy Policy Modal
    document.getElementById("openPrivacyPolicy").onclick = function () {
        privacyPolicyModal.style.display = "block";
    }

    // Close modal when clicking on <span> (x)
    document.querySelectorAll(".close").forEach(span => {
        span.onclick = function () {
            impressumModal.style.display = "none";
            privacyPolicyModal.style.display = "none";
        }
    });

    // Close modal when clicking anywhere outside of the modal
    window.onclick = function (event) {
        if (event.target === impressumModal || event.target === privacyPolicyModal) {
            impressumModal.style.display = "none";
            privacyPolicyModal.style.display = "none";
        }
    }
});
