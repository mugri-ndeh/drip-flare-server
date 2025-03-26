import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import ILocationService from "../ILocationService";
import { ILocationRepository } from "../../repository/RepositoryInterfaces";
import { LocationDto } from "../../dto/LocationDto";
import AppLocation from "../../models/Location";
import { plainToClass } from "class-transformer";

@injectable()
export default class LocationService implements ILocationService {
  private readonly iLocationRepository: ILocationRepository;

  constructor(
    @inject(IOC.ILocationRepository) LocationRepository: ILocationRepository
  ) {
    this.iLocationRepository = LocationRepository;
  }
  async createLocation(locationRequestDto: LocationDto): Promise<AppLocation> {
    let data = plainToClass(AppLocation, locationRequestDto);
    const category = await this.iLocationRepository.create(data);
    return Promise.resolve(category);
  }
  async updateLocation(
    location: AppLocation,
    locationDto: LocationDto
  ): Promise<AppLocation> {
    let locationU: AppLocation = await this.iLocationRepository.findOne({
      id: location.id,
    });

    for (const [key, value] of Object.entries(locationDto)) {
      if (value !== undefined) {
        (locationU as any)[key] = value;
      }
    }

    const locationResponse: AppLocation = await this.iLocationRepository.update(
      location.id,
      locationU
    );

    return Promise.resolve(locationResponse);
  }
  async geLocationByProperty(property: any): Promise<AppLocation> {
    const location = await this.iLocationRepository.findOne(property);
    return Promise.resolve(location);
  }
  async getUserLocation(id: string): Promise<AppLocation> {
    const location = await this.iLocationRepository.findOne({ userId: id });
    return Promise.resolve(location);
  }
  async deleteLocation(location: AppLocation): Promise<void> {
    await this.iLocationRepository.delete(location);
  }
}
