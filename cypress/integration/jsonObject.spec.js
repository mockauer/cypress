/// <reference types="cypress" />


describe('JSON Object', () => {

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
}
)