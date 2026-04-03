window.onload = function () {
    var app = new Vue({
        el: "#app",
        data: {
            products: [
                { id: 1, title: "Баклажан Алмаз", short_text: "Класичний сорт", image: 'eggplant1.jpg', desc: "Сорт Алмаз характеризується високою врожайністю. Плоди темно-фіолетові, довжиною 14-18 см." },
                { id: 2, title: "Баклажан Геліос", short_text: "Круглий плід", image: 'eggplant2.jpg', desc: "Ранньостиглий сорт. М'якоть дуже ніжна, біла, абсолютно без гіркоти." },
                { id: 3, title: "Баклажан Біла ніч", short_text: "Білий колір", image: 'eggplant3.jpg', desc: "Екзотичний сорт. Смак делікатний, нагадує печериці." },
                { id: 4, title: "Баклажан Чорний красень", short_text: "Масивні плоди", image: 'eggplant4.jpg', desc: "Плоди дуже великі, глянцеві, ідеальні для ікри та запікання." },
                { id: 5, title: "Баклажан Матросик", short_text: "Смугастий", image: 'eggplant5.jpg', desc: "Оригінальний сорт з фіолетово-білими смужками. Дуже смачний." }
            ],
            product: {},
            btnVisible: false
        },
        mounted: function () {
            this.getProduct();
            this.checkInCart();
        },
        methods: {
            getProduct: function() {
                if(window.location.hash) {
                    var id = window.location.hash.replace('#', '');
                    for(var i in this.products) {
                        if(this.products[i].id == id) {
                            this.product = this.products[i];
                        }
                    }
                }
            },
            addToCart: function(id) {
                var cart = [];
                if(window.localStorage.getItem('cart')) {
                    cart = window.localStorage.getItem('cart').split(',');
                }

                if(cart.indexOf(String(id)) == -1) {
                    cart.push(id);
                    window.localStorage.setItem('cart', cart.join());
                    this.btnVisible = true;
                    alert("Товар додано в кошик!");
                }
            },
            checkInCart: function() {
                if(this.product.id && window.localStorage.getItem('cart')) {
                    var cart = window.localStorage.getItem('cart').split(',');
                    if(cart.indexOf(String(this.product.id)) != -1) {
                        this.btnVisible = true;
                    }
                }
            }
        }
    });
}