/// <reference types="Cypress" />

const { action } = require("commander")



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./cypress-basico-v2/src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, Teste, teste, Teste, teste, Teste, teste, Teste, teste, Teste, teste,'
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('exemplo.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')


    })

    it('exibe mensage de erro  ao submeter o formulario com um email com formatação inválida', function() {

        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('exemplo.com')
        cy.get('#open-text-area').type('texto')
        cy.get('button[type="submit"]').click()
        

        cy.get('.error').should('be.visible')
    })



    it('campo telefone continua vazio quando preenchdi com valor não numerico', function() {

        cy.get('#phone').type('abdefg').should('have.value', '')

    })



    it('exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido', function() {

        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('exemplo.com')
        cy.get ('#phone-checkbox').click()
        cy.get('#open-text-area').type('texto')
        cy.get('button[type="submit"]').click()
        //posso usar também o cy.contais('button', 'Enviar').click()

    })
    
    


    it('preenche e limpa o campo nome e sobrenome, email e telefone', function() {

        cy.get('#firstName').type('Walmyr').should('have.value', 'Walmyr').clear().should('have.value', '')

    })


    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })



    it('envia formulário com sucesso usando um comando customizado', function() {

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

        

    })

//lista suspensa
    it('seleciona um produto (youtube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')

       
        

    })

    it('seleciona um produto (mentoria) pelo seu valor (value)', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')

       
        

    })


    it ('seleciona um produto (blog) pelo seu indice ', function() {
        cy.get('#product').select(1).should('have.value', 'blog')

       
        

    })
//input tipo radio, click funciona, mas usar .check por semantica
it('marca um tipo de atendimento "feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    

   
    

})




it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
         cy.wrap($radio).check()
         cy.wrap($radio).should('be.checked')
    })
//vai iterar nos 3, checar e marcar o ultimo, marcar só um, varios e para cada um fazer verificação
   
    

 })




 //marcar e desmarcar input checkbox, .uncheck

 it.only('marca ambos check box e desmarca o ultimo', function() {
    cy.get('input[type="checkbox"]').check().last()
.uncheck().should('not.be.checked')    

   
    

})



it('marca ambos check box e desmarca o ultimo', function() {
    cy.get('input[type="checkbox"]').check().last()
.uncheck().should('not.be.checked')    

   
    

})


//upload de arquivos com cypress .select file


it('seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]#file-upload').should('not.have.value').selectFile('./cypress/fixtures/example.json')
    .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
    })


   
    

})



it('seleciona um simulando um drag and drop', function() {
    cy.get('input[type="file"]#file-upload').should('not.have.value').selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) 
    .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
    })


   
    

})



it('seleciona um arquivo utilizando uma fixture para qual foi dada um alias', function() {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
    .selectFile('@sampleFile')
    .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')


   
    

})

})



//links que abrem em outra aba do navegador. usar invoke todo atributo de abrir outra pagina tem o blank
it('verifica que abriu outra aba na pagina', function() {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

//acessa a pagina de politica dentro do cypress aaa
//aaaaaaaaaaaaaaa
    it.only('acessa a pagina deee politica de privacidade', function() {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
    })
    

})


