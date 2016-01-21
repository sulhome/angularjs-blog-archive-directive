(function () {
    'use strict';

    angular
        .module('demoModule')
        .controller('demoOnlyCtrl', demoOnlyCtrl);

    function demoOnlyCtrl() {
        var vm = this;

        vm.blogs = [];

        activate();

        function activate() {
            var nowDate = new Date();
            vm.blogs = [];
            for (var i = 1; i < 8; i++) {
                var blogDate = new Date();
                blogDate.setMonth(nowDate.getMonth() + (i * 2));
                var totalBlogs = Math.floor((Math.random() * 3) + 1);
                for (var j = 0; j < totalBlogs; j++) {
                    vm.blogs.push(
                        {
                            id: i + '_' + j,
                            title: "This is a test blog title for blog id " + i + '_' + j,
                            url: "http://www.sulhome.com",
                            dateCreated: blogDate
                        });
                }
            }
        }
    }
})();