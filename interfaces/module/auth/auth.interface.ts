export interface User {
  id: string;
  name: string;
}

export interface authState {
  user: User | null;
  isLogined: boolean;
}
