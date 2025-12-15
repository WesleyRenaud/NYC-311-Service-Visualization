import { Incident } from '../types/Incident';

const API_URL = '/api/incidents';
console.log('API_URL:', API_URL);

export const getAllIncidents = async (): Promise<Incident[]> => {
  console.log('Fetching all incidents from:', `${API_URL}/all`);
  try {
    const response = await fetch(`${API_URL}/all`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return [];
  }
};

export async function getFilteredIncidents(
  complaintType?: string,
  start?: string,
  end?: string,
  page = 0,
  size = 5000,
) {
  const params = new URLSearchParams();

  if (complaintType && complaintType !== 'All') {
    params.append('complaintType', complaintType);
  }
  if (start) params.append('start', start);
  if (end) params.append('end', end);

  params.append('page', page.toString());
  params.append('size', size.toString());

  const res = await fetch(`${API_URL}/filtered?${params.toString()}`);

  if (!res.ok) {
    throw new Error('Failed to fetch filtered incidents');
  }

  return res.json();
}

// NEW: mark an incident as resolved
export const resolveIncident = async (uniqueKey: string): Promise<void> => {
  const res = await fetch(`${API_URL}/resolve/${uniqueKey}`, {
    method: 'PUT',
  });

  if (!res.ok) {
    throw new Error(`Failed to resolve incident ${uniqueKey} (status ${res.status})`);
  }
};
