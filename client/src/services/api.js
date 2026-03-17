import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export const moviesAPI = {
  getAll: () => api.get('/movies'),
  
  createMovie: (movieData, file, selectedGenres) => {
    const formData = new FormData();
    
    Object.keys(movieData).forEach(key => {
      formData.append(key, movieData[key]);
    });
    
    if (file) {
      formData.append('poster', file);
    }

    if (selectedGenres && selectedGenres.length > 0) {
      formData.append('genres', JSON.stringify(selectedGenres));
    }
    
    return api.post('/movies', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  editMovie: (movieData, file, selectedGenres) => {
    const formData = new FormData();

    Object.keys(movieData).forEach(key => {
      if (key !== 'movie_id') {
        formData.append(key, movieData[key]);
      }
    });

    if (file) {
      formData.append('poster', file);
    }

    if (selectedGenres && selectedGenres.length > 0) {
      formData.append('genres', JSON.stringify(selectedGenres));
    }

    return api.put(`/movies/${movieData.movie_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  deleteMovie: (movie_id)=> api.delete(`/movies/${movie_id}`)
}

export const genresAPI = { 
  getAll: () => api.get('/genres')
};