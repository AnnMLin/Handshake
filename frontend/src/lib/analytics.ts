import { getContext } from "./context";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8081";

class Analytics {
  async track(name: string) {
    await axios.post('/events', {name});
  }

  async log(component: string, action: string) {
    const userId = getContext().userId;
    await axios.post("/loggings", {
      userId,
      component,
      action,
    });
  }
}

export default new Analytics();
