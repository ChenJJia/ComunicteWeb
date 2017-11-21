/**
 * 输入框点击效果
 * 输入框得到焦点，输入框的上方文字消失
 * 输入框失去焦点，判断输入内容是否为空，为空时上方文字显示 
 */
function searchBar() {
    var searchInput = document.getElementById('searchInput'),
        searchOption = document.getElementById('searchOption');
    searchInput.onfocus = function() {
        searchOption.style.display = 'none';
    }
    searchInput.onblur = function() {
        if (searchInput.value == '') {
            searchOption.style.display = 'block';
        }
    } 
}

/**
 * 轮播图实现方法
 * prev,next为左右切换按钮
 * list存放所有的图片
 */
function carousel() {
    var prev = document.getElementById('prev'),
        next = document.getElementById('next'),
        list = document.getElementById('list'),
        content = document.getElementById('content'),
        animited = false,
        time = 300,
        interval = 50,
        newleft = 1,
        speed = 1,
        timers;

    /**
     *执行动画的函数animite
     * offset为轮播图切换的距离
     * offset == 1200表示向左切换
     * offset == -1200表示向右切换
     */

    function animite(offset) {
        /**
         *newLeft为新的左边距,当前左边距+offset(要切换的距离)
         *speed为切换时的速度,是图片匀速切换,speed越大图片切换越快
         * animited表示一次只可以切换一张图片,如果当前图片没切换完,点击切换按钮无用
         * 防止用户一直点击左右切换按钮，图片一直切换
         */
        newleft = parseInt(list.style.left) + offset;
        speed = offset / (time / interval);
        animited = true;

        function go() {
            var num = parseInt(list.style.left);
            /**
             * 条件意思为(speed < 0)表示向右切换,(speed > 0)向左
             * (num > newleft)/(num < newleft)判断是否到达目标位置
             * setTimeout只执行一次,没有到达目标位置时继续使用定时器setTimeout(go, interval)
             * 
             * 图片到达位置之后，还会再执行一次else里面的内容
             * animited = false,点击按钮允许切换
             * 如果发现图片切换到(newleft > -1200) 等于newleft = 0存放的是最后一张图片,把它换到真正的位置上
             * 如果发现图片切换到(newleft < -3600 ) 等于newleft = -4800存放的是第一张图片,把它换到真正的位置上
             */
            if ((speed < 0 && num > newleft) || (speed > 0 && num < newleft)) {
                list.style.left = num + speed + 'px';
                setTimeout(go, interval);
            } else {
                animited = false;
                list.style.left = newleft + 'px';
                if (newleft > -1200) {
                    list.style.left = -3600 + 'px';
                }
                if (newleft < -3600) {
                    list.style.left = -1200 + 'px';
                }
            }
        }

        go();
    }
    /**js定时器，每隔七秒切换图片，
     *自动切换按钮
     */

    function play() {
        timers = setInterval(function() {
            prev.onclick();
        }, 7000);
    }

    /**
     * 鼠标移至清除定时器
     */
    function stop() {
        clearInterval(timers);
    }

    /**
     * 左右切换按钮
     */
    next.onclick = function() {
        if (!animited)
            animite(1200);
    }
    prev.onclick = function() {
        if (!animited)
            animite(-1200);
    }

    /**
     * 鼠标移至清除定时器
     * 鼠标移开开启定时器
     */
    content.onmouseout = play;
    content.onmouseover = stop;
    play();
}

/**
 * 轮播图下方的图片
 * 鼠标移至向上滑动
 * 鼠标移开还原
 */
function pathBanner() {
    $('#pathBanner').find('img').each(function() {
        var imageHover = this;
        $(imageHover).mouseover(function() {
            $(imageHover).animate({
                marginTop: "-5px"
            });
        });
        $(imageHover).mouseout(function() {
            $(imageHover).animate({
                marginTop: "0px"
            });
        });
    })
}

window.onload = function() {
    searchBar();
    carousel();
    pathBanner();
}