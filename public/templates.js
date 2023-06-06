(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['alert-wip'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\r\n  El sitio aun esta en contruccion! Muchas funcionalidades pueden no estar aun desarrolladas. </br>\r\n  <span class=\"\">Pronto podra disfrutar de una experiencia de compra completa!</span>\r\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\r\n    <span aria-hidden=\"true\">&times;</span>\r\n  </button>\r\n</div>";
},"useData":true});
templates['card-product'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"carousel-item "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(data && lookupProperty(data,"first")),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":42},"end":{"line":10,"column":69}}})) != null ? stack1 : "")
    + "\">\r\n                  <img src=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\" alt=\"First slide\">\r\n                </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class=\"product-store-item\" id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "\">\r\n  <div class=\"container d-flex justify-content-center\">\r\n    <div class=\"row\">\r\n      <div class=\"product-wrapper text-center\">\r\n        <div class=\"product-img\">\r\n          <a href=\"#\" data-abc=\"true\">\r\n            <div id=\"carousel-"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "\" class=\"carousel slide\" data-ride=\"carousel\" data-interval=\"false\">\r\n              <div class=\"carousel-inner\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"thumbnails") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":16},"end":{"line":13,"column":25}}})) != null ? stack1 : "")
    + "              </div>\r\n              <a class=\"carousel-control-prev\" href=\"#carousel-"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "\" role=\"button\" data-slide=\"prev\">\r\n                <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n                <span class=\"sr-only\">Previous</span>\r\n              </a>\r\n              <a class=\"carousel-control-next\" href=\"#carousel-"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "\" role=\"button\" data-slide=\"next\">\r\n                <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n                <span class=\"sr-only\">Next</span>\r\n              </a>\r\n            </div>\r\n          </a>\r\n          <span class=\"text-center price\">\r\n            <i class=\"fa fa-usd\"></i> "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"price") : depth0), depth0))
    + "\r\n          </span>\r\n          <span class=\"product-title text-center\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</span>\r\n          <div class=\"product-action\">\r\n            <p class=\"text-center\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</p>\r\n            <div class=\"product-action-style\">\r\n              <a href=\"#\"> <i class=\"fa fa-plus\">\r\n                </i>\r\n              </a>\r\n              <a href=\"#\" onclick=\"deleteProduct('"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "')\">\r\n                <i class=\"fa fa-trash-o\"></i>\r\n              </a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</li>";
},"useData":true});
templates['chat-bubble'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"d-flex justify-content-center align-items-center chat-bubble\">\r\n  <i class=\"fa fa-commenting-o fa-2x\" aria-hidden=\"true\"></i>\r\n</div>";
},"useData":true});
templates['form-add-product'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form id=\"product-form\" class=\"needs-validation grid\" enctype=\"multipart/form-data\" novalidate>\r\n  <div class=\"row container-fluid\">\r\n    <div class=\"col-xl\">\r\n      <div class=\"form-group\">\r\n        <label for=\"title\">Title: </label>\r\n        <input type=\"text\" name=\"title\" id=\"title\" class=\"form-control form-control-sm\" required>\r\n        <div class=\"invalid-feedback\">\r\n          Please fill up the product title\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"description\">Description:</label>\r\n        <input type=\"text\" name=\"description\" id=\"description\" class=\"form-control form-control-sm\" required>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"price\">Price:</label>\r\n        <input type=\"number\" name=\"price\" id=\"price\" class=\"form-control form-control-sm\" required>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"code\">Code:</label>\r\n        <input type=\"text\" name=\"code\" id=\"code\" class=\"form-control form-control-sm\" required>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"stock\">Stock:</label>\r\n        <input type=\"number\" name=\"stock\" id=\"stock\" class=\"form-control form-control-sm\" required>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"category\">Category:</label>\r\n        <input type=\"text\" name=\"category\" id=\"category\" class=\"form-control form-control-sm\" required>\r\n      </div>\r\n\r\n    </div>\r\n    <div class=\"col-xl\">\r\n      <div class=\"image-input-container\">\r\n        <p>Thumbnails:</p>\r\n        <div class=\"custom-file\">\r\n          <input type=\"file\" class=\"custom-file-input\" id=\"thumbnails\" name=\"thumbnails\" multiple>\r\n          <label class=\"custom-file-label\" for=\"thumbnails\">Upload up to 3 images</label>\r\n          <div class=\"invalid-feedback\">Example invalid custom file feedback</div>\r\n        </div>\r\n        <div id=\"image-container\"></div>\r\n      </div>\r\n      <div class=\"custom-control custom-checkbox\">\r\n        <input type=\"checkbox\" class=\"custom-control-input\" id=\"status\" name=\"status\" checked>\r\n        <label class=\"custom-control-label\" for=\"status\">Available</label>\r\n      </div>\r\n      <button class=\"btn btn-primary btn-block mt-4\" type=\"submit\">Save product</button>\r\n    </div>\r\n  </div>\r\n</form>";
},"useData":true});
templates['form-modal'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!-- Modal -->\r\n<div class=\"modal fade\" id=\"addProductModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addProductModalLabel\"\r\n  aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"addProductModalLabel\">Add new Product</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"form-add-product"),depth0,{"name":"form-add-product","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>";
},"usePartial":true,"useData":true});
templates['navbar'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\r\n  <a class=\"navbar-brand tienda-logo\" href=\"/\">Rozha One</a>\r\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\"\r\n    aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n\r\n  <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\r\n    <ul class=\"navbar-nav mr-auto\">\r\n      <li class=\"nav-item active\">\r\n        <a class=\"nav-link\" href=\"/\">Home</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" href=\"/realtimeproducts\">Real time products</a>\r\n      </li>\r\n      <li class=\"nav-item dropdown\">\r\n        <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\"\r\n          aria-haspopup=\"true\" aria-expanded=\"false\">\r\n          Categories\r\n        </a>\r\n        <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\r\n          <a class=\"dropdown-item\" href=\"#\">Category 1</a>\r\n          <a class=\"dropdown-item\" href=\"#\">Category 2</a>\r\n          <div class=\"dropdown-divider\"></div>\r\n        </div>\r\n      </li>\r\n    </ul>\r\n    <div>\r\n      <li class=\"nav-item\">\r\n        <!-- Button trigger modal -->\r\n        <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#addProductModal\">\r\n          Add new Product\r\n        </button>\r\n      </li>\r\n    </div>\r\n  </div>\r\n</nav>";
},"useData":true});
})();