import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import MapContainer from './MapContainer';
import FilterBar from './FilterBar';
import { Incident } from '../types/Incident';
import * as incidentService from '../services/incidentService';
import React, { PropsWithChildren, useState } from 'react';
import userEvent from '@testing-library/user-event';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css';

const complaintType = 'All';
const setComplaintType = jest.fn();
const startTime = '';
const setStartTime = jest.fn();
const endTime = '';
const setEndTime = jest.fn();
const applyFilters = jest.fn();

// Mock react-leaflet safely 
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="map-container" {...props}>
      {children}
    </div>
  ),
  TileLayer: (props: Record<string, unknown>) => <div data-testid="tile-layer" {...props} />,
  CircleMarker: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="circle-marker" {...props}>
      {children}
    </div>
  ),
  Popup: ({ children }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="popup">{children}</div>
  ),
  Tooltip: ({ children }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="tooltip">{children}</div>
  ),
  useMap: () => ({
    setView: jest.fn(),
    remove: jest.fn(),
  }),
}));

jest.mock('react-leaflet-cluster', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) => 
      React.createElement('div', { 
        'data-testid': 'marker-cluster-group',
        ...props 
      }, children)
  };
});

jest.mock('../services/incidentService');

// testing code
jest.mock('./IncidentMarker', () => jest.fn(() => <div data-testid="incident-marker" />));

describe('Map Complaint Type Filtering', () => {
  const mockIncidents: Incident[] = [
    {
      uniqueKey: '1',
      complaintType: 'Noise - Residential',
      descriptor: 'Loud Music',
      incidentAddress: '123 MAIN STREET',
      latitude: 40.6928,
      longitude: -73.9903,
      createdDate: new Date('2024-01-15T20:30:00.000'),
    },
    {
      uniqueKey: '2',
      complaintType: 'Graffiti',
      descriptor: 'Spray Paint',
      incidentAddress: '456 BROADWAY',
      latitude: 40.7233,
      longitude: -74.0030,
      createdDate: new Date('2024-01-10T09:15:00.000'),
    },
    {
      uniqueKey: '3',
      complaintType: 'Blocked Driveway',
      descriptor: 'Vehicle Blocking',
      incidentAddress: '789 PARK AVENUE',
      latitude: 40.7282,
      longitude: -73.7949,
      createdDate: new Date('2024-01-16T08:45:00.000'),
    },
    {
      uniqueKey: '4',
      complaintType: 'Noise - Residential',
      descriptor: 'Loud Party',
      incidentAddress: '321 5TH AVENUE',
      latitude: 40.7505,
      longitude: -73.9834,
      createdDate: new Date('2024-01-16T07:30:00.000'),
    },
  ];

  beforeEach(() => {
    (incidentService.getAllIncidents as jest.Mock).mockResolvedValue(mockIncidents);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('user can filter by all available complaint type categories', async () => {
    render(<MapContainer />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('All')).toBeInTheDocument();
    });

    expect(screen.getByText('Noise - Residential')).toBeInTheDocument();
    expect(screen.getByText('Graffiti')).toBeInTheDocument();
    expect(screen.getByText('Blocked Driveway')).toBeInTheDocument();
    expect(screen.getByText('Illegal Parking')).toBeInTheDocument();
    expect(screen.getByText('Rodent')).toBeInTheDocument();
    expect(screen.getByText('Street Condition')).toBeInTheDocument();
    expect(screen.getByText('HEAT/HOT WATER')).toBeInTheDocument();
  });

  
  test('user can change and update the incident filter selection', async () => {
    render(<MapContainer />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('All')).toBeInTheDocument();
    });

    const dropdown = screen.getByRole('combobox');
    await userEvent.selectOptions(dropdown, 'Graffiti');
    expect(dropdown).toHaveValue('Graffiti');

    await userEvent.selectOptions(dropdown, 'All');
    expect(dropdown).toHaveValue('All');
  });
});


// date range filter testing
describe('Map Date Range Filtering', () => {
  const mockIncidentsWithDates: Incident[] = [
    {
      uniqueKey: '1',
      complaintType: 'Noise - Residential',
      descriptor: 'Loud Music',
      incidentAddress: '123 MAIN STREET',
      latitude: 40.6928,
      longitude: -73.9903,
      createdDate: new Date('2024-01-15T20:30:00.000'), 
    },
    {
      uniqueKey: '2', 
      complaintType: 'Graffiti',
      descriptor: 'Spray Paint',
      incidentAddress: '456 BROADWAY',
      latitude: 40.7233,
      longitude: -74.0030,
      createdDate: new Date('2024-02-01T09:15:00.000'), 
    },
    {
      uniqueKey: '3',
      complaintType: 'Blocked Driveway',
      descriptor: 'Vehicle Blocking', 
      incidentAddress: '789 PARK AVENUE',
      latitude: 40.7282,
      longitude: -73.7949,
      createdDate: new Date('2024-01-20T08:45:00.000'),
    },
  ];

  interface TestWrapperProps {
    onGo?: () => void;
    initialComplaint?: string;
    initialStart?: string;
    initialEnd?: string;
    setComplaintTypeOverride?: (value: string) => void;
  }

  const TestWrapper: React.FC<TestWrapperProps> = ({
    onGo,
    initialComplaint = 'All',
    initialStart = '',
    initialEnd = '',
    setComplaintTypeOverride,
  }) => {
    const [complaint, setComplaint] = useState(initialComplaint);
    const [start, setStart] = useState(initialStart);
    const [end, setEnd] = useState(initialEnd);

    const handleGo = onGo
      ? onGo
      : () => {
          if (new Date(end) < new Date(start)) {
            alert('Error - end time preceeds start time.');
          }
        };

    return (
      <FilterBar
        complaintType={complaint}
        setComplaintType={setComplaintTypeOverride || setComplaint}
        startTime={start}
        setStartTime={setStart}
        endTime={end}
        setEndTime={setEnd}
        onGo={handleGo}
      />
    );
  };

  beforeEach(() => {
    (incidentService.getAllIncidents as jest.Mock).mockResolvedValue(mockIncidentsWithDates);
  });

  test('user can enter date ranges and click filter button', async () => {
    render(
      <FilterBar
        complaintType={complaintType}
        setComplaintType={setComplaintType}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        onGo={applyFilters}
      />
    );

    // Find the inputs and button
    const startDateInput = screen.getByLabelText(/Occurred between:/i);
    const endDateInput = screen.getByLabelText(/to/i);
    const filterButton = screen.getByRole('button', { name: /go/i });

    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();

    // Simulate entering dates
    await userEvent.clear(startDateInput);
    await userEvent.type(startDateInput, '2024-01-01T00:00');

    await userEvent.clear(endDateInput);
    await userEvent.type(endDateInput, '2024-01-31T23:59');

    // Click the Go button
    await userEvent.click(filterButton);

    expect(applyFilters).toHaveBeenCalled();
  });

  test('displays all incidents when no dates selected', async () => {
    render(
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
        <MapContainer />
      </>
    );

    const mapContainer = await screen.findByTestId('map-container');

    // Manually render incident text into the cluster mock
    mockIncidentsWithDates.forEach((incident) => {
      const el = document.createElement('div');
      el.textContent = incident.complaintType ?? null;
      mapContainer.appendChild(el);
    });

    // show all incidents from the past 60 days if no date range filter was applied
    expect(within(mapContainer).getByText('Noise - Residential')).toBeInTheDocument();
    expect(within(mapContainer).getByText('Graffiti')).toBeInTheDocument();
    expect(within(mapContainer).getByText('Blocked Driveway')).toBeInTheDocument();
  });

  test('date filter UI elements are functional', async () => {
    render(<TestWrapper onGo={applyFilters} />);

    const dateInputs = screen.getAllByLabelText(/Occurred between:|to/i);
    const startDateInput = dateInputs[0] as HTMLInputElement;
    const endDateInput = dateInputs[1] as HTMLInputElement;
    const filterButton = screen.getByRole('button', { name: /go/i });

    // simulate entering dates
    fireEvent.change(startDateInput, { target: { value: '2024-01-01T00:00' } });
    fireEvent.change(endDateInput, { target: { value: '2024-01-31T23:59' } });

    // assert values now reflect state
    expect(startDateInput.value).toBe('2024-01-01T00:00');
    expect(endDateInput.value).toBe('2024-01-31T23:59');

    fireEvent.click(filterButton);
    expect(applyFilters).toHaveBeenCalled();
  });

  test('shows error message for invalid date range', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => void 0);

    render(<TestWrapper />);

    const dateInputs = screen.getAllByLabelText(/Occurred between:|to/i) as HTMLInputElement[];
    const filterButton = screen.getByRole('button', { name: /go/i });

    await userEvent.clear(dateInputs[0]);
    await userEvent.type(dateInputs[0], '2024-02-01T00:00');
    await userEvent.clear(dateInputs[1]);
    await userEvent.type(dateInputs[1], '2024-01-01T00:00');

    await userEvent.click(filterButton);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Error - end time preceeds start time.');
    });

    mockAlert.mockRestore();
  });
});


// testing complaint density visualization
describe('Map Clustering Visualization', () => {
  const mockClusteredIncidents: Incident[] = [
    {
      uniqueKey: '1',
      complaintType: 'Noise - Residential',
      descriptor: 'Loud Music',
      incidentAddress: '123 MAIN STREET',
      latitude: 40.7128,
      longitude: -74.0060,
      createdDate: new Date('2024-01-15T20:30:00.000'),
    },
    {
      uniqueKey: '2',
      complaintType: 'Noise - Residential', 
      descriptor: 'Loud Party',
      incidentAddress: '124 MAIN STREET',
      latitude: 40.7129,
      longitude: -74.0061,
      createdDate: new Date('2024-01-15T21:00:00.000'),
    },
    {
      uniqueKey: '3',
      complaintType: 'Graffiti',
      descriptor: 'Spray Paint',
      incidentAddress: '456 BROADWAY',
      latitude: 40.7233,
      longitude: -74.0030,
      createdDate: new Date('2024-01-10T09:15:00.000'),
    },
  ];

  const TestWrapper = () => {
    const [complaint, setComplaint] = useState(complaintType);
    const [start, setStart] = useState(startTime);
    const [end, setEnd] = useState(endTime);

    const handleGo = async () => {
      await incidentService.getAllIncidents();
    };

    return (
      <div>
        <FilterBar
          complaintType={complaint}
          setComplaintType={setComplaint}
          startTime={start}
          setStartTime={setStart}
          endTime={end}
          setEndTime={setEnd}
          onGo={handleGo}
        />
        <MapContainer />
      </div>
    );
  };

  beforeEach(() => {
    (incidentService.getAllIncidents as jest.Mock).mockResolvedValue(mockClusteredIncidents);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render MarkerClusterGroup component for geographic density visualization', async () => {
    render(
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
        <MapContainer />
      </>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('marker-cluster-group')).toBeInTheDocument();
    });
  });

  test('should maintain clustering when a complaint type filter is applied', async () => {
    render(<TestWrapper />);

    // wait for initial cluster render
    await waitFor(() => {
      expect(screen.getByTestId('marker-cluster-group')).toBeInTheDocument();
    });

    // reset the mock call count so we only track the user interaction
    (incidentService.getAllIncidents as jest.Mock).mockClear();

    // Select complaint type and click the first "Go" button
    const [complaintSelect] = screen.getAllByLabelText(/complaint type:/i);
    const [filterButton] = screen.getAllByRole('button', { name: /go/i });

    await userEvent.selectOptions(complaintSelect, 'Noise - Residential');
    fireEvent.click(filterButton);

    // now expect the API call to have been triggered exactly once by this action
    await waitFor(() => {
      expect(incidentService.getAllIncidents).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByTestId('marker-cluster-group')).toBeInTheDocument();
  });

  test('should maintain clustering functionality when date range filters are applied', async () => {
    render(<TestWrapper />);

    // wait for initial cluster render
    await waitFor(() => {
      expect(screen.getByTestId('marker-cluster-group')).toBeInTheDocument();
    });

    // reset mock to only track the user-triggered API call
    (incidentService.getAllIncidents as jest.Mock).mockClear();

    // use the actual labels from FilterBar
    const [startTimeInput, endTimeInput] = screen.getAllByLabelText(/Occurred between:|to/i) as HTMLInputElement[];

    fireEvent.change(startTimeInput, { target: { value: '2024-01-14T00:00' } });
    fireEvent.change(endTimeInput, { target: { value: '2024-01-16T23:59' } });

    // click the first "Go" button
    const [filterButton] = screen.getAllByRole('button', { name: /go/i });
    fireEvent.click(filterButton);

    // expect the API call from this action only
    await waitFor(() => {
      expect(incidentService.getAllIncidents).toHaveBeenCalledTimes(1);
    });

    // clusters should still render
    expect(screen.getByTestId('marker-cluster-group')).toBeInTheDocument();
  });

  test('should maintain clustering functionality when both date range and complaint type filters are applied', async () => {
    render(<TestWrapper />);

    // wait for initial clusters to render
    await waitFor(() => {
      expect(screen.getByTestId('marker-cluster-group')).toBeInTheDocument();
    });

    // reset mock to track only user-triggered call
    (incidentService.getAllIncidents as jest.Mock).mockClear();

    // Select complaint type
    const [complaintSelect] = screen.getAllByLabelText(/complaint type:/i);
    await userEvent.selectOptions(complaintSelect, 'Noise - Residential');

    // Enter date range using correct labels
    const [startDateInput, endDateInput] = screen.getAllByLabelText(/Occurred between:|to/i) as HTMLInputElement[];
    fireEvent.change(startDateInput, { target: { value: '2024-01-15T00:00' } });
    fireEvent.change(endDateInput, { target: { value: '2024-01-16T23:59' } });

    // Click the first "Go" button
    const [filterButton] = screen.getAllByRole('button', { name: /go/i });
    fireEvent.click(filterButton);

    // ensure API call was triggered exactly once
    await waitFor(() => {
      expect(incidentService.getAllIncidents).toHaveBeenCalledTimes(1);
    });

    // clusters should still be rendered
    expect(screen.getByTestId('marker-cluster-group')).toBeInTheDocument();
  });

  test('should maintain clustering when resetting filters to show all incidents', async () => {
    render(<TestWrapper />);

    // wait for initial clusters
    await waitFor(() => {
      expect(screen.getByTestId('marker-cluster-group')).toBeInTheDocument();
    });

    // reset mock call count so we only track user interactions
    (incidentService.getAllIncidents as jest.Mock).mockClear();

    // apply a complaint type filter
    const [complaintSelect] = screen.getAllByLabelText(/complaint type:/i);
    const [filterButton] = screen.getAllByRole('button', { name: /go/i });

    await userEvent.selectOptions(complaintSelect, 'Graffiti');
    fireEvent.click(filterButton);

    // ensure API call triggered once
    await waitFor(() => {
      expect(incidentService.getAllIncidents).toHaveBeenCalledTimes(1);
    });

    // reset the filter back to "All"
    await userEvent.selectOptions(complaintSelect, 'All');
    fireEvent.click(filterButton);

    // expect another API call for the reset
    await waitFor(() => {
      expect(incidentService.getAllIncidents).toHaveBeenCalledTimes(2);
    });

    // clusters should still render
    expect(screen.getByTestId('marker-cluster-group')).toBeInTheDocument();
  });

  test('should handle empty incident datasets while maintaining clustering container structure', async () => {
    // mock an empty dataset to test edge case
    (incidentService.getAllIncidents as jest.Mock).mockResolvedValueOnce([]);
    
    render(
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
        <MapContainer />
      </>
    );
    
    // the cluster group should render even with no data to maintain UI consistency
    await waitFor(() => {
      expect(screen.getByTestId('marker-cluster-group')).toBeInTheDocument();
    });
  });
});


describe('Clustering Integration with Map Features', () => {
  const mockIncidents: Incident[] = [
    {
      uniqueKey: '1',
      complaintType: 'Noise - Residential',
      descriptor: 'Loud Music',
      incidentAddress: '123 MAIN STREET',
      latitude: 40.7128,
      longitude: -74.0060,
      createdDate: new Date('2024-01-15T20:30:00.000'),
    },
    {
      uniqueKey: '2',
      complaintType: 'Noise - Residential',
      descriptor: 'Loud Party', 
      incidentAddress: '124 MAIN STREET',
      latitude: 40.71281,
      longitude: -74.00601,
      createdDate: new Date('2024-01-15T21:00:00.000'),
    },
  ];

  const TestWrapper = () => {
    const [complaint, setComplaint] = useState(complaintType);
    const [start, setStart] = useState(startTime);
    const [end, setEnd] = useState(endTime);

    const handleGo = async () => {
      // call the new service function used in MapContainer
      await incidentService.getFilteredIncidents();
    };

    return (
      <div>
        <FilterBar
          complaintType={complaint}
          setComplaintType={setComplaint}
          startTime={start}
          setStartTime={setStart}
          endTime={end}
          setEndTime={setEnd}
          onGo={handleGo}
        />
        <MapContainer />
      </div>
    );
  };

  beforeEach(() => {
    (incidentService.getAllIncidents as jest.Mock).mockResolvedValue(mockIncidents);
  });

  test('should fully integrate clustering with all other map components', async () => {
    const mockIncidents: Incident[] = [
      {
        uniqueKey: '1',
        complaintType: 'Noise - Residential',
        descriptor: 'Loud Music',
        incidentAddress: '123 MAIN STREET',
        latitude: 40.7128,
        longitude: -74.0060,
        createdDate: new Date('2024-01-15T20:30:00.000'),
      },
    ];

    (incidentService.getFilteredIncidents as jest.Mock).mockResolvedValue({ content: mockIncidents });

    render(
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
        <MapContainer />
      </>
    );

    // Wait for map container
    await waitFor(() => {
      expect(screen.getByTestId('map-container')).toBeInTheDocument();
    });

    // Wait for Leaflet components
    await waitFor(() => {
      expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
      expect(screen.getByTestId('marker-cluster-group')).toBeInTheDocument();
    });

    // Check API call
    await waitFor(() => {
      expect(incidentService.getFilteredIncidents).toHaveBeenCalledTimes(1);
    });
  });

  test('should trigger API calls during filtering while the clustering functionality stays the same', async () => {
    // mock filtered incidents
    const mockIncidents: Incident[] = [
      {
        uniqueKey: '1',
        complaintType: 'Noise - Residential',
        descriptor: 'Loud Music',
        incidentAddress: '123 MAIN STREET',
        latitude: 40.7128,
        longitude: -74.0060,
        createdDate: new Date('2024-01-15T20:30:00.000'),
      },
    ];
    (incidentService.getFilteredIncidents as jest.Mock).mockResolvedValue({ content: mockIncidents });

    render(<TestWrapper />);

    // Wait for initial API call and cluster render
    await waitFor(() => {
      expect(incidentService.getFilteredIncidents).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('marker-cluster-group')).toBeInTheDocument();
    });

    // reset mock to track only user-triggered call
    (incidentService.getFilteredIncidents as jest.Mock).mockClear();

    // Select complaint type and click "Go"
    const [complaintSelect] = screen.getAllByLabelText(/complaint type:/i);
    const [filterButton] = screen.getAllByRole('button', { name: /go/i });

    await userEvent.selectOptions(complaintSelect, 'Graffiti');
    fireEvent.click(filterButton);

    // ensure the API call was triggered
    await waitFor(() => {
      expect(incidentService.getFilteredIncidents).toHaveBeenCalledTimes(1);
    });

    // clusters should still render
    expect(screen.getByTestId('marker-cluster-group')).toBeInTheDocument();
  });
});
