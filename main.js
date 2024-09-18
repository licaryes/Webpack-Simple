import {el, setChildren} from "redom"
import Navigo from "navigo"
import * as bootstrap from 'bootstrap';

const router = new Navigo("/")

function navigate(e){
    e.preventDefault()
    const href = e.target.getAttribute("href")
    router.navigate(href)
}

function postPage(id){
    console.log(id)
    const body = el("div",{className: "card",style:"padding:30px"},"Loading...")
    fetch(`https://gorest.co.in/public/v2/posts/${id}`).then(async (res)=> {
        const data = await res.json()
        console.log(data)
        setChildren(body, [
            el("h2", data.title),
            el("p", data.body),
            el("button",{className:"btn btn-dark"},{
                href:'/',
                onclick: navigate
            },
        "Back to Post List"),
        ])
    })
    return el("div",{ className:"container"},[el("h1","Post"),body])
}

function postListPage(){
    const list = el("ul",{className: "list-group list-group-flush"}, el("li","Loading..."))
    fetch("https://gorest.co.in/public/v2/posts").then(async (res)=> {
        const data = await res.json()
        console.log(data)
        setChildren(list, data.map((post)=>
            el("li",{ className: "list-group-item"},el("a",{
                href:`/posts/${post.id}`,
                onclick: navigate,
            },post.title))))
    })
    return el("div",{ className:"container"},[el("h1","Post list"),list])
}


router.on("/",()=>{
    setChildren(window.document.body, postListPage())
})
router.on("/posts/:id",({data: {id}})=>{
    setChildren(window.document.body, postPage(id))
})
router.resolve()

