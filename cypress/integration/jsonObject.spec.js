/// <reference types="cypress" />


describe('JSON Object', () => {

  beforeEach('login to app', () => {
    // cy.intercept('GET', '**/tags', )
    cy.intercept('GET', '**/tags',  { fixture: 'tags.json' })
    
    cy.login()
  })

  //Einführung in JSON
    it('First test', () => {
      cy.visit("/")

      const simpleObject = { "key" : "value",  "key2" : "value2" }

      const simpleArrayOfValues = [ "one", "two", "three"]

      const arrayOfObject = [ {"key" : "value" },{"key2" : "value2" }, {"key3" : "value3" }]

      const typesOfData = { "string": "this is a String", "number": 10}

      const mix = {
          "FirstName" : "Joe",
          "LastName" : "Doe",
          "Age" : 35,
          "students": [
              {
                "firstName":"Sara",
                "lastName":"Conor"

              },   {
                "firstName":"Bruce",
                "lastName":"Willis"

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
      cy.get('@postArticles').then( xhr => {
        console.log("HIER:")
        console.log(xhr)
        // expect(xhr.response.body.article.description)
        expect(xhr.status).to.equal(200)
        expect(xhr.request.body.article.body).to.equal("Article SL Cypress")
        expect(xhr.response.body.article.description).to.equal("Article SL Cypress")
      })


    })


    it('Tags', () => {
      //in fixture ordner das JSON File hinterlegen => neue Tags hinzugefügt
      //im video ist es noch cy.server and cy.route > ich mache das neue intercept und probiere es damit mal aus
      //das muss vor dem test stattfinden, deswegen im beforeEach
      cy.get('.tag-list').should('contain', 'cypress').and('contain','automation').and('contain','testing')
    })    


    it.only('verify global feed likes count', () => {

      

      //video ist wieder mit route
      cy.intercept('GET', '**/articles/feed*', '{ "articles":[],"articlesCount":10 }')
      cy.intercept('GET', '**/articles*', { fixture: "articles.json" })
      


      cy.contains('Global Feed').click()
      cy.get('app-article-list button').then( listOfButtons => {
        expect(listOfButtons[0]).to.contain('10')
        expect(listOfButtons[1]).to.contain('5')
      })

      cy.fixture('articles').then( file => {
        const articleLink = file.articles[1].slug
        cy.intercept('POST', '**/articles/'+articleLink+'/favorite', file)
      })

      cy.get('app-article-list button').eq(1).click()

      cy.get('app-article-list button').eq(1).should('contain', '6')
      
    })
}
)