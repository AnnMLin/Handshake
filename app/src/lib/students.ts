import axios from "axios";
axios.defaults.baseURL = "http://localhost:8081";

type Student = {
  id: number;
  first_name: string;
  last_name: string;
  check_in_time: string;
};

class Students {
  students: Array<Student>;
  constructor() {
    this.students = [];
  }

  async getStudents() {
    const {status, data: students} = await axios.get("/index");
    if(status === 200) {
        this.students = [...students]
    }
    return this.students
  }
}

export default new Students();
