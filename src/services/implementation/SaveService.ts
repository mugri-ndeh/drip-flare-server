import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { ISaveRepository } from "../../repository/RepositoryInterfaces";

import { SaveDto } from "../../dto/SaveDto";
import Save from "../../models/Save";
import ISaveService from "../ISaveService";

@injectable()
export default class SaveService implements ISaveService {
  private readonly iSaveRepository: ISaveRepository;

  constructor(@inject(IOC.ISaveRepository) SaveRepository: ISaveRepository) {
    this.iSaveRepository = SaveRepository;
  }
  getAllUserSaves(userId: string): Promise<Save[]> {
    throw new Error("Method not implemented.");
  }
  getAllPostSaves(postId: string): Promise<Save[]> {
    throw new Error("Method not implemented.");
  }
  createSave(SaveRequestDto: SaveDto): Promise<Save> {
    throw new Error("Method not implemented.");
  }
  updateSave(Save: Save, SaveDto: SaveDto): Promise<Save> {
    throw new Error("Method not implemented.");
  }
  geSaveByProperty(property: any): Promise<Save> {
    throw new Error("Method not implemented.");
  }
  getSaveById(id: any): Promise<Save> {
    throw new Error("Method not implemented.");
  }
  getSaveByUserId(id: any): Promise<Save> {
    throw new Error("Method not implemented.");
  }
  getSaveEntityById(id: string): Promise<Save> {
    throw new Error("Method not implemented.");
  }
  deleteSave(Save: Save): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
