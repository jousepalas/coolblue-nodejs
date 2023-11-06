import { Express, Request, Response } from 'express';
import PetController from '../controllers/PetController';
import UserController from  '../controllers/UserController';
import validateToken from '../middleware/auth';

export function initRoutes(app: Express): void {
  app.get('/', (req: Request, res: Response) => {
    res.send('Test route works!');
  });
  // User routes
  app.post('/api/register', UserController.register);
  app.post('/api/login', UserController.login);
  // Pet routes
  app.get('/api/pets', PetController.getAllPets);
  app.get('/api/pets/:id', PetController.getPetById);
  // Pet Auth routes
  app.get('/api/auth/pets/restore/:id', validateToken, PetController.restorePet);
  app.get('/api/auth/pets/soft-deleted', validateToken, PetController.deletedPets);
  app.post('/api/auth/pets', validateToken, PetController.createPet);
  app.put('/api/auth/pets/:id', validateToken, PetController.updatePet);
  app.delete('/api/auth/pets/soft/:id', validateToken, PetController.softDeletePet);
  app.delete('/api/auth/pets/:id', validateToken, PetController.deletePet);
}
