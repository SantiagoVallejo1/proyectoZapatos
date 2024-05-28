// eslint-disable-next-line no-undef
const express = require("express");
const app = express();
// eslint-disable-next-line no-undef
const cors = require("cors");
// eslint-disable-next-line no-undef
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    let config = {
        method: "GET",
        maxBodyLength: Infinity,
        url: 'https://api.jsonbin.io/v3/b/6654d657acd3cb34a84e8a95',
        headers: {
          'Content-Type': 'application/json',
          "X-Master-Key": "$2a$10$Xgu1ToPNH49N3jq8/pQlJegCwJFuRgxgCsfWZRNFTUw2p6wo5L9I."
        }
      };

      axios(config)
     .then(result => {
        res.send(result.data.record);
     });
  //res.send("Saludando desde el BackEnd");
});

// eslint-disable-next-line no-undef
const user = require("./controller/userController");
app.use("/registro-usuario", user.register);
//app.use("/login", user.login);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto ", PORT);
});