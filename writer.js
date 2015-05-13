var fs = require('fs-extra'),
    path = require('path'),
    uuid = require('node-uuid'),
    xml = require('js2xmlparser'),
    fileType = require('file-type'),
    mime = require('mime');

module.exports = {
    writeSuite: function(targetDir, suites) {
        fs.outputFileSync(path.join(targetDir, uuid.v4() + '-testsuite.xml'), xml('ns2:test-suite', suites))
    },
    writeBuffer: function(targetDir, buffer, type) {
        var fileInfo = fileType(buffer),
            fileExtension = 'txt',
            fileMime = 'text/plain';
        if(fileInfo) {
            fileExtension = fileInfo.ext;
            fileMime = fileInfo.mime;
        } else {
            if(type) {
                fileMime = type;
                fileExtension = mime.extension(fileMime);
            }
        }
        var fileName = uuid.v1() + '-attachment.' + fileExtension;
        fs.outputFileSync(path.join(targetDir, fileName), buffer);
        return {
            source: fileName,
            mime: fileMime
        }
    }
};
