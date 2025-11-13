// Debug version of maps.js - check console for errors
console.log('Maps.js loaded');

// Office locations with coordinates
const locations = {
    semarang: {
        lat: -7.0051,
        lng: 110.3116,
        title: 'Optima Semarang Office',
        address: 'Jl. Proft Dr Hamka Ngaliyan Square No.42, Ngaliyan Kota Semarang'
    },
    jakarta: {
        lat: -6.1167,
        lng: 106.7589,
        title: 'Optima Jakarta Office', 
        address: 'Ruko Niaga Grisenda, Jl. Kapuk Raya Blok GE No.40, Kapuk Muara, Jakarta Utara'
    }
};

// Initialize maps when Google Maps API is loaded
function initMaps() {
    console.log('initMaps called');
    console.log('Google Maps available:', typeof google !== 'undefined');
    
    if (typeof google === 'undefined') {
        console.error('Google Maps API not loaded');
        return;
    }
    
    // Initialize Semarang map
    console.log('Initializing Semarang map...');
    initializeMap('semarang', 'map-semarang');
    
    // Initialize Jakarta map
    console.log('Initializing Jakarta map...');
    initializeMap('jakarta', 'map-jakarta');
}

function initializeMap(locationKey, mapElementId) {
    console.log(`Initializing map for ${locationKey} in element ${mapElementId}`);
    
    const location = locations[locationKey];
    const mapElement = document.getElementById(mapElementId);
    
    if (!mapElement) {
        console.error(`Map element ${mapElementId} not found`);
        return;
    }
    
    console.log(`Map element found:`, mapElement);
    console.log(`Element dimensions:`, mapElement.offsetWidth, 'x', mapElement.offsetHeight);

    try {
        // Create map with minimal options first
        const map = new google.maps.Map(mapElement, {
            center: { lat: location.lat, lng: location.lng },
            zoom: 15,
            disableDefaultUI: false,
        });
        
        console.log(`Map created successfully for ${locationKey}`);

        // Create marker
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.title,
        });
        
        console.log(`Marker created successfully for ${locationKey}`);
        
    } catch (error) {
        console.error(`Error creating map for ${locationKey}:`, error);
    }
}

// Add some additional debugging
window.addEventListener('load', function() {
    console.log('Window loaded');
    console.log('Google available:', typeof google !== 'undefined');
    
    // Check if map elements exist
    const semarangMap = document.getElementById('map-semarang');
    const jakartaMap = document.getElementById('map-jakarta');
    
    console.log('Semarang map element:', semarangMap);
    console.log('Jakarta map element:', jakartaMap);
    
    if (semarangMap) {
        console.log('Semarang map dimensions:', semarangMap.offsetWidth, 'x', semarangMap.offsetHeight);
    }
    if (jakartaMap) {
        console.log('Jakarta map dimensions:', jakartaMap.offsetWidth, 'x', jakartaMap.offsetHeight);
    }
});

// Also check when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
});