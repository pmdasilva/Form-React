const numPar = require('./numPar');

describe("Verificar se o numero é par", () => {
    test("2 deve retornar True", () => {
        const result = numPar(2);
        expect(result).toBe(true)
    })

    test("10 deve retornar True", () => {
        const result = numPar(10);
        expect(result).toBe(true)
    })

    test("7 deve retornar False", () => {
        const result = numPar(7);
        expect(result).toBe(false)
    })

    test("11 deve retornar False", () => {
        const result = numPar(11);
        expect(result).toBe(false)
    })
})