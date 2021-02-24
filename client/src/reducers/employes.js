export default function reducer(state = {}, action) {
  switch (action.type) {
    case "SET_EMPLOY_DATA": {
      return { ...state, ...action.payload };
    }

    default: {
      return { ...state };
    }
  }

  //
}
