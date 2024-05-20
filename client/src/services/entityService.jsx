import axios from 'axios';



export const createEntity = async (data) => {
    const response = await axios.post('/entities', data);
    return response.data;
  };
  
  export const getEntity = async (entityName) => {
    const response = await axios.get(`/entities/${entityName}`);
    return response.data;
  };
  
  export const getEntries = async (entityName) => {
    const response = await axios.get(`/entities/${entityName}/entries`);
    return response.data;
  };
  
  export const createEntry = async (entityName, entry) => {
    const response = await axios.post(`/entities/${entityName}/entries`, { entry });
    return response.data;
  };
  
  export const updateEntry = async (entityName, index, updatedEntry) => {
    const response = await axios.put(`/entities/${entityName}/entries`, { index, updatedEntry });
    return response.data;
  };
  
  export const deleteEntry = async (entityName, entryIndex) => {
    const response = await axios.delete(`/entities/${entityName}/entries/${entryIndex}`);
    return response.data;
  };
