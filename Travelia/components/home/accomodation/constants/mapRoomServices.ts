import { IconTextItem } from "../components/lists/iconTextList";

export function mapRoomServices(services: string[]): IconTextItem[] {
  return services.map(service => {
    const type = detectRoomService(service);
    return {
      id: service,
      label: service,
      Icon: ROOM_SERVICES_MAP[type].icon,
    };
  });
}
