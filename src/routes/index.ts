import { Express, Request, Response } from 'express';
import PetController from '../controllers/PetController';

export function initRoutes(app: Express): void {
  app.get('/', (req: Request, res: Response) => {
    res.send('Test route works!');
  });

  app.get('/api/pets', PetController.getAllPets);
  app.get('/api/pets/:id', PetController.getPetById);
  app.post('/api/pets', PetController.createPet);
  app.put('/api/pets/:id', PetController.updatePet);
  app.delete('/api/pets/:id', PetController.deletePet);
}
