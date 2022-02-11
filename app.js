const fs = require('fs');
const path = require('path');
const json2xls = require('json2xls');

fs.readFile(path.join(__dirname, './data.json'), 'utf8', (err, data) => {
    if (err) throw err;
    const json = JSON.parse(data);
    const jsonArray = [];
    json.features.forEach((item) => {
        let temp = {
            Site: item.properties.id,
            Country: item.properties.country,
            Latitude: item.geometry.coordinates[0],
            Longitude: item.geometry.coordinates[1],
            Height: item.properties.height,
            Receiver: item.properties.receiver,
            'Antenna-Radome': item.properties.antenna + '-' + item.properties.radome,
            Calibration: item.properties.calibration,
            Clock: item.properties.clock,
            'Satellite System': item.properties.satellite_system,
            Networks: item.properties.networks,
            'Last Data Available': item.properties.last_data_availability,
        };
        jsonArray.push(temp);
    });

    let xls = json2xls(jsonArray);

    fs.writeFileSync('data.xlsx', xls, 'binary');
});
