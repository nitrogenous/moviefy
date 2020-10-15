class MovieItem extends HTMLElement {
    connectedCallback () {
        let  componentHtml = 
            '<div class="image">' +
            '<img src="' + (this.getAttribute('poster') || '') + '"/>' +
            '</div>' +
            '<div class="content">' +
            '<div class="header">' + (this.getAttribute('name') || '') + '</div>' + 
            '<div class="meta">' + 
            '<a>' + (this.getAttribute('director') || '') + '</a>' +
            '</div>' +
            '<div class="description">' + (this.getAttribute('plot') || '') + '</div>';

        this.setAttribute('class', 'card');
        this.innerHTML = componentHtml;
    };
  }

  customElements.define('movie-item', MovieItem);