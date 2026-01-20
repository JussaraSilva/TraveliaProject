import { detectInstallationCategory } from "./detectInstallationCategory";
import { InstallationCategory } from "./instalations.config";

export function groupInstallations(services: string[]) {
  const grouped: Record<InstallationCategory, string[]> = {
    food: [],
    pool: [],
    spa: [],
    fitness: [],
    activities: [],
    transport: [],
    parking: [],
    concierge: [],
    business: [],
    wifi: [],
    tourism: [],
    beach: [],
    rental: [],
    kids: [],
    view: [],
    comfort: [],
    other: [],
  };

  services.forEach(service => {
    const category = detectInstallationCategory(service);
    grouped[category].push(service);
  });

  return grouped;
}
