import React, { useState, useEffect } from 'react';
import { MapContainer, ImageOverlay, Rectangle, Marker, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface InteractiveMapProps {
  selectedZone: string | null;
  setSelectedZone: (zone: string) => void;
  activeTeam: 'home' | 'away';
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedZone,
  setSelectedZone,
  activeTeam,
}) => {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [zones, setZones] = useState([
    { id: '10', bounds: [[75, 0], [100, 33.33]] },
    { id: '11', bounds: [[75, 33.33], [100, 66.66]] },
    { id: '12', bounds: [[75, 66.66], [100, 100]] },
    { id: '7', bounds: [[50, 0], [75, 33.33]] },
    { id: '8', bounds: [[50, 33.33], [75, 66.66]] },
    { id: '9', bounds: [[50, 66.66], [75, 100]] },
    { id: '4', bounds: [[25, 0], [50, 33.33]] },
    { id: '5', bounds: [[25, 33.33], [50, 66.66]] },
    { id: '6', bounds: [[25, 66.66], [50, 100]] },
    { id: '1', bounds: [[0, 0], [25, 33.33]] },
    { id: '2', bounds: [[0, 33.33], [25, 66.66]] },
    { id: '3', bounds: [[0, 66.66], [25, 100]] },
  ]);

  const imageBounds: [number, number][] = [[0, 0], [100, 100]];

  const goalIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/53/53283.png',
    iconSize: [30, 30],
  });

  const arrowIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3031/3031693.png',
    iconSize: [30, 30],
  });

  // Rotate field zones based on active team
  useEffect(() => {
    if (activeTeam === 'away') {
      setZones((prevZones) =>
        prevZones.map((zone) => ({
          ...zone,
          bounds: zone.bounds.map(([lat, lng]) => [100 - lat, 100 - lng]) as [number, number][],
        }))
      );
    } else {
      // Reset to original orientation when switching back to home team
      setZones([
        { id: '10', bounds: [[75, 0], [100, 33.33]] },
        { id: '11', bounds: [[75, 33.33], [100, 66.66]] },
        { id: '12', bounds: [[75, 66.66], [100, 100]] },
        { id: '7', bounds: [[50, 0], [75, 33.33]] },
        { id: '8', bounds: [[50, 33.33], [75, 66.66]] },
        { id: '9', bounds: [[50, 66.66], [75, 100]] },
        { id: '4', bounds: [[25, 0], [50, 33.33]] },
        { id: '5', bounds: [[25, 33.33], [50, 66.66]] },
        { id: '6', bounds: [[25, 66.66], [50, 100]] },
        { id: '1', bounds: [[0, 0], [25, 33.33]] },
        { id: '2', bounds: [[0, 33.33], [25, 66.66]] },
        { id: '3', bounds: [[0, 66.66], [25, 100]] },
      ]);
    }
  }, [activeTeam]);

  return (
    <MapContainer
      center={[50, 50]}
      zoom={1}
      style={{ height: '600px', width: '100%' }}
      crs={L.CRS.Simple}
      minZoom={1}
      maxZoom={3}
      zoomControl={false}
      dragging={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      attributionControl={false}
    >
      <ImageOverlay
        url="https://i.imgur.com/L15kvGU.jpeg"
        bounds={imageBounds as L.LatLngBoundsExpression}
      />
      {zones.map((zone) => (
        <Rectangle
          key={zone.id}
          bounds={zone.bounds as L.LatLngBoundsExpression}
          pathOptions={{
            color: selectedZone === zone.id ? 'red' : 'blue',
            fillColor: hoveredZone === zone.id ? 'rgba(255, 255, 0, 0.3)' : 'transparent',
            fillOpacity: 0.5,
            weight: 2,
          }}
          eventHandlers={{
            click: () => setSelectedZone(zone.id),
            mouseover: () => setHoveredZone(zone.id),
            mouseout: () => setHoveredZone(null),
          }}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
            {`Zone ${zone.id}`}
          </Tooltip>
        </Rectangle>
      ))}
      {/* Marker indicating the goal for the defending team */}
      <Marker
        position={activeTeam === 'home' ? [12.5, 50] : [87.5, 50]}
        icon={goalIcon}
      />
      {/* Marker indicating the direction of play for the attacking team */}
      <Marker
        position={activeTeam === 'home' ? [87.5, 50] : [12.5, 50]}
        icon={arrowIcon}
      />
    </MapContainer>
  );
};

export default InteractiveMap;