import { SaveDto } from "../dto/SaveDto";
import Save from "../models/Save";

export default interface ISaveService {
  createSave(SaveRequestDto: SaveDto): Promise<Save>;

  updateSave(Save: Save, SaveDto: SaveDto): Promise<Save>;

  getAllUserSaves(userId: string): Promise<Save[]>;

  getAllPostSaves(postId: string): Promise<Save[]>;

  geSaveByProperty(property: any): Promise<Save>;

  getSaveEntityById(id: string): Promise<Save>;

  deleteSave(Save: Save): Promise<void>;
}
