describe('Login tests', () => {
  it('Should render login page', () => {
    cy.visit('/sign-in');
  });

  it('Login form should validate sent data', () => {
    cy.get('input[name=email]').type('123123');
    cy.get('input[name=password]').type('123123');;

    cy.get('.chakra-form__error-message ').should('exist');

    cy.get('button').first().should('be.disabled');

    
    cy.get('input[name=email]').clear();
    cy.get('input[name=password]').clear();;
  });


  it('Should occur an error and ', () => {
    const email = 'mateuszaaalibero@gmail.com';
    const pwd = '123qwddde';

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pwd);

    cy.get('button').first().click();

    cy.url().should('include', '/sign-in');

    cy.get('input[name=email]').clear();
    cy.get('input[name=password]').clear();
  });


  it('Login on success should redirect to dashboard', () => {
    const email = 'mateuszlibero@gmail.com';
    const pwd = '123qwe';

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pwd);

    cy.get('button').first().click();

    cy.url().should('include', '/dashboard')
  });

});
