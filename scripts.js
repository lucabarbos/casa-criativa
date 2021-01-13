function onOff(){ 
    document
        .querySelector("#modal") // procura pelo id footer
        .classList // acessa lista de classes 
        .toggle("hide") // tira e coloca a classe hide

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}
