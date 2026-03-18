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

      if (data.genres) {
        if (typeof data.genres === 'string') {
          data.genres = JSON.parse(data.genres);
        }
      }

      const result = await moviesDal.createMovie(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({message:"error de server"});
    }
  }

  editMovie = async(req, res) => {
    try {
      const { movie_id } = req.params;
      const data = req.body;

      if (req.file) {
        data.poster = `/uploads/posters/${req.file.filename}`;
      }

      if (data.genres) {
        if (typeof data.genres === 'string') {
          data.genres = JSON.parse(data.genres);
        }
        
        if (data.genres.length > 0 && typeof data.genres[0] === 'object') {
          data.genres = data.genres.map(g => g.genre_id);
        }
      }

      data.movie_id = movie_id;

      const result = await moviesDal.editMovie(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: "error de server"});
    }
  }

  deleteMovie = async(req, res)=> {
    try {
      const {movie_id} = req.params;

      const result = await moviesDal.deleteMovie(movie_id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message:"error de server"});
    }
  }
}

export default new MoviesController();