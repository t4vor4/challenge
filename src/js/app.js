const url = './assets/products.json'
const filtraJson = () => {
    let html = ''
    fetch(url)
        .then(resp => resp.json())
        .then(obj => {
            $(obj).each((i,el) => {
                const img = el.images[0].imageUrl;
                const nome = el.name
                const valor = el.Value.toString().replace('.',',')
                console.log()
                html = html+`<li><img src="${img}" alt="Imagem do produto ${nome}" />
                <div>
                    <span class="nome">${nome}</span>
                    <span class="preco">R$ ${valor}</span>
                </div></li>` 
            })
        })
        .then( _ => {
            // console.log(html)
            $('[vitrine]').append(html)

        })
}

$(document).ready(filtraJson)
