// Modals
const impressumModal = document.getElementById("impressumModal");
const privacyModal = document.getElementById("privacyPolicyModal");

const spanImpressum = document.getElementById("closeModal");
const spanPrivacy = document.getElementById("closePrivacyPolicy");

function openModal(modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal(modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

document.querySelector('.impressum').onclick = function() {
    openModal(impressumModal);
};

document.querySelector('.policy').onclick = function() {
    openModal(privacyModal);
};

spanImpressum.onclick = function() {
    closeModal(impressumModal);
};

spanPrivacy.onclick = function() {
    closeModal(privacyModal);
};

window.onclick = function(event) {
    if (event.target === impressumModal) {
        closeModal(impressumModal);
    } else if (event.target === privacyModal) {
        closeModal(privacyModal);
    }
};

document.querySelector('.cm-link').onclick = function() {
    closeModal(privacyModal);
};

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
