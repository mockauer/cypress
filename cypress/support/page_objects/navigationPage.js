function setGroupMenuItem(groupName) {
    //Form kann man noch parametrisieren, in dem man es übergibt
    // cy.contains('a', 'Form').then(menu => {
    cy.contains('a', groupName).then(menu => {
        // console.log(menu)
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
            if (attr.includes('left')) {
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavigationPage {
    //hier muss neue Klasse erstellt werden mit Objekt, welches dann in dem test mitgenutzt werden kann


    //das ist die Methode, die wir mehrfach brauchen
    formLayoutsPage() {
        // cy.contains('Forms').click()

        //Prüfung ob Menüpunkt bereits ausgeklappt ist => diese Funktion will man ja nicht 2x haben, das kann man wieder extrahieren
        // cy.contains('a', 'Form').then( menu => {
        //     // console.log(menu)
        //     cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
        //         if(attr.includes('left')){
        //             cy.wrap(menu).click()
        //         }
        //     })
        // })
        setGroupMenuItem('Form')


        cy.contains('Form Layouts').click()
    }

    //das ist die Methode, die wir mehrfach brauchen
    datePickerPage() {
        // cy.contains('Forms').click()
        // cy.contains('a', 'Form').then( menu => {
        //     console.log(menu)
        //     cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
        //         if(attr.includes('left')){
        //             cy.wrap(menu).click()
        //         }
        //     })
        // })
        setGroupMenuItem('Form')
        cy.contains('Datepicker').click()
    }

    //das kann man mit allen Öffnungen der Seite machen

}

export const navigateTo = new NavigationPage();