import { expect } from "chai";
import moviesDal from "../modules/movies/movies.dal.js";

describe('Movies DAL', ()=>{
  describe('getAll', ()=>{
    it('debería devolver un array de películas', async() => {
      //Llamar a la función
      const result = await moviesDal.getAll();

      //Comprobar que es un array
      expect(result).to.be.an('array');
    });

    it('cada película debería tener un título', async() => {
      const result = await moviesDal.getAll();

      result.forEach(movie => {
        expect(movie).to.have.property('title');
      });
    });

    it('cada película debería tener su id', async() => {
      const result = await moviesDal.getAll();

      result.forEach(movie => {
        expect(movie).to.have.property('movie_id');
      })
    });
  })




  describe('createMovie', () => {
    let movieId; //Variable para guardar la ID de la película creaga

    after(async() => {
      //Se ejecuta después de todos los test
      //Aquí eliminamos la película de prueba
      if(movieId){
        await moviesDal.deleteMovie(movieId);
      }
    });

    it('debería crear una película', async() => {
      const movieData = {
        title: 'Película de test',
        type: 1,
        status: 1,
        rating: 8
      }

      const result = await moviesDal.createMovie(movieData);

      movieId = result.movie_id;

      expect(result).to.have.property('movie_id');
      expect(result.title).to.equal('Película de test');
    });

  });

  describe('deleteMovie', () => {
    it('debería borrar una película', async ()=> {
      //Crea película de prueba
      const movieData = {
        title: 'Película a borrar',
        type: 1,
        status: 1,
        rating: 0
      }

      const created = await moviesDal.createMovie(movieData);

      //Borrarla
      const result = await moviesDal.deleteMovie(created.movie_id);

      //Comprobar que se borró
      expect(result.affectedRows).to. equal(1);
    })
  });
})