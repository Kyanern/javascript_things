module.exports = function(app){
    app.f2props = {prop1:{}, prop2:{}};

    app.f2fn1 = () => {
        app.f2props.prop1 = 42;
    }

    app.f2fn2 = () => {
        app.f2props.prop2 = 'astafurgillah';
    }
};