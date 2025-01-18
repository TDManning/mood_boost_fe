describe('Modal Spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('button.login').click(); //
    cy.get('.modal').should('be.visible'); 
  });

  it('Displays Modal Elements', () => {
    cy.get('.sign-in h1').should('contain', 'Sign In');
    cy.get('.close-modal').should('exist');
    cy.get('.username').should('exist');
    cy.get('.password').should('exist');
    cy.get('.login-submit').should('exist');
    cy.get('.need-account button').should('exist');
  });

  it('Handles Switching Between Login and Create Account', () => {
    cy.get('.need-account button').click();
    cy.get('.sign-in h1').should('contain', 'Create Account');
    cy.get('.first-name').should('exist');
    cy.get('.email').should('exist');
    cy.get('.password').should('exist');

    cy.get('.need-account button').click();
    cy.get('.sign-in h1').should('contain', 'Sign In');
  });

  it('Submits Login Form with Valid Credentials', () => {
    cy.intercept('POST', 'https://mood-boost-be.onrender.com/api/v1/sessions', (req) => {
      console.log('Intercepted request:', req.body);
      req.reply({
        statusCode: 200,
        body: { message: 'You are logged in' },
      });
    }).as('loginRequest');

    cy.get('.username').type('apu_nahasapeemapetilon');
    cy.get('.password').type('securepassword1');
    cy.get('.login-submit').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.message).to.eq('You are logged in');
    });
  });

  it('Displays Error Message on Invalid Login', () => {
    cy.intercept('POST', 'https://mood-boost-be.onrender.com/api/v1/sessions', {
      statusCode: 401,
      body: {
        errors: [{ detail: 'Unable to log in. Please try again later.' }],
      },
    }).as('loginError');

    cy.get('.username').type('testuser');
    cy.get('.password').type('wrongpassword');
    cy.get('.login-submit').click();

    cy.wait('@loginError').then((interception) => {
      expect(interception.response.statusCode).to.eq(401);
      expect(interception.response.body.errors[0].detail).to.eq('Unable to log in. Please try again later.');
    });

    cy.get('.messages .error')
      .should('exist')
      .and('contain', 'Unable to log in. Please try again later.');
  });
});
