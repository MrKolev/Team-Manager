import { html } from "../../node_modules/lit-html/lit-html.js";

export function modalTemplate(id,error) {
   return html`   
        <div class="overlay">
            <div class="modal">
                <p>${error}</p>
                <a @click=${document.getElementById(id).reset()} href="#" class="action">Close</a>
            </div>
        </div>`

}