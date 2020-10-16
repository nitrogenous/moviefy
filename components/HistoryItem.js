class HistoryItem extends HTMLElement {
    connectedCallback () {
        var componentHtml = '<a class="ui label" id="history-item">' +
            decodeURI(this.getAttribute('movieName')) + 
            '<i class="icon close" id="history-item-remove"></i></a>';

        this.innerHTML = componentHtml;
    };

}

customElements.define('history-item', HistoryItem);