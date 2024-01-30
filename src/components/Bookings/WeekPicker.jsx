import React, { useRef } from "react";
import reducer from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";
import { useReducer } from "react";
import { ACTIONS } from "./weekReducer";
import {
  FaCalendarWeek,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarCheck,
} from "react-icons/fa";

const WeekPicker = ({ date = new Date() }) => {
  const [week, dispatch] = useReducer(reducer, date, getWeek);
  const textboxRef = useRef();

  function gotoDate() {
    dispatch({
      type: "SET_DATE",
      payload: textboxRef.current.value,
    });
  }

  return (
    <div>
      <p className="date-picker">
        <button
          className="btn"
          onClick={() => dispatch({ type: ACTIONS.PREV_WEEK })}
        >
          <FaChevronLeft /> <span>Prev</span>
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.TODAY })}>
          <FaCalendarWeek /> <span>Today</span>
        </button>
        <span>
          <input type="date" ref={textboxRef} placeholder="e.g. 2024-02-08" />
          <button className="go btn" onClick={gotoDate}>
            Go
          </button>
        </span>
        <button onClick={() => dispatch({ type: ACTIONS.NEXT_WEEK })}>
          <span>Next</span> <FaChevronRight />
        </button>
      </p>
      <p>
        <br />
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
};

export default WeekPicker;
