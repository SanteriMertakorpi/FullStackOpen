describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'santemer',
      name: 'Santeri Mertakorpi',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.get('#togglable-button').click()
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login', function() {
    beforeEach(function(){
      cy.get('#togglable-button').click()
    })
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('santemer')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Santeri Mertakorpi logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('santemer')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Santeri Mertakorpi logged in')
    })
    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'santemer', password: 'salainen' })
      })
      it('A blog can be created', function() {
        cy.contains('add new').click()
        cy.get('#title').type('On let vs const')
        cy.get('#author').type('Dan Abramov')
        cy.get('#url').type('https://overreacted.io/on-let-vs-const/')
        cy.get('#save-button').click()
        cy.contains('On let vs const Dan Abramov')

      })
      describe('and blog exist', function(){
        beforeEach(function() {
          cy.createBlog(
            {
              title: 'npm audit: Broken by Design', 
              author: 'Dan Abramov', 
              url:'https://overreacted.io/npm-audit-broken-by-design/'
          })
        })
        it('it can be liked', function() {
          cy.get('#view').click()
          cy.get('#deletable-like').click()
          cy.contains(1)
        })
        it('it can be removed by the user who created the blog', function() {
          cy.get('#view').click()
          cy.get('#delete').click()
          cy.get('html').should('not.contain','npm audit: Broken by Design Dan Abramov')
        })
      })
    })
  })
})