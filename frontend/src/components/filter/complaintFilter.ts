import { Incident } from "../../types/Incident";

export const filterByComplaintType = (type: string) => (incidents: Incident[]) =>
   type === "All" ? incidents : incidents.filter(i => i.complaintType === type);