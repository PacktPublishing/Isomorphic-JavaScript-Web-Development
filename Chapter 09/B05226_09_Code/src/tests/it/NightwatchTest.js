describe('Testing our app', function() {
  
  describe('with Nightwatch', function() {
    
    before(function(client, done) {
      done();
    });
    
    after(function(client, done) {
      client.end(function() {
        done();
      });
    });
    
    afterEach(function(client, done) {
      done();
    });
    
    beforeEach(function(client, done) {
      done();
    });
    
    it('testing navigation to repos', function(client) {
      client
        .url('http://localhost:8080')
        .expect.element('body').to.be.present.before(1000);
      
      client.click('.repos-link', function () {
        client.expect.element('.repos-title').text.to.equal('Repos');
        client.assert.urlEquals('http://localhost:8080/repos');
      })
    });
  
    it('testing url navigation to repos', function(client) {
      client
        .url('http://localhost:8080/repos');
    
      // now we navigate to repos directly
      client.expect.element('.repos-title').text.to.equal('Repos');
    });
  
  });
});