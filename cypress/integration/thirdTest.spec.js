/// <reference types="cypress" />


describe('Our second suite', () => {
    it('Third test', () => {

        var age = 25
        var age2 = 20
        var countResults = 5
        var firstName = "John"
        var lastName = "Doe"

        cy.visit("/")
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()


        //nach Tabellenzeile suchen
        //edit a row
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
                console.log(tableRow)

                
                //Stift Icon drücken und das Alter ändern
                cy.wrap(tableRow).find('.nb-edit').click()
                cy.wrap(tableRow).find('input[placeholder="Age"]').clear()
                cy.wrap(tableRow).find('input[placeholder="Age"]').type(age)
                cy.wrap(tableRow).find('.nb-checkmark').click()
                
                //jetzt noch prüfen, ob das neue Alter geändert wurde
                //Problem es gibt keinen eindeutigen Locator für das Alter
                //Option 1 Change the Code > difficult
                //Option 2 finden bei Index (Number Column
                cy.wrap(tableRow).find('td').eq(6).should('have.text', age)
            
            })

            
            //add new data
            cy.get('thead').find('.nb-plus').click()
            //im thead wird wieder 3 index genommen
            cy.get('thead').find('tr').eq(2).then( tableRow => {
                cy.wrap(tableRow).find('input[placeholder="First Name"]').type(firstName)
                cy.wrap(tableRow).find('input[placeholder="Last Name"]').type(lastName)
                cy.wrap(tableRow).find('.nb-checkmark').click()
            })

            //Möglichkeit von mir > klappt nicht, da es andere HTL Struktur ist
            // cy.get('tbody').find('tr').eq(0).then (tableRow => {
            //     cy.wrap(tableRow).find('td').eq(1).should('have.text', lastName)
            //     cy.wrap(tableRow).find('td').eq(2).should('have.text', firstName)
            // })

            //Weg vom Video
            cy.get('tbody tr').first().find('td').then( tableColumns => {
                cy.wrap(tableColumns).eq(2).should('have.text',firstName)
                cy.wrap(tableColumns).eq(3).should('contain',lastName)
            })

            //Ergänzung von mehreren Altern suchen mittels Const and Array + letzte Szenario Person ist 200
            const AgeArray = [20, 30, 40, 200]

            cy.wrap(AgeArray).each( age => {
                 //etwas in der Tabelle suchen + 
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow => {
                if(age == 200) {
                    cy.wrap(tableRow).should('have.text', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
                
                
            })
            })


      

    })
})