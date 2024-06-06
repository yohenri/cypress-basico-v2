Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('exemplo.com')
    cy.get('#open-text-area').type('texto')
    cy.get('button[type="submit"]').click()


})
