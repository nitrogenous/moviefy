class MessageItem extends HTMLElement {
    connectedCallback () {
        let componentHtml = '<i class="close icon"></i>' +
            '<div class="header">' + this.getAttribute('message') + '</div>';
        
        this.setAttribute('class','ui ' + this.getAttribute('type') + ' message');
        this.innerHTML = componentHtml;
    };
}

customElements.define('message-item', MessageItem);