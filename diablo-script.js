// Smooth scroll for internal links
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


// Modals
const impressumModal = document.getElementById("impressumModal");
const privacyModal = document.getElementById("privacyPolicyModal");

const spanImpressum = document.getElementById("closeModal");
const spanPrivacy = document.getElementById("closePrivacyPolicy");

// Function to open a modal
function openModal(modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

document.addEventListener('DOMContentLoaded', function () {
    const impressumModal = document.getElementById("impressumModal");
    const privacyPolicyModal = document.getElementById("privacyPolicyModal");

    // Open Impressum Modal
    document.getElementById("openImpressum").onclick = function () {
        impressumModal.style.display = "block";
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Open Privacy Policy Modal
    document.getElementById("openPrivacyPolicy").onclick = function () {
        privacyPolicyModal.style.display = "block";
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close modal when clicking on <span> (x)
    document.querySelectorAll(".close").forEach(span => {
        span.onclick = function () {
            impressumModal.style.display = "none";
            privacyPolicyModal.style.display = "none";
            document.body.style.overflow = 'auto'; // Re-enable background scrolling
        }
    });

    // Close modal when clicking anywhere outside of the modal
    window.onclick = function (event) {
        if (event.target === impressumModal || event.target === privacyPolicyModal) {
            impressumModal.style.display = "none";
            privacyPolicyModal.style.display = "none";
            document.body.style.overflow = 'auto'; // Re-enable background scrolling
        }
    }
});
