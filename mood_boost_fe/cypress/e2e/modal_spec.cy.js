describe('Modal Spec', () => {
  beforeEach (() => {
    cy.visit('http://localhost:3000');
    cy.get('button.login').click();
    cy.get('.modal', { timeout: 10000 }).should('be.visible');
  });

  it('Displays Modal Elements', () => {
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
  });

  it('Submits Login Form with Valid Credentials', () => {
    cy.intercept('POST', 'http://localhost:3000/api/v1/sessions', {
      statusCode:200,
      body: { message: 'You are logged in' }, 
    }).as('loginRequest');

    cy.get('.username').type('testuser');
    cy.get('.password').type('password123');
    cy.get('.login-submit').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
  });

  it('Displays Error Message on Invalid Login', () => {
    cy.intercept('POST', 'http://localhost:3000/api/v1/sessions', {
      statusCode: 401,
      body: { error: 'Invalid credentials' },
    }).as('loginError');
    cy.get('.username').type('testuser');
    cy.get('.password').type('wrongpassword');
    cy.get('.login-submit').click();

    cy.wait('@loginError');
    cy.get('.messages .error').should('contain', 'Unable to log in. Please try again later.');
  })
})