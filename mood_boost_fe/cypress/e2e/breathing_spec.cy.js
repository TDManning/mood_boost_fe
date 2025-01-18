describe('Breathing Page Spec', () => {
  beforeEach(() => {
      cy.visit('https://mood-boost-fe.onrender.com/breathing')
    })  

  it('displays the navbar on page load', () => {
    cy.get('.navbar').should('exist')
    cy.get('.homebtn').should('exist')
    cy.get('.homebtn').should('have.attr', 'alt', 'Back to home page')
    cy.get('.login').should('exist')
    cy.get('.login-icon').should('exist')
    cy.get('.breathing').contains('Breathing Exercises')
    cy.get('.quote').contains('Inspirational Quotes')
    cy.get('.joke').contains('Joke Generator')
  })

  it('displays the start breathing button', () => {
    cy.get('.start-button').contains('Start Breathing Exercise')
    cy.get('.start-button').should('be.visible')
  })

  it('hides the start button on click', () => {
    cy.get('.start-button').click();

    cy.get('.start-button').should('not.exist');

    cy.get('.breathing-circle').should('be.visible');
  })
})