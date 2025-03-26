import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { IFaqRepository } from "../../repository/RepositoryInterfaces";
import IFaqService from "../IFaqService";
import { FaqDto } from "../../dto/FaqDto";
import Faq from "../../models/Faq";
import { plainToClass } from "class-transformer";

@injectable()
export default class FaqService implements IFaqService {
  private readonly iFaqRepository: IFaqRepository;

  constructor(@inject(IOC.IFaqRepository) FaqRepository: IFaqRepository) {
    this.iFaqRepository = FaqRepository;
  }
  async createFaq(faqRequestDto: FaqDto): Promise<Faq> {
    let data = plainToClass(Faq, faqRequestDto);
    const faq = await this.iFaqRepository.create(data);
    return Promise.resolve(faq);
  }
  async updateFaq(faq: Faq, faqDto: FaqDto): Promise<Faq> {
    if (faqDto)
      for (const [key, value] of Object.entries(faqDto)) {
        if (value !== undefined) {
          (faq as any)[key] = value;
        }
      }

    const faqResponse: Faq = await this.iFaqRepository.update(faq.id, faq);

    return Promise.resolve(faqResponse);
  }
  async geFaqByProperty(property: any): Promise<Faq> {
    const faq = await this.iFaqRepository.findOne(property);
    return Promise.resolve(faq);
  }
  async getFaqs(): Promise<Faq[]> {
    const faq = await this.iFaqRepository.find();
    return Promise.resolve(faq);
  }
  async deleteFaq(faq: Faq): Promise<void> {
    await this.iFaqRepository.delete(faq);
  }
}
