export class formLayoutPage {

    //das ist noch nicht parametrisiert, dafür muss name und email übergeben werden
    // submitInlineFormWithNameAndEmail(){
    // cy.contains('nb-card', 'Inline form').find('form').then( form => {
    //     cy.wrap(form).find('[placeholder="Jane Doe"]').type('Testi Tester')
    //     cy.wrap(form).find('[placeholder="Email"]').type('test@test.com')
    //     cy.wrap(form).find('[type="checkbox"]').check({force: true})
    //     cy.wrap(form).submit() // Neue Methode, die das gleiche macht wie click on submit button, mit Klassenanzeige und soweiter
    // })
    submitInlineFormWithNameAndEmail(lname, email) {
        cy.contains('nb-card', 'Inline form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(lname)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[type="checkbox"]').check({ force: true })
            cy.wrap(form).submit() // Neue Methode, die das gleiche macht wie click on submit button, mit Klassenanzeige und soweiter
        })
    }

    //2 Funktion für weiteres Formular
    submitBasicFormWithEmailAndPassword(email, password) {
        cy.contains('nb-card', 'Basic form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[type="checkbox"]').check({ force: true })
            cy.wrap(form).submit() // Neue Methode, die das gleiche macht wie click on submit button, mit Klassenanzeige und soweiter
        })
    }


}



export const onFormLayoutsPage = new formLayoutPage()