const db = require('../queries');

const lobbyController = {};

// lobbyController.getLobbyId = async (req, res, next) => {
//   try {
//     const { rows } = await db.query('SELECT _id FROM lobby');
//     const lobbyId = rows[0]['_id'];
//     console.log(`current lobbyId is ${lobbyId}`);
//     // res.json(data);
//     res.locals.lobbyId = {_id: lobbyId};
//     return next();
//   } catch(err) {
//     return next({
//       log: `lobbyController.getLobbyId caught an error`,
//       status: 400,
//       message: { err: 'Error occurred getting lobbyId from the database. Check server logs for more details.' }
//     })
//   }
// }

lobbyController.createLobby = async (req, res, next) => {
  const name = req.body.name;
  console.log(`Creating lobby named ${name} in the database...`)
  
  const lobbyQuery = {
    text: `INSERT INTO lobbies (name) VALUES ($1);`,
    values: [name],
  };
  
  try {
    await db.query(lobbyQuery); //query 
    res.locals.name = name;
    return next();
  } catch(err) {
    return next({
      log: `lobbyController.createLobby couldn't create a lobby`,
      status: 400,
      message: {err: err.message}
    })
  }
}

module.exports = lobbyController;