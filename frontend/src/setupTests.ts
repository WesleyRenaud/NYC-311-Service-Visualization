import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Start/Reset/Close MSW server
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock react-leaflet
jest.mock('react-leaflet', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  return {
    __esModule: true,
    MapContainer: (props: Record<string, unknown>) => React.createElement('div', props, props.children),
    TileLayer: (props: Record<string, unknown>) => React.createElement('div', props, props.children),
    Marker: (props: Record<string, unknown>) => React.createElement('div', props, props.children),
    CircleMarker: (props: Record<string, unknown>) => React.createElement('div', props, props.children),
    Popup: (props: Record<string, unknown>) => React.createElement('div', props, props.children),
    Tooltip: (props: Record<string, unknown>) => React.createElement('div', props, props.children),
    useMapEvents: () => ({}),
    useMap: () => ({}),
    FeatureGroup: (props: Record<string, unknown>) => React.createElement('div', props, props.children),
  };
});

jest.mock('react-leaflet-cluster', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  return {
    __esModule: true,
    default: (props: Record<string, unknown>) => React.createElement('div', props, props.children),
  };
});

// Mock CSS
jest.mock('react-leaflet-cluster/dist/assets/MarkerCluster.css', () => null);
jest.mock('react-leaflet-cluster/dist/assets/MarkerCluster.Default.css', () => null);