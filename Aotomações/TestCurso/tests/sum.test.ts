import { sum } from "./sum";


describe('somar dois valores corretamente', () => {
    
    it("Deve somar dois valores corretamente", () => {
        const result = sum(1,3)
        expect(result).toBe(4)
    })
})
