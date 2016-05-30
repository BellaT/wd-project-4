angular
  .module('party')
  .factory('authInterceptor', AuthInterceptor);

  AuthInterceptor.$inject = ["API_URL", "TokenService"];
  function AuthInterceptor(API_URL, TokenService) {
    return {
      request: function(config){
        var token = TokenService.getToken();

        if (config.url.indexOf(API_URL) === 0 && token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },

      response: function(res){

        if (res.config.url.indexOf(API_URL) === 0 && res.data.token) {
          TokenService.setToken(res.data.token);
        }

        return res;
      }
    };
  }
