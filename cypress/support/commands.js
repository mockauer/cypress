// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("login", () => {
    cy.visit("/login")
    cy.get('[placeholder="Email"').type('artem.bondar16@gmail.com')
    cy.get('[placeholder="Password"').type('CypressTest1')
    cy.get('form').submit()
})

//headless authentifcation
Cypress.Commands.add("loginHeadless", () => {

        //login daten als variable ist einfacher zu handeln
        const userCredentials = {
            "user": {
              "email": "artem.bondar16@gmail.com",
              "password": "CypressTest1"
            }
          }


          cy.request('POST', 'https://conduit.productionready.io/api/users/login', userCredentials)
      .its('body').then ( body => {
        const token = body.user.token;
        //token müssen wir in alias speichern, damit wir nicht jedes mal das token in dem Testfall neu erzeugen und speichern
        cy.wrap(token).as('token')


        //normale Seite reicht, da wir ja schon eingeloggt sind
        cy.visit('/', {
            //wir brauchen Window Object > 
            onBeforeLoad (win) {
                win.localStorage.setItem('jwtToken', token)
            }
        })
      })
})

Cypress.Commands.add('open', () => {
    cy.visit("/")
})

Cypress.Commands.add('SLFunction', (logText) => {
    cy.log(logText)
})