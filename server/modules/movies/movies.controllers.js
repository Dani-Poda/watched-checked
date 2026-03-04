import moviesDal from "./movies.dal.js";

class MoviesController {
 
  getAll = async(req,res)=>{
    try {
      const result = await moviesDal.getAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message:"error de server"});
    }
  }

  createMovie = async(req, res)=>{
    try {
      const data = req.body;

      if(req.file){
        data.poster = `/uploads/posters/${req.file.filename}`
      }

      const result = await moviesDal.createMovie(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({message:"error de server"});
    }
  }
}

export default new MoviesController();