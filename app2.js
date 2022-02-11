const fs = require('fs');
const path = require('path');
const json2excel = require('json2excel');

fs.readFile(path.join(__dirname, './data.json'), 'utf8', (err, data) => {
    if (err) throw err;

    const json = JSON.parse(data);
    const jsonArray = [];
    json.features.forEach((item) => {
        let temp = {
            id: item.properties.id,
            country: item.properties.country,
            latitude: item.geometry.coordinates[0],
            longitude: item.geometry.coordinates[1],
            height: item.properties.height,
            receiver: item.properties.receiver,
            antenna_radome: item.properties.antenna + '-' + item.properties.radome,
            calibration: item.properties.calibration,
            clock: item.properties.clock,
            networks: item.properties.networks,
            last_data_availability: item.properties.last_data_availability,
        };
        jsonArray.push(temp);
    });

    const sheet1 = {
        header: {
            id: 'Site',
            country: 'Country',
            latitude: 'Latitude',
            longitude: 'Longitude',
            height: 'Height',
            receiver: 'Receiver',
            antenna_radome: 'Antenna-Radome',
            calibration: 'Calibration',
            clock: 'Clock',
            satellite_system: 'Satellite System',
            networks: 'Networks',
            last_data_availability: 'Last Data Available',
        },
        items: jsonArray,
        sheetName: 'sheet1',
    };

    const data2 = {
        sheets: [sheet1],
        filepath: path.join(__dirname, './data2.xlsx'),
    };

    json2excel.j2e(data2, (err) => {
        console.log('finish');
    });
});
