import Api from './Api';
import { USE_MOCK } from '../utils/constants';

// Mock data
import database from './mock/database';

class PartsService {
  // Get all parts

  static async getAllParts() {
    if (USE_MOCK) {
      return await database('parts');
    }
    return Api.get('/parts/');
  }

  // Get a part

  static async getPart(id) {
    if (USE_MOCK) {
      const { status, data } = await database('parts');
      return {
        status,
        data: data.filter(item => +item.id === +id),
      };
    }
    return Api.get(`/parts/${id}`);
  }

  // Store a part

  static storePart(data) {
    if (USE_MOCK) {
      return { status: 200, data };
    }
    return Api.post('/parts', data);
  }

  // Update a part

  static updatePart(data) {
    if (USE_MOCK) {
      return { status: 200, data };
    }
    return Api.put('/parts', data);
  }

  // Delete a part

  static async destroy(id) {
    if (USE_MOCK) {
      const { status, data } = await database('parts');
      const result = {
        status,
        data: data.filter(item => +item.id !== +id),
      };
      return result;
    }
    return Api.put('/parts', id);
  }
}

export default PartsService;
