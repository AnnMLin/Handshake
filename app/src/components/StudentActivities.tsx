import React, { useState, useEffect } from "react";
import '../css/table.css'
import Students from "../lib/students";
import StudentActivity from "./StudentActivity";

type Student = {
  id: number;
  first_name: string;
  last_name: string;
  check_in_time: string;
};

export default function StudentActivities() {
  const [students, setStudents] = useState<Array<Student>>([]);

  useEffect(() => {
    Students.getStudents().then((students) => {
      setStudents(students);
    });
  }, []);

  return (
    <div>
      <table data-testid='check-in-table'>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Check in time</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentActivity
              key={student.id}
              firstName={student.first_name}
              lastName={student.last_name}
              checkInTime={student.check_in_time}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
