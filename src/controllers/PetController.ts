import { Request, Response } from 'express';
import {Pet} from '../models/Pet';

class PetController {
  public async getAllPets(req: Request, res: Response): Promise<void> {
    try {
      const pets = await Pet.findAll();
      res.json(pets);
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:10 ~ PetController ~ getAllPets ~ error:", error)
      res.status(500).json({ error: 'Failed to fetch pets' });
    }
  }

  public async getPetById(req: Request, res: Response): Promise<void> {
    const petId = parseInt(req.params.id, 10);

    try {
      const pet = await Pet.findByPk(petId);

      if (pet) {
        res.json(pet);
      } else {
        res.status(404).json({ error: 'Pet not found' });
        console.log("🚀 ~ file: petController.ts:25 ~ PetController ~ getPetById ~ error:", error)
      }
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:28 ~ PetController ~ getPetById ~ error:", error)
      res.status(500).json({ error: 'Failed to fetch pet' });
    }
  }

  public async createPet(req: Request, res: Response): Promise<void> {
    const newPetData = req.body;

    try {
      const pet = await Pet.create(newPetData);
      res.json(pet);
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:40 ~ PetController ~ createPet ~ error:", error)
      res.status(500).json({ error: 'Failed to create a pet' });
    }
  }

  public async updatePet(req: Request, res: Response): Promise<void> {
    const petId = parseInt(req.params.id, 10);
    const updatedPetData = req.body;

    try {
      const [rowsAffected] = await Pet.update(updatedPetData, {
        where: { id: petId },
      });

      if (rowsAffected === 0) {
        res.status(404).json({ error: 'Pet not found' });
      } else {
        res.status(200).json({ message: 'Pet updated successfully' });
      }
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:60 ~ PetController ~ updatePet ~ error:", error)
      res.status(500).json({ error: 'Failed to update the pet' });
    }
  }

  public async deletePet(req: Request, res: Response): Promise<void> {
    const petId = parseInt(req.params.id, 10);

    try {
      const rowsAffected = await Pet.destroy({ where: { id: petId } });

      if (rowsAffected === 0) {
        res.status(404).json({ error: 'Pet not found' });
      } else {
        res.status(200).json({ message: 'Pet soft-deleted successfully' });
      }
    } catch (error) {
      console.log("🚀 ~ file: petController.ts:77 ~ PetController ~ deletePet ~ error:", error)
      res.status(500).json({ error: 'Failed to soft-delete the pet' });
    }
  }
}

export default new PetController();
