import React, { useEffect, useState } from "react";

import { data } from "../../data";

export default function UserPicker() {
  return (
    <>
      <select name="" id="">
        {data.users.map((u) => (
          <option key={u.id}>{u.name}</option>
        ))}
      </select>
    </>
  );
}
