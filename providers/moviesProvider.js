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
        $(selectors.searchButton).off('click').on('click', function () {
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
            success: function (result) {
                if (!!result.Error) {
                    self.showMessage(result.Error, 'negative', 'message-item');
                    return;
                }
                self.createMovieCard(result);
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
        var cardHtml = '<movie-item poster="' + movieDetails.Poster + '" name="' + movieDetails.Title + '" director="'+movieDetails.Director+'" plot="'+movieDetails.Plot+'" />'
        
        $('#movies-showcase').prepend(cardHtml);
    };

    $('body').ready(function () {
        self.init();
    });
}({}))

