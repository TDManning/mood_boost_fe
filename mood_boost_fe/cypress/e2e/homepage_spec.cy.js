describe('Homepage Spec', () => {
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

  it('Handles the Modal Open and Close', () => {
    cy.get('.login').click()
    cy.get('.close-modal').click()
  })

  it('Navigates the pages', () => {
    cy.get('.mood-boosts-title').click()
    cy.get('.breathing').click({force: true})
    cy.location('pathname').should('match', /\/breathing$/)
    cy.get('.quote').click({force: true})
    cy.location('pathname').should('match', /\/quote$/)
    cy.get('.joke').click({force: true})
    cy.location('pathname').should('match', /\/joke$/)
    cy.get('.homebtn').click()
  })

  it('Contains Homepage Elements', () => {
    cy.get('h1').contains('Welcome to Mood Boost')
    cy.get('h2').contains('Mood Boost offers simple breathing exercises, inspiring quotes, and a touch of humor to brighten your day and put a smile on your face.')
    cy.get('p').contains('Click below to see a random page or use the Mood Boost dropdown menu to navigate to different pages')
    cy.get('.basic-spinner').should('exist')
    cy.get('.spinner-outer').should('exist')
    cy.get('.spinner-text').should('exist')
  })

  it('Can Spin the Wheel and confirm a boost page loads', () => {
    cy.get('.basic-spinner').click();
    cy.location('pathname').should('be.oneOf', ['/breathing', '/quote', '/joke'])
  })
})