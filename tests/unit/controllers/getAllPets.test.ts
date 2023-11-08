import { Request, Response } from 'express';
import PetController from '../../../src/controllers/PetController';
import {Pet} from '../../../src/models/Pet';
import { Op } from 'sequelize';

describe('PetController', () => {
  const mockRequest = {} as Request;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('getAllPets', () => {
    it('should return 200 status and pets data on success', async () => {
      const mockPets = [new Pet({ id: 1, name: 'Rex' })];;
      jest.spyOn(Pet, 'findAll').mockResolvedValue(mockPets);

      await PetController.getAllPets(mockRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: mockPets });
    });

    it('should handle errors', async () => {
      jest.spyOn(Pet, 'findAll').mockRejectedValue(new Error('Failed to get pets'));

      await PetController.getAllPets(mockRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Failed to fetch pets' });
    });
  });
});
