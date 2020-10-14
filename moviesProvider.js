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
    };

    self.searchForMovie = function (movieName) {
    
    }

    self.createMovieCard = function (movieDetails) {
       
    };

    $('body').ready(function () {
        self.init();
    });

}({}))

