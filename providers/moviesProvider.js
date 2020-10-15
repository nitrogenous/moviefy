(function (self) {
    const apiKey = '976d21e3';
    const baseUrl = 'http://www.omdbapi.com/?apikey=' + apiKey + '&t=';
    const selectors = {
        searchButton: '#search-button',
        inputField: '#input-field'
    };

    self.init = function () {
        self.bindActions();
    };

    self.bindActions = function () {
        $(selectors.searchButton).off('click').on('click', function () {
            var inputValue = encodeURI($(selectors.inputField).val());
            self.searchForMovie(inputValue);
        });

        $(document).off('click.remove').on('click.remove', '#message-item-close', function (event) {
            $('#message-item').remove();
        });
    };

    self.searchForMovie = function (movieName) {
        $.ajax({
            url: baseUrl + movieName.replace(/ /g, '+'),
            async: false,
            dataType: 'json',
            success: function (result) {
                if (!!result.Error) {
                    self.showErrorMessage(result.Error);
                    return;
                }
                self.createMovieCard(result);
            }
        });
    }

    self.showErrorMessage = function (messageText) {
        var messageHtml = '<message-item message="' + messageText + '" type="negative" />'

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

