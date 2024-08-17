import api from "@/services/api";

export async function getContacts() {
  try {
    const { data } = await api.get("/contact");
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
}

// export async function updateAsaas(data: IAsaas) {
//   try {
//     await api.post('/integrations/asaas', data);

//     return { success: true };
//   } catch (err) {
//     console.error(err);
//     return { success: false };
//   }
// }

// export async function createAsaasConfig(params: any) {
//   const { data } = await api.post('/asaas-config/create', params);

//   return data;
// }

// export async function editAsaasConfig(params: any) {
//   const { data } = await api.put(`/asaas-config/update/${params.id}`, params);

//   return data;
// }
