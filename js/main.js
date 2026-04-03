window.onload = function () {
    var app = new Vue({
        el: "#app",
        data: {
            products: [
                {
                    id: 1,
                    title: "Баклажан Алмаз",
                    short_text: "Класичний середньостиглий сорт",
                    image: 'eggplant1.jpg',
                    desc: "Сорт Алмаз характеризується високою врожайністю та стійкістю до хвороб. Плоди циліндричні, темно-фіолетові, довжиною 14-18 см."
                },
                {
                    id: 2,
                    title: "Баклажан Геліос",
                    short_text: "Круглий плід, без гіркоти",
                    image: 'eggplant2.jpg',
                    desc: "Ранньостиглий сорт з великими круглими плодами. М'якоть дуже ніжна, біла, практично не містить насіння. Ідеальний для гриля."
                },
                {
                    id: 3,
                    title: "Баклажан Біла ніч",
                    short_text: "Незвичний білий колір",
                    image: 'eggplant3.jpg',
                    desc: "Екзотичний сорт з білою шкіркою. Смак делікатний, нагадує печериці. Плоди видовжені, середнього розміру."
                },
                {
                    id: 4,
                    title: "Баклажан Чорний красень",
                    short_text: "Масивні грушоподібні плоди",
                    image: 'eggplant4.jpg',
                    desc: "Популярний сорт для запікання. Плоди досягають ваги 300-400 грамів, мають глянцеву чорну поверхню та чудовий аромат."
                },
                {
                    id: 5,
                    title: "Баклажан Матросик",
                    short_text: "Смугастий та декоративний",
                    image: 'eggplant5.jpg',
                    desc: "Оригінальний сорт з фіолетово-білими смужками. Окрім чудового смаку, має дуже привабливий вигляд у кулінарних стравах."
                }
            ],
            product: {},
            btnVisible: 0,
            cart: [],
            contactFields: {
                name: '',
                email: '',
                company: '',
                position: '',
                city: '',
                country: '',
                phone: '',
                type: 'seed producer',
                otherType: '',
                interest: ''
            },
            formSent: false
        },

        mounted: function () {
            this.getProduct();
            this.checkInCart();
            this.getCart();
        },

        methods: {
            getProduct: function() {
                if (window.location.hash) {
                    var idFromHash = window.location.hash.replace('#', '');
                    for (var i = 0; i < this.products.length; i++) {
                        if (this.products[i].id == idFromHash) {
                            this.product = this.products[i];
                            break;
                        }
                    }
                }
            },
            addToCart: function(id) {
                var cartIds = [];
                if (localStorage.getItem('cart')) {
                    cartIds = localStorage.getItem('cart').split(',');
                }
                if (cartIds.indexOf(String(id)) === -1) {
                    cartIds.push(id);
                    localStorage.setItem('cart', cartIds.join(','));
                    this.btnVisible = 1;
                }
            },
            checkInCart: function() {
                if (this.product.id && localStorage.getItem('cart')) {
                    var cartIds = localStorage.getItem('cart').split(',');
                    if (cartIds.indexOf(String(this.product.id)) !== -1) {
                        this.btnVisible = 1;
                    }
                }
            },
            getCart: function() {
                this.cart = [];
                if (localStorage.getItem('cart')) {
                    var ids = localStorage.getItem('cart').split(',');
                    this.cart = this.products.filter(p => ids.includes(p.id.toString()));
                }
            },
            removeFromCart: function(id) {
                this.cart = this.cart.filter(item => item.id !== id);
                var newIds = this.cart.map(item => item.id);
                if (newIds.length > 0) {
                    localStorage.setItem('cart', newIds.join(','));
                } else {
                    localStorage.removeItem('cart');
                }
            },
            makeOrder: function() {
                localStorage.removeItem('cart');
                this.cart = [];
                this.formSent = true;
                window.scrollTo(0, 0);
            }
        }
    });
};