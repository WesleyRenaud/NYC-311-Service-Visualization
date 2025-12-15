import { rest } from 'msw';
import { Incident } from '../types/Incident';


const API_URL = `/api/incidents`;

export const handlers = [
   rest.get(`${API_URL}/all`, (req, res, ctx) => {
      const incidents: Incident[] = [
         { 
           uniqueKey: '5678901234', 
           complaintType: 'Noise - Residential',
           descriptor: 'Loud Music/Party',
           incidentAddress: '123 MAIN STREET, BROOKLYN, NY 11201',
           latitude: 40.6928,
           longitude: -73.9903,
           createdDate: new Date('2024-01-15T20:30:00.000')
         },
         { 
           uniqueKey: '5678901235', 
           complaintType: 'Graffiti',
           descriptor: 'Graffiti on Commercial Building',
           incidentAddress: '456 BROADWAY, NEW YORK, NY 10012',
           latitude: 40.7233,
           longitude: -74.0030,
           createdDate: new Date('2024-01-10T09:15:00.000')
         },
      ];
      return res(ctx.status(200), ctx.json(incidents));
   }),
];