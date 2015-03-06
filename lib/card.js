var _ = require('lodash')

function Card(data) {
    if (!_.isPlainObject(data)) {
    	return { 'data': data }
    } 

    return data
}

module.exports = Card
