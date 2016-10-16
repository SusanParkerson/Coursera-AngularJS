(function () {
'use strict';

angular.module('MenuApp')
.component('categoryitems', {
  templateUrl: 'src/menuapp/templates/itemComponent.template.html',
  bindings: {
    items: '<'
  }
});

})();
