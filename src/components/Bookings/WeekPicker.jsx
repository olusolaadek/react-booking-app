import React from "react";
import reducer from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";
import { useReducer } from "react";
import { ACTIONS } from "./weekReducer";
import {
  FaLessThan,
  FaCalendarWeek,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const WeekPicker = ({ date = new Date() }) => {
  const [week, dispatch] = useReducer(reducer, date, getWeek);
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
