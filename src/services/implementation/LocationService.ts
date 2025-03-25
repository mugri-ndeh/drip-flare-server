import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import ILocationService from "../ILocationService";
import ILocationRepository from "../ILocationService";
import { LocationDto } from "../../dto/LocationDto";
import AppLocation from "../../models/Location";

@injectable()
export default class LocationService implements ILocationService {
  private readonly iLocationRepository: ILocationRepository;

  constructor(
    @inject(IOC.ILocationRepository) LocationRepository: ILocationRepository
  ) {
    this.iLocationRepository = LocationRepository;
  }
  createLocation(locationRequestDto: LocationDto): Promise<AppLocation> {
    throw new Error("Method not implemented.");
  }
  updateLocation(
    location: AppLocation,
    locationDto: LocationDto
  ): Promise<AppLocation> {
    throw new Error("Method not implemented.");
  }
  geLocationByProperty(property: any): Promise<AppLocation> {
    throw new Error("Method not implemented.");
  }
  getUserLocation(id: string): Promise<AppLocation> {
    throw new Error("Method not implemented.");
  }
  deleteLocation(Location: AppLocation): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
