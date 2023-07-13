const path = require('path');
const cors = require('cors');

const express = require('express');
const http = require('http'); //socket.io requires 'http' to create a server that will work with Express
const { Server } = require('socket.io');

const app = express();
const httpServer = http.createServer(app); //required to init socket.io server
const io = new Server(httpServer, {
  cookie: true,
  cors: {
    origin: ['http://localhost:8080'],
  },
});

const lobbyRouter = require('./routes/lobby');
const playerRouter = require('./routes/player');

const PORT = 3001;

io.on('connection', (socket) => {
  // console.log(socket);
  console.log(`user connected at ${socket.id}`)

  socket.on('disconnect', () => {
    console.log("user disconnected from socket", socket.id);
  })

  socket.on('join_lobby', (lobby) => {
    socket.join(lobby);
    console.log(`user ${socket.id} joined room ${lobby}`)
  })

  socket.on('send_message', (data) => {
    console.log(data)
    socket.to(data.lobby).emit("receive_message", data)
  });
});

//handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//add routers in: make routers for different types of requests (which will come from React components) -> those requests pass to relevant controllers which will contain the needed database queries. Once completing queries, return here.
app.use('lobby', lobbyRouter);
app.use('player', playerRouter);

//serve dist
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

//server index.html on base route '/'
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
});

app.use((req, res) => {
  res.status(404).send(`That endpoint doesn't exist!!`)
})

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json('Error: ' + errorObj.message);
});

//socket.io needs access to the raw httpServer in order to work with Express. Express should still function since it
//packages httpServer implicitly
httpServer.listen(PORT, () => {
  console.log(`Server is ALIVE on port: ${PORT}...`)
}); // httpServer must be used because app would create a new HTTP server http://localhost:3000/

// & NODE_ENV=development webpack serve <-- put back in package.json "dev" script if necessary