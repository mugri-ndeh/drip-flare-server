import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { ISaveRepository } from "../../repository/RepositoryInterfaces";

import { SaveDto } from "../../dto/SaveDto";
import Save from "../../models/Save";
import ISaveService from "../ISaveService";
import { plainToClass } from "class-transformer";

@injectable()
export default class SaveService implements ISaveService {
  private readonly iSaveRepository: ISaveRepository;

  constructor(@inject(IOC.ISaveRepository) SaveRepository: ISaveRepository) {
    this.iSaveRepository = SaveRepository;
  }
  async getAllUserSaves(userId: string): Promise<Save[]> {
    const saves = await this.iSaveRepository.find({ userId: userId });
    return Promise.resolve(saves);
  }
  async getAllPostSaves(postId: string): Promise<Save[]> {
    const saves = await this.iSaveRepository.find({ postId: postId });
    return Promise.resolve(saves);
  }
  async createSave(saveRequestDto: SaveDto): Promise<Save> {
    let data = plainToClass(Save, saveRequestDto);
    const save = await this.iSaveRepository.create(data);
    return Promise.resolve(save);
  }
  async updateSave(save: Save, saveDto: SaveDto): Promise<Save> {
    if (saveDto)
      for (const [key, value] of Object.entries(saveDto)) {
        if (value !== undefined) {
          (save as any)[key] = value;
        }
      }

    const saveResponse: Save = await this.iSaveRepository.update(save.id, save);

    return Promise.resolve(saveResponse);
  }
  async geSaveByProperty(property: any): Promise<Save> {
    const save = await this.iSaveRepository.findOne(property);
    return Promise.resolve(save);
  }
  async getSaveById(id: any): Promise<Save> {
    const save = await this.iSaveRepository.findOne({ id: id });
    return Promise.resolve(save);
  }
  async getSaveByUserId(id: any): Promise<Save> {
    const save = await this.iSaveRepository.findOne({ userId: id });

    return Promise.resolve(save);
  }
  async getSaveEntityById(id: string): Promise<Save> {
    const save = await this.iSaveRepository.findOne({ id: id });
    return Promise.resolve(save);
  }
  async deleteSave(save: Save): Promise<void> {
    await this.iSaveRepository.delete(save);
  }
}
