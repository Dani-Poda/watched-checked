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
};

export default new MoviesDal();