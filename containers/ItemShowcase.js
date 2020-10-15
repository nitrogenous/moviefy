class ItemShowcase extends HTMLElement {
    connectedCallback () {
        let componentStyle =  'display: grid;' + 
            'grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));' +
            'grid-gap: .5rem;' + 
            'grid-auto-flow: column;' + 
            'grid-auto-columns: minmax(260px, 1fr);' + 
            'margin-left: 7.5vw;' +
            'width: 85vw;' + 
            'overflow-y: hidden;' + 
            'overflow-x: scroll;';

        let componentHtml = '<h1 class="ui header">' + this.getAttribute('title') + "</h1>" +
            '<div class="ui link cards" id="movies-showcase" style="' + componentStyle + '" ></div>';

        this.innerHTML = componentHtml;
    };  
}

customElements.define('item-showcase', ItemShowcase);