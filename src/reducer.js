export default function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, joined: true };
    case "SET_USERNAME":
      return { ...state, userName: action.payload };
    case "SET_ROOMID":
      return { ...state, roomId: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    default:
      throw new Error();
  }
}
