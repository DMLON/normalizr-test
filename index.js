const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

var fs = require('fs');
path = require('path');    
filePath = path.join(__dirname, 'data.json');
const originalContent = JSON.parse(fs.readFileSync(filePath, {encoding: 'utf-8'}));

// Defino el esquema
const gerente = new schema.Entity('gerente');
const encargado = new schema.Entity('encargado');
const empleados = new schema.Entity('empleados');

const empresa = new schema.Entity('empresa',{
    gerente: gerente,
    encargado:encargado,
    empleados: [empleados]
});

const empresas = new schema.Entity('empresas',{
    empresas: [empresa]
});

const util = require('util');

function print(objeto){
    console.log(util.inspect(objeto,false,12,true));
}

console.log("Largo del objeto original: ");
const originalSize = JSON.stringify(originalContent).length;
console.log(originalSize);

console.log("Largo del objeto normalizado: ");
const normalizedData = normalize(originalContent,empresas);
// print(normalizedData);
const normalizedSize = JSON.stringify(normalizedData).length;
console.log(normalizedSize);

console.log("Largo del objeto denormalizado: ");
const denormalizedData = denormalize(normalizedData.result,empresas,normalizedData.entities);
// print(denormalizedData);
const denormalizedSize = JSON.stringify(denormalizedData).length;
console.log(denormalizedSize);

console.log(`Porcentaje de compresion: ${Math.round(normalizedSize * 10000.0 / originalSize)/100}%`)