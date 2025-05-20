describe("Register Form", () => {
    
    beforeEach(() => {
        const baseUrl = Cypress.config('baseUrl')!;
        cy.visit(baseUrl);
    })

    it("user must be able to register successfully", () => {
        cy.get('[data-test="input-text-name"]').type("User 1")
        cy.get('[data-test="input-text-email"]').type("user1@user.com")
        cy.get('[data-test="input-text-phone"]').type("555050505050")
        cy.get('[data-test="dropdown-knowAbout"]').click()
        cy.get('.p-dropdown-items > li').eq(1).click(); 
        cy.get('[data-test="button-submit-register"]').click()
        cy.get('[data-test="toast-register-message"]').should('contain.text',
            "Thank you for contacting us! Someone from our team will contact you shortly.");
    });

    it("user tries to register without filling in the [name] field on the form and an error is displayed", () => {
        cy.get('[data-test="input-text-email"]').type("user1@user.com")
        cy.get('[data-test="input-text-phone"]').type("555050505050")
        cy.get('[data-test="dropdown-knowAbout"]').click()
        cy.get('.p-dropdown-items > li').eq(1).click(); 
        cy.get('[data-test="button-submit-register"]').click()
        cy.get('.p-inline-message-error').should('contain.text', "Name is required!");
    });

    it("user tries to register without filling in the [email] field on the form and an error is displayed", () => {
        cy.get('[data-test="input-text-name"]').type("User 1")
        cy.get('[data-test="input-text-phone"]').type("555050505050")
        cy.get('[data-test="dropdown-knowAbout"]').click()
        cy.get('.p-dropdown-items > li').eq(1).click(); 
        cy.get('[data-test="button-submit-register"]').click()
        cy.get('.p-inline-message-error').should('contain.text', "Email is required!");
    });
       
    it("user tries to register without filling in the [phone] field on the form and an error is displayed", () => {
        cy.get('[data-test="input-text-name"]').type("User 1")
        cy.get('[data-test="input-text-email"]').type("user1@user.com")
        cy.get('[data-test="dropdown-knowAbout"]').click()
        cy.get('.p-dropdown-items > li').eq(1).click(); 
        cy.get('[data-test="button-submit-register"]').click()
        cy.get('.p-inline-message-error').should('contain.text', "Phone is required!");
    });
    
    it("user tries to register without filling in the [How do you know about us?] field on the form and an error is displayed", () => {
        cy.get('[data-test="input-text-name"]').type("User 1")
        cy.get('[data-test="input-text-email"]').type("user1@user.com")
        cy.get('[data-test="input-text-phone"]').type("555050505050")
        cy.get('[data-test="button-submit-register"]').click()
        cy.get('.p-inline-message-error').should('contain.text', "This field is required!");
    });    
})