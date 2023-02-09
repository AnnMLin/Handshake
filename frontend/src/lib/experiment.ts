import axios from "axios";
axios.defaults.baseURL = "http://localhost:8081";

class Experiment {
  userId: number;
  name: string;
  group: string;
  isActivated: boolean;

  constructor(userId: number, name: string) {
    this.name = name;
    this.userId = userId;
    this.group = this.userId % 2 ? "enabled" : "control";
    this.isActivated = false;
  }

  activate() {
    if(!this.isActivated) {
      this.isActivated = true;
      this.saveActivation();
    }

    return { isEnabled: this.group === "enabled" };
  }

  async saveActivation() {
    await axios.post("/experiments", {
      userId: this.userId,
      experimentName: this.name,
      experimentGroup: this.group,
    });
  }
}

export default Experiment;
