import { Incident } from "../../types/Incident";

export const filterByDateRange = (start: Date | null, end: Date | null) => (incidents: Incident[]) =>
   incidents.filter(i => {
      const created = i.createdDate ? new Date(i.createdDate) : null;
      if (start && created && created < start) return false;
      if (end && created && created > end) return false;
      return true;
   });