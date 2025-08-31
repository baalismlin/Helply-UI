import BaseService from './base'

class TaskService extends BaseService {
  async getTasks() {
    return await this.get('task')
  }
}

export default new TaskService()
