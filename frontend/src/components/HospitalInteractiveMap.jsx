import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  ExternalLink,
  Navigation,
  Building2,
  Phone,
  ShieldCheck,
  Star,
  Maximize2,
  Minimize2,
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  RefreshCw
} from 'lucide-react';

/**
 * HospitalInteractiveMap Component
 * Real OpenStreetMap + Leaflet integration with custom SVG clinical pins,
 * Smooth flyTo animations, popup badges, and Google Maps directions link.
 */
const HospitalInteractiveMap = ({
  centres = [],
  selectedCentre = null,
  onSelectCentre = () => {}
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const [activeLayer, setActiveLayer] = useState('standard'); // 'standard' | 'humanitarian'

  // Coordinates of India center
  const INDIA_CENTER = [20.5937, 78.9629];
  const DEFAULT_ZOOM = 5;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Prevent re-initialization if already exists
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: INDIA_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false, // Custom placed controls
      attributionControl: false
    });

    // Add high-resolution OpenStreetMap Tile Layer
    const tileLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c']
      }
    ).addTo(map);

    // Custom compact attribution in bottom-right
    L.control
      .attribution({ position: 'bottomright', prefix: '© OpenStreetMap contributors' })
      .addTo(map);

    mapInstanceRef.current = map;

    // Render Markers for each hospital
    const markers = {};
    centres.forEach((centre) => {
      if (!centre.lat || !centre.lng) return;

      const isSelected = selectedCentre?.id === centre.id;

      // Custom SVG Clinical Pin
      const iconHtml = `
        <div class="koshika-map-marker ${isSelected ? 'active-pulse' : ''}" style="
          position: relative;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${isSelected ? 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)' : 'linear-gradient(135deg, #0d9488 0%, #065f46 100%)'};
          color: #ffffff;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 14px ${isSelected ? 'rgba(225, 29, 72, 0.5)' : 'rgba(13, 148, 136, 0.4)'};
          border: 2px solid #ffffff;
          cursor: pointer;
          transition: all 0.25s ease;
        ">
          <div style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 6v12M6 12h12"/>
            </svg>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: iconHtml,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
      });

      const marker = L.marker([centre.lat, centre.lng], { icon: customIcon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div style="font-family: inherit; min-width: 220px; padding: 4px;">
          <div style="font-weight: 700; font-size: 0.9rem; color: #0f172a; margin-bottom: 2px;">
            ${centre.name}
          </div>
          <div style="font-size: 0.76rem; color: #64748b; margin-bottom: 8px;">
            ${centre.city} &bull; <strong style="color: #0d9488;">${centre.distance}</strong>
          </div>
          <div style="font-size: 0.74rem; background: #f1f5f9; padding: 6px 8px; border-radius: 6px; margin-bottom: 8px;">
            <strong>Suites:</strong> ${centre.bmtBeds || 'Dedicated BMT Clean Rooms'}
          </div>
          <div style="display: flex; gap: 6px;">
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=${centre.lat},${centre.lng}" 
              target="_blank" 
              rel="noopener noreferrer"
              style="
                flex: 1; 
                background: #0d9488; 
                color: #ffffff; 
                text-decoration: none; 
                font-size: 0.74rem; 
                font-weight: 600; 
                padding: 4px 8px; 
                border-radius: 9999px; 
                text-align: center;
                display: inline-block;
              "
            >
              Directions ↗
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.on('click', () => {
        onSelectCentre(centre);
      });

      markers[centre.id] = marker;
    });

    markersRef.current = markers;

    // Invalidate size after layout mounts
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [centres]);

  // When selectedCentre changes, fly to its coordinates and open its popup
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedCentre) return;

    if (selectedCentre.lat && selectedCentre.lng) {
      mapInstanceRef.current.flyTo([selectedCentre.lat, selectedCentre.lng], 13, {
        duration: 1.2,
        easeLinearity: 0.25
      });

      const marker = markersRef.current[selectedCentre.id];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 800);
      }
    }
  }, [selectedCentre]);

  // Zoom Helpers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(INDIA_CENTER, DEFAULT_ZOOM, { duration: 1 });
    }
  };

  return (
    <div className="position-relative w-100 h-100" style={{ minHeight: '440px' }}>
      {/* Map Leaflet Container */}
      <div
        ref={mapContainerRef}
        className="w-100 h-100"
        style={{
          minHeight: '440px',
          background: '#e0f2fe',
          zIndex: 1
        }}
      />

      {/* Floating Control Widget (Top-Right) */}
      <div
        className="position-absolute top-0 end-0 m-3 d-flex flex-column gap-1.5"
        style={{ zIndex: 1000 }}
      >
        <button
          type="button"
          className="btn btn-sm btn-light rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center hover-translate-y"
          onClick={handleZoomIn}
          title="Zoom In"
          style={{ width: '36px', height: '36px' }}
        >
          <ZoomIn size={16} />
        </button>

        <button
          type="button"
          className="btn btn-sm btn-light rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center hover-translate-y"
          onClick={handleZoomOut}
          title="Zoom Out"
          style={{ width: '36px', height: '36px' }}
        >
          <ZoomOut size={16} />
        </button>

        <button
          type="button"
          className="btn btn-sm btn-light rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center hover-translate-y"
          onClick={handleResetView}
          title="Reset to All India Overview"
          style={{ width: '36px', height: '36px' }}
        >
          <RefreshCw size={15} />
        </button>
      </div>

      {/* Bottom Map Legend */}
      <div
        className="position-absolute bottom-0 start-0 m-3 p-2 px-3 rounded-pill shadow-sm small text-dark d-flex align-items-center gap-2"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0,0,0,0.1)',
          fontSize: '0.74rem',
          zIndex: 1000
        }}
      >
        <span className="d-flex align-items-center gap-1">
          <span className="rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: '#0d9488' }} />
          <span>Accredited BMT Centre</span>
        </span>
        <span className="text-muted">&bull;</span>
        <span className="d-flex align-items-center gap-1">
          <span className="rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: '#e11d48' }} />
          <span>Selected Target</span>
        </span>
      </div>
    </div>
  );
};

export default HospitalInteractiveMap;
