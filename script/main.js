window.onload = function () {
    window.vm = new Vue({
        el: "#box",
        data: {
            typeText: '',
            myData: [],
            now: -1,
            inSearchArea: false
        },
        
        methods: {
            freshInput: function(index) {
                if (index >= 0 && index < this.myData.length) {
                    this.typeText = this.myData[index];
                    console.log(this.typeText);
                }
            },
            showSearch: function () {
                if (this.inSearchArea) {
                    return true;
                }
                return false;
            },
            closeSearch: function () {
                this.inSearchArea = false;
            },
            openSearch: function () {
                this.inSearchArea = true;
            },
            get: function (ev) {
                if (ev.keyCode === 38 || ev.keyCode === 40) {
                    return;
                }
                if (ev.keyCode === 13 && this.typeText !== '') {
                    window.open('https://www.baidu.com/s?wd=' + this.typeText);
                    this.typeText = '';
                    return;
                }
                this.inSearchArea = true;
                this.$http.jsonp("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su", {
                    params: {
                        wd: this.typeText
                    },
                    jsonp: 'cb'
                }).then(function (res) {
                    this.myData = res.data.s;
                }, function (res) {
                    this.myData = res.data.status;
                });
            },
            changeDown: function () {
                this.now++;
                if (this.now === this.myData.length) {
                    this.now = -1;
                }
                console.log(this.now);
                this.typeText = this.myData[this.now];
            },
            changeUp: function () {
                this.now--;
                if (this.now === -2) {
                    this.now = this.myData.length - 1;
                }
                console.log(this.now);

                this.typeText = this.myData[this.now];
            }
        }
    });
}

document.querySelector(".wrapper").addEventListener("click", function(e){
    vm.$data.inSearchArea = false;
})