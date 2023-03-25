import React from "react";

type Props = {
  firstName: string;
  lastName: string;
  checkInTime: string;
};

export default function StudentActivity(props: Props) {
  const { firstName, lastName, checkInTime } = props;
  return (
    <tr data-testid='student-activity'>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{checkInTime}</td>
    </tr>
  );
}
