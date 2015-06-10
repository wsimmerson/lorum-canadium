angular.module("loremCanadiumApp", [])
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
                $scope.language = "english";

                $scope.getEnglishData = function () {
                    return $http.get("/api/canadianisms-english.json");
                };

                $scope.getFrenchData = function () {
                    return $http.get("/api/canadianisms-french.json");
                };

                $scope.generateTitle = function () {

                    var title = $scope.generateSentence();
                    title = title.split(" ");
                    if (title.length > 6) {
                        title = title.slice(0,6);
                    }
                    return title.join(' ') + ", eh?";
                };

                $scope.generateSentence = function () {

                    var capitalize = function(sen) {
                        return sen.substring(0,1).toUpperCase() + sen.substring(1);
                    };

                    var sentance = "";

                    var template = $scope.data.templates[
                        Math.floor(Math.random() * ($scope.data.templates.length -1) +1)
                    ];
                    template = template.split(' ');

                    for (var i = 0; i < template.length; i++) {
                            sentance += " " + template[i].replace(
                                "temp",
                                $scope.data.words[Math.floor(Math.random() * ($scope.data.words.length -1) +1 )]
                            );
                    }
                    sentance = sentance.replace("undefined", "");
                    return " " + capitalize(sentance.trim());
                };

                $scope.generateParagraph = function () {


                    var paragraph = "";
                    var sentancesNumber = Math.floor(Math.random() * (6 - 3) + 3);

                    for (var n = 0; n < sentancesNumber; n++) {

                        paragraph += $scope.generateSentence();
                    }

                    return paragraph.trim();
                };

                $scope.getParagraphs = function() {
                    $scope.paragraphs = [];
                    function genAll() {
                        $scope.title = $scope.generateTitle();
                        for (var x = 0; x < $scope.numberOfParagraphs; x++) {
                            $scope.paragraphs.push($scope.generateParagraph());
                        }
                    }
                    if ($scope.language === "english") {
                        $scope.getEnglishData()
                            .then(function (data) {
                                $scope.data = data.data;
                                genAll();
                           });
                    }
                    else {
                        $scope.getFrenchData()
                            .then(function (data) {
                                $scope.data = data.data;
                                genAll();
                           });
                    }

                };

                $scope.getParagraphs();


            }
        };
    });
