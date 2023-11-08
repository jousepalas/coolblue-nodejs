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

  describe('getPetById', () => {
  it('should get a pet by ID successfully', async () => {
    const mockReq: Partial<Request> = { params: { id: '1' } };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockPetData = new Pet({ id: 1, name: 'Fluffy' });
    jest.spyOn(Pet, 'findByPk').mockResolvedValue(mockPetData);

    await PetController.getPetById(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: mockPetData });
  });

  it('should handle pet not found when getting a pet by ID', async () => {
    const mockReq: Partial<Request> = { params: { id: '2' } };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(Pet, 'findByPk').mockResolvedValue(null);

    await PetController.getPetById(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ success: false, message: 'Pet id: 2 not found' });
  });
});

});