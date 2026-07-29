const sum = require('./sum');


// Todos os teste sempre começam com o (describe), passando a descrição e uma função que validara todos os arquivos test.js;
describe("Função soma", () => {
    test("soma 1 + 2 para ser igual a 3", () => {
        const result = sum(1, 2);
        expect(result).toBe(3)
    })
})