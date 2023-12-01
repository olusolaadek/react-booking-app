import { getWeek } from "../../utils/date-wrangler";
export default function reducer(state, action) {
  switch (action.key) {
    case "NEXT_WEEK":
      return getWeek(state.date, 7);
    case "PREV_WEEK":
      return getWeek(state.date - 7);
    case "TODAY":
      return getWeek(new Date());
    case "SET_DATE":
      return getWeek(action.payload);
    default:
      throw new Error(`Unknow action type: ${action.type}`);
  }
}

export const ACTIONS = {
  NEXT_WEEK: "NEXT_WEEK",
  PREV_WEEK: "PREV_WEEK",
  TODAY: "TODAY",
  SET_DATE: "SET_DATE",
};
