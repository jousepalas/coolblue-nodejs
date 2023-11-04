import { Request, Response } from 'express';
import {Pet} from '../models/Pet';
import { Op } from 'sequelize';

class PetController {
  public async getAllPets(req: Request, res: Response): Promise<void> {
    try {
      const pets = await Pet.findAll();
      res.json({success: true, data: pets});
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:10 ~ PetController ~ getAllPets ~ error:", error)
      res.status(500).json({ success: false, message: 'Failed to fetch pets' });;
    }
  }

  public async getPetById(req: Request, res: Response): Promise<void> {
    const petId = parseInt(req.params.id, 10);

    try {
      const pet = await Pet.findByPk(petId);

      if (pet) {
        res.json({success: true, data: pet});
      } else {
        res.status(404).json({ success: false, message: `Pet id: ${petId} not found` });
      }
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:28 ~ PetController ~ getPetById ~ error:", error)
      res.status(500).json({ message: 'Failed to fetch pet', error });
    }
  }

  public async createPet(req: Request, res: Response): Promise<void> {
    const newPetData = req.body;

    try {
      const pet = await Pet.create(newPetData);
      res.json({success: true, data: pet});
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:40 ~ PetController ~ createPet ~ error:", error)
      res.status(500).json({ message: 'Failed to create a pet', error });
    }
  }

  public async updatePet(req: Request, res: Response): Promise<void> {
    const petId = parseInt(req.params.id, 10);
    const updatedPetData = req.body;

    try {
      const [updatedPet] = await Pet.update(updatedPetData, {
        where: { id: petId},
      });

      if (updatedPet === 0) {
        res.status(404).json({ success: false, message: `Pet id: ${petId} not found` });
      } else {
        res.status(200).json({ success: true, message: 'Pet updated successfully' });
      }
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:60 ~ PetController ~ updatePet ~ error:", error)
      res.status(500).json({ message: 'Failed to update the pet', error });
    }
  }

  public async softDeletePet(req: Request, res: Response): Promise<void> {
    const petId = req.params.id;
  
    try {
      const softdeleted = await Pet.destroy({ where: { id: petId } });

      if (softdeleted === 0) {
        res.status(404).json({ success: false, message: `Pet id: ${petId} not found` });
      } else {
        res.status(200).json({ sucess: true, message: `Pet soft-deleted successfully: ${petId}` });
      }
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:77 ~ PetController ~ deletePet ~ error:", error)
      res.status(500).json({ error: 'Failed to soft-delete the pet' });
    }
  }
  
  public async deletePet(req: Request, res: Response): Promise<void> {
    const petId = parseInt(req.params.id, 10);

    try {
      const deletedPet = await Pet.destroy({ where: { id: petId }, force: true });

      if (deletedPet === 0) {
        res.status(404).json({ success: false, error: 'Pet not found' });
      } else {
        res.status(200).json({ message: `Pet deleted successfully, id: ${petId}` });
      }
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:77 ~ PetController ~ deletePet ~ error:", error)
      res.status(500).json({ error: 'Failed to soft-delete the pet' });
    }
  }

    public async restorePet(req: Request, res: Response): Promise<void> {
      const petId = parseInt(req.params.id, 10);
    
      try {
        const restoredPet = await Pet.restore({ where: { id: petId } });

        res.status(200).json({ success: true, message: `Restore with exit ${restoredPet}, Pet id: ${petId}` });
      } catch (error) {
        console.log("🚀 ~ file: petController.ts:77 ~ PetController ~ deletePet ~ error:", error);
        res.status(500).json({ success: false, error: 'Failed to restore the pet' });
      }
    }
    

  public async deletedPets(req: Request, res: Response): Promise<void> {
    try {
      const softDeletedPets = await Pet.findAll({
        paranoid: false,
        where: {
          deletedAt: {
            [Op.not]: null
          }
        }
      });
      res.json(softDeletedPets);
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:10 ~ PetController ~ getAllPets ~ error:", error)
      res.status(500).json({ success: false, error: 'Failed to fetch pets', message: error });;
    }
  }

}

export default new PetController();
