describe('Course tests', () => {
  Cypress.Cookies.defaults({
    preserve: 'Authentication',
  });

  it('Should render add category page', () => {
    cy.visit('/dashboard/course/add/category');
  });

  it('Can not click next because select category area is empty', () => {
    cy.get('button').should('be.disabled');
  });

  it('Should render list of categories', () => {
    const select = cy.get('[class*="-control"]');
    const selectVal = 'Programowanie';

    select.eq(1).type(`${selectVal}{enter}`);

    cy.get('[class*="-singleValue"]')
      .invoke('text')
      .should('eq', `${selectVal}`);
  });

  it('After select category next button should be able to click and redirect to subcategory selection', () => {
    cy.get('[data-cy=nextButton]').click();
    cy.url().should('include', '/dashboard/course/add/subcategory');
  });

  it('Render list of subcategory select one and click next', () => {
    const select = cy.get('[class*="-control"]');
    const selectVal = 'Javascript';
    select.eq(1).type(`${selectVal}{enter}`);

    cy.get('[class*="-singleValue"]')
      .invoke('text')
      .should('eq', `${selectVal}`);
  });

  it('After select subcategory next button should be able to click and redirect to topics selection', () => {
    cy.get('[data-cy=nextButton]').click();
    cy.url().should('include', '/dashboard/course/add/topics');
  });

  it('Render list of topics select two and create course', () => {
    const select = cy.get('[class*="-control"]');
    const selectVal = ['React', 'Angular'];

    cy.get('[class*="-multiValue"]').eq(0)
      .invoke('text')
      .should('eq', `${selectVal[0]}`);

    cy.get('[class*="-multiValue"]')
      .eq(1)
      .invoke('text')
      .should('eq', `${selectVal[1]}`);
  });
});
