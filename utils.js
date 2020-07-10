const fs = require('fs');
//sample objects
users = [{
    name: 'Abrar Hayat', age: 26, id: '##$#$%REFDDFDSF', skills: [{ name: 'Java', proficiency: 10 }, { name: 'Python', proficiency: 8 }], userPostsIds: [{ id: '#$%$%$%$dse' },
    { id: '#$%$%$4545%$dse' }]
}, { name: 'Christopher Williams', age: 30, id: '##$#$%REFDDFDSdfdfF', skills: [{ name: 'Kotlin', proficiency: 10 }, { name: 'Python', proficiency: 8 }], userPostsIds: [{ id: '#$%$%$%$dse$#$' }] },
{ name: 'Henry Burger', age: 35, id: '%$%$FDSGFGDFG', skills: [{ name: 'Kotlin', proficiency: 10 }, { name: 'Python', proficiency: 8 }], userPostsIds: [{ id: 'DFDF#$#$#$#' }] }]

posts = [{ title: 'QraphQL', content: 'Demo for graphql', id: '#$%$%$%$dse' }, { title: 'Apollo Server', content: 'Demo for Apollo Server', id: '#$%$%$4545%$dse' },
{ title: 'Test Post1', content: 'Demo for Post1', id: '#$%$%$%$dse$#$' }, { title: 'Test Post2', content: 'Demo For Post2', id: 'DFDF#$#$#$#' }]

function writeJSONToFile(destinationDir, object) {
    fs.writeFile(`./${destinationDir}`, JSON.stringify(object), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote to JSON')
        }
    });
}

function readDataFromJSON(fileDir) {
    const jsonString = fs.readFileSync(`./${fileDir}`);
    const result = JSON.parse(jsonString)
    return result;
}

methods = { writeJSONToFile, readDataFromJSON };
//console.log(JSON.stringify(readDataFromJSON('data/users.json')));
//writeJSONToFile('test.json', posts)

module.exports = methods;



