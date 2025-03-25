import { LocationDto } from "../dto/LocationDto";
import AppLocation from "../models/Location";

export default interface ILocationService {
  createLocation(locationRequestDto: LocationDto): Promise<AppLocation>;

  updateLocation(
    location: AppLocation,
    locationDto: LocationDto
  ): Promise<AppLocation>;

  geLocationByProperty(property: any): Promise<AppLocation>;

  getUserLocation(id: string): Promise<AppLocation>;

  deleteLocation(Location: AppLocation): Promise<void>;
}
