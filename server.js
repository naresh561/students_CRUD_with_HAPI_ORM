'use strict';


const Hapi = require('hapi');
var Config = require('./config/configuration');
var Routes = require('./routes');

const Good = require('good');
var Path = require('path');
var Inert = require('inert');

const server = new Hapi.Server();
server.connection({
    port:8000
});
server.route(Routes.endpoints);

server.register(require('vision'), (err) => {

    server.views({	
        engines: { html: require('handlebars') },
        layout : true,
        path: __dirname + '/views',
        layoutPath : Path.join(__dirname, './views/layouts')//, //setting Global Layout,
        //partialsPath : Path.join(__dirname,'./views/layouts/partial') //partial Views
    });
});
server.register(Inert, () =>{
    server.route( {    // Other assets If you have
        method: 'GET',
        path: '/public/js/{filename}',
        handler: {
            file: function (request) {
                return __dirname+'/public/js/'+request.params.filename;
            }
        }
    });
});
server.register([
     {
      register: require('hapi-sequelize'),
      options: {
        database: 'students',
        user: 'root',
        pass: '',
        dialect: 'mysql',
        port: 3306,
        models: './model/student.js',
        sequelize: {
          define: {
            underscoredAll: true
          }
        }
      }
    }],function(err) {
    if (!err) {
      server.plugins['hapi-sequelize'].db.sequelize.sync().then(function () {
        server.start(function () {
          console.log('Server running at:', server.info.uri);
        });
      });
    }
  });