/// <reference types="cypress" />


describe('Our first suite', () => {

    it('First test', () => {
        //URL aufrufen und hinnvavigieren
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //Seaching by locators, nicht xpath
        
        // by Tag Name
        cy.get('input')

        //by ID -> # sagt es ist ID
        cy.get('#inputEmail1')

        //by Classname --> .sagt es ist eine Klasse, auch nur die erste Klasse nehmen
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by tag name and attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different attributes
        cy.get('[placeholder="Email"][fullwidth]')

        //by tag name, attribute with value, id and class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //by most recommended way by cpress
        cy.get('[data-cy="imputEmail1"]')
    })

})