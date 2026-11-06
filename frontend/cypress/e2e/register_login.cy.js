const ENDPOINT = 'http://localhost:5173'

describe('register and login flow', () => {
  it('should register a new user and then log in', () => {
    cy.visit(ENDPOINT)

    
    // Visit the registration page
    cy.get('[href="/register"]').click()

    // Fill out the registration form
    cy.get('input[name="username"]').type('testuser')
    cy.get('input[name="password"]').type('testpassword')
    cy.get('button[type="submit"]').click()

    // Check for successful registration message
    cy.contains('Usuario registrado exitosamente').should('be.visible')

    cy.go('back') // Go back to the previous page (the home page)

    // Visit the login page
    cy.visit(`${ENDPOINT}/login`)

    // Fill out the login form
    cy.get('input[name="username"]').type('testuser')
    cy.get('input[name="password"]').type('testpassword')
    cy.get('button[type="submit"]').click()

    // Check for successful login message or redirection
    cy.contains('Welcome, testuser').should('be.visible')
  })
})