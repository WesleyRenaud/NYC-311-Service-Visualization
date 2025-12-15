import React from 'react';
import { CircleMarker, Popup, Tooltip } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { resolveIncident } from '../services/incidentService';

interface IncidentMarkerProps {
  uniqueKey?: string;
  latitude: number;
  longitude: number;
  text: string;
  address: string;
  complaintType: string;
  createdDate: Date;
  onResolved?: (key: string) => void;
}

const IncidentMarker: React.FC<IncidentMarkerProps> = ({
  uniqueKey,
  latitude,
  longitude,
  text,
  address,
  complaintType,
  createdDate,
  onResolved,
}) => {
  const lat = Number(latitude);
  const lng = Number(longitude);
  const position: LatLngExpression = [lat, lng];

  const handleResolveClick = async () => {
    if (!uniqueKey) {
      return;
    }
    try {
      await resolveIncident(uniqueKey);
      if (onResolved) {
        onResolved(uniqueKey);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to resolve incident', err);
      // eslint-disable-next-line no-alert
      alert('Failed to mark incident as resolved.');
    }
  };

  return (
    <CircleMarker
      center={position}
      radius={10}
      pathOptions={{ color: '#ee35', opacity: 0.5, fillColor: '#ee352e', fillOpacity: 1, weight: 7 }}
    >
      <Tooltip permanent direction="center" offset={[0, 0]}>
        <b>!</b>
      </Tooltip>
      <Popup>
        <b>Address:</b> {address}
        <br />
        <b>Complaint Type:</b> {complaintType}
        <br />
        <b>Description:</b> &quot;{text}&quot;
        <br />
        <br />
        <b>Created Date:</b> {createdDate ? createdDate.toLocaleString() : 'Unknown'}
        <br />
        <br />
        <button type="button" onClick={handleResolveClick}>
          Mark as resolved
        </button>
      </Popup>
    </CircleMarker>
  );
};

export default IncidentMarker;
