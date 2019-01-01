'use strict';

module.exports = {
    checkStatusCodeAndContentType
};


/**
 * Check if statusCode === 200 and 
 * the content-type is application/json
 * 
 * @param {*} res Instance of http.IncomingMessage
 */
function checkStatusCodeAndContentType(res) {
    const status = res.statusCode;
    const contentType = res.headers['content-type'];

    if(status !== 200) {
        request.emit('fail', new Error(`Request failed.\n Status code: ${status}`));
    } else if(!/^application\/json/.test(contentType)) {
        request.emit('fail', new Error('Invalid Content-Type.\n' +
                `Expected application/json but received ${contentType}`));
    }
}