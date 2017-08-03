import request from '../utils/request';

class Project {
  list() {
    return request('/projects').then((res) => {
      return res.data;
    });
  }

  info(projectId) {
    return request(`/projects/${projectId}`).then((res) => {
      return res.data;
    });
  }

  menu(projectId) {
    return request(`/projects_menu`).then((res) => {
      return res.data;
    });
  }
}

export default new Project();