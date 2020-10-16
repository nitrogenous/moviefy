class MessageItem extends HTMLElement {
    connectedCallback () {
        var componentHtml = '<i class="close icon" id="' + this.getAttribute('id') + '-close"></i>' +
            '<div class="header">' + this.getAttribute('message') + '</div>';   
        var componentStyle = 'display: flex;' + 
        'justify-content: center;';

        this.setAttribute('class','ui ' + this.getAttribute('type') + ' message');
        this.setAttribute('style', componentStyle);
        
        this.innerHTML = componentHtml;
    };
}

customElements.define('message-item', MessageItem);