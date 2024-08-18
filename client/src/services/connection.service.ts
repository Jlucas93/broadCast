import api from '@/services/api';

interface IConnection {
  name: string;
  active: boolean;
  userId?: string;
}

export async function getConnections() {
  try {
    const { data } = await api.get('/connection');
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
}

export async function createConnection(connection: IConnection) {
  try {
    const { data } = await api.post('/connection', connection);

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}

export async function updateConnection(id: string, connection: IConnection) {
  try {
    const { data } = await api.put(`/connection/${id}`, connection);
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}

export async function deleteConnection(id: string) {
  try {
    const { data } = await api.delete(`/connection/${id}`);
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}
