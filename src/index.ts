import express from 'express';
import Logging from './library/Logging';
import config from './config/config';
import dbConnection from './config/dbConnection';
import routes from './routes';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbConnection()
    .then(() => {
        startServer();
    })
    .catch(() => {});

// let category = ['COI', 'Forms\\Endorsement', 'Acord 28'];

const startServer = () => {
    app.use('/api/v1', routes);

    // app.get('/zain', (req, res) => {
    //     let countVal = 0;
    //     let valueArray = myjson.Data.map((json) => {
    //         // console.log(json["Order"]);
    //         // return json["Document"];
    //         if (json['Document'] !== 'Acord 25' && json['Document'] !== 'Acord 28' && json['Category'] === 'Forms\\Endorsement') {
    //             countVal++;
    //             return json;
    //         }
    //         return 0;
    //     });
    //     // console.log(valueArray);
    //     console.log(countVal);
    //     res.status(200).json({ valueArray });
    // });

    app.listen(config.server.port, () => {
        Logging.info(`Server is running on port ${config.server.port}`);
    });
};

startServer();
