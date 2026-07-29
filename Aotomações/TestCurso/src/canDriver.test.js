const canDriver = require('./canDriver');

describe("Função valida se a idade é maior que 18 anos", () => {
    test("Valida de idade é maior que 18", () => {
        const result = canDriver(18);
        expect(result).toBe(true)
    })

    test("Valida de idade é maior que 18", () => {
        const result = canDriver(25);
        expect(result).toBe(true)
    })

    test("Valida de idade é menor que 18", () => {
        const result = canDriver(17);
        expect(result).toBe(false)
    })

    test("Valida de idade é menor que 18", () => {
        const result = canDriver(10);
        expect(result).toBe(false)
    })
})