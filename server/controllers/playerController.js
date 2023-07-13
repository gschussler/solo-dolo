const db = require('../queries');

const playerController = {};

playerController.createPlayer = async (req, res, next) => {
  const name = req.body.name;
  console.log(`Creating player named ${name} in the database...`)
  
  const playerQuery = {
    text: `INSERT INTO players (name) VALUES ($1);`,
    values: [name],
  };
  
  try {
    await db.query(playerQuery); //query 
    res.locals.name = await name;
    return next();
  } catch(err) {
    return next({
      log: `playerController.createPlayer couldn't create a player`,
      status: 400,
      message: { err: err.message }
    })
  }
}

module.exports = playerController;