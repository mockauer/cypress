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
      // mit then wird es JS Object nicht mehr ein Cypress Object
      cy.contains('nb-card', 'Using the Grid').then( firstForm => {
        /*console.log(firstForm)
        console.log(firstForm.text())
        console.log(firstForm.find('[for="inputEmail1"]'))*/
          const  emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
          const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()

          expect(emailLabelFirst).to.equal('Email')
          expect(passwordLabelFirst).to.equal('Password')

          //auf Variablen zugreifen geht nur innerhalb der Function
          cy.contains('nb-card','Basic form').then( secondForm => {
            const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
            const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
            expect(passwordLabelFirst).to.equal(passwordLabelSecond)
            expect(emailLabelSecond).to.equal('Email address')

            //wenn ich JQuery Objekt zum Cypressobjekt machen will, brauche ich wrap
            cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
          })
      })
      //cy.log(firstForm)
      cy.log("Außerhalb")
      cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
      cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    })

    it('invoke Command', () => {
      cy.visit('/')
      cy.contains('Forms').click()
      cy.contains('Form Layouts').click()

      //1 Basic
      cy.get('[for="exampleInputEmail1"]').should('contain', "Email address")

      //2 Wiederholung von then
      cy.get('[for="exampleInputEmail1"]').then( label => {
        expect(label.text()).to.equal('Email address')
      })

      //3 with invoke
      //invoke = function in an array of functions
      cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
        expect(text).to.equal('Email address')
      })

      //4 - schauen ob die Checkbox nun in der Klasse checked stehen hat
      //erste Zeile, einfach die Checkbox klicken
      //zweite Zeile invoke
      cy.contains('nb-card', 'Basic form').find('nb-checkbox').click()
      .find('.custom-checkbox').invoke('attr','class')
      .should('contain', 'checked') //erste Möglichkeit
      //zweite Möglichkeit, mit then
      // .then( classValue => {
        // expect(classValue).to.contain('checked')
      // })
 })

      //5 Invoke beim Datepicker
      it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
          //müsste dymnamisch gemacht, da der aktuelle monat und jahr ausgewählt is
          //wrap ist javascript, damit kann man aus Browser alles nutzen
          cy.wrap(input).click()
          cy.get('nb-calendar-day-picker').contains('17').click()
          //pro für property von den webentwickler tools
          cy.wrap(input).invoke('prop', 'value').should('contain', 'Mar 17, 2021')


          // würde auch klappen cy.get(input).click()
        })
     })

     //Radiobutton
     it('radio button', () => {
      cy.visit('/')
      cy.contains('Forms').click()
      cy.contains('Form Layouts').click()


      //bis find findet es drei, mit then kann man es unterteilen
      cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
        //JS Object, deshalb Wrap
        //cy.wrap(radioButtons).first().check() // wirft so Fehler, weil die CSS Klasse hidden ist für DOM
        cy.wrap(radioButtons).first().check({force: true})
        .should('be.checked')

        //Zweiter Radio button klicken und erster muss leer sein
        cy.wrap(radioButtons).eq(1).check({force:true}) //eq is die Anzahl des Elements, bei mehreren
        cy.wrap(radioButtons).first().should('not.be.checked')

        
        cy.wrap(radioButtons).eq(2).should('be.disabled')

      })
     })


     //checkboxes
     it('check boxes', () => {
      cy.visit('/')
      cy.contains('Modal & Overlays').click()
      cy.contains('Toastr').click()

      //klickt alle Checkboxen, kann nicht unchecken
      cy.get('[type="checkbox"').check({force: true})
      cy.get('[type="checkbox"').eq(0).click({force: true}) //die erste wird checkbox wird demarkiert

     })


     //Lists and Dropdown
     it.only('Lists and dropdown', () => {     
        cy.visit('/')

        // //Dark Theme auswählen
        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()

        // //schauen, ob das Dark Theme wirklich zusehen ist, Farbe ist in RGB zu mache nicht HEX Code
        // cy.get('nav nb-select').should('have.text', ' Dark')
        // cy.get('nav nb-select').should('contain.text', 'Dark') // das gleich wie should('contain', [TEXT])
        // cy.get('nb-layout nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')


        //etwas komplizierter --> es wird durch alle durch iteriert
        cy.get('nav nb-select').then( dropdown => {
          cy.wrap(dropdown).click()
          //each() gleiche Funktion wie in JS, Iterator --> wir wollen alle Wörter in der dropdown-Liste auslesen
          //zweiter Parameter index für Condtion am Ende
          cy.get('.options-list nb-option').each( (listItem, index) => {
              const itemText = listItem.text().trim()
              console.log(itemText)

              const colors = {
                "Light": "rgb(255, 255, 255)",
                "Dark": "rgb(34, 43, 69)",
                "Cosmic": "rgb(50, 50, 89)",
                "Corporate": "rgb(255, 255, 255)"
              }
              console.log(colors)

              //schauen ob Liste die Wörter enthält, die man gerade ausgelesen hat
              cy.wrap(listItem).click()
              cy.wrap(dropdown).should('contain', itemText) 
              //das würde nur fürs erste Klappen wegen der Farbe  --> darum die Constante colors dazu
              cy.get('nb-layout nav').should('have.css', 'background-color', colors[itemText])
              //hier brauchen wir den index parameter, beim letzten mal nicht mehr clicken
              if(index < 3) {
                cy.wrap(dropdown).click()
              }

              //cy.select() --> wenn HTML Select mit Options ist --> Doku schauen 


          })
        })


     })
})
