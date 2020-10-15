(function (self) {
    const apiKey = '976d21e3';
    const baseUrl = 'http://www.omdbapi.com/?apikey=' + apiKey + '&t=';
    const selectors = {
        searchButton: '#search-button',
        inputField: '#input-field',
        messageItem: '#message-item',
        messageItemClose: '#message-item-close'
    };

    self.init = function () {
        self.bindActions();
    };

    self.bindActions = function () {
        $(selectors.searchButton).off('click.search').on('click.search', function () {
            var inputValue = encodeURI($(selectors.inputField).val());
            self.searchForMovie(inputValue);
        });

        $(document).off('click.remove').on('click.remove', selectors.messageItemClose, function (event) {
            $(selectors.messageItem).remove();
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

                self.createMovieCard(response);
            }
        });
    }

    self.showMessage = function (messageText, messageType, messageId) {
        if ($('#' + messageId).length) {
            return;
        }

        var messageHtml = '<message-item elementId="' + messageId + '" message="' + messageText + '" type="' + messageType + '" />';

        $('body').prepend(messageHtml);
    };

    self.createMovieCard = function (movieDetails) {
        var cardHtml = '<movie-item  id="' + movieDetails.imdbID + '" poster="' + movieDetails.Poster + '" name="' + movieDetails.Title + '" director="'+movieDetails.Director+'" plot="'+movieDetails.Plot+'" />'
        
        $('#movies-showcase').prepend(cardHtml);

        self.bindLikeAction(movieDetails.imdbID, cardHtml);
    };

    self.bindLikeAction = function (movieId, movieCard) {
        $(document).off('click.like').on('click.like', '.like.icon.' + movieId ,function () {
            if (!$('.like.icon.' + movieId).hasClass('red')) {
                $('#favorites-showcase').prepend(movieCard);
                $('.like.icon.' + movieId).addClass('red');
            }
            else {
                $('#favorites-showcase #' + movieId).remove();
                $('#movies-showcase .like.icon.' + movieId).removeClass('red');
            }
        });
    };

    $('body').ready(function () {
        self.init();
    });
}({}))

