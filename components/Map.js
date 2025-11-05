import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';

function FitBounds({ geojson }) {
  const map = useMap();
  useEffect(() => {
    if (!geojson) return;
    const layer = new L.GeoJSON(geojson);
    const bounds = layer.getBounds();
    if (bounds && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [geojson, map]);
  return null;
}

export default function IranMap() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch('/iran.geo.json')
      .then((r) => r.json())
      .then((d) => {
        if (isMounted) setData(d);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MapContainer center={[32, 54]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data && (
          <GeoJSON
            data={data}
            style={{ color: '#e91e63', weight: 2, fillColor: '#f48fb1', fillOpacity: 0.3 }}
          />
        )}
        {data && <FitBounds geojson={data} />}
      </MapContainer>
    </div>
  );
}
