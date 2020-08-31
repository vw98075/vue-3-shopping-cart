app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: 
    /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src="image"/>
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out</p>
        <p v-else>Out Stock</p>

        <p>Shipping: {{ shipping }}</p>
        <ul>
          <li v-for="detail in details">{{detail}}</li>
        </ul>
        <div v-for="(variant, index) in variants" 
            :key="variant.id" 
            @mouseover="updateVariant(index)"
            class="color-circle"
            :style="{ backgroundColor: variant.color }">
          </div>
        <button 
          class="button" 
          v-on:click="addToCart"
          :disabled="inventory <= 0"
          :class="{ disabledButton: inventory <= 0}">
            Add to Cart
        </button>
      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data() {
    return {
        product: 'Socks',
        brand: 'Mastery',
        selectedVariant: 0,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
            {id: 2234, color: 'green', image: './assets/images/socks_green.jpg', 
            inventory: 30},
            {id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', 
            inventory: 10}
        ],
        reviews: []
    }
},
methods: {
    addToCart () {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        this.variants[this.selectedVariant].inventory = this.variants[this.selectedVariant].inventory - 1
    },
    removeFromCart () {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
        this.variants[this.selectedVariant].inventory = this.variants[this.selectedVariant].inventory + 1
    },
    updateVariant (index){
        this.selectedVariant = index
    },
    addReview(review) {
        this.reviews.push(review)
    }
},
computed: {
    title() {
        return this.brand + ' ' + this.product
    },
    image (){
        return this.variants[this.selectedVariant].image
    },
    inventory () {
        return this.variants[this.selectedVariant].inventory
    },
    shipping () {
        if(this.premium){
            return 'Free'
        }
        return 2.99
    }
}

})