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

  describe('updatePet', () => {
    
  it('should update a pet successfully', async () => {
    const mockReq: Partial<Request> = { params: { id: '1' }, body: { name: 'Buddy', species: 'Dog' } };
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(Pet, 'update').mockResolvedValue([1]);

    await PetController.updatePet(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ success: true, message: 'Pet updated successfully' });
  });

it('should handle pet not found when updating a pet', async () => {
  const mockReq: Partial<Request> = { params: { id: '2' }, body: { name: 'Buddy', species: 'Dog' } };
  const mockRes: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  jest.spyOn(Pet, 'update').mockResolvedValue([0]);

  await PetController.updatePet(mockReq as Request, mockRes as Response);

  expect(mockRes.status).toHaveBeenCalledWith(404);
  expect(mockRes.json).toHaveBeenCalledWith({ success: false, message: 'Pet id: 2 not found' });
});

  });
});
