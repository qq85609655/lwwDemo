/**
 * Created by pc on 2017/10/16.
 */
! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery", "Cus", "_"], b) : b(a.$ || a.jQuery, a.Cus)
}(this, function(a, b) {
    function d(b, c) {
        this.addstr = c ? "html" : "prepend", c = c || "body", this.opt = a.extend(!0, {}, defaultOpt, b || {}), this.el = a(c), this.elcot = c.innerHTML, this.dom = {};
        this.init()
    }
    var defaultOpt = {
        head: {
            logo: "images/head-logo.png",
            title: "北京",
            userText: "欢迎您，系统管理员",
            userTextID: "userTextBox",
            iconflex: "5",
            icon: [{
                icon: "fi fi-quit",
                title: "退出",
                onclick: function () {}
            }]
        },
        indexedDBOpt:{
            name:'demoDb',
            db:{}
        },
        gridster: null
    },
        k = b.checkIE,
        localStorageSupport = b.localStorageSupport;
    var m = d.prototype;
    return a.fn.extend(m, {
        init: function() {
            console.log('index init!!!')
            var opt = this.opt;
            var navOpt = opt.nav;
            b.indexedDbInit(opt.indexedDBOpt)
            var allHtml = '<!--左侧导航开始--><nav class="navbar-default navbar-static-side" role="navigation"><div class="nav-close"><i class="fa fa-times-circle"></i></div><div class="sidebar-collapse"><ul class="nav" id="side-menu"></ul></div></nav><!--左侧导航结束-->' +
                '<!--右侧部分开始--><div id="page-wrapper" class="gray-bg dashbard-1">' +
                '<div class="row border-bottom">' +
                '<nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">' +
                '<div class="navbar-header"><a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a><form role="search" class="navbar-form-custom" method="post" action="'+ navOpt.searchPage +'"><div class="form-group"><input type="text" placeholder="请输入您需要查找的内容 …" class="form-control" name="top-search" id="top-search"></div></form></div>' +
                '<ul class="nav navbar-top-links navbar-right"></ul>' +
                '</nav>' +
                '</div>' +
                '<div class="row content-tabs">' +
                '<button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i></button>' +
                '<nav class="page-tabs J_menuTabs"><div class="page-tabs-content"><a href="javascript:void(0);" class="active J_menuTab" data-id="'+ navOpt.firstPage +'">首页</a></div></nav>' +
                '<button class="roll-nav roll-right J_tabRight"><i class="fa fa-forward"></i></button>' +
                '<div class="btn-group roll-nav roll-right"><button class="dropdown J_tabClose" data-toggle="dropdown">关闭操作<span class="caret"></span></button><ul role="menu" class="dropdown-menu dropdown-menu-right"><li class="J_tabShowActive"><a>定位当前选项卡</a></li><li class="divider"></li><li class="J_tabCloseAll"><a>关闭全部选项卡</a></li><li class="J_tabCloseOther"><a>关闭其他选项卡</a></li></ul></div>' +
                '<a href="'+ navOpt.logoutPage +'" class="roll-nav roll-right J_tabExit"><i class="fa fa fa-sign-out"></i> 退出</a>' +
                '</div>' +
                '<div class="row J_mainContent" id="content-main">' +
                '<iframe class="J_iframe" name="iframe0" width="100%" height="100%" src="'+ navOpt.firstPage +'" frameborder="0" data-id="'+ navOpt.firstPage +'" seamless></iframe>' +
                '</div>' +
                '<div class="footer"><div class="pull-right">&copy; 2014-2017 <a href="http://www.zi-han.net/" target="_blank">lwwwwwwwwwwwwww</a></div></div>' +
                '</div><!--右侧部分结束-->';
            var g = this.el[this.addstr](allHtml);
            a.extend(this.dom, {
                cont: this.el,
                headLeftCont:g.find('ul#side-menu'),
                headTopCont:g.find('.navbar-static-top'),
                iframeCont:g.find('div#content-main')
            })
            this.pageNavInit().pageNav().contabsH();
        },
        pageNavInit:function () {
            var c = this,opt = this.opt,headOpt = opt.head,navOpt = opt.nav,d = c.dom,f = d.cont,hl = d.headLeftCont,ht = d.headTopCont,ic = d.iframeCont;
            var headMenu = headOpt.dropdownMenu,navMenu = navOpt.data;
            var hh = '<li class="nav-header"><div class="dropdown profile-element"><span><img alt="image" class="img-circle" src="'+ headOpt.userIcon +'" /></span><a href="javascript:void(0)"><span class="clear"><span class="block m-t-xs"><strong class="font-bold">'+ headOpt.userName +'</strong></span><span class="text-muted text-xs block">'+ headOpt.userType +'<b class="caret"></b></span></span></a></div><div class="logo-element">'+ headOpt.userSmall +'</div></li>',
                g = hl.append(hh)
                ,liH = '';
            function createNavLi(menuOpt,h) {
                var liH = h?h:'';
                a.each(menuOpt,function (index,c) {
                    var ci = c.icon,ct = c.title,cc = c.chirdren,cl = c.label,co = c.openOption,pid = c.pId;
                    liH += '<li>';
                    liH += '<a '+ (co?('class="J_menuItem" href="'+ co.url +'"'):('href="javascript:void(0)"')) +'>'+ (ci?('<i class="fa '+ ci +'"></i>'):'') +'<span class="nav-label">'+ ct +'</span>'+ (cl?('<span class="label label-warning pull-right">'+cl+'</span>'):(cc?'<span class="fa arrow"></span>':'')) +'</a>';
                    cc && (liH += '<ul class="nav nav-second-level">', liH = createNavLi(cc,liH),liH += '</ul>')
                    liH += '</li>';
                })
                return liH;
            }

            var head_a = g.find('a');
            headMenu && b.createDropdownMenu(head_a,headMenu);
            var navL = hl.append(createNavLi(navMenu,liH));
            return this
        },
        //首页布局 H+
        pageNav: function () {
            var c = this,d = c.dom,f = d.cont;
            function NavToggle() {
                $('.navbar-minimalize').trigger('click');
            }

            // 侧边栏高度
            function fix_height() {
                var heightWithoutNavbar = f.height() - 61;
                $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
            }

            // MetsiMenu
            $('#side-menu').metisMenu();

            // 打开右侧边栏
            $('.right-sidebar-toggle').click(function () {
                $('#right-sidebar').toggleClass('sidebar-open');
            });


            // Small todo handler
            $('.check-link').click(function () {
                var button = $(this).find('i');
                var label = $(this).next('span');
                button.toggleClass('fa-check-square').toggleClass('fa-square-o');
                label.toggleClass('todo-completed');
                return false;
            });

            // // 右侧边栏使用slimscroll
            $('.sidebar-container').slimScroll({
                height: '100%',
                railOpacity: 0.4,
                wheelStep: 10
            });
            // //固定左侧菜单栏slimScroll
            $(function () {
                $('.sidebar-collapse').slimScroll({
                    height: '100%',
                    railOpacity: 0.9,
                    alwaysVisible: false
                });
            });

            // 菜单切换
            $('.navbar-minimalize').click(function () {
                $("body").toggleClass("mini-navbar");
                c.SmoothlyMenu();
            });

            fix_height();

            $(window).bind("load resize click scroll", function () {
                if (!$("body").hasClass('body-small')) {
                    fix_height();
                }
            });

            //侧边栏滚动
            $(window).scroll(function () {
                if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
                    $('#right-sidebar').addClass('sidebar-top');
                } else {
                    $('#right-sidebar').removeClass('sidebar-top');
                }
            });

            $('.full-height-scroll').slimScroll({
                height: '100%'
            });

            $('#side-menu>li').click(function () {
                if ($('body').hasClass('mini-navbar')) {
                    NavToggle();
                }
            });
            $('#side-menu>li li a').click(function () {
                if ($(window).width() < 769) {
                    NavToggle();
                }
            });

            $('.nav-close').click(NavToggle);

            //ios浏览器兼容性处理
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                $('#content-main').css('overflow-y', 'auto');
            }

            $(window).bind("load resize", function () {
                if ($(this).width() < 769) {
                    $('body').addClass('mini-navbar');
                    $('.navbar-static-side').fadeIn();
                }
            });

            return this
        },
        SmoothlyMenu: function () {
            if (!$('body').hasClass('mini-navbar')) {
                $('#side-menu').hide();
                setTimeout(
                    function () {
                        $('#side-menu').fadeIn(500);
                    }, 100);
            } else if ($('body').hasClass('fixed-sidebar')) {
                $('#side-menu').hide();
                setTimeout(
                    function () {
                        $('#side-menu').fadeIn(500);
                    }, 300);
            } else {
                $('#side-menu').removeAttr('style');
            }
        },
        //主题设置 H+
        themeInit: function () {
            var c = this;
            // 顶部菜单固定
            $('#fixednavbar').click(function () {
                if ($('#fixednavbar').is(':checked')) {
                    $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
                    $("body").removeClass('boxed-layout');
                    $("body").addClass('fixed-nav');
                    $('#boxedlayout').prop('checked', false);

                    if (localStorageSupport) {
                        localStorage.setItem("boxedlayout", 'off');
                    }

                    if (localStorageSupport) {
                        localStorage.setItem("fixednavbar", 'on');
                    }
                } else {
                    $(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
                    $("body").removeClass('fixed-nav');

                    if (localStorageSupport) {
                        localStorage.setItem("fixednavbar", 'off');
                    }
                }
            });

            // 收起左侧菜单
            $('#collapsemenu').click(function () {
                if ($('#collapsemenu').is(':checked')) {
                    $("body").addClass('mini-navbar');
                    c.SmoothlyMenu();

                    if (localStorageSupport) {
                        localStorage.setItem("collapse_menu", 'on');
                    }

                } else {
                    $("body").removeClass('mini-navbar');
                    c.SmoothlyMenu();

                    if (localStorageSupport) {
                        localStorage.setItem("collapse_menu", 'off');
                    }
                }
            });

            // 固定宽度
            $('#boxedlayout').click(function () {
                if ($('#boxedlayout').is(':checked')) {
                    $("body").addClass('boxed-layout');
                    $('#fixednavbar').prop('checked', false);
                    $(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
                    $("body").removeClass('fixed-nav');
                    if (localStorageSupport) {
                        localStorage.setItem("fixednavbar", 'off');
                    }


                    if (localStorageSupport) {
                        localStorage.setItem("boxedlayout", 'on');
                    }
                } else {
                    $("body").removeClass('boxed-layout');

                    if (localStorageSupport) {
                        localStorage.setItem("boxedlayout", 'off');
                    }
                }
            });

            // 默认主题
            $('.s-skin-0').closest('div.setings-item').click(function () {
                $("body").removeClass("skin-1");
                $("body").removeClass("skin-2");
                $("body").removeClass("skin-3");
                return false;
            });

            // 蓝色主题
            $('.s-skin-1').closest('div.setings-item').click(function () {
                $("body").removeClass("skin-2");
                $("body").removeClass("skin-3");
                $("body").addClass("skin-1");
                return false;
            });

            // 黄色主题
            $('.s-skin-3').closest('div.setings-item').click(function () {
                $("body").removeClass("skin-1");
                $("body").removeClass("skin-2");
                $("body").addClass("skin-3");
                return false;
            });

            if (localStorageSupport) {
                var collapse = localStorage.getItem("collapse_menu");
                var fixednavbar = localStorage.getItem("fixednavbar");
                var boxedlayout = localStorage.getItem("boxedlayout");

                if (collapse == 'on') {
                    $('#collapsemenu').prop('checked', 'checked')
                }
                if (fixednavbar == 'on') {
                    $('#fixednavbar').prop('checked', 'checked')
                }
                if (boxedlayout == 'on') {
                    $('#boxedlayout').prop('checked', 'checked')
                }
            }

            if (localStorageSupport) {

                var collapse = localStorage.getItem("collapse_menu");
                var fixednavbar = localStorage.getItem("fixednavbar");
                var boxedlayout = localStorage.getItem("boxedlayout");

                var body = $('body');

                if (collapse == 'on') {
                    if (!body.hasClass('body-small')) {
                        body.addClass('mini-navbar');
                    }
                }

                if (fixednavbar == 'on') {
                    $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
                    body.addClass('fixed-nav');
                }

                if (boxedlayout == 'on') {
                    body.addClass('boxed-layout');
                }
            }

            return this
        },
        //contabs H+
        contabsH: function () {
            //计算元素集合的总宽度
            function calSumWidth(elements) {
                var width = 0;
                $(elements).each(function () {
                    width += $(this).outerWidth(true);
                });
                return width;
            }
            //滚动到指定选项卡
            function scrollToTab(element) {
                var marginLeftVal = calSumWidth($(element).prevAll()), marginRightVal = calSumWidth($(element).nextAll());
                // 可视区域非tab宽度
                var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
                //可视区域tab宽度
                var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
                //实际滚动宽度
                var scrollVal = 0;
                if ($(".page-tabs-content").outerWidth() < visibleWidth) {
                    scrollVal = 0;
                } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
                    if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
                        scrollVal = marginLeftVal;
                        var tabElement = element;
                        while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
                            scrollVal -= $(tabElement).prev().outerWidth();
                            tabElement = $(tabElement).prev();
                        }
                    }
                } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
                    scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
                }
                $('.page-tabs-content').animate({
                    marginLeft: 0 - scrollVal + 'px'
                }, "fast");
            }
            //查看左侧隐藏的选项卡
            function scrollTabLeft() {
                var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
                // 可视区域非tab宽度
                var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
                //可视区域tab宽度
                var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
                //实际滚动宽度
                var scrollVal = 0;
                if ($(".page-tabs-content").width() < visibleWidth) {
                    return false;
                } else {
                    var tabElement = $(".J_menuTab:first");
                    var offsetVal = 0;
                    while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {//找到离当前tab最近的元素
                        offsetVal += $(tabElement).outerWidth(true);
                        tabElement = $(tabElement).next();
                    }
                    offsetVal = 0;
                    if (calSumWidth($(tabElement).prevAll()) > visibleWidth) {
                        while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                            offsetVal += $(tabElement).outerWidth(true);
                            tabElement = $(tabElement).prev();
                        }
                        scrollVal = calSumWidth($(tabElement).prevAll());
                    }
                }
                $('.page-tabs-content').animate({
                    marginLeft: 0 - scrollVal + 'px'
                }, "fast");
            }
            //查看右侧隐藏的选项卡
            function scrollTabRight() {
                var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
                // 可视区域非tab宽度
                var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
                //可视区域tab宽度
                var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
                //实际滚动宽度
                var scrollVal = 0;
                if ($(".page-tabs-content").width() < visibleWidth) {
                    return false;
                } else {
                    var tabElement = $(".J_menuTab:first");
                    var offsetVal = 0;
                    while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {//找到离当前tab最近的元素
                        offsetVal += $(tabElement).outerWidth(true);
                        tabElement = $(tabElement).next();
                    }
                    offsetVal = 0;
                    while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                        offsetVal += $(tabElement).outerWidth(true);
                        tabElement = $(tabElement).next();
                    }
                    scrollVal = calSumWidth($(tabElement).prevAll());
                    if (scrollVal > 0) {
                        $('.page-tabs-content').animate({
                            marginLeft: 0 - scrollVal + 'px'
                        }, "fast");
                    }
                }
            }

            //通过遍历给菜单项加上data-index属性
            $(".J_menuItem").each(function (index) {
                if (!$(this).attr('data-index')) {
                    $(this).attr('data-index', index);
                }
            });

            function menuItem() {
                // 获取标识数据
                var dataUrl = $(this).attr('href'),
                    dataIndex = $(this).data('index'),
                    menuName = $.trim($(this).text()),
                    flag = true;
                if (dataUrl == undefined || $.trim(dataUrl).length == 0)return false;

                // 选项卡菜单已存在
                $('.J_menuTab').each(function () {
                    if ($(this).data('id') == dataUrl) {
                        if (!$(this).hasClass('active')) {
                            $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                            scrollToTab(this);
                            // 显示tab对应的内容区
                            $('.J_mainContent .J_iframe').each(function () {
                                if ($(this).data('id') == dataUrl) {
                                    $(this).show().siblings('.J_iframe').hide();
                                    return false;
                                }
                            });
                        }
                        flag = false;
                        return false;
                    }
                });

                // 选项卡菜单不存在
                if (flag) {
                    var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
                    $('.J_menuTab').removeClass('active');

                    // 添加选项卡对应的iframe
                    var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
                    $('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);

                    //显示loading提示
//            var loading = layer.load();
//
//            $('.J_mainContent iframe:visible').load(function () {
//                //iframe加载完成后隐藏loading提示
//                layer.close(loading);
//            });
                    // 添加选项卡
                    $('.J_menuTabs .page-tabs-content').append(str);
                    scrollToTab($('.J_menuTab.active'));
                }
                return false;
            }

            $('.J_menuItem').on('click', menuItem);

            // 关闭选项卡菜单
            function closeTab() {
                var closeTabId = $(this).parents('.J_menuTab').data('id');
                var currentWidth = $(this).parents('.J_menuTab').width();

                // 当前元素处于活动状态
                if ($(this).parents('.J_menuTab').hasClass('active')) {

                    // 当前元素后面有同辈元素，使后面的一个元素处于活动状态
                    if ($(this).parents('.J_menuTab').next('.J_menuTab').size()) {

                        var activeId = $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').data('id');
                        $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').addClass('active');

                        $('.J_mainContent .J_iframe').each(function () {
                            if ($(this).data('id') == activeId) {
                                $(this).show().siblings('.J_iframe').hide();
                                return false;
                            }
                        });

                        var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
                        if (marginLeftVal < 0) {
                            $('.page-tabs-content').animate({
                                marginLeft: (marginLeftVal + currentWidth) + 'px'
                            }, "fast");
                        }

                        //  移除当前选项卡
                        $(this).parents('.J_menuTab').remove();

                        // 移除tab对应的内容区
                        $('.J_mainContent .J_iframe').each(function () {
                            if ($(this).data('id') == closeTabId) {
                                $(this).remove();
                                return false;
                            }
                        });
                    }

                    // 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
                    if ($(this).parents('.J_menuTab').prev('.J_menuTab').size()) {
                        var activeId = $(this).parents('.J_menuTab').prev('.J_menuTab:last').data('id');
                        $(this).parents('.J_menuTab').prev('.J_menuTab:last').addClass('active');
                        $('.J_mainContent .J_iframe').each(function () {
                            if ($(this).data('id') == activeId) {
                                $(this).show().siblings('.J_iframe').hide();
                                return false;
                            }
                        });

                        //  移除当前选项卡
                        $(this).parents('.J_menuTab').remove();

                        // 移除tab对应的内容区
                        $('.J_mainContent .J_iframe').each(function () {
                            if ($(this).data('id') == closeTabId) {
                                $(this).remove();
                                return false;
                            }
                        });
                    }
                }
                // 当前元素不处于活动状态
                else {
                    //  移除当前选项卡
                    $(this).parents('.J_menuTab').remove();

                    // 移除相应tab对应的内容区
                    $('.J_mainContent .J_iframe').each(function () {
                        if ($(this).data('id') == closeTabId) {
                            $(this).remove();
                            return false;
                        }
                    });
                    scrollToTab($('.J_menuTab.active'));
                }
                return false;
            }

            $('.J_menuTabs').on('click', '.J_menuTab i', closeTab);

            //关闭其他选项卡
            function closeOtherTabs(){
                $('.page-tabs-content').children("[data-id]").not(":first").not(".active").each(function () {
                    $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
                    $(this).remove();
                });
                $('.page-tabs-content').css("margin-left", "0");
            }
            $('.J_tabCloseOther').on('click', closeOtherTabs);

            //滚动到已激活的选项卡
            function showActiveTab(){
                scrollToTab($('.J_menuTab.active'));
            }
            $('.J_tabShowActive').on('click', showActiveTab);

            // 点击选项卡菜单
            function activeTab() {
                if (!$(this).hasClass('active')) {
                    var currentId = $(this).data('id');
                    // 显示tab对应的内容区
                    $('.J_mainContent .J_iframe').each(function () {
                        if ($(this).data('id') == currentId) {
                            $(this).show().siblings('.J_iframe').hide();
                            return false;
                        }
                    });
                    $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                    scrollToTab(this);
                }
            }
            $('.J_menuTabs').on('click', '.J_menuTab', activeTab);

            //刷新iframe
            function refreshTab() {
                var target = $('.J_iframe[data-id="' + $(this).data('id') + '"]');
                var url = target.attr('src');
//        //显示loading提示
//        var loading = layer.load();
//        target.attr('src', url).load(function () {
//            //关闭loading提示
//            layer.close(loading);
//        });
            }
            $('.J_menuTabs').on('dblclick', '.J_menuTab', refreshTab);

            // 左移按扭
            $('.J_tabLeft').on('click', scrollTabLeft);

            // 右移按扭
            $('.J_tabRight').on('click', scrollTabRight);

            // 关闭全部
            $('.J_tabCloseAll').on('click', function () {
                $('.page-tabs-content').children("[data-id]").not(":first").each(function () {
                    $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
                    $(this).remove();
                });
                $('.page-tabs-content').children("[data-id]:first").each(function () {
                    $('.J_iframe[data-id="' + $(this).data('id') + '"]').show();
                    $(this).addClass("active");
                });
                $('.page-tabs-content').css("margin-left", "0");
            });

            return this
        }
    }), a.renderIndex = function(a, b) {
        return new d(a, b)
    }, a.fn.renderIndex = function(b) {
        return this.each(function() {
            a(this).data("renderIndex") || a(this).data("renderIndex", a.renderIndex(b, this))
        })
    }, d
});
