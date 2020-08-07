export interface Incident {
  id: string;
  author: string;
  createdAt: string;
  message: string;
  image?: { url: string };
}

export interface IncidentsData {
  incidents: Incident[];
}
