export interface IContact {
  id: string;
  name: string;
  email?: string | null;
  phone: string;
}

export interface IConnection {
  id: string;
  name: string;
  active: boolean;
}

export interface IBroadcast {
  id: string;
  name: string;
  status: string;
  sendDate: string;
  broadcastMessage: string;
  sendTime: string;
  connectionID: string;
  connectionName: string;
  contactsIDs: string[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IAuthContextType {
  user: IUser;
  isAuth: boolean;
  signIn(userData: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; message: string }>;
  signOut(): void;
}
