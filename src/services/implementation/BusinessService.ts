import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { IBusinessRepository } from "../../repository/RepositoryInterfaces";
import IBusinessService from "../IBusinessService";

import { plainToClass } from "class-transformer";
import { BusinessDto } from "../../dto/BusinessDto";
import Business from "../../models/Business";

@injectable()
export default class BusinessService implements IBusinessService {
  private readonly iBusinessRepository: IBusinessRepository;

  constructor(
    @inject(IOC.IBusinessRepository) businessRepository: IBusinessRepository
  ) {
    this.iBusinessRepository = businessRepository;
  }
  async createBusiness(
    businessRegistrationRequestDto: BusinessDto
  ): Promise<Business> {
    const businessRequest = plainToClass(
      Business,
      businessRegistrationRequestDto
    );
    const business = await this.iBusinessRepository.create(businessRequest);
    return Promise.resolve(business);
  }
  async updateBusiness(
    business: Business,
    businessRequestDto: BusinessDto
  ): Promise<Business> {
    let businessU: Business = await this.iBusinessRepository.findOne({
      id: business.id,
    });

    for (const [key, value] of Object.entries(businessRequestDto)) {
      if (value !== undefined) {
        (businessU as any)[key] = value;
      }
    }

    const businessResponse: Business = await this.iBusinessRepository.update(
      business.id,
      businessU
    );

    return Promise.resolve(businessResponse);
  }
  async geBusinessByProperty(property: any): Promise<Business> {
    try {
      const business = await this.iBusinessRepository.findOne(property);
      return Promise.resolve(business);
    } catch (error) {
      throw error;
    }
  }
  async getBusinessById(id: any): Promise<Business> {
    let business: Business = await this.iBusinessRepository.findOne({ id: id });
    return Promise.resolve(business);
  }
  async getBusinessByUserId(id: any): Promise<Business> {
    let business: Business = await this.iBusinessRepository.findOne(
      { userId: id },
      {
        relations: ["user"],
      }
    );
    return Promise.resolve(business);
  }
  async getBusinessEntityById(id: string): Promise<Business> {
    let business: Business = await this.iBusinessRepository.findOne({ id: id });
    return Promise.resolve(business);
  }
  async deleteBusiness(business: Business): Promise<void> {
    await this.iBusinessRepository.delete(business);
    return Promise.resolve();
  }
}
