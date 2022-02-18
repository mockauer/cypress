/// <reference types="cypress" />


describe('Advanced - NPM Scripte', () => {

    beforeEach('login to app', () => { 
        cy.login()

    })


    it('test for NPM Scripte', () => {
        cy.contains('Settings').click()
        cy.contains('Or click here to logout').click()
        cy.get('.navbar-nav').should('contain', 'Sign up')
    })
})