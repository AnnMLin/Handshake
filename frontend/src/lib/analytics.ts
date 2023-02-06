import axios from "axios";
axios.defaults.baseURL = "http://localhost:8081";

class Analytics {
  async track(name: string) {
    await axios.post('/events', {name});
  }

  async log(userId: number, component: string, action: string) {
    await axios.post("/loggings", {
      userId,
      component,
      action,
    });
  }
}

export default new Analytics();
