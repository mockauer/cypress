/// <reference types="cypress" />


describe('visual Test', () => {


    it('should test snapshot', () => {
       cy.visit("/")
       cy.contains('Forms').click()
       cy.contains('Form Layouts').click()



    //    cy.contains('nb-card', 'Using the Grid').toMatchImageSnapshot();
       cy.contains('nb-card', 'Using the Grid').then( firstForm => {
        cy.wrap(firstForm).toMatchImageSnapshot()
        cy.document().toMatchImageSnapshot()
       })
    })
})