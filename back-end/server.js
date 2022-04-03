const server = require('./app');

const PORT = 4000;

const listener = server.listen(PORT, function() {
    console.log(`Server running on port: ${PORT}`);
});

const close = () => {
    listener.close();
}

module.exports = {
    close: close,
}