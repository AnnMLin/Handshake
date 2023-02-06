import { getContext } from "./context";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8081";

class Experiment {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  async activate() {
    const userId = getContext().userId;
    const experimentName = this.name;
    const res = await axios.post("/experiments", {
      userId,
      experimentName,
    });
    let isEnabled = false;
    if (res.data.experimentGroup === "enabled") {
      isEnabled = true;
    }

    return { isEnabled };
  }
}

export default Experiment;
