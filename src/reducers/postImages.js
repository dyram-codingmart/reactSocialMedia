const postImages = (state, action) => {
  switch (action.type) {
    case "UPLOAD":
      return action.payload;
    default:
      return null;
  }
};

export default postImages;
