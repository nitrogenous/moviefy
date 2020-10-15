class ItemShowcase extends HTMLElement {
    connectedCallback () {
        var componentStyle =  'display: grid;' + 
            'grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));' +
            'grid-gap: .5rem;' + 
            'align-items: flex-start;' +
            'grid-auto-flow: column;' + 
            'grid-auto-columns: minmax(260px, 1fr);' + 
            'margin-left: 7.5vw;' +
            'width: 85vw;' + 
            'height: 580px;' + 
            'overflow-y: hidden;' + 
            'overflow-x: scroll;';

        this.setAttribute('style', componentStyle);
    };  
}

customElements.define('item-showcase', ItemShowcase);