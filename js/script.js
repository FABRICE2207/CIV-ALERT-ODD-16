document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                navMenu.classList.remove('show');
                
                // Calculate the position to scroll to
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // File upload display
    const fileInput = document.getElementById('evidence');
    const fileNameDisplay = document.getElementById('fileName');
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileNameDisplay.textContent = this.files[0].name;
        } else {
            fileNameDisplay.textContent = 'Aucun fichier sélectionné';
        }
    });
    
    // Login Modal
    const loginBtn = document.querySelector('.btn-login');
    const loginModal = document.getElementById('loginModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const closeConfirmationBtn = document.querySelector('.close-confirmation');
    
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    if (closeConfirmationBtn) {
        closeConfirmationBtn.addEventListener('click', function() {
            document.getElementById('confirmationModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        const confirmationModal = document.getElementById('confirmationModal');
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the data to your server
            alert('Connexion en tant que partenaire. En production, cela enverrait les données au serveur.');
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Report Form Submission
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const incidentType = document.getElementById('incidentType').value;
            const location = document.getElementById('location').value;
            const description = document.getElementById('description').value;
            const isAnonymous = document.getElementById('anonymous').checked;
            
            // In a real app, you would send this data to your server
            console.log('Signalement soumis:', {
                incidentType,
                location,
                description,
                isAnonymous
            });
            
            // Generate a random report ID
            const reportId = 'CA-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
            document.getElementById('reportId').textContent = reportId;
            
            // Show confirmation modal
            document.getElementById('confirmationModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Reset form
            reportForm.reset();
            fileNameDisplay.textContent = 'Aucun fichier sélectionné';
        });
    }
    
    // Geolocation Button
    const locateMeBtn = document.getElementById('locateMe');
    if (locateMeBtn) {
        locateMeBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                locateMeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Localisation...';
                locateMeBtn.disabled = true;
                
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        
                        // Use a geocoding service to get the address (in a real app)
                        // For demo purposes, we'll just show the coordinates
                        document.getElementById('location').value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                        locateMeBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Me localiser';
                        locateMeBtn.disabled = false;
                    },
                    function(error) {
                        alert('Impossible d\'obtenir votre position. Veuillez entrer manuellement.');
                        locateMeBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Me localiser';
                        locateMeBtn.disabled = false;
                    }
                );
            } else {
                alert('La géolocalisation n\'est pas supportée par votre navigateur.');
            }
        });
    }
    
    // Initialize Map
    const incidentMap = document.getElementById('incidentMap');
    if (incidentMap) {
        // Default coordinates (center of the map)
        const defaultLat = 5.3585087;
        const defaultLng = -4.1019245;
        
        // Create the map
        const map = L.map('incidentMap').setView([defaultLat, defaultLng], 13);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Sample incident data (in a real app, this would come from your API)
        const incidents = [
            {
                type: 'corruption',
                lat: 48.8566,
                lng: 2.3522,
                title: 'Corruption dans les marchés publics',
                description: 'Détournement de fonds dans un projet de construction',
                date: '2023-05-15'
            },
            {
                type: 'abuse',
                lat: 48.8584,
                lng: 2.2945,
                title: 'Abus de pouvoir policier',
                description: 'Arrestation arbitraire et violence',
                date: '2023-06-02'
            },
            {
                type: 'injustice',
                lat: 48.8606,
                lng: 2.3376,
                title: 'Discrimination à l\'embauche',
                description: 'Refus d\'emploi basé sur l\'origine ethnique',
                date: '2023-04-28'
            },
            {
                type: 'violence',
                lat: 48.8627,
                lng: 2.2876,
                title: 'Violence conjugale',
                description: 'Cas de violence domestique non pris en charge',
                date: '2023-05-20'
            }
        ];
        
        // Define icon colors based on incident type
        const getIconColor = (type) => {
            switch(type) {
                case 'corruption': return 'red';
                case 'abuse': return 'orange';
                case 'violence': return 'purple';
                case 'injustice': return 'blue';
                default: return 'gray';
            }
        };
        
        // Create custom icons
        const getCustomIcon = (type) => {
            return L.divIcon({
                className: 'custom-marker',
                html: `<div style="background-color: ${getIconColor(type)}"></div>`,
                iconSize: [25, 25],
                iconAnchor: [12, 12]
            });
        };
        
        // Add markers to the map
        incidents.forEach(incident => {
            const marker = L.marker([incident.lat, incident.lng], {
                icon: getCustomIcon(incident.type)
            }).addTo(map);
            
            marker.bindPopup(`
                <h3>${incident.title}</h3>
                <p>${incident.description}</p>
                <small>Signalé le ${incident.date}</small>
            `);
        });
        
        // Filter functionality
        const mapFilter = document.getElementById('mapFilter');
        const regionFilter = document.getElementById('regionFilter');
        
        // In a real app, this would filter the markers on the map
        mapFilter.addEventListener('change', function() {
            console.log('Filter by type:', this.value);
        });
        
        regionFilter.addEventListener('change', function() {
            console.log('Filter by region:', this.value);
        });
    }
    
    // Animate stats counters
    const animateCounters = () => {
        const statElements = [
            { element: document.getElementById('totalReports'), target: 1245 },
            { element: document.getElementById('resolvedCases'), target: 632 },
            { element: document.getElementById('activeRegions'), target: 24 },
            { element: document.getElementById('partnerOrgs'), target: 18 }
        ];
        
        const duration = 2000; // Animation duration in ms
        const frameDuration = 1000 / 60; // 60 frames per second
        const totalFrames = Math.round(duration / frameDuration);
        
        statElements.forEach(stat => {
            if (!stat.element) return;
            
            const start = 0;
            const increment = (stat.target - start) / totalFrames;
            let current = start;
            let frame = 0;
            
            const counter = setInterval(() => {
                frame++;
                current = start + increment * frame;
                stat.element.textContent = Math.floor(current);
                
                if (frame === totalFrames) {
                    clearInterval(counter);
                    stat.element.textContent = stat.target.toLocaleString();
                }
            }, frameDuration);
        });
    };
    
    // Trigger counter animation when stats section is in view
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
});