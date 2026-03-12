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
};

export default new MoviesDal();