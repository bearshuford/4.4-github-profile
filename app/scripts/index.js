   var $ = require('jQuery');
   var _ = require('underscore');
   var handlebars = require('handlebars');
   //var githubtoken = require('./gitapikey.js');


   // string literals
   var username = 'bearshuford';
   var url = 'https://api.github.com/users/';
   var repoDir = '/repos';
   var orgDir = '/orgs';

   var user; // user object;
   var repoList = [];



   var $username = $('#username');
   var $avatar   = $('img.avatar');


      function getUser(data){

         $('img.avatar').attr("src",data['avatar_url']);

         $('#fullname').text(data.name)
         $('#username').text(data.login);

         if(data.bio === undefined)
            $('.bio').remove();
         else  $('.bio p').text(data.bio);


         if(data.location === undefined)
            $('#loc-detail').remove();
         else $('#loc-detail .detail').text(data.location);

         if(data.email === undefined)
            $('#mail-detail').remove();
         else $('#mail-detail .detail a').text(data.email);

         if(data.blog === null)
            $('#link-detail').remove();
         else $('#link-detail .detail a').text(data.blog);

         $('#repo-count').text(data['public_repos']);
         $('#follower-count').text(data.followers);
         $('#following-count').text(data.following);
      }

      function getRepo(data){
         console.log(data);

         var template = handlebars.compile($("#repo-stamp").html());

         for(var i=0; i < data.length; i++){
            $('.repo-container').append(template( {
                  name:        data[i].name,
                  description: data[i].description,
                  language:    data[i].language,
                  homepage:    data[i].homepage,
                  stars:   data[i]['stargazers_count'],
                  forks:   data[i]['forks_count'],
                  url:     data[i]['html_url'],
                  updated: data[i]['updated_at']
               }
            ));
          }
}





   // if(githubtoken !== undefined){
   //   $.ajaxSetup({
   //     headers: {'Authorization': 'token ' + githubtoken.token}
   //   });
   // }

   $.ajax(url+username).then(getUser);
   $.ajax(url+username+repoDir).then(getRepo);
