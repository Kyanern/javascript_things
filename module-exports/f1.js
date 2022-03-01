module.exports = function(app){
    app.f1props = {conn:{}, error:{}, results:{}};

    app.f1fn1 = () => {
        app.f1props.conn = {conn1: 'active', conn2: 'inactive'};
    }

    app.f1fn2 = () => {
        app.f1props.error = {};
        app.f1props.results = {userid: 'test', password: 'test'};
    }
};