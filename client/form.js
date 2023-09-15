import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    content.classList.add("placeholder")

    const videoURL = input.value

    if (!videoURL.includes("shorts")) {
        return content.textContent = "A URL selecionada não parece estar no formato short, tente outra URL."
    }

    const [_, params] = videoURL.split("/shorts/")
    const [videoID] = params.split("?si")

    content.textContent = "Extraindo o texto do audio..."

    const transcription = await server.get("/summary/" + videoID)

    content.textContent = "Construindo o resumo do texto..."

   /* const summary = await server.post("/summary", {
        text: transcription.data.result,
    }) */

    content.textContent = transcription.data.result
    content.classList.remove("placeholder")
})