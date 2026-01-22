import { detectRoomService } from "../detectInstallationRoom/detectRoomService";
import { ROOM_SERVICES_MAP } from "../detectInstallationRoom/instalationRoom.config";
import { RoomAmenityItem } from "./detectBathroomAmenity";

function mapRoomAmenities(items: string[]): RoomAmenityItem[] {
  return items.map(item => ({
    id: item,
    label: item,
    Icon: ROOM_SERVICES_MAP[detectRoomService(item)].icon,
  }));
}

export default mapRoomAmenities;