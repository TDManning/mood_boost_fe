describe('Modal Spec', () => {
  beforeEach (() => {
    cy.visit('http://localhost:3000');
    cy.get('.login').click();
  });

  it('Displays Modal Elements', () => {
    cy.get('.modal').should('exist');
    cy.get('.sign-in h1').contains('Sign In');
    cy.get('.close-modal').should('exist');
    cy.get('.username').should('exist');
    cy.get('.password').should('exist');
    cy.get('.login-submit').should('exist');
    cy.get('.need-account button').should('exist');
  });

  it('Handles Switching Between Login and create Account', () => {
    cy.get('.need-account button').click();
    cy.get('.sign-in h1').contains('Create Account');
    cy.get('.first-name').should('exist');
    cy.get('.email').should('exist');
    cy.get('.password').should('exist');
    cy.get('.need-account button').click();
    cy.get('.sign-in h1').contains('Sign In');
    

  })
})