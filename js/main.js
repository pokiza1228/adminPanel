const addZero = function(number) {
    return number < 10 ? "0" + number : number;
}

const showDate = function(dateString) {
    const date = new Date(dateString); 
    return   `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()}`
}
const temple=document.querySelector("#product-temple");

const cardRender = function(card) {
const {id, title, img, price, birthDate, sizes, isFavorite, features}=card;
const itemParrot = temple.content.cloneNode(true);
itemParrot.querySelector(".parrot-title").textContent=title;
itemParrot.querySelector(".parrot-price").textContent="$" + price;
const size = `${sizes.width}x${sizes.height}`
itemParrot.querySelector(".parrot-size").textContent=size;
itemParrot.querySelector(".parrot-birthday").textContent=showDate(birthDate);
const featuresList=itemParrot.querySelector(".features-list");
let featuresArray=features.split(",");

for (let i=0; i<featuresArray.length; i++) {
const featuresItem=document.createElement("li");
featuresItem.className="badge bg-primary me-1 mb-1";
featuresItem.textContent=featuresArray[i];
featuresList.append(featuresItem);
}

const star=itemParrot.querySelector(".parrot-star");
star.setAttribute("data-id",id);
const editBtn = itemParrot.querySelector(".edit-btn");
editBtn.setAttribute("data-id",id);
const deletBtn = itemParrot.querySelector(".delet-btn");
deletBtn.setAttribute("data-id",id);
 if (isFavorite) {
    itemParrot.querySelector(".parrot-star").className="fa-solid fa-star parrot-star"
} else {
    itemParrot.querySelector(".parrot-star").className="fa fa-star-o parrot-star"
}
return itemParrot
}
const parrotWrapper=document.querySelector(".parrots-wrapper");

const parrotFor =function (parrotArray=products) {
parrotWrapper.innerHTML="";
for (let i = 0; i < parrotArray.length; i++) {
    const product=parrotArray[i];
    const newProduct = cardRender(product);
    parrotWrapper.append(newProduct);
 }
}


parrotFor();


const addParrotsModal = new bootstrap.Modal(document.querySelector("#add-parrot-modal"));
let showingParrot = products.slice();

const addParrot = document.querySelector("#addParrot");
addParrot.addEventListener("submit", function(evt) {
evt.preventDefault();
const parrotName=document.querySelector("#parrot-title");
const parrotImg=document.querySelector("#parrot-img");
const parrotPrice=document.querySelector("#price");
const parrotBirthday=document.querySelector("#parrot-date");
const parrotWidth=document.querySelector("#parrot_width");
const parrotHeight=document.querySelector("#parrot_height");
const parrotFeatures=document.querySelector("#features");

const newParrot={
    id: Math.floor(Math.random()*1000),
    title: parrotName.value,
    img: parrotImg.value,
    price: parrotPrice.value,
    birthDate: parrotBirthday.value,
    sizes: {
      width: Number(parrotWidth.value),
      height: Number(parrotHeight.value)
    },
    isFavorite: false,
    features: parrotFeatures.value
}
showingParrot.push(newParrot);
products.push(newParrot);
cardRender(newParrot);
parrotFor();
addParrot.reset();
addParrotsModal.hide();
})


const editParrotName=document.querySelector("#editParrot-title");
const editParrotImg=document.querySelector("#editParrot-img");
const editParrotPrice=document.querySelector("#editPrice");
const editParrotBirthday=document.querySelector("#editParrot-date");
const editParrotWidth=document.querySelector("#editParrot_width");
const editParrotHeight=document.querySelector("#editParrot_height");
const editParrotFeatures=document.querySelector("#editFeatures");

parrotWrapper.addEventListener("click", function(evt){
    if (evt.target.matches(".btn-danger")) {
        const clickedId=+evt.target.dataset.id;
        const clickedIndex=products.findIndex(function(product){
            return product.id==clickedId
        })
        console.log(clickedIndex);
        products.splice(clickedIndex, 1);
        parrotFor();
    } else if (evt.target.matches(".btn-secondary")){
        const clickedId=+evt.target.dataset.id;
        const clickedIndex=products.find(function(product){
            return product.id==clickedId
        })
        console.log(clickedIndex);
        editParrotName.value=clickedIndex.title;
        editParrotImg.value=clickedIndex.img;
        editParrotPrice.value=clickedIndex.price;
        editParrotBirthday.value=clickedIndex.birthDate;
        editParrotWidth.value=clickedIndex.sizes.width;
        editParrotHeight.value=clickedIndex.sizes.height;
        editParrotFeatures.value=clickedIndex.features;

        editParrot.setAttribute("data-editingid", clickedIndex.id);
    } else if (evt.target.matches(".parrot-star")) {
        const clickedId=+evt.target.dataset.id;
        
        const clickedIndex=products.find(function(product){
            return product.id==clickedId
        })
        console.log(clickedIndex)
        const {id, img, title, price, birthDate, sizes,features}=clickedIndex;
        const clickId=products.findIndex(function(product){
            return product.id==clickedId
        })
            if (evt.target.className=="fa fa-star-o parrot-star") {
                evt.target.className="fa-solid fa-star parrot-star";
                const product={
                    id: id,
                    title: title,
                    img: img,
                    price: price,
                    birthDate: birthDate,
                    sizes: {
                      width: sizes.width,
                      height: sizes.height
                    },
                    features: features,
                    isFavorite:true
                }
                console.log(product);
                products.splice(clickId, 1, product);
                favorites.push(product);
                favorit();
               
            } else if (evt.target.className=="fa-solid fa-star parrot-star") {
                evt.target.className="fa fa-star-o parrot-star"

                const product={
                    id: id,
                    title: title,
                    img: img,
                    price: price,
                    birthDate: birthDate,
                    sizes: {
                      width: sizes.width,
                      height: sizes.height
                    },
                    features: features,
                    isFavorite: false
                }
                
                favorites.splice(clickId, 1);
                products.splice(clickId, 1, product);
                favorit();
                //favorit(favorites);
            }
        }
})
const editParrotsModal = new bootstrap.Modal(document.querySelector("#edit-parrot-modal"));
const editParrot=document.querySelector("#edit-parrot");
editParrot.addEventListener("submit", function(evt){
    evt.preventDefault();
    const editNameValue=editParrotName.value;
    const editImgValue=editParrotImg.value;
    const editingId = +evt.target.dataset.editingid;
    const editPrice=editParrotPrice.value;
    const editBithdayValue=editParrotBirthday.value;
    const editWidthValue=editParrotWidth.value;
    const editHeightValue=editParrotHeight.value;
    if (editNameValue.trim() && editImgValue && (editPrice > 0) && editBithdayValue && editWidthValue && editHeightValue) {
        const editParrot = {
            id: editingId,
            title: editNameValue,
            img: editImgValue,
            price: editPrice,
            birthDate: editBithdayValue,
            sizes: {
                width: editWidthValue,
                height: editHeightValue
            },
            isFavorite: false,
            features: editParrotFeatures.value
        }
        const editingItemIndex = products.findIndex(function(product) {
         return product.id === editingId})

        const editingShowItemIndex =products.findIndex(function(product) {
        return product.id === editingId})

        console.log(editingItemIndex)
        products.splice(editingItemIndex, 1, editParrot); 
         
        
        showingParrot.splice(editingShowItemIndex, 1, editParrot);
    }
        parrotFor();
        editParrot.reset();
        editParrotsModal.hide();
})

const filterParrot = document.querySelector("#filter");
filterParrot.addEventListener("submit", function(evt){
    evt.preventDefault();
    const elements = evt.target.elements;
    const search=document.querySelector("#search").value;
    const priceForm=Number(elements.from.value);
    const priceTo=Number(elements.to.value);
    const width=Number(elements.from_width.value);
    const widthTo=Number(elements.to_width.value);
    const height=Number(elements.from_height.value);
    const heightTo=Number(elements.to_height.value);

    const sort=document.querySelector("#sortby").value;

    const filteredParrot=products
    .sort(function(a, b) {
        switch (sort) {
            case "1":
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1
                } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1
                } else {
                    return 0
                }
            case "2": 
                return b.price - a.price
            case "3": 
                return a.price - b.price
            case "4":
                return new Date(a.birthDate).getTime()  - new Date(b.birthDate).getTime()
            case "5":
                return new Date(b.birthDate).getTime()  - new Date(a.birthDate).getTime()
            default:
                break;
        }
    })
    .filter(function(product){
        return (product.title.toLowerCase()).includes((search.toLowerCase())) &&
        product.price>=priceForm &&
        !priceTo? true : product.price<=priceTo  &&
        product.sizes.width>=width && 
        product.sizes.width<=widthTo &&
        product.sizes.height>=height &&
        product.sizes.height<=heightTo
    })
    parrotFor(filteredParrot);
    filterParrot.reset();
})




const favorit=function(array=products){
    const removeWrapper =document.querySelector(".remove-list");
    removeWrapper.innerHTML="";
    for (let i=0; i<array.length; i++) {
        if (array[i].isFavorite) {
            favorites.push(array[i]);
            const removeItem=document.createElement("li");
            removeItem.className="card p-3 mb-2";
            const removeTitle=document.createElement("h3");
            removeTitle.textContent=array[i].title;
            removeTitle.className="card-title h5 mb-2";
            removeItem.append(removeTitle);
            const removeBtn=document.createElement("button");
            removeBtn.textContent="Remove";
            removeBtn.className="btn btn-danger btn-sm d-inline";
            removeBtn.style="width: fit-content";
            removeBtn.type="button";
            removeItem.append(removeBtn);
            removeWrapper.append(removeItem);

            removeBtn.addEventListener("click",function(){
                removeWrapper.innerHTML="";
            })
        }
    
    }
}


favorit();



