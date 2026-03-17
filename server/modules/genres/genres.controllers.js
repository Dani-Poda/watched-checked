import genresDal from "./genres.dal.js";

class GenresController {
  getAllGenres = async(req, res)=>{
    try {
      const result = await genresDal.getAllGenres();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message:"error de server"})
    }
  }
}

export default new GenresController();