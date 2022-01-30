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
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
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
        cy.get('thead').find('tr').eq(2).then(tableRow => {
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
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('have.text', firstName)
            cy.wrap(tableColumns).eq(3).should('contain', lastName)
        })

        //Ergänzung von mehreren Altern suchen mittels Const and Array + letzte Szenario Person ist 200
        const AgeArray = [20, 30, 40, 200]

        cy.wrap(AgeArray).each(age => {
            //etwas in der Tabelle suchen + 
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if (age == 200) {
                    cy.wrap(tableRow).should('have.text', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }


            })
        })




    })



    it('Datepicker dynmaic', () => {
        // use dateobject from JS
        function selectDayFromCurrent(day){
               //erzeugen von JS
        let date = new Date()
        date.setDate(date.getDate() + day)

        
        let futureDay = date.getDate()
        
        let futureMonth = date.getMonth()
        
        futureMonth = date.toLocaleString('default', { month: 'short' })
        

        let dateAssert = futureMonth+' '+futureDay+", "+date.getFullYear()
            //heraussuchen was der aktuelle Datum vom Datepicker ist
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dataAttribute => {
                console.log(dataAttribute)
                if (!dataAttribute.includes(futureMonth)) {
                    //das klappt jetz nur für einen monat in der Zukunft, dafür muss noch ne Schleife eingearbeitet werden
                    // cy.get('[data-name="chevron-right"]').click() > das muss in eine extra function
                    cy.get('[data-name="chevron-right"]').click()
                    // cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click() > entfernen, man muss die Function in sich selber aufrufen
                    selectDayFromCurrent(day)
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })

            return dateAssert
            }

        cy.visit("/")
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        //das wurde in die function refacort
        // //erzeugen von JS
        // let date = new Date()
        // console.log("First:" + date)
        // //aktuelles Date plus 2 Tage
        // //date.set setzt das datum und get holt es ab
        // date.setDate(date.getDate() + day)

        // console.log(date)
        // //VORSICHT mit März geht es nicht mit dieser Formatierung - Mär != Mar

        // let futureDay = date.getDate()
        // console.log("futureDay: " +futureDay)

        // //Normal erzeugtes Datum muss noch formitiert werden
        // let futureMonth = date.getMonth()
        // console.log(futureMonth)
        // futureMonth = date.toLocaleString('default', { month: 'short' })
        // console.log(futureMonth)

        // let dateAssert = futureMonth+' '+futureDay+", "+date.getFullYear()






        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            //es ist fertig, nur noch Refacotrig > 1. Variablen nur in die Function, da sie nur dort gebraucht werden > fertig; 2. move function on the top of the rest method (2. ist gemacht); 3. return the date in the function + Functionaufruf in der Methode(auch macht); 4, der Tag als PArameter der function mitgeben und nicht hart kodiert in Code
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(12)
            //function so erstmal nicht, man muss die function schon vorher aufrufen


            //dymnamisches Datum
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)

        })
    })

    it('Popup and Tooltips', () => {
        cy.visit("/")
        cy.contains("Modal & Overlays").click()
        cy.contains("Tooltip").click()
        //es gibt kein Hover von Cypress, also muss es anders angegangen werden


        cy.contains("nb-card", "Colored Tooltips").contains("Default").click()
        cy.get('nb-tooltip').should('contain', "This is a tooltip")



    })

    it('Browser Dialog', () => {
        cy.visit("/")
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()


        // cy.get('tbody tr').first().find('.nb-trash').click()
        // //Wie bekomme ich auf das Dialgofenster einen Zugriff?
        // //mehrere Möglichkeiten
        // //1 nicht die Beste, weil man wirklich wissen muss, ob es ein confirm Dialog ist und keine bspw. alert Dialogbox
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })

        // //2 more komplizierrt, aber sicherer
        // const stub = cy.stub()
        // cy.on('window:confirm', stub)
        // cy.get('tbody tr').first().find('.nb-trash').click().then (() => {
        //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        // })

        //3 Mischmasch aus 1 und 2, es wird nichr bestätigt
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)
    })

    it.only('Assertions', () => {
        cy.visit("/")
    })
})