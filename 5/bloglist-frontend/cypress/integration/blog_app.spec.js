describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'turboman',
      username: 'teppo',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('login')
  })
  describe('Login', function () {
    it('Login successfully', function () {
      cy.get('input:first').type('teppo')
      cy.get('input:last').type('123456')
      cy.contains('login').click()
      cy.contains('blogs')
    })
    it('login failed', function () {
      cy.get('input:first').type('heppu')
      cy.get('input:last').type('password')
      cy.contains('login').click()
      cy.get('html').should('not.contain', 'turboman has logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'teppo', password: '123456'
      }).then(response => {
        window.localStorage.setItem('user', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })
    it('a new blog can be created', function () {
      cy.contains('create a new blog').click()
      cy.get('#title').type('testi')
      cy.get('#author').type('testiman')
      cy.get('#url').type('testiman.com')
      cy.get('#create-blog').click()
      cy.contains('testi by testiman')
    })
    it('User can like a blog', function () {
      cy.contains('create a new blog').click()
      cy.get('#title').type('testi')
      cy.get('#author').type('testiman')
      cy.get('#url').type('testiman.com')
      cy.get('#create-blog').click()
      cy.contains('view').click()
      cy.contains('testiman.com').parent().contains('like').click()
      cy.contains('1')
    })
    it('user can delete a blog', function () {
      cy.contains('create a new blog').click()
      cy.get('#title').type('testi')
      cy.get('#author').type('testiman')
      cy.get('#url').type('testiman.com')
      cy.get('#create-blog').click()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'testiman.com')
    })
    it.only('blogs are ordered according to likes', function () {
      cy.contains('create a new blog').click()
      cy.get('#title').type('testi')
      cy.get('#author').type('testiman')
      cy.get('#url').type('testiman.com')
      cy.get('#create-blog').click()
      cy.contains('create a new blog').click()
      cy.get('#title').type('2')
      cy.get('#author').type('2')
      cy.get('#url').type('2')
      cy.get('#create-blog').click()
      cy.get('#blog-list').contains('testi by testiman').parent().contains('view').click()
      cy.get('#blog-list').contains('testi2 by testiman2').parent().contains('view').click()
      cy.get('#blog-list').contains('testi2 by testiman2').parent().contains('like').click()
      cy.contains('1')
      cy.get('#blog-list div:first').contains('1')
    })
  })
})