export const getLocalStorageData = () => {
  const data = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const user = data ? JSON.parse(data) : null;
  return { user, token };
};
