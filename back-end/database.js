const Pool = require("pg").Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'database-project.cyu5vxcv3x4n.us-east-2.rds.amazonaws.com',
  database: 'database-project',
  password: 'missouris&t',
  port: 5432,
});

module.exports = pool;