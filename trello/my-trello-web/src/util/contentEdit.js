export const saveContent = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    e.target.blur();
  }
};
export const selectAllinline = (e) => {
  e.target.focus();
  e.target.select();
};
