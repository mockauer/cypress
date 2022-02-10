/// <reference types="cypress" />

import { forEachLimit } from "async"
import { onDatePickerPage } from "../support/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutPage"
import { navigateTo, onNavigationPage } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"


describe('Test with Page Objects', () => {
    // it('Test', () => {
        //vor jedem Test wird das hingeschrieben, dass kann man refactoren, so können wir ein hook vorher machen
        // cy.visit("/")
        //ebenso mit den cy.contains (Seiten), das macht man dann über den supportfolder
    // })

    beforeEach('open app', () => {
        cy.visit("/")
    })

    it('verify navigation across the pages', () => {
        //hier jetzt die neue MEthode aufrufen, damit wir dahin  navigieren können
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage() // schlägt fehl, da der Raider zusammen geklappt wird > das muss geprüft werden, ob es bereits geöffnet ist > schauen nach dem Pfeil im Menü
        navigateTo.toasterPage()

    })

    //dieser Testfall bzw. Szneario ist gedacht dafür gedahct einen riesen Code in kurzen Code umzuschreiben und diesen damit usefuller und wartbarer zu machen
    it.only('should submit inline and Basic Form and select tommorrow date in the calender' , () => {
        navigateTo.formLayoutsPage()
       // onFormLayoutsPage.submitInlineFormWithNameAndEmail() // das muss noch parametrisiert werden
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Testi Tester','test@test.de') 
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.de', 'Testi Tester') 
        //normale Datepickertest
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        //2. methode für zweite Datumrubrik
        onDatePickerPage.selectDatepickerWithRangeFromToday(7,14)
        //Test mit der Tabelle
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('John', 'Doe')
        onSmartTablePage.updateAgeByFirstName('Doe', 25)
        onSmartTablePage.deleteRowByIndex(1)



    })
})