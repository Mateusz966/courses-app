const testDate = new Date().getMilliseconds()
describe('Register tests', () => {
    it('Should render register page', () => {
      cy.visit('/sign-up');
    });
  
    it('Register form should validate sent data and disabled button', () => {
      cy.get('input[name=email]').type('123123');
      cy.get('input[name=password]').type('123123');;
  
      cy.get('.chakra-form__error-message ').should('exist');
      cy.get('button').first().should('be.disabled');
  
      cy.get('input[name=email]').clear();
      cy.get('input[name=password]').clear();;
    });  
  
    it('After correct registration should redirect to sign in page', () => {
      const email =   testDate + 'mateuszlibero@gmail.com'
      const pwd = '123qwddde';
      const firstName = 'Mati';
      const lastName = 'Itam';

      cy.get('input[name=email]').type(email);
      cy.get('input[name=password]').type(pwd);
      cy.get('input[name=firstName]').type(firstName);
      cy.get('input[name=lastName]').type(lastName);
  
      cy.get('button').first().click();
      cy.url().should('include', '/sign-in');
  
      cy.get('input[name=email]').clear();
      cy.get('input[name=password]').clear();
    });



    it('If given email is taken should occur an error', () => {
      cy.visit('/sign-up');
      
      const email = testDate + 'mateuszlibero@gmail.com'
      const pwd = '123qwddde';
      const firstName = 'Mati';
      const lastName = 'Itam';

      cy.get('input[name=email]').type(email);
      cy.get('input[name=password]').type(pwd);
      cy.get('input[name=firstName]').type(firstName);
      cy.get('input[name=lastName]').type(lastName);
  
      cy.get('button').first().click();
      cy.get('.chakra-form__error-message ').should('exist')
  
      cy.get('input[name=email]').clear();
      cy.get('input[name=password]').clear();
      cy.get('input[name=firstName]').clear();
      cy.get('input[name=lastName]').clear();
    });


  });
  