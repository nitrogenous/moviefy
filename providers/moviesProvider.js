(function (self) {
    const apiKey = '976d21e3';
    const baseUrl = 'http://www.omdbapi.com/?apikey=' + apiKey + '&t=';
    const selectors = {
        search: {
            input: '#input-field',
            button: '#search-button'
        },
        message: {
            item: '#message-item',
            button: '#message-item-close'
        },
        showcases: {
            movies: '#movies-showcase',
            favorites: '#favorites-showcase'
        },
        localstorage: {
            favoriteMovies: 'favorite-movies'
        }
    };

    self.init = function () {
        self.bindActions();
        self.getFavorites();
    };

    self.bindActions = function () {
        $(selectors.search.button).off('click.search').on('click.search', function () {
            var inputValue = encodeURI($(selectors.search.input).val());

            self.searchForMovie(inputValue);
        });

        $(document).off('click.closeMsg').on('click.closeMsg', selectors.message.button, function (event) {
            $(selectors.message.item).remove();
        });

        $(document).off('click.like').on('click.like', '.like.icon', function (event) {
            var movieCardSelector = '#' + $(event.target.offsetParent).attr('id')

            self.likeAction(movieCardSelector);
        });
    };

    self.searchForMovie = function (movieName) {
        $.ajax({
            url: baseUrl + movieName.replace(/ /g, '+'),
            async: false,
            dataType: 'json',
            success: function (response) {
                if (!!response.Error) {
                    self.showMessage(response.Error, 'negative', 'message-item');

                    return;
                }

                self.saveToHistory(movieName);
                self.createMovieCard(response);
            }
        });
    }

    self.saveToHistory = function (movieName) {
        
    };

    self.showMessage = function (messageText, messageType, messageId) {
        if ($('#' + messageId).length) {
            return;
        }

        var messageHtml = '<message-item elementId="' + messageId + '" message="' + messageText + '" type="' + messageType + '" />';

        $('body').prepend(messageHtml);
    };

    self.createMovieCard = function (movieDetails) {
        var isFavorite = $(selectors.showcases.favorites + ' #' + movieDetails.imdbID).length > 0;
        var cardHtml = '<movie-item id="' + movieDetails.imdbID + '" ' + (isFavorite && 'liked="true"') + ' poster="' + movieDetails.Poster + '" name="' + movieDetails.Title + '" director="'+movieDetails.Director+'" plot="'+movieDetails.Plot+'" />'
        
        $(selectors.showcases.movies + ' #' + movieDetails.imdbID).remove();
        $(selectors.showcases.movies).prepend(cardHtml);
    };

    self.getFavorites = function () {
        var favoriteMovies = localStorage.getItem(selectors.localstorage.favoriteMovies);

        $(selectors.showcases.favorites).html(favoriteMovies);
    };

    self.likeAction = function (cardSelector) {
        var movieCard = $(cardSelector);

        if (movieCard.attr('liked')) {
            movieCard.removeAttr('liked');
            $(selectors.showcases.favorites + ' ' + cardSelector).remove();
        }
        else {
            movieCard.attr('liked', true);
            $(selectors.showcases.favorites).prepend(movieCard[0].outerHTML);
        }

        self.updateFavorites();
    };

    self.updateFavorites = function () {
        var favoritesHtml = $(selectors.showcases.favorites).html();

        localStorage.setItem(selectors.localstorage.favoriteMovies, favoritesHtml);
    };

    $('body').ready(function () {
        self.init();
    });

}({}));
