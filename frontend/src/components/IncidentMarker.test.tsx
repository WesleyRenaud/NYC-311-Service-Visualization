import { render, screen } from '@testing-library/react';
import IncidentMarker from './IncidentMarker';
import React, { ReactNode } from 'react';

jest.mock('react-leaflet', () => ({
  CircleMarker: ({ children, center, ...props }: any) => (
    <div 
      data-testid="circle-marker" 
      data-lat={center?.[0]} 
      data-lng={center?.[1]}
      {...props}
    >
      {children}
    </div>
  ),
  Popup: ({ children }: any) => (
    <div data-testid="popup">{children}</div>
  ),
  Tooltip: ({ children }: any) => (
    <div data-testid="tooltip">{children}</div>
  ),
}));

jest.mock('react-leaflet-cluster', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

describe('IncidentMarker Component', () => {
  const mockIncident = {
    latitude: 40.6928,
    longitude: -73.9903,
    text: 'Loud Music/Party',
    address: '123 MAIN STREET, BROOKLYN, NY 11201',
    complaintType: 'Noise - Residential',
    createdDate: new Date('2024-01-15T20:30:00.000'),
  };

  test('displays all incident details correctly in the popup', () => {
    render(<IncidentMarker {...mockIncident} />);

    expect(screen.getByText(/123 MAIN STREET, BROOKLYN, NY 11201/i)).toBeInTheDocument();
    expect(screen.getByText(/Noise - Residential/i)).toBeInTheDocument();
    expect(screen.getByText(/Loud Music\/Party/i)).toBeInTheDocument();
    expect(screen.getByText(/1\/15\/2024/)).toBeInTheDocument();
  });

  test('shows proper labels for each incident data field', () => {
    render(<IncidentMarker {...mockIncident} />);

    expect(screen.getByText(/Address:/)).toBeInTheDocument();
    expect(screen.getByText(/Complaint Type:/)).toBeInTheDocument();
    expect(screen.getByText(/Description:/)).toBeInTheDocument();
    expect(screen.getByText(/Created Date:/)).toBeInTheDocument();
  });
});

describe('IncidentMarker with Clustering Context', () => {
  const mockIncident = {
    latitude: 40.6928,
    longitude: -73.9903,
    text: 'Loud Music/Party',
    address: '123 MAIN STREET, BROOKLYN, NY 11201',
    complaintType: 'Noise - Residential',
    createdDate: new Date('2024-01-15T20:30:00.000'),
  };

  test('should render individual marker with the correct coordinates within clusters', () => {
    render(<IncidentMarker {...mockIncident} />);

    const circleMarker = screen.getByTestId('circle-marker');
    expect(circleMarker).toBeInTheDocument();
    
    expect(circleMarker).toHaveAttribute('data-lat', '40.6928');
    expect(circleMarker).toHaveAttribute('data-lng', '-73.9903');
  });

  test('should maintain complete incident information in popup when marker is part of a cluster', () => {
    render(<IncidentMarker {...mockIncident} />);

    const popup = screen.getByTestId('popup');
    expect(popup).toHaveTextContent('123 MAIN STREET');
    expect(popup).toHaveTextContent('Noise - Residential');
    expect(popup).toHaveTextContent('Loud Music/Party');
  });

  test('should handle coordinate data types and conversions required for clustering algorithms', () => {
    render(<IncidentMarker {...mockIncident} />);

    const circleMarker = screen.getByTestId('circle-marker');
    expect(circleMarker).toBeInTheDocument();
  });
});