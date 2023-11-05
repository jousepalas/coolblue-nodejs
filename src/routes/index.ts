import { Express, Request, Response } from 'express';
import PetController from '../controllers/PetController';
import UserController from  '../controllers/UserController';

export function initRoutes(app: Express): void {
  app.get('/', (req: Request, res: Response) => {
    res.send('Test route works!');
  });
  // User routes
  app.post('/api/register', UserController.register);
  
  // Pet routes
  app.get('/api/pets', PetController.getAllPets);
  app.get('/api/pets/:id', PetController.getPetById);
  // Pet Auth routes
  app.get('/api/auth/pets/restore/:id', PetController.restorePet);
  app.get('/api/auth/pets/soft-deleted', PetController.deletedPets);
  app.post('/api/auth/pets', PetController.createPet);
  app.put('/api/auth/pets/:id', PetController.updatePet);
  app.delete('/api/auth/pets/soft/:id', PetController.softDeletePet);
  app.delete('/api/auth/pets/:id', PetController.deletePet);
}
