import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const createEntity = async (data) => {
    const response = await axios.post(`${API_URL}/entities`, data);
    return response.data;
  };
  
  export const getEntity = async (entityName) => {
    const response = await axios.get(`${API_URL}/entities/${entityName}`);
    return response.data;
  };
  
  export const getEntries = async (entityName) => {
    const response = await axios.get(`${API_URL}/entities/${entityName}/entries`);
    return response.data;
  };
  
  export const createEntry = async (entityName, entry) => {
    const response = await axios.post(`${API_URL}/entities/${entityName}/entries`, { entry });
    return response.data;
  };
  
  export const updateEntry = async (entityName, index, updatedEntry) => {
    const response = await axios.put(`${API_URL}/entities/${entityName}/entries`, { index, updatedEntry });
    return response.data;
  };
  
  export const deleteEntry = async (entityName, entryIndex) => {
    const response = await axios.delete(`${API_URL}/entities/${entityName}/entries/${entryIndex}`);
    return response.data;
  };
