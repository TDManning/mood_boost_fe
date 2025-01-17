describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://mood-boost-fe.onrender.com/breathing')
  })

  it('displays the navbar on page load', () => {
    cy.get('button').should('have.class', 'login')
    cy.get('button.login').children().should('have.class', 'login-icon')
    cy.get('.navbar').children().should('have.class', 'home')
    cy.get('.home').find('img').should('have.class', 'homebtn')
    cy.get('.home').find('img').should('have.attr', 'alt', 'Back to home page')
  })

  it('displays the header on page load', () => {
    cy.get('h2').contains('Breathe in and out as the circle expands and contracts')
  })

  it('displays the start breathing button', () => {
    cy.get('start-button').contains('Start Breathing Exercise')
    cy.get('start-button').should('be.visible')
  })

  it('hides the start button on click', () => {
    cy.get('start-button').click();

    cy.get('start-button').should('not.exist');

    cy.get('.breathing-circle').should('be.visible');
  })
})