import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import IFaqRepository from "../IFaqService";
import IFaqService from "../IFaqService";
import { FaqDto } from "../../dto/FaqDto";
import Faq from "../../models/Faq";

@injectable()
export default class FaqService implements IFaqService {
  private readonly iFaqRepository: IFaqRepository;

  constructor(@inject(IOC.IFaqRepository) FaqRepository: IFaqRepository) {
    this.iFaqRepository = FaqRepository;
  }
  createFaq(faqRequestDto: FaqDto): Promise<Faq> {
    throw new Error("Method not implemented.");
  }
  updateFaq(faq: Faq, faqDto: FaqDto): Promise<Faq> {
    throw new Error("Method not implemented.");
  }
  geFaqByProperty(property: any): Promise<Faq> {
    throw new Error("Method not implemented.");
  }
  getFaq(): Promise<Faq> {
    throw new Error("Method not implemented.");
  }
  deleteFaq(Faq: Faq): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
