import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT 
});

const executeQuery = async(sql, values = [])=>{
  let connection;
  try {
    connection = await dbPool.getConnection();

    const [result] = await connection.query(sql, values);
    return result;
  } catch (error) {
    console.error('Error en executeQuery:', error);
    throw error;
  } finally {
    if(connection){
      connection.release();
    }
  }
}

export default executeQuery;