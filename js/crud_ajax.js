const d = document
$table = d.querySelector(".crud-table"),
$form = d.querySelector(".crud-form"),
$title = d.querySelector(".crud-title"),
$template = d.getElementById("crud-template").content,
$fragment = d.createDocumentFragment();

const ajax = (options) => {
    let{url, method, success, error, data} = options
    const xhr = new XMLHttpRequest()

    xhr.addEventListener("readystatechange", e => {
        if(xhr.readyState !== 4)return

        if(xhr.status >= 200 && xhr.status < 300){
            let json = JSON.parse(xhr.responseText)
            success(json)
        }else{
            let message = xhr.statusText || "Ocurrioun error"
            error(`Error $(xhr.status): $(message`)
        }
    })
    xhr.open(method||"GET", url);
    xhr.setRequestHeader("Content-type","application/json; charset=utf-8");
    xhr.send(JSON.stringify(data));
}

const getAll= () => {
    ajax({
        url:"http://localhost:5555/santos",
        success:(res) =>{
            console.log(res)
            res.forEach(el =>{
                $template.querySelector(".name").textContent= el.nombre
                $template.querySelector(".constelacion").textContent= el.constelacion
                $template.querySelector(".edit").dataset.id = el.id;
                $template.querySelector(".edit").dataset.name = el.nombre;
                $template.querySelector(".edit").dataset.constelacion = el.constelacion;
                $template.querySelector(".delete").dataset.id=el.id
                let $clone = d.importNode($template, true)
                $fragment.appendChild($clone)
            })
            $table.querySelector("tbody").appendChild($fragment)
        },
        error:(error) => {
            console.log(err);
            $table.insertAdjacentHTML("afterend", `<p><b>$(err)</b></p>`)
        }
    })
}
d.addEventListener("DOMContentLoaded",getAll)