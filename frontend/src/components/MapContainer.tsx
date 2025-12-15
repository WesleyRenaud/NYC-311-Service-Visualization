import React, { useState, useEffect } from 'react';
import MapView from './MapView';
import FilterBar from './FilterBar';
import { getFilteredIncidents } from '../services/incidentService';
import { Incident } from '../types/Incident';

const MapContainer: React.FC = () => {
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([]);

  const [complaintType, setComplaintType] = useState('All');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const loadIncidents = async () => {
    try {
      const res = await getFilteredIncidents(
        complaintType !== 'All' ? complaintType : undefined,
        startTime || undefined,
        endTime || undefined,
        0,
        5000,
      );

      setFilteredIncidents(res.content ?? res);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Eror loading filtered incidents:', err);
      // eslint-disable-next-line no-alert
      alert('Failed to load incidents from server.');
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);


  const applyFilters = () => {
    const start = startTime ? new Date(startTime) : null;
    const end = endTime ? new Date(endTime) : null;

    if (start && end && start > end) {
      // Keep spelling to match existing tests: "preceeds"
      // eslint-disable-next-line no-alert
      alert('Error - end time preceeds start time.');
      return;
    }

    loadIncidents();
  };

  const handleIncidentResolved = (key: string) => {
    setFilteredIncidents((prev) => prev.filter((incident) => incident.uniqueKey !== key));
  };

  return (
    <>
      <FilterBar
        complaintType={complaintType}
        setComplaintType={setComplaintType}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        onGo={applyFilters}
      />
      <MapView incidents={filteredIncidents} onIncidentResolved={handleIncidentResolved} />

      <div id="widget">
        <b>Welcome!</b>
        <br />
        This app provides civic operations analysts with a 311 complaint map visualization, allowing
        them to target hotspots and improve service levels.
        <br />
        <br />
        <b>Instructions:</b>
        <br />
        1. Press Go to search for complaints.
        <br />
        2. (Optional) Choose a complaint type.
        <br />
        3. (Optional) Choose the date/time the complaint(s) occurred
        <br />
      </div>
    </>
  );
};

export default MapContainer;
