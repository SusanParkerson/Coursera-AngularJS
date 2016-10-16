(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menuapp/templates/menuapp.template.html',
  bindings: {
    items: '<'
  }
});

})();
