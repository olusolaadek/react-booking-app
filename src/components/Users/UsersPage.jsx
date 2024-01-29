import React, { useEffect, useState } from "react";
// import { data } from "../../data";
import useFetchData from "../../hooks/useFetchData";
import Spinner from "../UI/Spinner";

export default function UsersPage() {
  // selectedUser, selectedIndex
  // const [selectedUser, setSelectedUser] = useState(data.users[0]);
  // const [users, setUsers] = useState([]);
  const [users, error] = useFetchData("http://localhost:3001/users");

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedUser = users[selectedIndex];

  const changeSelectedUser = (i) => {
    setSelectedIndex(i);
  };

  if (users === null) {
    return (
      <p>
        <Spinner /> Loading users...
      </p>
    );
  }

  return (
    <main className="users-page">
      <div>
        <ul className="bookables">
          {users.map((u, i) => (
            <li
              className={`items-list-nav ${
                selectedUser.id === u.id ? " selected" : null
              }`}
              key={u.id}
            >
              <button
                className={`btn ${
                  selectedUser.id === u.id ? " selected" : null
                }`}
                onClick={() => changeSelectedUser(i)}
              >
                {u.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{selectedUser?.name}</h2>
            </div>

            <div className="item-details">
              <h3>{selectedUser?.title}</h3>
              <p>{selectedUser?.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
