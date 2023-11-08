import { Request, Response } from 'express';
import PetController from '../../../src/controllers/PetController';
import {Pet} from '../../../src/models/Pet';

describe('PetController', () => {
  const mockRequest = {} as Request;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('createPet', () => {
    
    it('should create a new pet successfully', async () => {
      const mockReq: Partial<Request> = { body: { name: 'Fido', species: 'Dog' } };
      const mockRes: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockPetData = { id: 1, name: 'Fido', species: 'Dog' };
      jest.spyOn(Pet, 'create').mockResolvedValue(mockPetData);
  
      await PetController.createPet(mockReq as Request, mockRes as Response);
  
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: mockPetData });
    });
    
    
      it('should handle errors when creating a pet', async () => {
        const mockRes: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
          const errorMessage = 'Failed to create a pet'; // The actual error message
        
          jest.spyOn(Pet, 'create').mockRejectedValue(new Error(errorMessage));
        
          await PetController.createPet({ body: {} } as Request, mockRes as Response);
    
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ success: false, message: 'Failed to create a pet' });
      });
  });
});
