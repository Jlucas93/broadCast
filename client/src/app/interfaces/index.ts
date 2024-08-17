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
  sendTime: string;
  contactsIDs: string[];
  connectionID: string;
}
