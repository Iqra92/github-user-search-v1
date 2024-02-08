// cypress/integration/github_user_search_spec.ts

describe('GitHub User Search', () => {
    it('passes', () => {
    cy.visit('https://github.com/hedenica/github-user-search-v1')
  });

  it('should display search results for a valid username', () => {
    cy.visit('https://github.com/search?');
    cy.get('.UnstyledTextInput-sc-14ypya-0').type('MuhammadAmmarSattar{enter}');
    cy.get('.bBwPjs > .Link__StyledLink-sc-14289xe-0 > .Text-sc-17v1xeu-0').should('be.visible');
  });

  it('should display a message for Invalid search results', () => {
    cy.visit('https://github.com/search?');
    cy.get('.UnstyledTextInput-sc-14ypya-0').type('/////////{enter}');
    cy.get('.Heading__StyledHeading-sc-1c1dgg0-0').should('be.visible');
  });

  it('should navigate to user profile when a search result is clicked', () => {
    cy.visit('https://github.com/search?');
    cy.get('.UnstyledTextInput-sc-14ypya-0').type('MuhammadAmmarSattar{enter}');
    cy.get('.bBwPjs > .Link__StyledLink-sc-14289xe-0 > .Text-sc-17v1xeu-0').click();
    cy.url().should('not.eq', 'https://github.com/');
    cy.url().should('include', '/MuhammadAmmarSattar/MuhammadAmmarSattar');
  });

  it('should paginate through search results', () => {
    cy.visit('https://github.com/search?');
    cy.get('.UnstyledTextInput-sc-14ypya-0').type('Iqra{enter}');
    // Remember the number of search results on the first page
    let initialResultCount: number;
    cy.get('.kzrAHr').should('be.visible').then(($results) => {
    initialResultCount = $results.length;
    console.log('Initial result count:', initialResultCount);
     cy.get('[rel="next"]').click();
     // Remember the number of search results on the next page
     let nextPageResultCount: number;
     cy.get('.kzrAHr').should('be.visible').then(($results) => {
     nextPageResultCount = $results.length;
     console.log('Next page result count:', nextPageResultCount);

     // Ensure the next page's search results count is equal to the initial page's count
     expect(nextPageResultCount).to.equal(initialResultCount);
  });

  it('should sort search results by specified criteria', () => {
    cy.visit('https://github.com/search?');
    cy.get('.UnstyledTextInput-sc-14ypya-0').type('Selenium{enter}');
    cy.get('[data-testid="sort-button"]').click();

  // Select "Most Stars" from the dropdown menu
    cy.get('#\\:r1j\\:--label').click();

  // Get the list of search results sorted by the specified criteria
    cy.get('.kzrAHr').then($results => {
    // Extract the number of stars of each search result
    const stars = $results.map((_, el) => Cypress.$(el).find('[data-testid=stars-count]').text()).get();

    // Convert stars to numbers for comparison
    const starCounts = stars.map(star => parseInt(star.replace(',', ''), 10));

    // Check if the search results are sorted by star count in descending order
    for (let i = 0; i < starCounts.length - 1; i++) {
      expect(starCounts[i]).to.be.greaterThan(starCounts[i + 1]);
    }
  });
});
});
});
});
