/* eslint-disable no-restricted-globals */
const worker = () => {
  self.addEventListener("message", (e) => {
    console.log("worker", e);
    if (e) {
      const { users, sortOrder } = e.data;
      users.sort(({ commentCount: a }, { commentCount: b }) =>
        sortOrder === "asc" ? a - b : b - a
      );
      self.postMessage(users);
    }
  });
};

export default worker;
