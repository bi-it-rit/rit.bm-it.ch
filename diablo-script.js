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

    const apiKey = '273ECC37FA5AB16A18659AEBDA161AD5';
    const steamID = '76561199007787322';
    const appID = 2344520; // appID should be a number, not a string
    
    fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamID}&include_appinfo=true&format=json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(data => {
        console.log('Steam API Response:', data); // Log the entire API response
    
        // Check if "games" exists in the response
        if (!data.response || !data.response.games) {
          document.getElementById('playtime').innerText = 'No games found or invalid response.';
          return;
        }
    
        const games = data.response.games;
        console.log('List of Games:', games); // Log the list of games to see what's returned
    
        const game = games.find(g => g.appid === appID);
        if (game) {
          const playtimeInHours = (game.playtime_forever / 60).toFixed(2);
          document.getElementById('playtime').innerText = `Playtime: ${playtimeInHours} hours`;
        } else {
          document.getElementById('playtime').innerText = 'Game not found in your library.';
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error); // Log the exact error
        document.getElementById('playtime').innerText = 'Error fetching playtime data.';
      });
    
