import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import IncidentMarker from './IncidentMarker';
import { Incident } from '../types/Incident';

interface Props {
  incidents: Incident[];
  onIncidentResolved?: (key: string) => void;
}

export default function MapView({ incidents, onIncidentResolved }: Props) {
  const position: LatLngExpression = [40.73, -73.935];
  const zoom = 15;

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: '100vh', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MarkerClusterGroup>
        {incidents.map((incident) => (
          <IncidentMarker
            key={incident.uniqueKey ?? `${incident.latitude}-${incident.longitude}`}
            uniqueKey={incident.uniqueKey ?? ''}
            latitude={incident.latitude ?? 0}
            longitude={incident.longitude ?? 0}
            text={incident.descriptor ?? ''}
            address={incident.incidentAddress ?? ''}
            complaintType={incident.complaintType ?? ''}
            createdDate={incident.createdDate ? new Date(incident.createdDate) : new Date()}
            onResolved={onIncidentResolved}
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
