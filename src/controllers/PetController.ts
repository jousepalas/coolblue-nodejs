import { Request, Response } from 'express';
import {Pet} from '../models/Pet';
import { Op } from 'sequelize';

class PetController {
  public async getAllPets(req: Request, res: Response): Promise<void> {
    try {
      const pets = await Pet.findAll();
      res.status(200).json({success: true, data: pets});
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
        res.status(200).json({success: true, data: pet});
      } else {
        res.status(404).json({ success: false, message: `Pet id: ${petId} not found` });
      }
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:28 ~ PetController ~ getPetById ~ error:", error)
      res.status(500).json({ success: false, message: 'Failed to fetch pet' });
    }
  }

  public async createPet(req: Request, res: Response): Promise<void> {
    const newPetData = req.body;

    try {
      const pet = await Pet.create(newPetData);
      res.status(201).json({success: true, data: pet});
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:40 ~ PetController ~ createPet ~ error:", error)
      res.status(500).json({ success: false, message: 'Failed to create a pet' });
    }
  }

  public async updatePet(req: Request, res: Response): Promise<void> {
    const petId = parseInt(req.params.id, 10);
    const updatedPetData = req.body;

    try {
      const updatedPet = await Pet.update(updatedPetData, {
        where: { id: petId},
      });
      const result = updatedPet[0] === 1;
      
      if (result) {
        res.status(200).json({ success: true, message: 'Pet updated successfully' });
      } else {
        res.status(404).json({ success: false, message: `Pet id: ${petId} not found` });
      }
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:60 ~ PetController ~ updatePet ~ error:", error)
      res.status(500).json({ success: false, message: 'Failed to update the pet'});
    }
  }

  public async softDeletePet(req: Request, res: Response): Promise<void> {
    const petId = req.params.id;
  
    try {
      const softdeleted = await Pet.destroy({ where: { id: petId } });

      if (softdeleted) {
        res.status(200).json({ sucess: true, message: `Pet soft-deleted successfully: ${petId}` });
      } else {
        res.status(404).json({ success: false, message: `Pet id: ${petId} not found` });
      }
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:77 ~ PetController ~ deletePet ~ error:", error)
      res.status(500).json({ success: false, message: 'Failed to soft-delete the pet' });
    }
  }
  
  public async deletePet(req: Request, res: Response): Promise<void> {
    const petId = parseInt(req.params.id, 10);

    try {
      const deletedPet = await Pet.destroy({ where: { id: petId }, force: true });

      if (deletedPet) {
        res.status(200).json({ success: true, message: `Pet deleted successfully, id: ${petId}` });
      } else {
        res.status(404).json({ success: false, message: 'Pet not found' });
      }
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:77 ~ PetController ~ deletePet ~ error:", error)
      res.status(500).json({ success: false, message: 'Failed to soft-delete the pet' });
    }
  }

    public async restorePet(req: Request, res: Response): Promise<void> {
      const petId = parseInt(req.params.id, 10);
    
      try {
        const restoredPet = await Pet.restore({ where: { id: petId } });

        if(!restoredPet!) {
          res.status(404).json({ success: false, message: `Pet id: ${petId} not found as soft deleted record` });
        } 
        res.status(200).json({ success: true, message: `Pet restored successfully, Pet id: ${petId}` });
      } catch (error) {
        console.log("🚀 ~ file: petController.ts:77 ~ PetController ~ deletePet ~ error:", error);
        res.status(500).json({ success: false, message: 'Failed to restore the pet' });
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
      res.status(200).json(softDeletedPets);
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:10 ~ PetController ~ getAllPets ~ error:", error)
      res.status(500).json({ success: false, message: 'Failed to fetch pets' });
    }
  }

}

export default new PetController();
