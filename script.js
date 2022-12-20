const apiEndPoint = "http://makeup-api.herokuapp.com/api/v1/products.json";
let records=[]
const makeupProd = async () => {
    const response = await fetch(`${apiEndPoint}`);
    records = await response.json();
    console.log(records);
    let val =productCardConstruction(records)
    document.body.append(val)
  };
  makeupProd()

// BrandName
let brand = document.createElement('h1');
brand.innerText = "Radiance";

// shopping cart
let cart = document.createElement("img");
cart.setAttribute("src", "./images/bag-dash-fill.svg");
cart.setAttribute("width", "32px");
cart.setAttribute("height", "32px");

let pageHead = document.createElement('div');
pageHead.setAttribute("class", "container d-flex py-3 head")
let BrandName = document.createElement('div');
BrandName.setAttribute('class', 'brand')
BrandName.append(brand)
let shoppingCart = document.createElement('div');
shoppingCart.setAttribute('class', 'cart ml-8')
shoppingCart.append(cart)
// let searchBar = document.createElement('input');
// searchBar.setAttribute('placeholder',"Search product");
// searchBar.setAttribute('type',"search");
// searchBar.setAttribute('class',"form-control");
// searchBar.addEventListener('change', (event) =>search(event.target.value))


// appending API to card function
function productCardConstruction(records){
    let productGrid= document.createElement('div');
    productGrid.setAttribute('class', 'container');
    let productRow= document.createElement('div');
    productRow.setAttribute('class', 'row');
   
    for(let i=0;i<records.length;i++){
        let productCol = document.createElement('div');
        productCol.setAttribute('class', 'col-4 mt-3');
        let productCard = document.createElement('div');
        productCard.setAttribute('class', 'card')
        productCard.setAttribute("width", "18rem");
        let productImage= document.createElement("img");
        productImage.setAttribute('class', 'card-img-top');
        productImage.setAttribute('src', records[i].image_link);
        let productDetails=document.createElement('div');
        productDetails.setAttribute('class', 'card-body');
        let productName=document.createElement('H5');
        productName.setAttribute('class', 'card-title');
        productName.innerHTML = records[i].brand+" "+records[i].name;
        let productDes = document.createElement('p');
        productDes.setAttribute('class', 'card-text');
        productDes.innerHTML = "MRP : $"+ records[i].price;
        let productLink = document.createElement('a');
        productLink.innerHTML = 'More Details';
        productLink.setAttribute('href',records[i].product_link);
        productLink.setAttribute('target','_blank');
        productLink.setAttribute('class','btn btn-link');
        productDetails.append(productName);
        productDetails.append(productDes);
        productDetails.append(productLink);
        productCard.append(productImage);
        productCard.append(productDetails);
        productCol.append(productCard);
        productRow.append(productCol);
    }
    
    productGrid.append(productRow);
    return productGrid;
}

async function search(value){
    const response = await fetch(`${apiEndPoint}?product_type=${value}`);
    records = await response.json();
    console.log(records);
    let val =productCardConstruction(records)
    document.body.append(val)
  };
pageHead.append(BrandName)
pageHead.append(shoppingCart)
document.body.append(pageHead)
