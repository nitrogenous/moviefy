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
       
        self.inputLenghtCheckAction();

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

    self.inputLenghtCheckAction = function () {
        $(selectors.search.input).off('input.search').on('input.search', function (event) {
            if (event.target.value.length >= 3) {
                $(selectors.search.button).removeClass('disabled');
            }
            else {
                $(selectors.search.button).addClass('disabled');
            }
        });
    }

    self.searchForMovie = function (movieName) {
        $.ajax({
            url: baseUrl + movieName.replace(/ /g, '+'),
            async: false,
            dataType: 'json',
            success: function (response) {
                if (!!response.Error) {
                    self.showMessage(response.Error, 'negative');

                    return;
                }

                self.saveToHistory(movieName);
                self.createMovieCard(response);
            }
        });
    }

    self.saveToHistory = function (movieName) {

    };

    self.showMessage = function (messageText, messageType) {
        var messageHtml = '<message-item id="message-item" message="' + messageText + '" type="' + messageType + '" />';

        $(selectors.message.item).remove()
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

            self.showMessage('Added to favorites!', 'positive');
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
