angular.module("lorumCanadiumApp", [])
    .filter('capitalize', function() {
        return function(input, scope) {
            if (input !== null)
            return input.substring(0,1).toUpperCase()+input.substring(1);
        };
    })
    .directive("lorumCanadium", function () {
        return {
            restrict: "E",
            replace: true,
            scope: {},
            templateUrl: "templates/canadianisms.html",
            controller: function ($scope, $http){
                $scope.data = {};
                $scope.numberOfParagraphs = 1;
                $scope.paragraphs = [];
                $scope.punctuation = [".", ",", "!", "?"];
                $scope.title = "";

                $http.get("/api/canadianisms.json")
                    .success(function(data) {
                        $scope.data = data;
                    })
                    .error(function(err) {
                        console.log(err);
                    });

                $scope.generateTitle = function () {
                    var title = "Lorum";
                    var titleLength = Math.floor(Math.random() * 5 + 2);
                    for (var x = 0; x < titleLength; x++) {
                        var word = Math.floor(Math.random() * ($scope.data.words.length -1));
                        title += " " +$scope.data.words[word];
                    }
                    return title;
                };

                $scope.generateParagraph = function () {

                    var paragraph = "";
                    var sentancesNumber = Math.floor(Math.random() * (7 - 3) + 3);

                    for (var n = 0; n < sentancesNumber; n++) {
                        var sentance = "";
                        var sentanceLength = Math.floor(Math.random() * (15 - 7) + 7);
                        for (var i = 0; i < sentanceLength; i++) {
                            var word = Math.floor(Math.random() * ($scope.data.words.length -1));
                            sentance += " " + $scope.data.words[word];
                        }
                        paragraph += sentance;
                        paragraph += $scope.punctuation[
                            Math.floor(Math.random() * ($scope.punctuation.length -1))
                        ];
                    }
                    return paragraph.trim();
                };

                $scope.getParagraphs = function() {
                    $scope.paragraphs = [];
                    $scope.title = $scope.generateTitle();
                    for (var x = 0; x < $scope.numberOfParagraphs; x++) {
                        $scope.paragraphs.push($scope.generateParagraph());
                    }
                };
            }
        };
    });
