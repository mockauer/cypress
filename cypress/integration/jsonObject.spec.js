/// <reference types="cypress" />


describe('JSON Object', () => {

  beforeEach('login to app', () => {
    // cy.intercept('GET', '**/tags', )
    //"normales"
    // cy.intercept('GET', '**/tags',  { fixture: 'tags.json' })
    //kann refactort werden mit routerMatcher
    cy.intercept({ method: 'GET', path: 'tags' }, { fixture: 'tags.json' })

    cy.login()
  })

  //Einführung in JSON
  it('First test', () => {
    cy.visit("/")

    const simpleObject = { "key": "value", "key2": "value2" }

    const simpleArrayOfValues = ["one", "two", "three"]

    const arrayOfObject = [{ "key": "value" }, { "key2": "value2" }, { "key3": "value3" }]

    const typesOfData = { "string": "this is a String", "number": 10 }

    const mix = {
      "FirstName": "Joe",
      "LastName": "Doe",
      "Age": 35,
      "students": [
        {
          "firstName": "Sara",
          "lastName": "Conor"

        }, {
          "firstName": "Bruce",
          "lastName": "Willis"

        }
      ]
    }


    console.log(simpleObject.key2)
    console.log(simpleObject["key2"])


    console.log(simpleArrayOfValues[0])
    console.log(arrayOfObject[2].key3)

    console.log(mix.students[0].firstName)

  }
  )

  it('verify correct request and response', () => {

    cy.server()
    //as als alias für Zwischenspeicherung
    cy.route('POST', '**/articles').as('postArticles')
    //route geht nicht ohne server


    //beginnen mit GUI Eintrag der Oberfläche
    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').type("Article SL Cypress")
    cy.get('[formcontrolname="description"]').type("Article SL Cypress")
    cy.get('[formcontrolname="body"]').type("Article SL Cypress")
    cy.contains('Publish Article').click()


    //so jetzt wollen wir die API abfragen, ob es wirklich so ankommt > article
    //zu erst über den Test den cy.server initialisieren und cy.route hören auf die Methode, aber sind veraltet, dafür dann intercept

    //warten auf den Response 
    //das @ ist wichtig für die Abfrage der Variable in einem .as (Alias)
    cy.wait('@postArticles')
    cy.get('@postArticles').then(xhr => {
      console.log("HIER:")
      console.log(xhr)
      // expect(xhr.response.body.article.description)
      expect(xhr.status).to.equal(200)
      expect(xhr.request.body.article.body).to.equal("Article SL Cypress")
      expect(xhr.response.body.article.description).to.equal("Article SL Cypress")
    })


  })

  it.only('intercepting and modifiying request and response', () => {

    //manipulation bzw. Modifiying der Response
    // cy.intercept('POST', 'https://api.realworld.io/api/articles', (req) => {
    //   req.body.article.description = "2 - Article SL Cypress"
    // } ).as('postArticles')

    //erste expect Zeile ist das erwartende Ergebnis, aber wir wollen inder 2 Zeile es ändern
    cy.intercept('POST', 'https://api.realworld.io/api/articles', (req) => {
      req.reply(res => {
        expect(res.body.article.description).to.equal('New Article SL Cypress')
        res.body.article.description = "2 - New Article SL Cypress"
      })
    }).as('postArticles')

    // cy.intercept('POST', '**/articles').as('postArticles')




    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').type("New Article SL Cypress")
    cy.get('[formcontrolname="description"]').type("New Article SL Cypress")
    cy.get('[formcontrolname="body"]').type("New Article SL Cypress")
    cy.contains('Publish Article').click()

    cy.wait('@postArticles')
    cy.get('@postArticles').then(xhr => {

      console.log(xhr)
      console.log("HIER:")
      console.log(xhr.response.statusCode)
      expect(xhr.response.statusCode).to.equal(200)

      expect(xhr.request.body.article.body).to.equal("New Article SL Cypress")
      cy.log("HIER")
      // expect(xhr.response.body.article.description).to.equal("2 - New Article SL Cypress")
    })


  })


  it('Tags', () => {
    //in fixture ordner das JSON File hinterlegen => neue Tags hinzugefügt
    //im video ist es noch cy.server and cy.route > ich mache das neue intercept und probiere es damit mal aus
    //das muss vor dem test stattfinden, deswegen im beforeEach
    cy.get('.tag-list').should('contain', 'cypress').and('contain', 'automation').and('contain', 'testing')
  })


  it('verify global feed likes count', () => {



    //video ist wieder mit route
    cy.intercept('GET', '**/articles/feed*', { "articles": [], "articlesCount": 10 })
    cy.intercept('GET', '**/articles*', { fixture: "articles.json" })



    cy.contains('Global Feed').click()
    cy.get('app-article-list button').then(listOfButtons => {
      expect(listOfButtons[0]).to.contain('10')
      expect(listOfButtons[1]).to.contain('5')
    })

    cy.fixture('articles').then(file => {
      const articleLink = file.articles[1].slug
      cy.intercept('POST', '**/articles/' + articleLink + '/favorite', file)
    })

    cy.get('app-article-list button').eq(1).click()

    cy.get('app-article-list button').eq(1).should('contain', '6')

  })


  //Vortest mit Postman (schlugen bei mir schon mit der Authorization fehl)
  it('APIS calls - delete a article', () => {

    //login daten als variable ist einfacher zu handeln
    const userCredentials = {
      "user": {
        "email": "artem.bondar16@gmail.com",
        "password": "CypressTest1"
      }
    }

    //Body/Eintrags daten als variable ist einfacher zu handeln
    const bodyRequest = {
      "article": {
        "tagList": [],
        "title": "TEST API",
        "description": "TEST API",
        "body": "TEST API"
      }
    }

    //request anfrage für den Token
    cy.request('POST', 'https://conduit.productionready.io/api/users/login', userCredentials)
      .its('body').then(body => {
        const token = body.user.token;

        //second Request for Adding
        cy.request({
          url: 'https://conduit.productionready.io/api/articles/',
          headers: { 'Authorization': 'Token ' + token },
          method: 'POST',
          body: bodyRequest


        }).then(response => {
          expect(response.status).to.equal(200)
        })

        //händische löschen
        cy.contains('Global Feed').click()
        cy.get('.article-preview').first().click()
        cy.get('.article-actions').contains('Delete Article').click()

        //schauen ob es wirklich gelöscht worden ist, über die API
        cy.request({
          url: 'https://conduit.productionready.io/api/articles/?limit=10&offset=0',
          headers: { 'Authorization': 'Token ' + token },
          method: 'GET'
        }).its('body').then(body => {
          console.log(body)
          //jetzt muss title nicht gleich dem ersten titel sein
          expect(body.articles[0].title).not.to.equal('TEST API')
        })

        


      })




  })
}
)