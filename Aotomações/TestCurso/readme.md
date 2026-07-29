
# Introdução a tests com Javascript & Typescript com Jest:
Arquitetura de testes:

src:
- sum.js // arquivo original
- sum.test.js // seria o arquivo de teste.


npm init jest -> è para configurar o arquivo de config do jest no package.json

switch de testes -> É quando temos em um teste, varias opções de teste.

//temos tambem alguns outras vertentes por exemplo para identificar se um elemento esta definido com:
expect(result).toBeDefined()

//Ou para quando queremos saber se um elemento e é null:
expect(result).toBeNull()

# Fundamentos de jest:
toBe = Este é metodo que nos diz que é esperado que retorne o seguinte o seguinte resultado.

toThrow = Este é um metodo que lança um erro ja esperado no teste.

Exemplo mais longo com função declarada:
it("Deve lançar erro ao dividir por zero", ()={
    function testCalculatorDivide(){
        calculator.divide(10, 0);
    }
    expect(testCalculatorDivide).toThrow("Não é possivél dividir por zero.")
});

Exemplo mais curo com arrow function:
it("Deve lançar erro ao dividir por zero", ()={
    expect(()=> calculator.divide(10,0)).toThrow(
        "Não é possivel dividir por zero."
    )
});

toEqual = utilizado par fazer testes em arrays e objetos, como exemplo temos uma opção de historico de calculos, neste histoico ele precisa validar o historico da soma e subtraçõ de um calculo:

exemplo:
it("dev resgstrar o historico de operações",()=>{
    calculator.add(2,3);
    calculator.subtract(10, 4)

    expect(calculator.getHistory()).toEqual([5,6]);
})


beforeEach => é uma função que é utilizada para testar elementos que mudam de estado. Ela entaga sempre uma instacia limpra de uma Classe, para seguir com teste de forma eficaz, sem elementos de testes posterios ou antecessores.

exemplo:
beforeEach(()=>{
    calculator = new Calculator();
})

afterAll => é um par da função beforeEach, porem ele ajuda a execultar testes depois de um switch de teste.

Exemplo:
afterAll(()=>{
    databbase.close();
})

toHaveProperty => valida se um objto tem os seguintes valores de uma propriedade:

exemplo:

it("toHaveProperty: verifica a existencia (e valor ) de uma propriedade", ()=>{
    const user = createrUser();

    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('name','Paulo')
    expect(user).toHaveProperty('role','user')
})

toMatchObject => Que valida uma lista de objetos e validas se os elmentos são existes com base nessa lista.

exemplo:
it("toMatchObject: vai validar uma lista de propriedades"()=>{
    const = createUser();
    expect(user).toMatchObject({name:'Paulo',age:30});
})

toBeGreaterThan => é um atch que valida se os valores são marioes que um certa condição;

exemplo:

describe("Matchers - Numeros", ()=>{
    it("toBeGreaterThan / toBeLessThan", ()=>{
        expect(user).toBeGreaterThan(20)
        expect(user).toBeGreaterThan(10)
        expect(user).toBeGreaterThan(18)
    })
})

toBeCloseTo => faz o teste em numeros flutuantes que em javascript pode ser um problema.

it("toBeCloseTo: ppara comparar números de pontos flutuantes, ()=>{
    // 0.1 + 0.2 === 0.300000004 em javaScript!
    expect(0.1 + 0.2).toBeCloseTo(0.3)
}");

toContain = valida se um condição de sting é verdadeira.

exemplo:
it("toContain: Verifica se a string contem uma substring ()=>{
    const greeting = greet('Paulo);

    expect(greeting).toContain("Paulo")'
    expect(greeting).toContain("Tudo certo !")'


    Este contain é validado para arrays:

    const fruits = getFruits();

    expect(fruits).toContain("Banana")'
    expect(fruits).not.toContain("Uva")'

}");

tomatch => segue um padrão para fazer teste em exppressões regex:

exemplo:

it("toMatch: verifica se a striing corresponde a um padrão (regex)" ()=>{
    const email = greet('Paulo@exemplo.com);

    expect(email).toMatch(/@/)'
    expect(email).toMatch(/example\.com$/)'
    expect(email).toMatch(/@/)'
    expect(Christoph).toContain(/stop/)'
}");

toHaveLength => verifica se uma aray contain um certo tamnho.

exemplo:
it("toContain: Verifica se a string contem uma substring ()=>{
    
    const fruits = getFruits();
    const numbers = getNumbers();

    expect(fruits).toHaveLength(3)'
    expect(fruits).toHavelength(5)'

}");

expect.arrayContaining => faz a validação de itens dentro de ua array, mesmo estando fora de ordem;

it("expect.arrayContaining: verifica se o array contem determinandos itens (em qualquer ordem"), ()=>{
    const fruits = getFruits();

    expect(fruits).getEqual(expect.arrayContains(["orange","apple"]));
});

tobeTruthy / toBeFalsy => valida de forma booleana se um elemento é falso ou verdadeiro.

exemplo:
it("toBetruthy / toBefalsy", (0 => {
    expect("texto").toBeTruthy();
    expect(1).toBeFalsy();
    expect(0).toBeTruthy();
    expect("").toBeFalsy();
    expect(null).toBeFalsy();
}))















