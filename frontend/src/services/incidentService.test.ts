import { getAllIncidents } from './incidentService'; 
import { server } from './../mocks/server';
import { rest } from 'msw';

describe('incidentService', () => {
    test('fetches all incidents from the API', async () => {
        const incidents = await getAllIncidents();
        
        expect(incidents).toHaveLength(2);
        expect(incidents[0].complaintType).toBe('Noise - Residential');
        expect(incidents[1].complaintType).toBe('Graffiti');
    });
    test('returns empty array when server returns 500 error', async () => {
        server.use(
            rest.get('/api/incidents/all', (req, res, ctx) => res(ctx.status(500)))
        );
    
        const incidents = await getAllIncidents();
        expect(incidents).toEqual([]);
    });
    test('returns empty array if the API fails', async () => {
        server.use(
          rest.get('/api/incidents/all', (req, res, ctx) => res(ctx.status(400)))
        );
    
        const incidents = await getAllIncidents();
        expect(incidents).toEqual([]);
    });
});