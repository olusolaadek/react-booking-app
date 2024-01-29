import { useState, Fragment, useReducer } from "react";
// import { bookables } from "../../static.json";
import { data } from "../../data";
import { FaArrowRight } from "react-icons/fa";

import reducer, { ACTION_TYPES } from "./reducer";
// const bookables = data.bookables;

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: false,
};

export default function BookablesList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { group, bookableIndex, bookables, hasDetails } = state; // destructure state
  // const [group, setGroup] = useState("Kit");
  // const bookables = data.bookables;
  // const [bookableIndex, setBookableIndex] = useState(0);
  // const [hasDetails, setHasDetails] = useState(false);
  const bookablesInGroup = bookables.filter((b) => b.group === group); // bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];

  const bookable = bookablesInGroup[bookableIndex];

  function changeBookable(selectedIndex) {
    dispatch({ type: ACTION_TYPES.SET_BOOKABLE, payload: selectedIndex });
    // setBookableIndex(selectedIndex);
    // console.log(selectedIndex);
  }

  function changeGroup(event) {
    dispatch({ type: ACTION_TYPES.SET_GROUP, payload: event.target.value });
    // setGroup(event.target.value);
    // setBookableIndex(0);
  }

  function nextBookable() {
    dispatch({ type: ACTION_TYPES.NEXT_BOOKABLE });
    // setBookableIndex((i) => (i + 1) % bookablesInGroup.length);
  }
  const toggleDetails = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_HAS_DETAILS });
  };
  return (
    <>
      <div>
        {/* (e) => setGroup(e.target.value) */}
        <select value={group} onChange={changeGroup}>
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        <ul className="bookables">
          {bookablesInGroup.map((b, i) => (
            <li
              style={{ listStyle: "none", marginTop: "2px" }}
              key={b.title}
              className={`items-list-nav ${
                i === bookableIndex ? "selected" : null
              }`}
            >
              <button
                className="btn"
                onClick={() => {
                  changeBookable(i);
                }}
              >
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button className="btn" onClick={nextBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>

      {bookable && (
        <div>
          <div className="bookable-details">
            <div className="item">
              <div className="item-header">
                <h2>{bookable.title}</h2>
                <span className="controls">
                  <label>
                    <input
                      type="checkbox"
                      checked={hasDetails}
                      onChange={toggleDetails}
                    />
                    Show Details
                  </label>
                </span>
              </div>
              <p>{bookable.notes}</p>

              {hasDetails && (
                <div className="item-details">
                  <h3>Availability</h3>
                  <div className="bookable-availability">
                    <ul>
                      {bookable.days.sort().map((d) => (
                        <li key={d}>{data.days[d]}</li>
                      ))}
                    </ul>
                    <ul>
                      {bookable.sessions.map((s) => (
                        <li key={s}>{data.sessions[s]}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
