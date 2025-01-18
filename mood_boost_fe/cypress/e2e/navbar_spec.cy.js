describe('NavBar Spec', () => {
  beforeEach(() => {
    cy.visit('https://mood-boost-fe.onrender.com')
  } )

  it('Has A NavBar', () => {
    cy.intercept('https://example.cypress.io', {
      statusCode: 200
    })

    cy.get('.navbar').should('exist')
    cy.get('.homebtn').should('exist')
    cy.get('.homebtn').should('have.attr', 'alt', 'Back to home page')
    cy.get('.login').should('exist')
    cy.get('.login-icon').should('exist')
    cy.get('.breathing').contains('Breathing Exercises')
    cy.get('.quote').contains('Inspirational Quotes')
    cy.get('.joke').contains('Joke Generator')
  })

  it('Navigates the pages', () => {
    cy.get('.mood-boosts-title').click()
    cy.get('.breathing').click({force: true})
    cy.location('pathname').should('match', /\/breathing$/)
    cy.get('.quote').click({force: true})
    cy.location('pathname').should('match', /\/quote$/)
    cy.get('.joke').click({force: true})
    cy.location('pathname').should('match', /\/joke$/)
  })

  it('Handles the Modal Open and Close', () => {
    cy.get('.login').click()
    cy.get('.close-modal').click()
  })
})