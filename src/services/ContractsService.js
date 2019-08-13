import Api from './Api';
import { USE_MOCK } from '../utils/constants';

// Mock data
import database from './mock/database';

class ContractsService {
  // Get all contracts

  static async getAllContracts() {
    if (USE_MOCK) {
      return await database('contracts');
    }
    return Api.get('/contracts');
  }

  // Get a contract

  static async getContract(id) {
    if (USE_MOCK) {
      const { status, data } = await database('contracts');
      return {
        status,
        data: data.filter(item => +item.id === +id),
      };
    }
    return Api.get(`/contracts/${id}`);
  }

  // Store a contract

  static storeContract(data) {
    if (USE_MOCK) {
      return { status: 200, data };
    }
    return Api.post('/contracts', data);
  }

  // Update a contract

  static updateContract(data) {
    if (USE_MOCK) {
      return { status: 200, data };
    }
    return Api.put('/contracts', data);
  }

  // Delete a contract

  static async destroy(id) {
    if (USE_MOCK) {
      const { status, data } = await database('contracts');
      const result = {
        status,
        data: data.filter(item => +item.id !== +id),
      };
      return result;
    }
    return Api.put('/contracts', id);
  }
}

export default ContractsService;
