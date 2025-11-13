// Google Maps initialization for location carousel
let maps = {};
let markers = {};
let mapsInitialized = false;

// Office locations with coordinates
const locations = {
    semarang: {
        lat: -7.0051, // Approximate coordinates for Ngaliyan, Semarang
        lng: 110.3116,
        title: 'Optima Semarang Office',
        address: 'Jl. Proft Dr Hamka Ngaliyan Square No.42, Ngaliyan Kota Semarang'
    },
    jakarta: {
        lat: -6.1167, // Approximate coordinates for Kapuk Muara, Jakarta Utara
        lng: 106.7589,
        title: 'Optima Jakarta Office', 
        address: 'Ruko Niaga Grisenda, Jl. Kapuk Raya Blok GE No.40, Kapuk Muara, Jakarta Utara'
    }
};

// Initialize maps when Google Maps API is loaded
function initMaps() {
    console.log('initMaps called');
    
    // Check if Google Maps is available
    if (typeof google === 'undefined' || !google.maps) {
        console.error('Google Maps API not loaded');
        showMapFallback();
        return;
    }
    
    try {
        // Initialize Semarang map
        initializeMap('semarang', 'map-semarang');
        
        // Initialize Jakarta map
        initializeMap('jakarta', 'map-jakarta');
        
        mapsInitialized = true;
        console.log('Maps initialized successfully');
    } catch (error) {
        console.error('Error initializing maps:', error);
        showMapFallback();
    }
}

// Fallback function when maps fail to load
function showMapFallback() {
    console.log('Showing map fallback');
    const mapElements = ['map-semarang', 'map-jakarta'];
    
    mapElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `
                <div style="
                    width: 100%; 
                    height: 100%; 
                    background: linear-gradient(135deg, #4E3A02, #6B5404);
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    color: white;
                    text-align: center;
                    font-family: 'Lucida Sans Unicode', sans-serif;
                    border-radius: 10px;
                ">
                    <div>
                        <div style="font-size: 2rem; margin-bottom: 10px;">📍</div>
                        <div style="font-size: 1rem;">Interactive Map</div>
                        <div style="font-size: 0.8rem; opacity: 0.8;">Loading...</div>
                    </div>
                </div>
            `;
        }
    });
}

function initializeMap(locationKey, mapElementId) {
    const location = locations[locationKey];
    const mapElement = document.getElementById(mapElementId);
    
    if (!mapElement) {
        console.error(`Map element ${mapElementId} not found`);
        return;
    }

    // Create map
    const map = new google.maps.Map(mapElement, {
        center: { lat: location.lat, lng: location.lng },
        zoom: 15,
        styles: [
            // Custom map styling for a more professional look
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{ "color": "#dedede" }, { "lightness": 21 }]
            }
        ],
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true
    });

    // Create marker
    const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.title,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#4E3A02',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3
        }
    });

    // Create info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; font-family: 'Lucida Sans Unicode', sans-serif;">
                <h3 style="margin: 0 0 10px 0; color: #4E3A02; font-size: 16px;">${location.title}</h3>
                <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.4;">${location.address}</p>
            </div>
        `
    });

    // Show info window when marker is clicked
    marker.addListener('click', () => {
        // Close any open info windows
        Object.values(infoWindows).forEach(iw => iw.close());
        infoWindow.open(map, marker);
    });

    // Store references for later use
    maps[locationKey] = map;
    markers[locationKey] = marker;
    
    // Store info window reference
    if (!window.infoWindows) {
        window.infoWindows = {};
    }
    window.infoWindows[locationKey] = infoWindow;
}

// Function to handle carousel slide changes and resize maps
function handleSlideChange() {
    // Delay to ensure slide transition is complete
    setTimeout(() => {
        Object.values(maps).forEach(map => {
            google.maps.event.trigger(map, 'resize');
        });
    }, 300);
}

// Add event listeners for carousel navigation
document.addEventListener('DOMContentLoaded', function() {
    // Listen for hash changes (carousel navigation)
    window.addEventListener('hashchange', handleSlideChange);
    
    // Listen for carousel navigation clicks
    const navButtons = document.querySelectorAll('.carousel__navigation-button, .carousel__prev, .carousel__next');
    navButtons.forEach(button => {
        button.addEventListener('click', handleSlideChange);
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    Object.values(maps).forEach(map => {
        google.maps.event.trigger(map, 'resize');
    });
});