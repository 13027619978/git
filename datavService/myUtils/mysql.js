var mysql  = require('mysql'); 
var settings = require('../config/settings.js');

var connection = mysql.createConnection({       
  host     : settings.mysqlConfig.mysqlHost,     
  user     : settings.mysqlConfig.mysqlUserName,              
  password : settings.mysqlConfig.mysqlPassword,       
  port: settings.mysqlConfig.mysqlPort,                   
  database: settings.mysqlConfig.mysqlDatabase 
}); 

function handleDisconnect(connection) {
  connection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }
 
    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }
 
    console.log('Re-connecting lost connection: ' + err.stack);
 
    connection = mysql.createConnection(connection.config);
    handleDisconnect(connection);
    connection.connect();
  });
}
handleDisconnect(connection);

module.exports = connection;