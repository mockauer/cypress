/// <reference types="cypress" />

import { forEachLimit } from "async"
import { navigateTo, onNavigationPage } from "../support/page_objects/navigationPage"


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

    })
})