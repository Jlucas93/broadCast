/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/api';

interface IBroadcast {
  name: string;
  active?: boolean;
  sendDate?: string;
  sendTime?: string;
  boradcastMessage?: string;
  status?: string;
  userId?: string;
  connectionID: string;
  contactsIDs: string[];
}

export async function getBroadcasts() {
  try {
    const { data } = await api.get('/broadcast');
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
}

export async function createBroadcast(broadcast: IBroadcast) {
  try {
    const { data } = await api.post('/broadcast', broadcast);

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: (error as any)?.response?.data?.message || error,
    };
  }
}

export async function updateBroadcast(id: string, broadcast: IBroadcast) {
  try {
    const { data } = await api.put(`/broadcast/${id}`, broadcast);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: (error as any)?.response?.data?.message || error,
    };
  }
}

export async function deleteBroadcast(id: string) {
  try {
    const { data } = await api.delete(`/broadcast/${id}`);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: (error as any)?.response?.data?.message || error,
    };
  }
}
