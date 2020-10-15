class MessageItem extends HTMLElement {
    connectedCallback () {
        let componentHtml = '<i class="close icon" id="message-item-close"></i>' +
            '<div class="header">' + this.getAttribute('message') + '</div>';
        
        this.setAttribute('class','ui ' + this.getAttribute('type') + ' message');
        this.setAttribute('id', 'message-item');
        this.innerHTML = componentHtml;
    };
}

customElements.define('message-item', MessageItem);