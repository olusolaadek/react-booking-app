import { useEffect, Fragment, useReducer, useRef } from "react";
// import { bookables } from "../../static.json";
// import { data } from "../../data";
import { default as data } from "../../static.json";
// import { sessions, days } from "../../static.json";

import { FaArrowRight } from "react-icons/fa";

import reducer, { ACTION_TYPES } from "./reducer";
import getData from "../../utils/api";
import Spinner from "../UI/Spinner";
// const bookables = data.bookables;
const sessions = data.sessions;
const days = data.days;

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [], // Set bookables to an empty array.
  isLoading: true,
  error: false,
};

export default function BookablesList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { group, bookableIndex, bookables } = state; // destructure the new state
  const { hasDetails, isLoading, error } = state; // destructure the new state

  const bookablesInGroup = bookables.filter((b) => b.group === group); // bookables.filter((b) => b.group === group);
  const bookable = bookablesInGroup[bookableIndex];
  const groups = [...new Set(bookables.map((b) => b.group))];
  //
  const timerRef = useRef(null);
  const nextBtnRef = useRef();

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.FETCH_BOOKABLES_REQUEST });
    getData("http://localhost:3001/bookables")
      .then((bookables) =>
        dispatch({
          type: ACTION_TYPES.FETCH_BOOKABLES_SUCCESS,
          payload: bookables,
        })
      )
      .catch((error) =>
        dispatch({ type: ACTION_TYPES.FETCH_BOOKABLES_ERROR, payload: error })
      );
  }, []);

  useEffect(() => {}, []);

  function stopPresentation() {
    clearInterval(timerRef.current);
  }

  function changeBookable(selectedIndex) {
    dispatch({ type: ACTION_TYPES.SET_BOOKABLE, payload: selectedIndex });
    nextBtnRef.current.focus();
    // setBookableIndex(selectedIndex);
    // console.log(selectedIndex);
  }

  function changeGroup(event) {
    dispatch({ type: ACTION_TYPES.SET_GROUP, payload: event.target.value });
    nextBtnRef.current.focus();
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

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return (
      <p>
        <Spinner /> loading bookables...
      </p>
    );
  }
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
          <button
            className="btn"
            ref={nextBtnRef}
            onClick={nextBookable}
            autoFocus
          >
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
                  <button className="btn" onClick={stopPresentation}>
                    Stop
                  </button>
                </span>
              </div>
              <p>{bookable.notes}</p>

              {hasDetails && (
                <div className="item-details">
                  <h3>Availability</h3>
                  <div className="bookable-availability">
                    <ul>
                      {bookable.days.sort().map((d) => (
                        <li key={d}>{days[d]}</li>
                      ))}
                    </ul>
                    <ul>
                      {bookable.sessions.map((s) => (
                        <li key={s}>{sessions[s]}</li>
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
