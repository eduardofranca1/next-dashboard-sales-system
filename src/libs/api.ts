export const api = {
  login: async (
    email: string,
    password: string
  ): Promise<{ error: string; token?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email !== "teste@email.com") {
          resolve({
            error: "Invalid credentials",
          });
        } else {
          resolve({
            error: "",
            token: "123",
          });
        }
      }, 1000);
    });
  },
  forgotPassword: async (email: string): Promise<{ error: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ error: "" });
      }, 1000);
    });
  },
  redefinePassword: async (
    password: string,
    confirmPassword: string,
    token: string
  ): Promise<{ error: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password !== confirmPassword) {
          resolve({ error: "Passwords need to be equal" });
        } else {
          resolve({ error: "" });
        }
      }, 1000);
    });
  },
};
