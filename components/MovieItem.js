class MovieItem extends HTMLElement {
    connectedCallback () {
        let  componentHtml = '<div class="image">' +
            '<img src="' + (this.getAttribute('poster') || '') + '"/>' +
            '</div>' +
            '<div class="content">' +
            '<div class="header">' + (this.getAttribute('name') || '') + '</div>' + 
            '<div class="meta">' + 
            '<a>' + (this.getAttribute('director') || '') + '</a>' +
            '</div>' +
            '<div class="description">' + (this.getAttribute('plot') || '') + '</div></div>' + 
            '<div class="extra content">' + 
            '<span class="right floated">' + 
            '<i class="heart outline like icon ' + this.getAttribute('id') + '"></i>' + 
            '</span></div>';

        this.setAttribute('class', 'card');
        this.innerHTML = componentHtml;
    };
  }

  customElements.define('movie-item', MovieItem);
