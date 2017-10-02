function moneyController($scope,$http,$sce,$window){
    "use strict";
    $scope.uName = localStorage.getItem("uName");
    $scope.email = localStorage.getItem("email");
    $scope.showpage = "default";
    $scope.showpagefunc = function(obj){

        $scope.showpage = obj.target.attributes.showpage.value;
    };
    ///Only after Loggin
    // $scope.saved_articles
    if(($scope.uName != undefined) && ($scope.uName != "")) {
        // console.log($scope.uName);
        $http.post('/api/getProfile', {emailId: $scope.uName }).success(function (res) {

            $scope.saved_articles = res[0];
        });
        // $scope.profile
        $http.post('/api/getUserProfile', {username: $scope.uName}).success(function (res) {
            $scope.profile = res.local;
        });


        $scope.deleteSavedArticlesfunc = function (index) {
            // console.log("Clicked..........");
            // console.log(index);
            // console.log($scope.saved_articles.title[index].title);
            var id = $scope.saved_articles.title[index]._id;
            if (confirm("Confirm Deletion")) {
                $scope.saved_articles.title.splice(index, 1);
                $.post("/api/deleteProfile", {emailId: $scope.uName, id: id})
                    .done(function (data) {
                        console.log("Deleted: " + data);
                    });
            }
        }
    }


    $scope.searchParam = ""
    $scope.emailArticleToFriend = function(event){
        var str = event.target.id.split("_")[1];
        if(str <= 2){
            $scope.emailArticle = $scope.articleFeatured[str-1];
        } else {
            console.log($scope.article[str-3])
            $scope.emailArticle = $scope.article[str-3];
        }
        console.log($scope.emailArticle)
        /*$http.post('/send',{articleTitle : profile.iframeLink}).success(function(res){
         console.log("email sent")

         });*/
    }

    $scope.sendMail = function(){
        if($scope.senderEmail == ""){
            //error handling block (print err msg in #mailer)
        } else {
            console.log($scope.recieverEmail)
            $http.post('/send',{emailArticle : $scope.emailArticle,receiver : $scope.recieverEmail,sender : localStorage.getItem("uName")}).success(function(res){
                console.log(res)
            });
        }
    }
    // email the resources
    $scope.emailArticlesToFriend = function(event){
        var str = event.target.id.split("_")[1];
        console.log($scope.resources);
        $scope.emailArticle = { };
        $scope.emailArticle = {title:" "};
        $scope.emailArticle.title = $scope.resources[str-1].webUrl;
        console.log($scope.emailArticle.title)
    }

    //contact mail
    $scope.contactMail = function(){
        /*alert("email");
         alert($scope.email);*/
        if($scope.subject == ""){

            //error handling block (print err msg in #mailer)
        }
        else if($scope.subject == "General Customer Service"){
            console.log($scope.subject)
            $http.post('/send1',{subject : $scope.subject,email:$scope.email,message:$scope.message,name:$scope.name,sender : localStorage.getItem("uName")}).success(function(res){
                alert(console.log(res));
            });
        }
        else if($scope.subject == "suggestions"){
            console.log($scope.subject)
            $http.post('/send1',{subject : $scope.subject,email:$scope.email,message:$scope.message,name:$scope.name,sender : localStorage.getItem("uName")}).success(function(res){
                alert(console.log(res));
            });
        }
        else {
            console.log($scope.subject)
            $http.post('/send1',{subject : $scope.subject,email:$scope.email,message:$scope.message,name:$scope.name,sender : localStorage.getItem("uName")}).success(function(res){
                alert(console.log(res));
            });
        }
        $scope.email=" ";
        $scope.subject=" ";
        $scope.name=" ";
        $scope.message=" ";
        var test = new cAlert("You query has been successfully sent.<p> We will get back to you as early as possible", "success",20);
        test.alert();
    }
    $scope.getUserProfile = function(){
        $http.post('/api/getProfile',{emailId : $window.localStorage.getItem("uName")}).success(function(res){
            $scope.loginProfile = res;
            console.log("*****************************************");
            console.log(res);
            console.log("*****************************************");
        });
    }
    $scope.setSearch = function(param){
        $scope.searchParam = param;
    }

    $scope.searchArticle = function(className) {
        var searchKey = document.getElementsByClassName(className)[0].value;
        //alert(searchKey)
        if($scope.searchParam == "" || $scope.searchParam == "Articles"){

            $http.post("/searchSample", {name: searchKey }).success(function(res) {
                if(res.data.length > 0){
                    var uniqueNames = [];
                    $.each(res.data, function(i, el){
                        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
                    });
                    res.data = uniqueNames;
                    $(".searchHide").hide();
                    $("#articleLoadMore").hide();
                    $("#news-section").css("display","block");
                    if($scope.searchParam == ""){
                        $("#sub_resources").css("display","block");
                    } else {
                        $("#sub_resources").css("display","none");
                    }
                    for(var i=0;i<res.data.length;i++){
                        res.data[i].indexTopic = res.data[i].topicName;
                    }
                    $scope.totalRes = res.data;

                    $scope.article = $scope.totalRes.splice(0,res.data.length);
                    for(var i=0;i<res.data.length;i++){
                        url = $scope.article[i].iframeLink;
                        $scope.article[i].iframeLink = $sce.trustAsResourceUrl(url);
                        $scope.article[i].indexTopic = res.data[i].topicName;
                    }

                    console.log($scope.article)
                } else {
                    //print error message that data is not found
                    //$scope.err = res.errMsg;
                    try{
                        var test = new cAlert("No search results found for articles!", "success",3);
                        test.alert();
                    }catch(e){
                        console.log(e)
                    }
                }
            });
        } else {
            var data = [];
            $scope.resources = $scope.resourcesBackup;
            $scope.resources.filter(function(el) {
                var categories = el.category.split(",");
                for(var i=0;i<categories.length;i++){
                    categories[i] = categories[i].trim();
                    //alert(el.type.split("/")[1] +" "+  $scope.searchParam.toLowerCase()+".png");
                    if(searchKey.trim() == categories[i].trim() && el.type.split("/")[1] == $scope.searchParam.toLowerCase()+".png"){
                        data.push(el)
                    }
                }
            });
            console.log(data);
            if(data.length > 0){
                $("#sub_resources").css("display","block");
                $("#news-section").css("display","none");
                console.log($scope.resources)
                $scope.resources = data;
            } else {
                try{
                    var test = new cAlert("No search results found for resources!", "success",3);
                    test.alert();
                }catch(e){
                    console.log(e)
                }
            }

        }

    }
    var setData = function(res){
        var url = "";
        if(!localStorage.getItem("fromEmailArticle") || localStorage.getItem("fromEmailArticle") == ""){
            res = res.sort(function(a, b) {
                return b.rank - a.rank;
            });
            var tempRes;
            for(var i=0;i<10;i++){
                console.log(res[i].daysInLead)
                if(res[i].daysInLead >= 5){
                    console.log(res[i])
                    tempRes = res.splice(i,1);
                    console.log(res[i])
                    console.log(tempRes)
                    //console.log(res)
                    res.push(tempRes[0])
                    console.log(res)
                }
            }
        }
        $scope.backUp = res;
        $scope.totalRes = res;
        ($scope.totalRes.length > 11 ? "" : $scope.hideShowMore = !$scope.hideShowMore);
        $scope.articleFeatured = $scope.totalRes.splice(0,3);
        $scope.article = $scope.totalRes.splice(0,8);
        /*for(var i=0;i<8;i++){
         url = $scope.article[i].iframeLink;
         $scope.article[i].iframeLink = $sce.trustAsResourceUrl(url);
         $scope.article[i].iframeLinkTemp = $scope.article[i].iframeLink
         }*/
        $(".sidebar_icons").show();
    }
    $scope.logOutProfile = function(){
        //alert("sdfsdjfn");
        localStorage.setItem("uName", "");
        $window.location.href = "/logout";
    }

    var checkDuplicateObj = function() {
        console.log($scope.loginProfile[0].title.length);
        console.log("--");
        console.log($scope.loginProfile[0].title[0].title);
        console.log("--");
        console.log($scope.profiles.title);
        for (i = 0; i < $scope.loginProfile[0].title.length; i++) {
            if ($scope.loginProfile[0].title[i].title === $scope.profiles.title) {
                return true;
            }
        }
        return false;
    }

    $scope.addme = function(event){
        var test = new cAlert("Article has been added to your profile", "success",20);
        test.alert();
        //var self1 = $selff
        $scope.profiles={};
        event.preventDefault();
        //alert(event.target.id);
        if(event.target.id <= 2){
            var profile = $scope.articleFeatured[event.target.id-1];
        } else {
            var profile = $scope.article[event.target.id-3];
        }

        console.log(profile);
        $scope.profiles = profile;
        //profile=$scope.profiles;
        //compare and see if selected article is present in $scope.loginProfile
        //if its there, dont do anything, else add to existing list
        console.log("$scope.loginProfile ============")
        console.log($scope.loginProfile)
        if($scope.loginProfile.length > 0){
            //check if duplicates are there
            //alert("hi")
            var boolVal = checkDuplicateObj();
            if(!boolVal){
                console.log("new article is being appended to collection")
                $scope.loginProfile[0].title.push($scope.profiles);
                var newObj = $scope.loginProfile;
                //$scope.loginProfile = newObj;

                console.log(newObj);
            } else {
                console.log("duplicate found!!!!!!!!!!")
                return;
            }
        } else {
            var newObj = [{
                emailId:$window.localStorage.getItem("uName"),
                title:[$scope.profiles]
            }];
            $scope.loginProfile = newObj;
        }
        console.log(newObj);
        $http.post('/api/profile',{newObj}).success(function(res){
            console.log("pushing new article to db - profile collection");
            var result = res;
        });
    }
    //var getgoogleDrive = function(){
//		$http.get('/googleDrive')
    //      .success(function(data) {
    //          console.log(data);
    //      });
//	}
    $scope.getCustomizedArticles = function(){
        if($(".selected-topics .tag").text().length > 0){
            var selectedStr=$(".selected-topics .tag").text().substr(1);
            selectedStr = selectedStr.replace(/x  /g,',');
            var test = new cAlert("Your customized values are save.", "success",20);
            test.alert();
            localStorage.setItem("articleTopics",selectedStr)
            getFeaturedArticles($scope);
        } else{
            var test = new cAlert("No Articles selected.", "danger",20);
            test.alert();
        }
    }
    $scope.resetCustomized = function(){
        localStorage.setItem("articleTopics","");
        var test = new cAlert("Your topic selection has been cleared.", "danger",20);
        test.alert();
        getFeaturedArticles($scope);
    }

    var getFeaturedArticles = function($scope){


        $scope.func = function(){

            if(!localStorage.getItem("uName") || localStorage.getItem("uName") == ""){
                $("#login").css('display','block')

            } else {
                $scope.getUserProfile();
                $("#loggedin").css('display','block')
            }
            //if(!localStorage.getItem("fromEmailArticle") || localStorage.getItem("fromEmailArticle") == ""){
            var articleTopics = localStorage.getItem("articleTopics");
            console.log(articleTopics);
            if(articleTopics){
                $http.post("/article/chosenTopics", {articleTopics : localStorage.getItem("articleTopics") }).success(function(res) {
                    console.log(res);
                    for(var i=0;i<res.length;i++){
                        res[i].indexTopic = res[i].topicName;
                    }
                    if(localStorage.getItem("fromEmailArticle") && localStorage.getItem("fromEmailArticle") != ""){
                        var searchKey = $('<textarea />').html(localStorage.getItem("fromEmailArticle")).text();
                        $http.post("/searchArticle", {name: searchKey }).success(function(result) {
                            console.log(result)
                            if(result.data.length > 0){
                                result.data[0].indexTopic = result.data[0].topicName;
                                johnRemoved = res.filter(function(el) {
                                    return el.title !== result.data[0].title;
                                });
                                johnRemoved.unshift(result.data[0])
                                setData(johnRemoved);
                                localStorage.setItem("fromEmailArticle","")
                            }
                        })
                    } else {
                        if(res.length > 0){
                            setData(res);
                        } else {
                            try{
                                var test = new cAlert("There are no articles for your chosen topic!", "success",3);
                                test.alert();
                            }catch(e){
                                console.log(e)
                            }
                        }
                    }
                });
            } else {
                $http.get("/article/featured").success(function(res){
                    if(localStorage.getItem("fromEmailArticle") && localStorage.getItem("fromEmailArticle") != ""){
                        var featuredData = res;
                        console.log(featuredData)
                        var searchKey = $('<textarea />').html(localStorage.getItem("fromEmailArticle")).text();
                        console.log(searchKey)
                        $http.post("/searchArticle", {name: searchKey }).success(function(res) {
                            console.log(res.data.length)
                            if(res.data.length > 0){
                                res.data[0].indexTopic = (res.data[0].topicName ?  res.data[0].topicName : res.data[0].indexTopic);
                                console.log(res.data)
                                johnRemoved = featuredData.filter(function(el) {
                                    return el.title !== res.data[0].title;
                                });
                                johnRemoved.unshift(res.data[0])
                                setData(johnRemoved);
                                localStorage.setItem("fromEmailArticle","")
                            }
                        })
                    } else {
                        console.log("inside featured");
                        console.log(res);
                        setData(res);
                    }
                });
            }
            /*}  else {
             $http.get("/article/featured").success(function(res){
             var featuredData = res;
             console.log(featuredData)
             var searchKey = $('<textarea />').html(localStorage.getItem("fromEmailArticle")).text();
             $http.post("/searchArticle", {name: searchKey }).success(function(res) {
             console.log(res)
             if(res.data.length > 0){
             res.data[0].indexTopic = res.data[0].topicName;
             johnRemoved = featuredData.filter(function(el) {
             return el.title !== res.data[0].title;
             });
             johnRemoved.unshift(res.data[0])
             setData(johnRemoved);
             localStorage.setItem("fromEmailArticle","")
             }
             })
             });

             } */


        }
        $scope.func();
    }

    $scope.sortByDate = function(){
        console.log(res);
        var res = $scope.article.concat($scope.articleFeatured);
        res.sort(function(a,b){
            var aa = new Date(a.date);
            aa = (aa == "Invalid Date" ? 0 : aa);
            console.log(aa);
            var bb = new Date(b.date);
            bb = (bb == "Invalid Date" ? 0 : bb);
            console.log(bb);
            return bb - aa;
        });
        $scope.articleFeatured = res.splice(0,2);
        $scope.article = res.splice(0,8);
    }

    getFeaturedArticles($scope);


    //getgoogleDrive();
    $scope.loadMore = function(){
        //var arr = $scope.totalRes.splice(0,9);
        var arr = ($scope.totalRes.length >= 8 ? $scope.totalRes.splice(0,8) : $scope.totalRes.splice(0,$scope.totalRes.length));
        console.log($scope.totalRes.length);
        for(var i=0;i < arr.length;i++){
            $scope.article.push(arr[i]);
        }
        ($scope.totalRes.length == 0 ? $scope.hideShowMore = !$scope.hideShowMore : "");
    }
    $scope.formData = {};

    $http.get('/resources.json').success(function (data){
        $scope.resources = data;
        $scope.resourcesBackup = $scope.resources;
    });
    console.log($scope.resources);

    // when landing on the page, get all todos and show them
    $http.get("/api/todos")
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post("/api/todos", $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.createFinance = function() {
        $http.post("/api/finance", $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

/*    $(function() {
        $('#nav1 li a').click(function() {
            $('#nav1 li a').removeClass('active');
            $(this).addClass('active');
        });
    });*/
}

var features = {
    'Upload Resource':{'Description':"Upload Resources",'Button':'Upload' +
    ' Resource'},

    'Request Specialist':{'Description':"Request Specialist",'Button':'Request'},

    'Other Instructor Materials':{'Description':"Find What Other" +
    " Instructors are Doing",'Button':'Find'},

    'Find Funding Organizations':{'Description':'Find Funding Organizations','Button':'Find Donors'},

    'Raise Funds':{'Description':'Set up gofundme','Button':'Set up'},

    'Offer Human Capital':{'Description':'Offer Human Capital','Button':'Find Educators'},

    'Offer Funds to Educators':{'Description':'Offer funds to Educators','Button':'Find Educators'},

    'Access Resources':{'Description':'Access Resources','Button':'Find' +
    ' Resource'}
};

function dashboardController($scope,$compile){
    //"use strict";
    //$scope.createCard('Upload Resource');
}

function createCard(featureName) {

    var html =  "<h3 class='card-title'>"+featureName +"</h3> " +
        "<p class='card-text'>"+features[featureName].Description+"</p>"+
        "<a href='#' class='btn btn-primary'>"+features[featureName].Button+"</a>";
    //var compiledElement = $compile(html)($scope);
    var target = document.getElementById('card');
    $(target).empty();
    $(target).append(html);
    //angular.element(target).append(compiledElement);

    $('#nav1 li a').click(function() {
        $('#nav1 li a').removeClass('active');
        $(this).addClass('active');
    });
}

createCard("Access Resources");

/*$(function() {
    $('#nav1 li a').click(function() {
        $('#nav1 li a').removeClass('active');
        $(this).addClass('active');
    });
});*/

function logOutProfile(){
    localStorage.setItem("uName", "");
    window.location = "/logout";
}