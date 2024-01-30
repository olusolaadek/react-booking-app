import React, { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

// import { data } from "../../data";

export default function UserPicker() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
        // console.log(data);
      });
  }, []);

  if (users === null) {
    return <Spinner />;
  }

  return (
    <>
      <select name="" id="">
        {users.map((u) => (
          <option key={u.id}>{u.name}</option>
        ))}
      </select>
    </>
  );
}
