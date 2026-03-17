import executeQuery from "../../config/db.js";

class MoviesDal {

  getAll = async()=>{
    try {
      let sql = "SELECT * FROM Movie_Serie ORDER BY movie_id DESC";
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw {message: "Error en bd"};
    }
  }

  createMovie = async(data)=>{
    try {
      const {title, type, poster, year_published, year_watched, synopsis, rating, duration, seasons, notes, status} = data;

      let sql = 'INSERT INTO Movie_Serie (title, type, poster, year_published, year_watched, synopsis, rating, duration, seasons, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      let values = [
        title, 
        type, 
        poster || null,
        year_published || null,
        year_watched || null, 
        synopsis || null, 
        rating || null, 
        duration || null, 
        seasons || null, 
        notes || null, 
        status
      ]
      let result = await executeQuery(sql, values);

      let movie_id = result.insertId;

      if (data.genres) {
        await this.saveGenres(movie_id, data.genres);
      }
      
      const newMovie = await executeQuery('SELECT * FROM Movie_Serie WHERE movie_id = ?',[movie_id]);

      return newMovie[0];
    } catch (error) {
      throw {message: "Error en bd"};
    }
  }

  editMovie = async(data)=> {
    try {
      const {title, type, poster, year_published, year_watched, synopsis, rating, duration, seasons, notes, status, movie_id} = data;

      let sql = "UPDATE Movie_Serie SET title = ?, type = ?, poster = ?, year_published = ?, year_watched = ?, synopsis = ?, rating = ?, duration = ?, seasons = ?, notes = ?, status = ? WHERE movie_id = ?";
      let values = [
        title, 
        type, 
        poster || null,
        year_published || null,
        year_watched || null, 
        synopsis || null, 
        rating || null, 
        duration || null, 
        seasons || null, 
        notes || null, 
        status,
        movie_id
      ]
      await executeQuery(sql,values);


      const updated = await executeQuery(
        'SELECT * FROM Movie_Serie WHERE movie_id = ?',
        [movie_id]
      );

      if (data.genres) {
        await this.saveGenres(movie_id, data.genres);
      }

      return updated[0];
    } catch (error) {
      throw {message: "Error en bd"};
    }
  }

  deleteMovie = async(movie_id)=> {
    try {
      let sql = "DELETE FROM Movie_Serie WHERE movie_id = ?";
      let result = await executeQuery(sql, [movie_id]);
      return result;
    } catch (error) {
      throw {message: "Error en bd"};
    }
  }

  saveGenres = async (movie_id, genreIds) => {
    try {
      // Eliminar géneros anteriores
      await executeQuery('DELETE FROM Genre_Movie WHERE movie_id = ?', [movie_id]);
      
      // Si hay géneros nuevos, insertarlos
      if (genreIds && genreIds.length > 0) {
        // Convertir [1, 3, 7] en [[1, 5], [3, 5], [7, 5]] 
        // (cada género emparejado con el movie_id)
        const values = genreIds.map(genre_id => [genre_id, movie_id]);

        // Crear string "(?, ?), (?, ?), (?, ?)" para el SQL
        // (un par de placeholders por cada género)
        const placeholders = values.map(() => '(?, ?)').join(', ');

        // Aplanar [[1, 5], [3, 5], [7, 5]] a [1, 5, 3, 5, 7, 5]
        // (array plano que necesita executeQuery)
        const flatValues = values.flat();
        

        // Insertar múltiples géneros a la vez en Genre_Movie
        // El SQL resultante será: INSERT INTO Genre_Movie (genre_id, movie_id) VALUES (?, ?), (?, ?), (?, ?)
        // Los placeholders se reemplazan con flatValues: [1, 5, 3, 5, 7, 5]
        await executeQuery(
          `INSERT INTO Genre_Movie (genre_id, movie_id) VALUES ${placeholders}`,
          flatValues
        );
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }

};

export default new MoviesDal();