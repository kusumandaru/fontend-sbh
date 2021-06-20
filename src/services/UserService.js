import http from "../http-common";

class UserService {
  getAll() {
    return http.get("/engine-rest/user");
  }

  get(id) {
    return http.get(`/engine-rest/user/${id}/profile`);
  }

  create(data) {
    return http.post("/engine-rest/user/create", data);
  }

  update(id, data) {
    return http.put(`/engine-rest/user/${id}/profile/`, data);
  }

  delete(id) {
    return http.delete(`/engine-rest/user/${id}`);
  }

  unlock(id) {
    return http.posts(`/engine-rest/user/${id}/unlock`);
  }
}

export default new UserService();