export default function reducer(state, action) {
  switch (action.type) {
    case "SET_GROUP":
      return {
        ...state,
        group: action.payload,
        bookableIndex: 0,
      };
    case "SET_BOOKABLE":
      return {
        ...state,
        bookableIndex: action.payload,
      };
    case "TOGGLE_HAS_DETAILS":
      return {
        ...state,
        hasDetails: !state.hasDetails,
      };

    case "NEXT_BOOKABLE":
      const count = state.bookables.filter(
        (b) => b.group === state.group
      ).length;
      return { ...state, bookableIndex: (state.bookableIndex + 1) % count };

    //
    case "FETCH_BOOKABLES_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: false,
        bookables: [], // Clear the bookables when requesting new data.
      };
    case "FETCH_BOOKABLES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        bookables: action.payload, // Pass the loaded bookables to the reducer via the payload
      };
    case "FETCH_BOOKABLES_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload, // Pass the error to the reducer via the payload
      };
    default:
      return state;
  }
}

export const ACTION_TYPES = {
  SET_GROUP: "SET_GROUP",
  SET_BOOKABLE: "SET_BOOKABLE",
  TOGGLE_HAS_DETAILS: "TOGGLE_HAS_DETAILS",
  NEXT_BOOKABLE: "NEXT_BOOKABLE",
  FETCH_BOOKABLES_REQUEST: "FETCH_BOOKABLES_REQUEST",
  FETCH_BOOKABLES_SUCCESS: "FETCH_BOOKABLES_SUCCESS",
  FETCH_BOOKABLES_ERROR: "FETCH_BOOKABLES_ERROR",
};
