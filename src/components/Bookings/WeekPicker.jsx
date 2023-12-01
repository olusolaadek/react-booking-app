import React from "react";
import reducer from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";
import { useReducer } from "react";
import { ACTIONS } from "./weekReducer";

const WeekPicker = ({ date }) => {
  const [week, dispatch] = useReducer(reducer, date, getWeek);
  return (
    <p className="date-picker">
      <button onClick={() => dispatch({ type: ACTIONS.PREV_WEEK })}>
        Previous
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.TODAY })}>Today</button>
      <button onClick={() => dispatch({ type: ACTIONS.NEXT_WEEK })}>
        Next
      </button>
      {week.start.toDateString()} -{week.end.toDateString()}
    </p>
  );
};

export default WeekPicker;
