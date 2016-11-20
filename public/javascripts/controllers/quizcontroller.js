/**
 * Created by y1275963 on 11/14/16.
 */

app.controller('QuizCtrl', [
    '$scope','$http',
    function($scope,$http){
        $http.get('/test_http')
            .success(function (data) {
                console.log(data);
                $scope.questions = [
                    {"questionText": data['question'], "answers": [
                        {"answerText":data['answer'][0]['answer'], "correct": true},
                        {"answerText":data['answer'][1]['options'], "correct": false},
                        {"answerText":data['answer'][2]['options'], "correct": false},
                        {"answerText":data['answer'][3]['options'], "correct": false}
                    ]}
                ];
            })
            .error(function (data) {
                console.log('Error:'+data);
            });

        // $scope.questions = [
        //     {"questionText": "Why is the sky blue?", "answers": [
        //         {"answerText":"blah blah 1", "correct": true},
        //         {"answerText":"blah blah 2", "correct": false},
        //         {"answerText":"blah blah 3", "correct": false}
        //     ]}
        // ];
        $scope.answers ={};
        $scope.correctCount = 0;

        $scope.showResult = function(){
            $scope.correctCount = 0;
            var qLength = $scope.questions.length;
            for(var i=0;i<qLength;i++){
                var answers = $scope.questions[i].answers;
                $scope.questions[i].userAnswerCorrect = false;
                $scope.questions[i].userAnswer = $scope.answers[i];
                for(var j=0;j<answers.length;j++){
                    answers[j].selected = "donno";
                    if ($scope.questions[i].userAnswer === answers[j].answerText && answers[j].correct===true){
                        $scope.questions[i].userAnswerCorrect = true;
                        answers[j].selected = "true";
                        $scope.correctCount++;
                    }else if($scope.questions[i].userAnswer === answers[j].answerText && answers[j].correct===false){
                        answers[j].selected = "false";
                    }
                }
            }
        };
    }
]);

angular.module('quiz.service', []);
angular.module('quiz.directive', []);
angular.module('quiz.filter', []);

angular.module('quiz', ['quiz.service','quiz.directive','quiz.filter']);