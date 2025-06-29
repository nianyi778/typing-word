import { defineStore } from "pinia";

interface User {
  username: string;
  password: string;
  role: "admin" | "user";
  email?: string;
  phone?: string;
  createDate: number;
}

export interface UserState {
  users: User[];
  currentUser?: User;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      users: users,
      currentUser: undefined,
    };
  },
  getters: {
    isAdmin: (state) => {
      return state.currentUser?.role === "admin";
    },
    isUser: (state) => {
      return state.currentUser?.role === "user";
    },
    getCurrentUser: (state) => {
      return state.currentUser;
    },
  },
  actions: {
    login: function ({ username, password }:{username: string, password: string}): boolean {
      const user = this.users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        this.currentUser = user;
        // 本地存储标记
        localStorage.setItem(
          "username",
          username
        );
        return true;
      }
      return false;
    },
    restoreUserFromLocal() {
      if (typeof window === "undefined") return;
      const username = localStorage.getItem("username");
      if (username) {
        const user = this.users.find(u => u.username === username);
        if (user) {
          this.currentUser = user;
          return user
        }
      }
      return undefined;
    },
  },
});

const users: User[] = [
  {
    username: "admin",
    password: "123456",
    role: "admin",
    createDate: Date.now(),
  },
  {
    username: "user",
    password: "111111",
    role: "user",
    createDate: Date.now(),
  },
];
