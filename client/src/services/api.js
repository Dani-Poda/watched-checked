import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export const moviesAPI = {
  getAll: () => api.get('/movies'),
  
  createMovie: (movieData, file) => {
    const formData = new FormData();
    
    Object.keys(movieData).forEach(key => {
      formData.append(key, movieData[key]);
    });
    
    if (file) {
      formData.append('poster', file);
    }
    
    return api.post('/movies', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};