import executeQuery from "../../config/db.js";

class GenresDal {

  getAllGenres = async()=> {
    try {
      let sql = "SELECT * FROM Genre ORDER BY genre_name";
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw {message: "Error en bd"};
    }
  }
}

export default new GenresDal();