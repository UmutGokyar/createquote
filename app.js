//Storage Controller
const StorageController = (function () {
  //public members
  return {
    storeClient: function (client) {
      let clients;
      if (localStorage.getItem("clients") == null) {
        clients = [];
        clients.push(client);
      } else {
        clients = JSON.parse(localStorage.getItem("clients"));
        clients.push(client);
      }
      localStorage.setItem("clients", JSON.stringify(clients));
    },
    getClients: function () {
      let clients;
      if (localStorage.getItem("clients") == null) {
        clients = [];
      } else {
        clients = JSON.parse(localStorage.getItem("clients"));
      }
      return clients;
    },
    getProducts: function () {
      let products;
      if (localStorage.getItem("products") == null) {
        products = [];
      } else {
        products = JSON.parse(localStorage.getItem("products"));
      }
      return products;
    },
    updateClient: function (client) {
      let clients = JSON.parse(localStorage.getItem("clients"));
      clients.forEach(function (item, index) {
        if (client.id == item.id) {
          clients.splice(index, 1, client);
        }
      });
      localStorage.setItem("clients", JSON.stringify(clients));
    },
    updateProduct: function (product) {
      let products = JSON.parse(localStorage.getItem("products"));
      products.forEach(function (item, index) {
        if (product.id == item.id) {
          products.splice(index, 1, product);
        }
      });
      localStorage.setItem("products", JSON.stringify(products));
    },
    deleteClient: function (id) {
      let clients = JSON.parse(localStorage.getItem("clients"));
      clients.forEach(function (item, index) {
        if (id == item.id) {
          clients.splice(index, 1);
        }
      });
      localStorage.setItem("clients", JSON.stringify(clients));
    },
    deleteProduct: function (id) {
      let products = JSON.parse(localStorage.getItem("products"));
      products.forEach(function (item, index) {
        if (id == item.id) {
          products.splice(index, 1);
        }
      });
      localStorage.setItem("products", JSON.stringify(products));
    },
    storeProduct: function (product) {
      let products;
      if (localStorage.getItem("products") == null) {
        products = [];
        products.push(product);
      } else {
        products = JSON.parse(localStorage.getItem("products"));
        products.push(product);
      }
      localStorage.setItem("products", JSON.stringify(products));
    },
  };
})();

//Client Controller
const ClientController = (function () {
  const Client = function (id, musteriAdi) {
    this.id = id;
    this.musteriAdi = musteriAdi;
  };

  const data = {
    clients: StorageController.getClients(),
    selectedClient: null,
  };

  const removeClient = (function (client) {
    var index = data.clients.indexOf(client);
    if (index >= 0) {
      data.clients.splice(index, 1);
    }
  })();

  //public members Client Controller
  return {
    addClient: function (client) {
      let id;
      if (data.clients.length > 0) {
        id = data.clients[data.clients.length - 1].id + 1;
      } else {
        id = 1;
      }
      const newClient = new Client(id, client);
      data.clients.push(newClient);
      return newClient;
    },
    getClients: function () {
      return data.clients;
    },
    getData: function () {
      return data;
    },
    getClientById: function (id) {
      let client = null;
      data.clients.forEach(function (cli) {
        if (cli.id == id) {
          client = cli;
        }
      });
      return client;
    },
    setCurrentClient: function (client) {
      data.selectedClient = client;
    },
    getCurrentClient: function () {
      return data.selectedClient;
    },
    removeClient,
    updateClient: function (name) {
      let client = null;
      data.clients.forEach(function (cli) {
        if (cli.musteriAdi == data.selectedClient.musteriAdi) {
          cli.musteriAdi = name;
          client = cli;
        }
      });
      return client;
    },
    deleteClient: function (client) {
      data.clients.forEach(function (cli, index) {
        if (cli.id == client.id) {
          data.clients.splice(index, 1);
        }
      });
    },
  };
})();

//Product Controller
const ProductController = (function () {
  const Product = function (id, name, cod, stock, price) {
    this.id = id;
    this.name = name;
    this.cod = cod;
    this.stock = stock;
    this.price = price;
  };
  const data = {
    products: StorageController.getProducts(),
    selectedProduct: null,
    Price: 0,
    totalTax: 0,
    totalPrice: 0,
  };

  return {
    getProducts: function () {
      return data.products;
    },
    getData: function () {
      return data;
    },
    addProduct: function (name, cod, stock, price) {
      let id;
      if (data.products.length > 0) {
        id = data.products[data.products.length - 1].id + 1;
      } else {
        id = 1;
      }
      const newProduct = new Product(id, name, cod, stock, price);
      data.products.push(newProduct);
      return newProduct;
    },
    getProductById: function (id) {
      let product = null;
      data.products.forEach(function (prd) {
        if (prd.id == id) {
          product = prd;
        }
      });
      return product;
    },
    setCurrentProduct: function (product) {
      data.selectedProduct = product;
    },
    getCurrentProduct: function () {
      return data.selectedProduct;
    },
    updateProduct: function (name, cod, stock, price) {
      let product = null;
      data.products.forEach(function (prd) {
        if (prd.name == data.selectedProduct.name) {
          prd.name = name;
          prd.cod = cod;
          prd.stock = stock;
          prd.price = price;
          product = prd;
        }
      });
      return product;
    },
    deleteProduct: function (product) {
      data.products.forEach(function (prd, index) {
        if (prd.id == product.id) {
          data.products.splice(index, 1);
        }
      });
    },
  };
})();

//UI Controller
const UIController = (function () {
  const Selectors = {
    productListItems: "#product-list tr",
    clientList: "#client-list",
    clientListItems: "#client-list tr",
    offersPrdList: "#offersPrdList",
    offersPrdListItems: "#offersPrdList tr",
    addClientButton: "#musteriyiEkleButonu",
    clientCard: "#clientCard",
    editButton: "#editButton",
    clientName: "#exampleInputName",
    addClientBtn: ".addClientBtn",
    updateClientBtn: ".saveChangeClientBtn",
    deleteClientBtn: ".deleteClientBtn",
    cancelEditBtn: ".cancelEditBtn",
    clientPageButton: "#clientPageButton",
    clientPage: "#clientPage",
    selectPage: "#selectPage",
    productPage: "#productPage",
    selectPageButton: "#selectPageButton",
    productPageButton: "#productPageButton",
    offerPage: "#offerPage",
    offerPageButton: "#offerPageButton",
    addBtnProduct: "#addBtnProduct",
    saveChangeClient: "#saveChangeClient",
    deleteButtonClient: "#deleteButtonClient",
    cancelEditBtnProduct: ".cancelEditBtnProduct",
    productInputName: "#productInputName",
    productCodInput: "#productCodInput",
    productStockInput: "#productStockInput",
    productPriceInput: "#productPriceInput",
    productCard: "#productCard",
    productList: "#product-list",
    updateProductBtn: ".saveChangeBtnProduct",
    deleteProductBtn: ".deleteBtnProduct",
    cancelProductBtn: ".cancelEditBtnProduct",
    allPages: ".page",
    navigateBox: "#navigateBox",
    forwardBtn: "#forwardBtn",
    secondForm: "#secondForm",
    clientSelectBox: "#clientSelectBox",
    calenderSelectBox: "#calenderSelectBox",
    personelInput: "#personelInput",
    clientNameSF: "#clientNameSF",
    teklifNoSF: "#teklifNoSF",
    teklifTarihiSF: "#teklifTarihiSF",
    teklifiDuzenleyenSF: "#teklifiDuzenleyenSF",
    productSelectBox: "#productSelectBox",
    productSelectBoxC: ".productSelectBox",
    itemList: "#item-list",
    offerTables: "#offerTables",
    pieceInput: ".pieceInput",
    discountInput: ".discountInput",
    addRowToOfferList: "#addRowToOfferList",
    toplamTutar: "#toplamTutar",
    kdv: "#kdv",
    genelToplam: "#genelToplam",
  };

  return {
    createProductTeklifList: function (products) {
      let html = "";
      products.forEach((prd, index) => {
        html += `<tr>
                <td>${index + 1}</td>
                <td>${prd.name}</td>
                <td>${prd.cod}</td>
                <td>${prd.stock}</td>
                <td style="width: 100px">
                  <input type="number" class="form-control" />
                </td>
                <td style="width: 150px">
                  <input type="number" class="form-control" />
                </td>
                <td>Adet</td>
                <td>
                ${prd.price} <i class="fa-solid fa-turkish-lira-sign"> </i>
                </td>
                <td>
                  6500 <i class="fa-solid fa-turkish-lira-sign"> </i>
                </td>
                <td>
                  <i
                    class="fa fa-trash"
                    aria-hidden="true"
                    style="color: red"
                  ></i>
                </td>
              </tr>`;
      });
    },
    //clear input
    clearClientAddInput: function () {
      let musteriInput = document.getElementById("exampleInputName");
      musteriInput.value = "";
    },
    clearWarnings: function () {
      const items = document.querySelectorAll(Selectors.clientListItems);
      items.forEach(function (item) {
        if (item.classList.contains("bg-warning")) {
          item.classList.remove("bg-warning");
        }
      });
    },
    clearWarningsProducts: function () {
      const items = document.querySelectorAll(Selectors.productListItems);
      items.forEach(function (item) {
        if (item.classList.contains("bg-warning")) {
          item.classList.remove("bg-warning");
        }
      });
    },
    createClientList: function (clients) {
      let html = ``;
      clients.forEach((cl, index) => {
        html += `<tr>
        <td>${index + 1}</td>
        <td>${cl.musteriAdi}</td>
        <td>
            <i class="far fa-edit edit-client"></i>  
            <input type="hidden" value="${cl.id}"/>
        </td>
      </tr>`;
      });

      document.querySelector(Selectors.clientList).innerHTML = html;
    },
    createProductsList: function (products) {
      let html = ``;
      products.forEach((prd, index) => {
        html += `<tr>
      <td>${index + 1}</td>
      <td>${prd.name}</td>
      <td>${prd.cod}</td>
      <td>${prd.stock}</td>
      <td>${prd.price}</td>
      <td>
          <i class="far fa-edit edit-product"></i>  
          <input type="hidden" value="${prd.id}"/>
      </td>
    </tr>`;
      });
      document.querySelector(Selectors.productList).innerHTML = html;
    },
    getSelectors: function () {
      return Selectors;
    },

    loadClientDropdown: function () {
      let clients = StorageController.getClients();
      var select = document.getElementById("clientSelectBox");

      for (var i = 0; i < clients.length; i++) {
        var opt = clients[i];
        var el = document.createElement("option");
        el.textContent = opt.musteriAdi;
        el.value = opt.id;
        select.appendChild(el);
      }
    },
    clearClientSelectBox: function () {
      var select = document.getElementById("clientSelectBox");
      select.innerHTML = `<option selected>Müşteri Seç</option>`;
    },
    loadProductsToFirstRow: function () {
      let products = StorageController.getProducts();
      var select =
        document.querySelector(".offerTableRow").children[1].children[0];

      for (var i = 0; i < products.length; i++) {
        var opt = products[i];
        var el = document.createElement("option");
        el.textContent = opt.name;
        el.value = opt.id;
        select.appendChild(el);
      }
    },
    addClient: function (client, sonIndex) {
      document.querySelector(Selectors.clientCard).style.display = "block";
      var tr = `
              <tr>
                <td>${sonIndex + 1}</td>
                <td>${client.musteriAdi}</td>
                <td>
                    <i class="far fa-edit edit-client"></i> 
                    <input type="hidden" value="${client.id}"/>
                </td>
              </tr>`;
      document.querySelector(Selectors.clientList).innerHTML += tr;
    },
    addProduct: function (product, sonIndex) {
      document.querySelector(Selectors.productCard).style.display = "block";
      var tr = `
              <tr>
                <td>${sonIndex + 1}</td>
                <td>${product.name}</td>
                <td>${product.cod}</td>
                <td>${product.stock}</td>
                <td>${product.price}</td>
                <td>
                    <i class="far fa-edit edit-product"></i>
                    <input type="hidden" value="${product.id}"/>
                </td>
              </tr>`;
      document.querySelector(Selectors.productList).innerHTML += tr;
    },
    hideCard: function () {
      document.querySelector(Selectors.clientCard).style.display = "none";
    },
    hideProductCard: function () {
      document.querySelector(Selectors.productCard).style.display = "none";
    },
    addClientToForm: function () {
      const selectedClient = ClientController.getCurrentClient();
      document.querySelector(Selectors.clientName).value =
        selectedClient.musteriAdi;
    },
    addingState: function () {
      UIController.clearClientAddInput();
      document.querySelector(Selectors.addClientBtn).style.display = "inline";
      document.querySelector(Selectors.updateClientBtn).style.display = "none";
      document.querySelector(Selectors.deleteClientBtn).style.display = "none";
      document.querySelector(Selectors.cancelEditBtn).style.display = "none";
    },
    addingStateProduct: function () {
      UIController.clearProductInputs();
      document.querySelector(Selectors.addBtnProduct).style.display = "inline";
      document.querySelector(Selectors.updateProductBtn).style.display = "none";
      document.querySelector(Selectors.deleteProductBtn).style.display = "none";
      document.querySelector(Selectors.cancelEditBtnProduct).style.display =
        "none";
    },
    editState: function (tr) {
      UIController.clearWarnings();
      tr.classList.add("bg-warning");
      document.querySelector(Selectors.addClientBtn).style.display = "none";
      document.querySelector(Selectors.updateClientBtn).style.display =
        "inline";
      document.querySelector(Selectors.deleteClientBtn).style.display =
        "inline";
      document.querySelector(Selectors.cancelEditBtn).style.display = "inline";
    },
    editStateProduct: function (tr) {
      UIController.clearWarningsProducts();
      tr.classList.add("bg-warning");
      document.querySelector(Selectors.addBtnProduct).style.display = "none";
      document.querySelector(Selectors.updateProductBtn).style.display =
        "inline";
      document.querySelector(Selectors.deleteProductBtn).style.display =
        "inline";
      document.querySelector(Selectors.cancelEditBtnProduct).style.display =
        "inline";
    },
    updateClient: function (client) {
      let updatedItem = null;
      let items = document.querySelectorAll(Selectors.clientListItems);
      items.forEach(function (item) {
        if (item.classList.contains("bg-warning")) {
          item.children[1].textContent = client.musteriAdi;
          updatedItem = item;
        }
      });
      return updatedItem;
    },
    updateProduct: function (product) {
      let updatedItem = null;
      let items = document.querySelectorAll(Selectors.productListItems);
      items.forEach(function (item) {
        if (item.classList.contains("bg-warning")) {
          item.children[1].textContent = product.name;
          item.children[2].textContent = product.cod;
          item.children[3].textContent = product.stock;
          item.children[4].textContent = product.price;
          updatedItem = item;
        }
        return updatedItem;
      });
    },
    deleteClient: function () {
      let items = document.querySelectorAll(Selectors.clientListItems);
      items.forEach(function (item) {
        if (item.classList.contains("bg-warning")) {
          item.remove();
        }
      });
    },
    deleteProduct: function () {
      let items = document.querySelectorAll(Selectors.clientListItems);
      items.forEach(function (item) {
        if (item.classList.contains("bg-warning")) {
          item.remove();
        }
      });
    },
    clearProductInputs: function () {
      document.querySelector(Selectors.productInputName).value = "";
      document.querySelector(Selectors.productCodInput).value = "";
      document.querySelector(Selectors.productStockInput).value = "";
      document.querySelector(Selectors.productPriceInput).value = "";
    },
    addProductToForm: function () {
      const selectedProduct = ProductController.getCurrentProduct();
      document.querySelector(Selectors.productInputName).value =
        selectedProduct.name;
      document.querySelector(Selectors.productCodInput).value =
        selectedProduct.cod;
      document.querySelector(Selectors.productStockInput).value =
        selectedProduct.stock;
      document.querySelector(Selectors.productPriceInput).value =
        selectedProduct.price;
    },
    showPage: function (pageId) {
      var i;
      var pages = document.querySelectorAll(Selectors.allPages);
      for (i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
      }
      if (pageId == "showClientPage") {
        document.querySelector(Selectors.clientPage).style.display = "block";
      } else if (pageId == "showProductPage") {
        document.querySelector(Selectors.productPage).style.display = "block";
      } else {
        document.querySelector(Selectors.offerPage).style.display = "block";
      }
    },
    fillSecondForm: function (clientNameValue, date, personName) {
      const selectedClient = ClientController.getClientById(clientNameValue);
      document.querySelector(Selectors.clientNameSF).value =
        selectedClient.musteriAdi;
      document.querySelector(Selectors.teklifNoSF).value = "";
      document.querySelector(Selectors.teklifTarihiSF).value = date;
      document.querySelector(Selectors.teklifiDuzenleyenSF).value = personName;
    },
    updateRow: function (prdId, tr) {
      let products = ProductController.getProducts();
      let newProduct;
      products.forEach(function (prd) {
        if (prd.id == prdId) {
          newProduct = prd;
          tr.children[2].innerHTML = `<tr>${newProduct.cod}</tr>`;
          tr.children[6].innerHTML = `<tr>${newProduct.price}</tr>`;
        }
      });
    },
    addRowToOffer: function () {
      const rows = document.querySelectorAll(Selectors.offersPrdListItems);
      if (rows.length == 0) {
        var table = document.querySelector(Selectors.offersPrdList);
        let tr = ` <tr class="offerTableRow">
        <td>1</td>
        <td>
          <select
            style="font-size: 13px"
            class="productSelectBox form-control"
            aria-label="Default select example"
          >
            <option selected>Ürün Seç</option>
          </select>
        </td>
        <td></td>
        <td>
          <input
            min="1"
            type="number"
            class="form-control pieceInput"
            placeholder="0"
          />
        </td>
        <td>
          <input
            min="0"
            max="100"
            type="number"
            class="form-control discountInput"
            placeholder="%"
          />
        </td>
        <td>
          <select
            class="form-select form-control"
            aria-label="Default select example"
            style="font-size: 13px"
          >
            <option selected>adet/metre</option>
            <option value="1">adet</option>
            <option value="2">metre</option>
          </select>
        </td>
        <td></td>
        <td></td>
        <td>
          <i
            class="fa fa-trash"
            aria-hidden="true"
            style="color: red"
          ></i>
        </td>
      </tr>`;
        table.innerHTML = tr;
        UIController.loadProductsToFirstRow();
      } else {
        var table = document.querySelector(Selectors.offersPrdList);
        var lastRow = table.lastElementChild;
        var clone = lastRow.cloneNode(true);

        var tr = `<tr class="offerTableRow">
        <td>1</td>
        <td>
          <select
            style="font-size: 13px"
            class="productSelectBox form-control"
            aria-label="Default select example"
          >
            <option selected>Ürün Seç</option>
          </select>
        </td>
        <td></td>
        <td>
          <input
            min="1"
            type="number"
            class="form-control pieceInput"
            placeholder="0"
          />
        </td>
        <td>
          <input
            min="0"
            max="100"
            type="number"
            class="form-control discountInput"
            placeholder="%"
          />
        </td>
        <td>
          <select
            class="form-select form-control"
            aria-label="Default select example"
            style="font-size: 13px"
          >
            <option selected>adet/metre</option>
            <option value="1">adet</option>
            <option value="2">metre</option>
          </select>
        </td>
        <td></td>
        <td></td>
        <td>
          <i
            class="fa fa-trash"
            aria-hidden="true"
            style="color: red"
          ></i>
        </td>
      </tr>`;
        clone.innerHTML = tr;

        var inputType = clone.getElementsByTagName("select");
        inputType[0].value = "Ürün Seç";
        inputType[1].value = "adet/metre";

        var inputType2 = clone.getElementsByTagName("input");

        inputType2[0].value = "";
        inputType2[1].value = "";
        clone.children[0].textContent = table.children.length + 1;
        clone.children[2].textContent = "";
        clone.children[6].innerHTML = "";
        clone.children[7].innerHTML = "";

        table.appendChild(clone);
      }
    },
    calculateTotal: function (target) {
      var piece = target.value;
      var discount = target.parentNode.nextElementSibling.children[0].value;
      var unitPrice =
        target.parentNode.nextElementSibling.nextElementSibling
          .nextElementSibling.textContent;

      var total = piece * unitPrice - piece * unitPrice * (discount / 100);
      target.parentNode.parentNode.children[7].textContent = total.toFixed(2);
    },
    calculateTotals: function () {
      const rows = document.querySelectorAll(Selectors.offersPrdListItems);
      let toplamTutar = 0;
      rows.forEach(function (row) {
        toplamTutar += Number(row.children[7].textContent);
      });
      let kdv = (toplamTutar * 0.18).toFixed(2);
      let genelToplam = Number(toplamTutar) + Number(kdv);
      document.querySelector(
        Selectors.toplamTutar
      ).innerHTML = `${toplamTutar.toFixed(
        2
      )} <i class="fa-solid fa-turkish-lira-sign"> </i>`;
      document.querySelector(
        Selectors.kdv
      ).innerHTML = `${kdv} <i class="fa-solid fa-turkish-lira-sign"> </i>`;
      document.querySelector(
        Selectors.genelToplam
      ).innerHTML = `${genelToplam.toFixed(
        2
      )} <i class="fa-solid fa-turkish-lira-sign"> </i>`;
    },
    deleteRowOfferList: function (tr) {
      tr.remove();
    },
    updateRowNumber() {
      const rows = document.querySelectorAll(Selectors.offersPrdListItems);
      rows.forEach(function (row, index) {
        row.firstElementChild.textContent = index + 1;
      });
    },
    loadProductsToSelectBoxs: function () {
      const rows = document.querySelectorAll(Selectors.offersPrdListItems);
      if (rows.length !== 0) {
        let selected = null;
        let selectedText = null;
        rows.forEach(function (row) {
          var selectBox = row.children[1].children[0];
          selected = selectBox.options[selectBox.selectedIndex].value;
          selectedText = selectBox.options[selectBox.selectedIndex].textContent;
          selectBox.innerHTML = `<select
          style="font-size: 13px"
          class="productSelectBox form-control"
          aria-label="Default select example"
        >
          <option selected>Ürün Seç</option>
        </select>`;
          let products = StorageController.getProducts();
          var select = row.children[1].children[0];

          for (var i = 0; i < products.length; i++) {
            var opt = products[i];
            var el = document.createElement("option");
            el.textContent = opt.name;
            el.value = opt.id;
            select.appendChild(el);
          }

          selectBox.options[selectBox.selectedIndex].value = selected;
          selectBox.options[selectBox.selectedIndex].textContent = selectedText;
        });
      }
    },
    loadProductToSelectBox: function () {
      var table = document.querySelector(Selectors.offersPrdList);
      var row = table.lastElementChild;
      let products = StorageController.getProducts();
      var select = row.children[1].children[0];
      for (var i = 0; i < products.length; i++) {
        var opt = products[i];
        var el = document.createElement("option");
        el.textContent = opt.name;
        el.value = opt.id;
        select.appendChild(el);
      }
    },
    deleteOffersRowDeleteProduct: function (id) {
      const rows = document.querySelectorAll(Selectors.offersPrdListItems);
      rows.forEach(function (row) {
        var select = row.children[1].children[0];
        if (select.options[select.selectedIndex].value == id) {
          row.remove();
        }
      });
    },
    updateSelectsBoxsUpdateProduct: function (product) {
      console.log(product);
      const rows = document.querySelectorAll(Selectors.offersPrdListItems);
      rows.forEach(function (row) {
        var select = row.children[1].children[0];
        if (select.options[select.selectedIndex].value == product.id) {
          select.options[select.selectedIndex].textContent = product.name;
          select.parentNode.nextElementSibling.textContent = product.cod;
          select.parentNode.parentNode.children[6].textContent = product.price;
        }
      });
    },
  };
})();
//App
const App = (function (ProductCtrl, UICtrl, ClientCtrl, StorageCtrl) {
  const UISelectors = UICtrl.getSelectors();
  //Load Event Listeners

  const loadEventListeners = function () {
    //add client
    document
      .querySelector(UISelectors.addClientButton)
      .addEventListener("click", clientAddSubmit);
    //edit client
    document
      .querySelector(UISelectors.clientList)
      .addEventListener("click", clientEditClick);

    //edit client submit
    document
      .querySelector(UISelectors.updateClientBtn)
      .addEventListener("click", editClientSubmit);

    //edit product submit
    document
      .querySelector(UISelectors.updateProductBtn)
      .addEventListener("click", editProductSubmit);

    //cancel button click
    document
      .querySelector(UISelectors.cancelEditBtn)
      .addEventListener("click", cancelUpdateClient);

    //cancel button click product
    document
      .querySelector(UISelectors.cancelEditBtnProduct)
      .addEventListener("click", cancelUpdateProduct);

    //delete button click
    document
      .querySelector(UISelectors.deleteClientBtn)
      .addEventListener("click", deleteClientSubmit);

    //delete button click product

    document
      .querySelector(UISelectors.deleteProductBtn)
      .addEventListener("click", deleteProductSubmit);

    //add product

    document
      .querySelector(UISelectors.addBtnProduct)
      .addEventListener("click", productAddSubmit);

    //edit product
    document
      .querySelector(UISelectors.productList)
      .addEventListener("click", productEditClick);

    //page select click
    document
      .querySelector(UISelectors.navigateBox)
      .addEventListener("click", openPageClick);

    //forward btn click

    document
      .querySelector(UISelectors.forwardBtn)
      .addEventListener("click", forwardBtnClick);

    //select product onchange
    document
      .querySelector(UISelectors.offersPrdList)
      .addEventListener("change", productChangeClick);

    //add row click
    document
      .querySelector(UISelectors.addRowToOfferList)
      .addEventListener("click", addRowSubmit);

    //delete row from offerlist
    document
      .querySelector(UISelectors.offersPrdList)
      .addEventListener("click", deleteRowSubmit);

    document
      .querySelector(UISelectors.offersPrdList)
      .addEventListener("change", calculateEvent);
    document
      .querySelector(UISelectors.offersPrdList)
      .addEventListener("keyup", calculateEvent);
  };

  const productAddSubmit = function (e) {
    const productInputName = document.querySelector(
      UISelectors.productInputName
    ).value;
    const productCodInput = document.querySelector(
      UISelectors.productCodInput
    ).value;
    const productStockInput = document.querySelector(
      UISelectors.productStockInput
    ).value;
    const productPriceInput = document.querySelector(
      UISelectors.productPriceInput
    ).value;

    if (
      productInputName !== "" &&
      productCodInput !== "" &&
      productStockInput !== "" &&
      productPriceInput !== ""
    ) {
      const newProduct = ProductCtrl.addProduct(
        productInputName,
        productCodInput,
        productStockInput,
        productPriceInput
      );

      var products = ProductCtrl.getProducts();
      UICtrl.addProduct(newProduct, products.indexOf(newProduct));
      //add product to storage
      StorageCtrl.storeProduct(newProduct);
      UICtrl.clearProductInputs();
      UICtrl.loadProductsToSelectBoxs();
    } else {
      window.alert("Boş Geçilemez !");
    }
    e.preventDefault();
  };

  const cancelUpdateClient = function (e) {
    UICtrl.addingState();
    UICtrl.clearWarnings();

    e.preventDefault();
  };

  const cancelUpdateProduct = function (e) {
    UICtrl.addingStateProduct();
    UICtrl.clearWarningsProducts();
    e.preventDefault();
  };

  const productEditClick = function (e) {
    if (e.target.classList.contains("edit-product")) {
      const id = e.target.nextElementSibling.value;

      // get selected product
      const product = ProductCtrl.getProductById(id);
      //set current client
      ProductCtrl.setCurrentProduct(product);

      UICtrl.clearProductInputs();

      //add product to UI

      UICtrl.addProductToForm();
      UICtrl.editStateProduct(e.target.parentNode.parentNode);
    }

    e.preventDefault();
  };

  const clientAddSubmit = function (e) {
    const musteriInput = document.querySelector("#exampleInputName").value;
    if (musteriInput !== "") {
      const newClient = ClientCtrl.addClient(musteriInput);
      var index = ClientCtrl.getClients();
      UICtrl.addClient(newClient, index.indexOf(newClient));
      //add client to storage
      StorageCtrl.storeClient(newClient);

      UICtrl.clearClientAddInput();
      UICtrl.clearClientSelectBox();
      UICtrl.loadClientDropdown();
      e.preventDefault();
    } else {
      window.alert("Müşteri Adı Boş Geçilemez !");
    }
    e.preventDefault();
  };

  const clientEditClick = function (e) {
    if (e.target.classList.contains("edit-client")) {
      var id = e.target.nextElementSibling.value;
      //get selected client
      const client = ClientCtrl.getClientById(id);
      //set current client
      ClientCtrl.setCurrentClient(client);

      UICtrl.clearWarnings();

      //add product to UI

      UICtrl.addClientToForm();
      UICtrl.editState(e.target.parentNode.parentNode);
    }
    e.preventDefault();
  };

  const editClientSubmit = function (e) {
    const clientName = document.querySelector(UISelectors.clientName).value;
    if (clientName !== "") {
      //update client
      const updatedClient = ClientCtrl.updateClient(clientName);

      //update ui
      let item = UICtrl.updateClient(updatedClient);

      //update storage
      StorageCtrl.updateClient(updatedClient);
      UICtrl.clearClientSelectBox();
      UICtrl.loadClientDropdown();

      UICtrl.addingState();
    } else {
      window.alert("Müşteri Adı Boş Geçilemez !");
    }
    UICtrl.clearWarnings();

    e.preventDefault();
  };
  const editProductSubmit = function (e) {
    const productInputName = document.querySelector(
      UISelectors.productInputName
    ).value;
    const productCodInput = document.querySelector(
      UISelectors.productCodInput
    ).value;
    const productStockInput = document.querySelector(
      UISelectors.productStockInput
    ).value;
    const productPriceInput = document.querySelector(
      UISelectors.productPriceInput
    ).value;

    if (
      productInputName !== "" &&
      productCodInput !== "" &&
      productStockInput !== "" &&
      productPriceInput !== ""
    ) {
      //update product

      const updatedProduct = ProductCtrl.updateProduct(
        productInputName,
        productCodInput,
        productStockInput,
        productPriceInput
      );
      //update ui
      let item = UICtrl.updateProduct(updatedProduct);

      //update storage
      StorageCtrl.updateProduct(updatedProduct);

      UICtrl.addingStateProduct();
      UICtrl.updateSelectsBoxsUpdateProduct(updatedProduct);
      UICtrl.loadProductsToSelectBoxs();
    } else {
      window.alert("Müşteri Adı Boş Geçilemez !");
    }
    UICtrl.clearWarningsProducts();
    e.preventDefault();
  };

  const deleteClientSubmit = function (e) {
    //get selected client
    const selectedClient = ClientCtrl.getCurrentClient();
    //delete client
    ClientCtrl.deleteClient(selectedClient);
    //delete ui
    UICtrl.deleteClient();
    //delete client from storage
    StorageCtrl.deleteClient(selectedClient.id);
    UICtrl.clearClientSelectBox();
    UICtrl.loadClientDropdown();

    const clients = ClientCtrl.getClients();
    UICtrl.createClientList(clients);
    UICtrl.addingState();
    if (clients.length == 0) {
      UICtrl.hideCard();
    }
    e.preventDefault();
  };

  const deleteProductSubmit = function (e) {
    //get selected product
    const selectedProduct = ProductCtrl.getCurrentProduct();
    //delete product
    ProductCtrl.deleteProduct(selectedProduct);
    //delete ui
    UICtrl.deleteProduct();
    //delete product from the storage
    StorageCtrl.deleteProduct(selectedProduct.id);

    UICtrl.deleteOffersRowDeleteProduct(selectedProduct.id);
    UICtrl.loadProductsToSelectBoxs();
    UICtrl.updateRowNumber();

    const products = ProductCtrl.getProducts();
    UICtrl.createProductsList(products);
    UICtrl.addingStateProduct();
    if (products.length == 0) {
      UICtrl.hideProductCard();
    }

    e.preventDefault();
  };
  const forwardBtnClick = function (e) {
    var select = document.querySelector(UISelectors.clientSelectBox);
    var selectedClientValue = select.options[select.selectedIndex].value;

    var selectedCalenderValue = document.querySelector(
      UISelectors.calenderSelectBox
    ).value;
    const date = selectedCalenderValue.split("-");
    var selectedDate = `${date[2]}-${date[1]}-${date[0]}`;
    var personelInput = document.querySelector(UISelectors.personelInput).value;
    if (
      selectedClientValue !== "Müşteri Seç" &&
      selectedCalenderValue !== "" &&
      personelInput !== ""
    ) {
      UICtrl.fillSecondForm(selectedClientValue, selectedDate, personelInput);

      document.querySelector(UISelectors.secondForm).style.display = "block";
      document.querySelector(UISelectors.offerTables).style.display = "block";
    } else {
      alert(
        "Müşteri Seçimi - Teklif Tarihi - Teklifi Düzenleyen Alanları Boş Geçilemez!"
      );
    }
    e.preventDefault();
  };

  const openPageClick = function (e) {
    if (
      e.target.id == "showClientPage" ||
      e.target.id == "showProductPage" ||
      e.target.id == "showOfferPage"
    ) {
      UICtrl.showPage(e.target.id);
    }

    e.preventDefault();
  };
  const productChangeClick = function (e) {
    if (e.target.classList.contains("productSelectBox")) {
      var prdSelectValue = e.target.value;
      var tr = e.target.parentNode.parentNode;
      UICtrl.updateRow(prdSelectValue, tr);
      UICtrl.calculateTotal(tr.children[3].children[0]);
      UICtrl.calculateTotals();
    }
    e.preventDefault();
  };
  const addRowSubmit = function (e) {
    UICtrl.addRowToOffer();
    UICtrl.loadProductToSelectBox();

    e.preventDefault();
  };
  const deleteRowSubmit = function (e) {
    if (e.target.classList.contains("fa-trash")) {
      UICtrl.deleteRowOfferList(e.target.parentNode.parentNode);
      UICtrl.updateRowNumber();
      UICtrl.calculateTotals();
    }
    e.preventDefault();
  };
  const calculateEvent = function (e) {
    if (e.target.classList.contains("pieceInput")) {
      UICtrl.calculateTotal(e.target);
    } else if (e.target.classList.contains("discountInput")) {
      UICtrl.calculateTotal(
        e.target.parentNode.previousElementSibling.children[0]
      );
    }
    UICtrl.calculateTotals();
    e.preventDefault();
  };
  return {
    init: function () {
      UICtrl.addingState();
      UICtrl.addingStateProduct();
      UICtrl.clearProductInputs();
      UICtrl.loadClientDropdown();
      UICtrl.loadProductsToFirstRow();

      const clients = ClientCtrl.getClients();
      if (clients.length == 0) {
        UICtrl.hideCard();
      } else {
        UICtrl.createClientList(clients);
      }

      const products = ProductCtrl.getProducts();
      if (products.length == 0) {
        UICtrl.hideProductCard();
      } else {
        UICtrl.createProductsList(products);
      }

      //load event listeners
      loadEventListeners();
    },
  };
})(ProductController, UIController, ClientController, StorageController);

App.init();
