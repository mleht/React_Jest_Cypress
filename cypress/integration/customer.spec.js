describe("Northwind customers", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("Page opens", function () {
    cy.contains("Customers"); // Pitäisi löytyä Customers teksti
  });

  it("Add customer form", function () {
    cy.contains("Add new").click(); // lisää uusi löytyy napista ja sitä nappia painetaan
    cy.contains("Create");
    cy.contains("Cancel");

    cy.get("#id5").type("ZZZZZ"); // cy.get metodilla haetaan id:n perusteella CustomerID kenttä ja kirjoitetaan siihen (type)
    cy.get("#comp").type("Company Something"); // cy.get metodilla haetaan id:n perusteella Company kenttä ja kirjotetaan sinne joku firman nimi
    cy.get("#saveButton").click(); // cy.get metodilla haetaan id:n perusteella tallennusnappi ja klikataan sitä
  });

  it("Delete customer", function () {
    cy.contains("Customers").click();
    cy.get("div").last().children().last().click(); // tällä syntaksilla etsitään viimeinen div ja sen viimeinen lapsielementti eli button ja klikataan sitä (eli poistetaan viimeisin asiakas joka lisättiin ylemmässä testissä)
    cy.contains("deleted"); // pitäisi tulla teksti/message Poisto tehty
    cy.contains("Customers").click();
    cy.get("h3").last().should("not.contain", "Company Something"); // Viimeiseissä h3:ssä ei enää pitäisi lukea lisätyn firman nimi (koska se poistettiin)
  });
});
