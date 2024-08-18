import api from '@/services/api';

interface IContact {
  name: string;
  phone: string;
  email?: string;
  userId?: string;
}

export async function getContacts() {
  try {
    const { data } = await api.get('/contact');
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
}

export async function createContact(contact: IContact) {
  try {
    const { data } = await api.post('/contact', contact);

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}

export async function updateContact(id: string, contact: IContact) {
  try {
    const { data } = await api.put(`/contact/${id}`, contact);
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}

export async function deleteContact(id: string) {
  try {
    const { data } = await api.delete(`/contact/${id}`);
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}
