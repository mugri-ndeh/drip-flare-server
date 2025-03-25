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
  createBusiness(
    businessRegistrationRequestDto: BusinessDto
  ): Promise<Business> {
    throw new Error("Method not implemented.");
  }
  updateBusiness(
    business: Business,
    BusinessDto: BusinessDto
  ): Promise<Business> {
    throw new Error("Method not implemented.");
  }
  geBusinessByProperty(property: any): Promise<Business> {
    throw new Error("Method not implemented.");
  }
  getBusinessById(id: any): Promise<Business> {
    throw new Error("Method not implemented.");
  }
  getBusinessByUserId(id: any): Promise<Business> {
    throw new Error("Method not implemented.");
  }
  getBusinessEntityById(id: string): Promise<Business> {
    throw new Error("Method not implemented.");
  }
  deleteBusiness(business: Business): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
