class HistoryItem extends HTMLElement {
    connectedCallback () {
        var componentHtml = '<a class="ui label" id="historyItem">' +
            decodeURI(this.getAttribute('movieName')) + 
            '<i class="icon close"></i></a>';

        this.innerHTML = componentHtml;
    };

}

customElements.define('history-item', HistoryItem);