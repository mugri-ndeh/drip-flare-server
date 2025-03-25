import { FaqDto } from "../dto/FaqDto";
import Faq from "../models/Faq";

export default interface IFaqService {
  createFaq(faqRequestDto: FaqDto): Promise<Faq>;

  updateFaq(faq: Faq, faqDto: FaqDto): Promise<Faq>;

  geFaqByProperty(property: any): Promise<Faq>;

  getFaq(): Promise<Faq>;

  deleteFaq(Faq: Faq): Promise<void>;
}
