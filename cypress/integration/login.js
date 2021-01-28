describe('Login tests', () => {
  it('Should render login page', () => {
    cy.visit('/sign-in');
  });

  it('Login form should validate sent data', () => {
    cy.get('input[name=email]');
    cy.get('input[name=password]');

    cy.get('button').first().click();

    // cy.get('.formfield-input-error').should('exist');
  });

  it('Login on success should redirect to dashboard', () => {
    const email = 'mateuszlibero@gmail.com';
    const pwd = '123qwe';

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pwd);
    cy.get('button').click();

    
    cy.url().should('include', '/dashboard')
  });

});
