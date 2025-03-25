import { injectable, inject } from "inversify";
import { IOC } from "../config/inversify/inversify.ioc.types";
import IFaqService from "../services/IFaqService";

@injectable()
export default class FaqController {
  private faqService: IFaqService;

  constructor(@inject(IOC.IFaqService) faqService: IFaqService) {
    this.faqService = faqService;
  }
}
