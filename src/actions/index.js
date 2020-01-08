export const upload = image => dispatch => {
  dispatch({ type: "UPLOAD", payload: image });
};
