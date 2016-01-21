(function () {
    'use strict';
    var underscore = angular.module('underscore', []);
    underscore.factory('_', function () {
        return window._;
    });

    var blogArchiveModule = angular.module('blogArchiveModule', ['underscore']);

    blogArchiveModule.directive('blogArchive', blogArchive);

    function blogArchive() {
        return {
            templateUrl: '/templates/blogArchive.tpl.html',
            scope: {
                blogs: '=blogs'
            },
            replace: true,
            controller: ['$scope', '_', function ($scope, _) {

                $scope.setupBlogs = function () {
                    var totalBlogsTemp = 0;
                    $scope.archive = [];
                    var years = _.groupBy($scope.blogs,
                        function (blog) {
                            return new Date(blog.dateCreated).getFullYear();
                        });
                    for (var year in years) {
                        $scope.archive.push(
                            {
                                yearName: year,
                                yearTotalBlogs: years[year].length,
                                months: getMonthGroup(years[year])
                            });
                        totalBlogsTemp += years[year].length;
                    }
                    $scope.archive.reverse();
                    $scope.totalBlogs = totalBlogsTemp;
                };

                var getMonthGroup = function (yearGroupBlogs) {
                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var monthsGroup = [];

                    var months = _.groupBy(yearGroupBlogs,
                        function (blog) {
                            return monthNames[new Date(blog.dateCreated).getMonth()];
                        });

                    for (var month in months) {
                        monthsGroup.push({ monthName: month, monthBlogs: months[month] });
                    }

                    return monthsGroup;
                };
                $scope.toggleDisplay = function (elementId) {
                    var element = document.getElementById(elementId);
                    var display = element.style.display;
                    element.style.display = display == "block" ? "none" : "block";
                };
            }
            ],
            link: function ($scope, element, attrs) {
                $scope.setupBlogs();
            }
        }
    }
})();