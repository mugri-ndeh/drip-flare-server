import { BusinessDto } from "../dto/BusinessDto";
import Business from "../models/Business";

export default interface IBusinessService {
  createBusiness(businessRequestDto: BusinessDto): Promise<Business>;

  updateBusiness(
    business: Business,
    BusinessDto: BusinessDto
  ): Promise<Business>;

  geBusinessByProperty(property: any): Promise<Business>;

  getBusinessById(id: any): Promise<Business>;
  getBusinessByUserId(id: any): Promise<Business>;

  getBusinessEntityById(id: string): Promise<Business>;

  deleteBusiness(business: Business): Promise<void>;
}
