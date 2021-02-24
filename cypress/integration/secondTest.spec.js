/// <reference types="cypress" />


describe('Our first suite', () => {

  /*  it('First test', () => {
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

        //by most recommended way by cpress --> führt zu invaliden HTML
        //cy.get('[data-cy="signInButton"]')
    })*/

    it('Second test', () => {
        //URL aufrufen und hinnvavigieren
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get(":nth-child(2) > :nth-child(1) > :nth-child(1) > nb-card-body > form > :nth-child(4) > .offset-sm-3 > .appearance-filled")

        //finding by Wording -> findet das erste Vorkommen
        cy.contains('Sign in')

        //2. Button finden, anhand attribut
        cy.contains('[status="warning"]','Sign in')

        //anhand einer eindeutigen id im section --> "Travel in the DOM"
        cy.get('#inputEmail3').parents('form').find('button').should('contain', 'Sign in').parents('form').find('nb-checkbox').click()

        //only for child/parents
        //cy.find('button')

        cy.contains('nb-card','Horizontal form').find('[type="email"]').should('contain', 'Email')


    })

    it('then and wraps methode', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

      cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
      cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

      //wir wollen doppeltes sparen
      //then erste folgende ist der Parameter der Function --> könnte auch then(function(firstForm) { ... } sein)
      cy.contains('nb-card', 'Using the Grid').then( firstForm => {
        /*console.log(firstForm)
        console.log(firstForm.text())
        console.log(firstForm.find('[for="inputEmail1"]'))*/
          const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
          const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()

          expect(emailLabelFirst).to.equal('Email')
          expect(passwordLabelFirst).to.equal('Password')

          //auf Variablen zugreifen geht nur innerhalb der Function
          cy.contains('nb-card','Basic form').then( secondForm => {
            const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
            expect(passwordLabelFirst).to.equal(passwordLabelSecond)

            //wenn ich JQuery Objekt zum Cypressobjekt machen will, brauche ich wrap
            cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
          })
      })
      //cy.log(firstForm)

      cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
      cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    })

    it('invoke Command', () => {
      cy.visit('/')
      cy.contains('Forms').click()
      cy.contains('Form Layouts').click()

      //1
      cy.get('[for="exampleInputEmail1"]').should('contain', "Email address")

      //2
      cy.get('[for="exampleInputEmail1"]').then( label => {
        expect(label.text()).to.equal('Email address')
      })

      //3
      cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
        expect(text).to.equal('Email address')
      })

      //4 - schauen ob die Checkbox nun in der Klasse checked stehen hat
      //erste Zeile, einfach die Checkbox klicken
      //zweite Zeile invoke
      cy.contains('nb-card', 'Basic form').find('nb-checkbox').click()
      .find('.custom-checkbox').invoke('attr','class')
      //.should('contain', 'checked') //erste Möglichkeit
      //zweite Möglichkeit, mit then
      .then( classValue => {
        expect(classValue).to.contain('checked')
      })
 })

      //5 Invoke beim Datepicker
      it.only('assert property', () =>{
      cy.visit('/')
      cy.contains('Forms').click()
      cy.contains('Datepicker').click()

      cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
        cy.wrap(input).click()
        cy.get('nb-calendar-day-picker').contains('17').click()
        cy.wrap(input).invoke('prop', 'value').should('contain', 'Feb 17, 2021')


        // würde auch klappen cy.get(input).click()
      })
      })
})
