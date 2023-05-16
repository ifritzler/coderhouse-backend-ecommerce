const productTemplate = `<li class="product-store-item">
<div class="container d-flex justify-content-center">
  <div class="row">
    <div class="product-wrapper text-center">
      <div class="product-img">
        <a href="#" data-abc="true">
          <div id="{{product.id}}" class="carousel slide" data-ride="carousel" data-interval="false">
            <div class="carousel-inner">
              {{#each product.thumbnails as |image|}}
              <div class="carousel-item {{#if @first}}active{{/if}}">
                <img src="{{this}}" alt="First slide">
              </div>
              {{/each}}
            </div>
            <a class="carousel-control-prev" href="#{{product.id}}" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#{{product.id}}" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          {{!-- <img src="{{#each product.thumbnails}} {{#if @first}} {{this}} {{/if}} {{/each}}" alt=""> --}}
        </a>
        <span class="text-center price">
          <i class="fa fa-usd"></i> {{product.price}}
        </span>
        <span class="product-title text-center">{{product.title}}</span>
        <div class="product-action">
          <p class="text-center">{{product.title}}</p>
          <div class="product-action-style">
            <a href="#"> <i class="fa fa-plus">
              </i>
            </a>
            <a href="#">
              <i class="fa fa-trash-o"></i>
            </a>
            {{!-- <a href="#">
              <i class="fa fa-shopping-cart"></i>
            </a> --}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</li>`
