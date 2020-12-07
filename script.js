//URL for given data
let restcountriesurl="https://restcountries.eu/rest/v2/all";
//function to fetch data from given URL and promise is used here
function restcountries(restcountriesurl){
    return new Promise((res,rej)=>{
        let req= new XMLHttpRequest();
        req.open("GET",restcountriesurl,true);
        req.addEventListener('load',function(){
            if(this.readyState===4 && this.status===200)
            res(req.responseText);
            else
            rej("unable to fetch");
        })
        req.send();
    })
}
restcountries(restcountriesurl)
.then((response)=>{display(JSON.parse(response));})
.catch((err) => console.error(err));

function display(data){
var container= createElement("div","container","cont1");
var row=createElement("div","row","row1");

data.forEach(element => {
    var col=createElement("div","col-3","row");
    var card=createcard(element);
    col.append(card);
    row.append(col);
   
});

container.append(row);
document.body.append(container);

}
function createcard(countryObj) {
    const card = createElement("div", "card");
    const cardBody = createElement("div", "card-body");
    const cardTitle = createElement("h5", "card-title");
if (countryObj.name.length > 20) cardTitle.classList.add("short-title");
    cardTitle.innerHTML = countryObj.name;
    // flag images t be displayed
    const image = createElement("img", "card-img-top");
    image.src = countryObj.flag;
    image.alt = countryObj.name;
    const cardContents = createElement("div", "card-contents");

    // create element to display captial
    const capitalP = createElement("p", "capital");
    capitalP.innerHTML = "Capital:";
    const capitalPSpan = createElement("span");
    if (!countryObj.capital) capitalPSpan.innerHTML = "NA";
    else capitalPSpan.innerHTML = countryObj.capital;
    capitalP.append(capitalPSpan);

    // create elements to display country codes
    const countryCodesP = createElement("p");
    countryCodesP.innerHTML = "Country Codes: ";
    const countryCodesPSpan = createElement("span");
    countryCodesPSpan.innerHTML = `${countryObj.alpha2Code}, ${countryObj.alpha3Code}`;
    countryCodesP.append(countryCodesPSpan);

    // create elements to display region
    const regionP = createElement("p");
    regionP.innerHTML = "Region:";
    const regionPSpan = createElement("span");
    regionPSpan.innerHTML = countryObj.region;
    regionP.append(regionPSpan);

    const latLongP = createElement("p");
    latLongP.innerHTML = "Lat Long:";
    const latLongPSpan = createElement("span");
    latLongP.append(latLongPSpan);

    cardContents.append(capitalP, countryCodesP, regionP, latLongP);
    cardBody.append(cardTitle, image, cardContents);
    card.append(cardBody);
    return card;
}
function createElement(ele,eleclass="",eleid=""){
var element=document.createElement(ele);
element.class=eleclass;
element.id=eleid;
return element;
}
