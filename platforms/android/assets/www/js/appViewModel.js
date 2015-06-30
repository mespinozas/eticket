var AppViewModel = function(){
    var self = this;

    //the devicePlatform sets the strategy for TokenStore
    self.tokenStore = new TokenStore();

    self.clientVM = ko.observable(new ClientViewModel(self));
    self.productsVM = ko.observable(new ProductViewModel(self));
    self.salesVM = ko.observable(new saleViewModel(self));
    self.storeVM = ko.observable(new storeViewModel(self));

    self.isLoginVisible = ko.observable(true);
    self.isProductsSectionVisible = ko.observable();

    self.showProductsSection = function(){
        self.hideAll();
        self.productsVM().getProducts();
        self.isProductsSectionVisible(true);
    };

    self.showLogin = function(){
        self.hideAll();
        self.isLoginVisible(true);
    };

    self.hideAll = function(){
        self.isLoginVisible(false);
        self.isProductsSectionVisible(false);
    };
};
