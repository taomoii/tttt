// ========= 燈箱 ==============================================================================================================================
Vue.component("modal", {
    props: ["canClose"],
    data: function () {
        return {
            toggle: false,
            isFixedHeight: false,
        };
    },
    template: ` <transition name="modal">
					<div class="modal" v-if="toggle">
						<div class="modal-bg" @click="closeModal()" v-if="canClose == true"></div>
						<div class="modal-bg" v-if="canClose == false"></div>
						<div class="modal-container" :class="{fixedHeight: isFixedHeight}" ref="modalContainer" id="modalContainer">
							<div class="modal-close closeBtn" @click="closeModal()" v-if="canClose == true">
								<i class="fa fa-times" aria-hidden="true"></i>
							</div>
							<div class="modal-container-infoArea">
								<slot name="infoArea"></slot>
							</div>
						</div>
					</div>
				</transition>`,
    methods: {
        closeModal() {
            this.toggle = false;
        },
    },
});

// ========= vue版 slick ==============================================================================================================================
Vue.component("slick", {
    props: {
        options: {
            type: Object,
            default: function () {
                return {};
            },
        },
    },
    mounted() {
        this.create();
    },
    destroyed: function () {
        $(this.$el).slick("unslick");
    },
    methods: {
        create: function () {
            const $slick = $(this.$el);
            $slick.on("after-change", this.onAfterChange);
            $slick.on("before-change", this.onBeforeChange);
            $slick.on("breakpoint", this.onBreakpoint);
            $slick.on("destroy", this.onDestroy);
            $slick.on("edge", this.onEdge);
            $slick.on("init", this.onInit);
            $slick.on("reInit", this.onReInit);
            $slick.on("set-position", this.onSetPosition);
            $slick.on("swipe", this.onSwipe);
            $slick.on("lazyLoaded", this.onLazyLoaded);
            $slick.on("lazyLoadError", this.onLazyLoadError);
            $slick.slick(this.options);
        },
        destroy: function () {
            const $slick = $(this.$el);
            $slick.off("after-change", this.onAfterChange);
            $slick.off("before-change", this.onBeforeChange);
            $slick.off("breakpoint", this.onBreakpoint);
            $slick.off("destroy", this.onDestroy);
            $slick.off("edge", this.onEdge);
            $slick.off("init", this.onInit);
            $slick.off("reInit", this.onReInit);
            $slick.off("set-position", this.onSetPosition);
            $slick.off("swipe", this.onSwipe);
            $slick.off("lazyLoaded", this.onLazyLoaded);
            $slick.off("lazyLoadError", this.onLazyLoadError);
            $(this.$el).slick("unslick");
        },
        reSlick: function () {
            this.destroy();
            this.create();
        },
        next: function () {
            $(this.$el).slick("slickNext");
        },
        prev: function () {
            $(this.$el).slick("slickPrev");
        },
        pause: function () {
            $(this.$el).slick("slickPause");
        },
        play: function () {
            $(this.$el).slick("slickPlay");
        },
        goTo: function (index, dontAnimate) {
            $(this.$el).slick("slickGoTo", index, dontAnimate);
        },
        currentSlide: function () {
            return $(this.$el).slick("slickCurrentSlide");
        },
        add: function (element, index, addBefore) {
            $(this.$el).slick("slickAdd", element, index, addBefore);
        },
        remove: function (index, removeBefore) {
            $(this.$el).slick("slickRemove", index, removeBefore);
        },
        filter: function (filterData) {
            $(this.$el).slick("slickFilter", filterData);
        },
        unfilter: function () {
            $(this.$el).slick("slickUnfilter");
        },
        getOption: function (option) {
            $(this.$el).slick("slickGetOption", option);
        },
        setOption: function (option, value, refresh) {
            $(this.$el).slick("slickSetOption", option, value, refresh);
        },
        setPosition: function () {
            $(this.$el).slick("set-position");
        },
        // Events
        onAfterChange: function (event, slick, currentSlide) {
            this.$emit("after-change", event, slick, currentSlide);
        },
        onBeforeChange: function (event, slick, currentSlide, nextSlide) {
            this.$emit("before-change", event, slick, currentSlide, nextSlide);
        },
        onBreakpoint: function (event, slick, breakpoint) {
            this.$emit("breakpoint", event, slick, breakpoint);
        },
        onDestroy: function (event, slick) {
            this.$emit("destroy", event, slick);
        },
        onEdge: function (event, slick, direction) {
            this.$emit("edge", event, slick, direction);
        },
        onInit: function (event, slick) {
            this.$emit("init", event, slick);
        },
        onReInit: function (event, slick) {
            this.$emit("reInit", event, slick);
        },
        onSetPosition: function (event, slick) {
            this.$emit("set-position", event, slick);
        },
        onSwipe: function (event, slick, direction) {
            this.$emit("swipe", event, slick, direction);
        },
        onLazyLoaded: function (event, slick, image, imageSource) {
            this.$emit("lazyLoaded", event, slick, image, imageSource);
        },
        onLazyLoadError: function (event, slick, image, imageSource) {
            this.$emit("lazyLoadError", event, slick, image, imageSource);
        },
    },
    template: ` <div>
                    <slot></slot>
                </div>`,
});
var slickFunction = {
    data() {
        return {
            // featuredFundOptions: {
			// 	slidesToShow: 4,
			// 	slidesToScroll: 4,
            //     autoplay: true,
            //     pauseOnHover: false,
            //     // dots: true,
            //     infinite: true,
            //     autoplaySpeed: 5000,
			// 	speed: 500,
			// 	adaptiveHeight: true,
			// 	responsive: [
			// 		{
			// 			breakpoint: 992,
			// 			settings: {
			// 				slidesToShow: 3,
			// 				slidesToScroll: 3,
			// 			}
			// 		},
			// 		{
			// 			breakpoint: 768,
			// 			settings: {
			// 				slidesToShow: 1,
			// 				slidesToScroll: 1,
			// 			}
			// 		},
			// 	],
            // },
        };
    },
    methods: {
        next() {
            this.$refs.slick.next();
        },

        prev() {
            this.$refs.slick.prev();
        },

        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.slick.reSlick();
            });
        },

        // Events listeners
        handleAfterChange(event, slick, currentSlide) {
            // console.log('handleAfterChange', event, slick, currentSlide);
        },
        handleBeforeChange(event, slick, currentSlide, nextSlide) {
            // console.log('handleBeforeChange', event, slick, currentSlide, nextSlide);
        },
        handleBreakpoint(event, slick, breakpoint) {
            // console.log('handleBreakpoint', event, slick, breakpoint);
        },
        handleDestroy(event, slick) {
            // console.log('handleDestroy', event, slick);
        },
        handleEdge(event, slick, direction) {
            // console.log('handleEdge', event, slick, direction);
        },
        handleInit(event, slick) {
            // console.log('handleInit', event, slick);
        },
        handleReInit(event, slick) {
            // console.log('handleReInit', event, slick);
        },
        handleSetPosition(event, slick) {
            // console.log('handleSetPosition', event, slick);
        },
        handleSwipe(event, slick, direction) {
            // console.log('handleSwipe', event, slick, direction);
        },
        handleLazyLoaded(event, slick, image, imageSource) {
            // console.log('handleLazyLoaded', event, slick, image, imageSource);
        },
        handleLazeLoadError(event, slick, image, imageSource) {
            // console.log('handleLazeLoadError', event, slick, image, imageSource);
        },
    },
};

// ========= header ==============================================================================================================================
Vue.component("headerArea", {
    template: ` <div>
                    <div id="top"></div>

                    <!-- header -->
                    <header class="header">
                        <div class="logo">
                            <a href="https://www.kgi.com.tw/zh-tw/" target="_blank" :title="$root.name">
                                <img src="images/logo_white.svg" :alt="$root.name">
                            </a>
                        </div>
                    </header>
                </div>`,
});

// ========= footer ==============================================================================================================================
Vue.component('footerArea', {
    template: ` <div>
                    <!-- app連結 -->
                    <div class="appStoreLink">
                        <div class="container">
                            <div class="appStoreLink-tit">
                                下載隨身e策略APP
                            </div>
                            <ul class="appStoreLink-list">
                                <li>
                                    <a href="https://apps.apple.com/tw/app/%E9%9A%A8%E8%BA%ABe%E7%AD%96%E7%95%A5/id1473914290" target="_blank" title="前往app store下載">
                                        <img src="images/appStoreLogo.png" alt="前往app store下載">
                                    </a>
                                </li>
                                <li>
                                    <a href="https://play.google.com/store/apps/details?id=tw.com.kgi.ecapp&hl=zh_TW&gl=US&pli=1" target="_blank" title="前往google play下載">
                                        <img src="images/googlePlayLogo.png" alt="前往google play下載">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- footer -->
                    <footer class="footer">
                        <div class="container">
                            <span class="footer-content-block">凱基證券股份有限公司</span>
                            |
                            <span class="footer-content-block">客服專線:(02)2389-0088 ‧ 0800-085-005</span>
                            |
                            <span class="footer-content-block">
                                <a href="https://chatservice.kgi.com.tw/Webhook/?eservice=a18" target="_blank" title="智能客服" class="linkText" id="ServiceBtn_B">
                                    智能客服
                                </a>
                            </span>
                            <br />
                            <span class="footer-content-block">地址：台北市明水路700號</span>
                            |
                            <span class="footer-content-block">電話：(02)2181-8888</span>
                            <span class="footer-content-block">112年金管證總字第0025號</span>
                        </div>
                    </footer>

                    <!-- fixedBtn -->
                    <div class="fixedBtn">
                        <ul>
                            <li>
                                <a href="https://eoa.kgi.com.tw/OOA/index.aspx?Source=O230501" title="開戶" target="_blank" id="AccountBtn_F">
                                    <img src="images/open-account.svg?=v20260624" alt="開戶" id="FixedBtn_F01">
                                </a>
                            </li>
                            <li>
                                <a href="https://www.kgieworld.com.tw/ExternalFiles/mobile/WFLinkApp.aspx?Org=P&rUrl=kgiP"
                                    title="交易" target="_blank" id="TradeBtn_F">
                                    <img src="images/trading.svg?=v20260624" alt="交易" id="FixedBtn_F02">
                                </a>
                            </li>
                            <li>
                                <a href="https://aiservice.kgieworld.com.tw/#/robotchat?platform=P" title="客服" target="_blank"
                                    id="ServiceBtn_F">
                                    <img src="images/chatbot.svg?=v20260624" alt="客服" id="FixedBtn_F03">
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="topBtn">
                        <a href="#top" title="返回最上面" @click.prevent="$scrollTo('body')">
                            <span>
                                <i class="fa-solid fa-angles-up"></i>
                                TOP
                            </span>
                        </a>
                    </div>
                </div>`,
});

// ========= 快速搜尋 ==============================================================================================================================
Vue.component('searchBar', {
    template: ` <div class="searchBar">
                    <div class="searchBar-searchBtn">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input type="search" name="" id="" placeholder="輸入關鍵字快速搜尋攻略" v-model="$root.searchBar">
                    <div class="searchBar-ansList">
                        <div class="searchBar-ansList-noData">
                            請輸入新關鍵字或 <a href="index.html#strategyList" class="linkText" title="前往列表">前往列表 <i class="fa-solid fa-arrow-right-to-bracket"></i></a> 尋找
                        </div>
                        <ul>
                            <li v-for="item in $root.allStrategyList" :data-keywords="item.keywords">
                                <a :href="item.link + '.html'" :title="item.tit">
                                    {{item.tit}}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>`
});

// ========= 內頁banner ==============================================================================================================================
Vue.component('inBanner', {
    template: ` <div class="inBanner">
                    <div class="inBanner-tattoo">隨身e策略</div>
                    <div class="container">
                        <div class="inBanner-content">
                            <img src="images/bannerLogo.png" alt="隨身e策略APP使用攻略" class="inBanner-logoTit">
                            <h1 class="inBanner-pageTit" :title="$root.allStrategyList[$root.searchStrategyListArry($root.pageName)].tit">
                                <template v-if="$root.allStrategyList[$root.searchStrategyListArry($root.pageName)].fileName == 'lv1'">
                                    「入門版功能」
                                </template>
                                <template v-if="$root.allStrategyList[$root.searchStrategyListArry($root.pageName)].fileName == 'lv2'">
                                    「進階版功能」
                                </template>
                                <template v-if="$root.allStrategyList[$root.searchStrategyListArry($root.pageName)].fileName == 'other'">
                                    「其他更多功能」
                                </template>
                                <div class="tit">
                                    {{$root.allStrategyList[$root.searchStrategyListArry($root.pageName)].tit}}
                                </div>
                            </h1>
                        </div>
                    </div>
                </div>`,
});

// ========= 社群分享 ==============================================================================================================================
Vue.component('shareLink', {
    template: ` <div class="shareLink">
                    <ul class="shareLink-list">
                        <li>
                            分享<span v-if="windowWidth < 992">：</span>
                        </li>
                        <li>
                            <a href="javascript:void(0)" title="複製網址" @click="$root.copyUrl()">
                                <i class="fa-solid fa-link"></i>
                            </a>
                        </li>
                        <li>
                            <a :href="'https://www.facebook.com/sharer/sharer.php?u=' + $root.pageUrl" title="分享到Facebook" target="_blank">
                                <i class="fa-brands fa-square-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a :href="'http://line.naver.jp/R/msg/text/?' + $root.pageTitle + ' ' + $root.pageUrl" title="分享到LINE" target="_blank">
                                <i class="fa-brands fa-line"></i>
                            </a>
                        </li>
                    </ul>
                </div>`,
})

// ========= 內頁 ==============================================================================================================================
Vue.component('inPage', {
    template: ` <div class="main-content">
                    <div class="main-content-tattoo">
                        <div>APP</div>
                        <div>使用攻略</div>
                    </div>

                    <div class="container">
                        <section class="item">
                            <slick
                                ref="slick"
                                class="imgSlider-1"
                                :options="$root.slickOptions"
                                @afterChange="$root.handleAfterChange"
                                @beforeChange="$root.handleBeforeChange"
                                @breakpoint="$root.handleBreakpoint"
                                @destroy="$root.handleDestroy"
                                @edge="$root.handleEdge"
                                @init="$root.handleInit"
                                @reInit="$root.handleReInit"
                                @setPosition="$root.handleSetPosition"
                                @swipe="$root.handleSwipe"
                                @lazyLoaded="$root.handleLazyLoaded"
                                @lazyLoadError="$root.handleLazeLoadError"
                            >
                                <div v-for="(item, index) in $root.allStrategyList[$root.searchStrategyListArry($root.pageName)].photoQty">
                                    <img :src="'images/' + $root.allStrategyList[$root.searchStrategyListArry($root.pageName)].fileName + '/' + $root.pageName + '/' + (index+1) + '.jpg?v=20240606'" :alt="$root.allStrategyList[$root.searchStrategyListArry($root.pageName)].tit">
                                </div>
                            </slick>
                            <slick
                                ref="slick"
                                class="imgSlider-2"
                                :options="$root.slickOptions2"
                                @afterChange="$root.handleAfterChange"
                                @beforeChange="$root.handleBeforeChange"
                                @breakpoint="$root.handleBreakpoint"
                                @destroy="$root.handleDestroy"
                                @edge="$root.handleEdge"
                                @init="$root.handleInit"
                                @reInit="$root.handleReInit"
                                @setPosition="$root.handleSetPosition"
                                @swipe="$root.handleSwipe"
                                @lazyLoaded="$root.handleLazyLoaded"
                                @lazyLoadError="$root.handleLazeLoadError"
                            >
                                <div v-for="(item, index) in $root.allStrategyList[$root.searchStrategyListArry($root.pageName)].photoQty">
                                    <img :src="'images/' + $root.allStrategyList[$root.searchStrategyListArry($root.pageName)].fileName + '/' + $root.pageName + '/' + (index+1) + '.jpg?v=20240606'" :alt="$root.allStrategyList[$root.searchStrategyListArry($root.pageName)].tit">
                                </div>
                            </slick>

                            <div class="nextPageBtn">
                                <div class="nextPageBtn-item">
                                    <div class="btn">
                                        <a :href="$root.searchStrategyListArry($root.pageName) == $root.allStrategyList.length-1 ? $root.allStrategyList[0].link + '.html' :  $root.allStrategyList[$root.searchStrategyListArry($root.pageName)+1].link + '.html'" title="看下一個功能">
                                            看下一個功能 <i class="fa-solid fa-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div class="nextPageBtn-item-text">
                                        <div class="en">
                                            NEXT
                                        </div>
                                        {{$root.searchStrategyListArry($root.pageName) == $root.allStrategyList.length-1 ? $root.allStrategyList[0].tit :  $root.allStrategyList[$root.searchStrategyListArry($root.pageName)+1].tit}}
                                    </div>
                                </div>
                                <div class="nextPageBtn-item">
                                    <div class="btn borderType">
                                        <a :href="$root.searchStrategyListArry($root.pageName) == 0 ? $root.allStrategyList[$root.allStrategyList.length-1].link + '.html' :  $root.allStrategyList[$root.searchStrategyListArry($root.pageName)-1].link + '.html'" title="看前一個功能">
                                            <i class="fa-solid fa-chevron-left"></i> 看前一個功能
                                        </a>
                                    </div>
                                    <div class="nextPageBtn-item-text">
                                        <div class="en">
                                            PREV
                                        </div>
                                        {{$root.searchStrategyListArry($root.pageName) == 0 ? $root.allStrategyList[$root.allStrategyList.length-1].tit :  $root.allStrategyList[$root.searchStrategyListArry($root.pageName)-1].tit}}
                                    </div>
                                </div>
                            </div>
                            <div class="text-center margin-top-30">
                                <a href="index.html" title="返回列表頁" class="linkText">
                                    <i class="fa-solid fa-chevron-left"></i> 返回列表頁
                                </a>
                            </div>
                        </section>
                    </div>

                </div>`,
});

var content = new Vue({
    el: "#content",
    mixins: [slickFunction, pageInfo],
    data: {
        name: "凱基證券",
        screenWidth: document.body.clientWidth,
        screenHeight: document.body.clientHeight,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        thisPath: location.protocol + "//" + location.host,
        pageUrl: window.location.href,
        pageTitle: document.title,

        searchBar: '',
        allStrategyList: [],

        strategyListLv1: [
            {
                tit: '使用APP第一步',
                list: [
                    {
                        tit: '設定生物辨識',
                        keywords: '設定生物辨識',
                        link: 'apply-biometrics',
                        fileName: 'lv1',
                        photoQty: 4,
                    },
                    {
                        tit: '申請憑證',
                        keywords: '申請憑證',
                        link: 'apply-certificate',
                        fileName: 'lv1',
                        photoQty: 8,
                    },
                    {
                        tit: '變更密碼',
                        keywords: '變更密碼',
                        link: 'change-password',
                        fileName: 'lv1',
                        photoQty: 6,
                    },
                    {
                        tit: '忘記密碼-密碼補發',
                        keywords: '忘記密碼-密碼補發',
                        link: 'reset-password',
                        fileName: 'lv1',
                        photoQty: 9,
                    },
                    {
                        tit: '誤植密碼鎖定-密碼解鎖',
                        keywords: '誤植密碼鎖定-密碼解鎖',
                        link: 'unlock-password',
                        fileName: 'lv1',
                        photoQty: 5,
                    },
                ]
            },
            {
                tit: '系統設定',
                list: [
                    {
                        tit: '系統設定-報價欄位設定',
                        keywords: '系統設定-報價欄位設定',
                        link: 'customize-quote-field',
                        fileName: 'lv1',
                        photoQty: 11,
                    },
                    {
                        tit: '系統設定-通知設定',
                        keywords: '系統設定-通知設定',
                        link: 'alert-settings',
                        fileName: 'lv1',
                        photoQty: 8,
                    },
                    {
                        tit: '系統設定-首頁自設捷徑',
                        keywords: '系統設定-首頁自設捷徑',
                        link: 'home-page-shortcut',
                        fileName: 'lv1',
                        photoQty: 10,
                    },
                    {
                        tit: '系統設定-交易帳號管理',
                        keywords: '系統設定-交易帳號管理',
                        link: 'manage-account',
                        fileName: 'lv1',
                        photoQty: 16,
                    },
                    {
                        tit: '系統設定-一般下單設定',
                        keywords: '系統設定-一般下單設定',
                        link: 'order-setting',
                        fileName: 'lv1',
                        photoQty: 6,
                    },
                    {
                        tit: '首頁Widget(小工具)設定 ',
                        keywords: '首頁Widget(小工具)設定 ',
                        link: 'widget-setting',
                        fileName: 'lv1',
                        photoQty: 6,
                    },
                ]
            },
            {
                tit: '自選股',
                list: [
                    {
                        tit: '自選股-個股新增',
                        keywords: '自選股-個股新增',
                        link: 'add-self-selected-stocks',
                        fileName: 'lv1',
                        photoQty: 9,
                    },
                    {
                        tit: '自選股-個股刪除',
                        keywords: '自選股-個股刪除',
                        link: 'self-selected-stock-delete',
                        fileName: 'lv1',
                        photoQty: 10,
                    },
                    {
                        tit: '自選股-自訂個股排序',
                        keywords: '自選股-自訂個股排序',
                        link: 'set-stock-sequence',
                        fileName: 'lv1',
                        photoQty: 8,
                    },
                    {
                        tit: '自選股-切換自選股組合',
                        keywords: '系自選股-切換自選股組合',
                        link: 'switch-self-selected-group',
                        fileName: 'lv1',
                        photoQty: 5,
                    },
                    {
                        tit: '自選股-新增自選股組合',
                        keywords: '自選股-新增自選股組合',
                        link: 'add-self-selected-group',
                        fileName: 'lv1',
                        photoQty: 9,
                    },
                    {
                        tit: '自選股-刪除自選股組合',
                        keywords: '自選股-刪除自選股組合',
                        link: 'delete-self-selected-group',
                        fileName: 'lv1',
                        photoQty: 7,
                    },
                    {
                        tit: '自選股-自訂組合排序',
                        keywords: '自選股-自訂組合排序',
                        link: 'set-group-sequence',
                        fileName: 'lv1',
                        photoQty: 7,
                    },
                ]
            },
            {
                tit: '交易',
                list: [
                    {
                        tit: '國內指數報價操作',
                        keywords: '國內指數報價操作',
                        link: 'domestic-index-setting',
                        fileName: 'lv1',
                        photoQty: 7,
                    },
                    {
                        tit: '台股報價操作',
                        keywords: '台股報價操作',
                        link: 'taiwan-stock-index-setting',
                        fileName: 'lv1',
                        photoQty: 6,
                    },
                    {
                        tit: '更多台股選股',
                        keywords: '更多台股選股',
                        link: 'tw-stock-selection',
                        fileName: 'lv1',
                        photoQty: 7,
                    },
                    {
                        tit: '查看個股技術分析',
                        keywords: '查看個股技術分析',
                        link: 'view-individual-stock-technical-analysis',
                        fileName: 'lv1',
                        photoQty: 8,
                    },
                    {
                        tit: '進入個股畫面進行個股交易',
                        keywords: '進入個股畫面進行個股交易',
                        link: 'enter-the-trading-screen-for-individual-stock-trading',
                        fileName: 'lv1',
                        photoQty: 10,
                    },
                    {
                        tit: '查詢委託回報及成交回報',
                        keywords: '查詢委託回報及成交回報',
                        link: 'query-entrustment-return-and-transaction-return',
                        fileName: 'lv1',
                        photoQty: 4,
                    },
                    {
                        tit: '如何更改委託內容',
                        keywords: '如何更改委託內容序',
                        link: 'how-to-change-the-delegate-content',
                        fileName: 'lv1',
                        photoQty: 14,
                    },
                    {
                        tit: '下單盤中零股',
                        keywords: '下單盤中零股',
                        link: 'order-odd-lot',
                        fileName: 'lv1',
                        photoQty: 12,
                    },
                    {
                        tit: '申購台股定期定額',
                        keywords: '申購台股定期定額',
                        link: 'rsp-taiwan-stocks',
                        fileName: 'lv1',
                        photoQty: 13,
                    },
                    {
                        tit: '申購美股定期定額',
                        keywords: '申購美股定期定額',
                        link: 'rsp-us-stocks',
                        fileName: 'lv1',
                        photoQty: 19,
                    },
                ]
            },
            {
                tit: '帳務',
                list: [
                    {
                        tit: '查詢庫存與未實現損益',
                        keywords: '查詢庫存與未實現損益',
                        link: 'query-inventory-and-unrealized-profit-and-loss',
                        fileName: 'lv1',
                        photoQty: 7,
                    },
                    {
                        tit: '帳戶額度查詢',
                        keywords: '帳戶額度查詢',
                        link: 'query-account-quota',
                        fileName: 'lv1',
                        photoQty: 4,
                    },
                    {
                        tit: '警示股查詢',
                        keywords: '警示股查詢',
                        link: 'query-alert-stock',
                        fileName: 'lv1',
                        photoQty: 7,
                    },
                ]
            },
            {
                tit: '',
                list: [
                    {
                        tit: '個股走勢-一頁快切多功能',
                        keywords: '個股走勢-一頁快切多功能',
                        link: 'stock-page',
                        fileName: 'lv1',
                        photoQty: 45,
                    },
                    {
                        tit: 'AI助理',
                        keywords: 'AI助理',
                        link: 'ai-assistant',
                        fileName: 'lv1',
                        photoQty: 6,
                    },
                    {
                        tit: '防詐騙妙招',
                        keywords: '防詐騙妙招',
                        link: 'anti-fraud-tips',
                        fileName: 'lv1',
                        photoQty: 19,
                    },
                ]
            },
        ],

        strategyListLv2: [
            {
                tit: '個股商品資訊',
                list: [
                    {
                        tit: '查看個股行情',
                        keywords: '查看個股行情',
                        link: 'view-stock-quote',
                        fileName: 'lv2',
                        photoQty: 11,
                    },
                    {
                        tit: '查看個股籌碼',
                        keywords: '查看個股籌碼',
                        link: 'view-stock-chip',
                        fileName: 'lv2',
                        photoQty: 11,
                    },
                    {
                        tit: '查看個股財務',
                        keywords: '查看個股財務',
                        link: 'view-stock-financial',
                        fileName: 'lv2',
                        photoQty: 11,
                    },
                    {
                        tit: '查看個股新聞',
                        keywords: '查看個股新聞',
                        link: 'view-stock-news',
                        fileName: 'lv2',
                        photoQty: 10,
                    },
                    {
                        tit: '查看個股更多資料',
                        keywords: '查看個股更多資料',
                        link: 'view-stock-more-info',
                        fileName: 'lv2',
                        photoQty: 11,
                    },
                    {
                        tit: '自訂頁籤排序',
                        keywords: '自訂頁籤排序',
                        link: 'customize-tab-sequence',
                        fileName: 'lv2',
                        photoQty: 12,
                    },
                ]
            },
            {
                tit: '技術分析',
                list: [
                    {
                        tit: '如何設定技術分析指標',
                        keywords: '如何設定技術分析指標',
                        link: 'how-to-set-the-sub-chart-for-technical-analysis',
                        fileName: 'lv2',
                        photoQty: 14,
                    },
                    {
                        tit: '設定技術分析查價功能',
                        keywords: '設定技術分析查價功能',
                        link: 'query-price-function',
                        fileName: 'lv2',
                        photoQty: 11,
                    },
                    {
                        tit: '設定常用技術指標',
                        keywords: '設定常用技術指標',
                        link: 'set-frequent-technical-analysis',
                        fileName: 'lv2',
                        photoQty: 15,
                    },
                ]
            },
            {
                tit: '策略選股',
                list: [
                    {
                        tit: '策略選股-策略與回測',
                        keywords: '策略選股-策略與回測',
                        link: 'strategy-and-backtesting',
                        fileName: 'lv2',
                        photoQty: 15,
                    },
                    {
                        tit: '自訂選股與回測',
                        keywords: '自訂選股與回測',
                        link: 'custom-strategies-and-backtesting',
                        fileName: 'lv2',
                        photoQty: 13,
                    },
                ]
            },
            {
                tit: '交易',
                list: [
                    {
                        tit: '閃電下單',
                        keywords: '閃電下單',
                        link: 'lightning-order',
                        fileName: 'lv2',
                        photoQty: 15,
                    },
                    {
                        tit: '當沖下單',
                        keywords: '當沖下單',
                        link: 'day-trading',
                        fileName: 'lv2',
                        photoQty: 12,
                    },
                    {
                        tit: '下單暫存匣',
                        keywords: '下單暫存匣',
                        link: 'temporary-trading-draft',
                        fileName: 'lv2',
                        photoQty: 19,
                    },
                    {
                        tit: '融資/融券配額查詢',
                        keywords: '融資/融券配額查詢',
                        link: 'margin-quota-inquiry',
                        fileName: 'lv2',
                        photoQty: 4,
                    },
                ]
            },
            {
                tit: 'e智慧',
                list: [
                    {
                        tit: 'e智慧-多條件觸價單',
                        keywords: 'e智慧-多條件觸價單',
                        link: 'many-triggers-order',
                        fileName: 'lv2',
                        photoQty: 14,
                    },
                    {
                        tit: 'e智慧-二擇一出場單',
                        keywords: 'e智慧-二擇一出場單',
                        link: 'choose-one-or-the-other',
                        fileName: 'lv2',
                        photoQty: 9,
                    },
                    {
                        tit: 'e智慧-限時進出單',
                        keywords: 'e智慧-限時進出單',
                        link: 'limited-entry-and-exit',
                        fileName: 'lv2',
                        photoQty: 9,
                    },
                    {
                        tit: 'e智慧-移動出場單',
                        keywords: 'e智慧-移動出場單',
                        link: 'move-out',
                        fileName: 'lv2',
                        photoQty: 11,
                    },
                    {
                        tit: 'e智慧-定時/定量單',
                        keywords: 'e智慧-定時/定量單',
                        link: 'timing-and-quantitative',
                        fileName: 'lv2',
                        photoQty: 13,
                    },
                    {
                        tit: 'e智慧-二擇一觸價單',
                        keywords: 'e智慧-二擇一觸價單',
                        link: 'two-choice-trigger-price',
                        fileName: 'lv2',
                        photoQty: 11,
                    },
                    {
                        tit: 'e智慧-三擇一出場單',
                        keywords: 'e智慧-三擇一出場單',
                        link: 'three-choice-trigger-price',
                        fileName: 'lv2',
                        photoQty: 11,
                    },
                ]
            },
            {
                tit: '鷹眼通',
                list: [
                    {
                        tit: '鷹眼通-價量設定',
                        keywords: '鷹眼通-價量設定',
                        link: 'price-volume-setting',
                        fileName: 'lv2',
                        photoQty: 21,
                    },
                    {
                        tit: '鷹眼通-限時設定',
                        keywords: '鷹眼通-限時設定',
                        link: 'time-limit-setting',
                        fileName: 'lv2',
                        photoQty: 16,
                    },
                    {
                        tit: '鷹眼通-價量設定自選股',
                        keywords: '鷹眼通-價量設定自選股',
                        link: 'price-volume-setting-qptional-stock',
                        fileName: 'lv2',
                        photoQty: 34,
                    },
                    {
                        tit: '鷹眼通-結合選股監控',
                        keywords: '鷹眼通-結合選股監控',
                        link: 'combined-with-stock-selection-monitoring',
                        fileName: 'lv2',
                        photoQty: 24,
                    },
                    {
                        tit: '鷹眼通-停利設定',
                        keywords: '鷹眼通-停利設定',
                        link: 'stop-profit-setting',
                        fileName: 'lv2',
                        photoQty: 18,
                    },
                    {
                        tit: '鷹眼通-停損設定',
                        keywords: '鷹眼通-停損設定',
                        link: 'stop-loss-setting',
                        fileName: 'lv2',
                        photoQty: 18,
                    },
                    {
                        tit: '鷹眼通-結合強勢股',
                        keywords: '鷹眼通-結合強勢股',
                        link: 'combine-strong-stocks',
                        fileName: 'lv2',
                        photoQty: 22,
                    },
                    {
                        tit: '鷹眼通-漲停打開',
                        keywords: '鷹眼通-漲停打開',
                        link: 'daily-limit-open',
                        fileName: 'lv2',
                        photoQty: 18,
                    },
                    {
                        tit: '鷹眼通-跌停抄底',
                        keywords: '鷹眼通-跌停抄底',
                        link: 'limit-down-bargain-hunting',
                        fileName: 'lv2',
                        photoQty: 24,
                    },
                ]
            },
            {
                tit: '投顧報告',
                list: [
                    {
                        tit: '投顧報告-查詢個股報告',
                        keywords: '投顧報告-查詢個股報告',
                        link: 'query-individual-stock-report',
                        fileName: 'lv2',
                        photoQty: 11,
                    },
                    {
                        tit: '投顧報告-查詢特定類型或期間報告',
                        keywords: '投顧報告-查詢特定類型或期間報告',
                        link: 'query-a-specific-type-or-period-report',
                        fileName: 'lv2',
                        photoQty: 14,
                    },
                    {
                        tit: '投顧報告-訂閱報告',
                        keywords: '投顧報告-訂閱報告',
                        link: 'subscribe-to-report',
                        fileName: 'lv2',
                        photoQty: 17,
                    },
                ]
            },
        ],

        strategyListOther: [
            {
                tit: '凱基銀行交割戶',
                list: [
                    {
                        tit: '凱基銀行交割戶-申請凱銀數存帳戶',
                        keywords: '凱基銀行交割戶-申請凱銀數存帳戶',
                        link: 'apply-kgi-digital-account',
                        fileName: 'other',
                        photoQty: 5,
                    },
                    {
                        tit: '凱基銀行交割戶-變更台股交割戶',
                        keywords: '凱基銀行交割戶-變更台股交割戶',
                        link: 'settlement-bank-change-146',
                        fileName: 'other',
                        photoQty: 4,
                    },
                    {
                        tit: '凱基銀行交割戶-簽署共銷同意書',
                        keywords: '凱基銀行交割戶-簽署共銷同意書',
                        link: 'sign-co-marketing-agreement',
                        fileName: 'other',
                        photoQty: 4,
                    },
                ]
            },
            {
                tit: '分戶帳',
                list: [
                    {
                        tit: '分戶帳-授扣功能',
                        keywords: '分戶帳-授扣功能',
                        link: 'sub-account-authorization-and-deduction-function',
                        fileName: 'other',
                        photoQty: 18,
                    },
                    {
                        tit: '分戶帳-出金',
                        keywords: '分戶帳-出金',
                        link: 'CMA-withdraw-funds',
                        fileName: 'other',
                        photoQty: 6,
                    },
                    {
                        tit: '分戶帳-入金',
                        keywords: '分戶帳-入金',
                        link: 'CMA-deposit-money',
                        fileName: 'other',
                        photoQty: 6,
                    },
                ]
            },
            {
                tit: '快e貸-不限用途款項借貸',
                list: [
                    {
                        tit: '匯入與查詢擔保品庫存',
                        keywords: '匯入與查詢擔保品庫存',
                        link: 'import-and-query-collateral-inventory',
                        fileName: 'other',
                        photoQty: 8,
                    },
                    {
                        tit: '擔保品借款申請',
                        keywords: '擔保品借款申請',
                        link: 'collateral-loan-application',
                        fileName: 'other',
                        photoQty: 6,
                    },
                    {
                        tit: '退回擔保品',
                        keywords: '退回擔保品',
                        link: 'collateral-return',
                        fileName: 'other',
                        photoQty: 6,
                    },
                    {
                        tit: '還款與查詢對帳單',
                        keywords: '還款與查詢對帳單',
                        link: 'payment-and-statement-query',
                        fileName: 'other',
                        photoQty: 7,
                    },
                    {
                        tit: '在途款借款申請',
                        keywords: '在途款借款申請',
                        link: 'goods-in-transit-loan-application',
                        fileName: 'other',
                        photoQty: 9,
                    },
                ]
            },
            {
                tit: '借券專區-股票出借',
                list: [
                    {
                        tit: '功能總覽',
                        keywords: '功能總覽',
                        link: 'stock-lending-overview',
                        fileName: 'other',
                        photoQty: 4,
                    },
                    {
                        tit: '查詢/變更約定條件',
                        keywords: '查詢/變更約定條件',
                        link: 'stock-lending-set-condition',
                        fileName: 'other',
                        photoQty: 9,
                    },
                    {
                        tit: '熱門借券標的',
                        keywords: '熱門借券標的',
                        link: 'stock-lending-hot-list',
                        fileName: 'other',
                        photoQty: 8,
                    },
                    {
                        tit: '借券對帳單',
                        keywords: '借券對帳單',
                        link: 'stock-lending-statement',
                        fileName: 'other',
                        photoQty: 4,
                    },
                    {
                        tit: '已出借庫存明細',
                        keywords: '已出借庫存明細',
                        link: 'stock-lending-borrowed-receipt',
                        fileName: 'other',
                        photoQty: 8,
                    },
                ]
            },
            {
                tit: '借券專區-股票借入',
                list: [
                    {
                        tit: '功能總覽',
                        keywords: '功能總覽',
                        link: 'stock-borrowing-overview',
                        fileName: 'other',
                        photoQty: 4,
                    },
                    {
                        tit: '可借入股票清單',
                        keywords: '可借入股票清單',
                        link: 'stock-borrowing-available-list',
                        fileName: 'other',
                        photoQty: 5,
                    },
                    {
                        tit: '線上詢券',
                        keywords: '線上詢券',
                        link: 'stock-borrowing-query',
                        fileName: 'other',
                        photoQty: 7,
                    },
                    {
                        tit: '借入回報',
                        keywords: '借入回報',
                        link: 'stock-borrowing-report',
                        fileName: 'other',
                        photoQty: 4,
                    },
                    {
                        tit: '借券餘額',
                        keywords: '借券餘額',
                        link: 'stock-borrowing-amount',
                        fileName: 'other',
                        photoQty: 5,
                    },
                    {
                        tit: '還券回報',
                        keywords: '還券回報',
                        link: 'stock-borrowing-return-status',
                        fileName: 'other',
                        photoQty: 3,
                    },
                    {
                        tit: '借券對帳單 ',
                        keywords: '借券對帳單',
                        link: 'stock-borrowing-statement',
                        fileName: 'other',
                        photoQty: 4,
                    },
                ]
            },
        ],

        slickOptions: {
            slidesToShow: 1,
            // slidesToScroll: 4,
            autoplay: false,
            pauseOnHover: false,
            infinite: false,
            autoplaySpeed: 5000,
            speed: 500,
            adaptiveHeight: true,
            dots: true,
            asNavFor: '.imgSlider-2',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        infinite: true,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        infinite: true,
                    }
                },
            ],
        },

        slickOptions2: {
            slidesToShow: 8,
            slidesToScroll: 1,
            autoplay: false,
            // pauseOnHover: false,
            infinite: false,
            // autoplaySpeed: 5000,
            // speed: 500,
            // adaptiveHeight: true,
            dots: false,
            // centerMode: true,
            arrows: false,
            asNavFor: '.imgSlider-1',
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 5,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                        infinite: true,
                    }
                },
            ],
        },
    },
    components: {
        // fund: httpVueLoader(
        //     "js/fund.vue"
        // ),
    },
    mounted() {
        this.signature();
        this.addNoOpener();
        // this.useJq();
        this.showTarget();
        this.topBtn();
        this.scrollMagic();

        // this.sameHeight("notSureWhatItIs2-item-bg");
        // setTimeout(() => {
        //     this.sameHeight('notSureWhatItIs2-item-bg');
        // }, 1000);

        $(window).resize(() => {
            this.windowWidth = $(window).innerWidth();
            this.windowHeight = $(window).innerHeight();

            // this.sameHeight('notSureWhatItIs2-item-bg');
        });

        // this.countToNumber1($('.assets1Num'), 1.5, '', 2500);
        // this.countToNumber2($('.assets2Num'), 1500000000000, '', 2500);
        // this.getPosSetCountToNumber();

        // window.addEventListener('mousemove', e => {
        //     this.setMoneyPos();
        // });
        // window.addEventListener('deviceorientation', e => {
        //     this.setMoneyPos2();
        // });

        // setInterval(() => {
        //     this.tab1.push('tab1')
        // }, 2000)

        // this.countUp();

        // AOS
        AOS.init({
            duration: 1000,
            offset: this.windowWidth > 768 ? 400 : 200,
            delay: 100,
        });

        this.mergeAllStrategyList();
    },
    methods: {
        signature() {
            console.log(
                "%cMade by Captain%c2023/05",
                "color: #fff; border-radius: 5px; background: #1a4f9c; padding: 2px 10px; font-weight: bold;",
                "color: #000; border-radius: 5px; background: #ffde00; padding: 2px 10px; margin: 0px 5px;"
            );
        },
        toggleModal(name) {
            this.$refs[name].toggle = !this.$refs[name].toggle;
        },
        sameHeight(name) {
            let item = $("." + name),
                itemLeight = item.length,
                giftItemHeight = [];

            item.removeAttr("style");

            for (let n = 0; n < itemLeight; n++) {
                giftItemHeight[n] = item.eq(n).innerHeight();
            }
            let height = Math.max.apply(null, giftItemHeight);
            item.css("height", height);
        },
        addNoOpener() {
            // 資安用  target="_blank" 加 rel="nofollow me noopener noreferrer"
            var _linkHasTargetBlank = $('a[target="_blank"]');
            for (var n = 0; n < _linkHasTargetBlank.length; n++) {
                // 如果要連的網址跟這網站網域不同  加[rel="nofollow me noopener noreferrer"]
                _linkHasTargetBlank.eq(n).attr("href").indexOf(this.thisPath)
                    ? _linkHasTargetBlank
                          .eq(n)
                          .attr("rel", "nofollow me noopener noreferrer")
                    : "";
            }
        },
        showTarget() {
            // 抓網址參數判斷要馬上顯示的區塊
            var url = location.href,
                i,
                openInfo = "";

            if (url.indexOf("?") != -1) {
                // 抓取網址參數判斷 --- Start
                function getUrlParams(url) {
                    // 回傳網址參數Object
                    var params = {};
                    (url + "?")
                        .split("?")[1]
                        .split("&")
                        .forEach(function (pair) {
                            pair = (pair + "=")
                                .split("=")
                                .map(decodeURIComponent);
                            if (pair[0].length) {
                                params[pair[0]] = pair[1];
                            }
                        });
                    return params;
                }

                var obj = getUrlParams(location.href);
                // 因為#hash會直接串在最後一個參數後面, 故需要取代處理
                if (Object.keys(obj).length && obj.hasOwnProperty("openInfo"))
                    openInfo =
                        obj.openInfo.indexOf("#") > -1
                            ? obj.openInfo.replace(location.hash, "")
                            : obj.openInfo;
                // 抓取網址參數判斷 --- End

                // 2020-11-26 Jeffery 修正openInfo空值在jQuery的錯誤
                if (openInfo && $("#" + openInfo).length > 0) {
                    setTimeout(() => {
                        var targetOffset = $("#" + openInfo).offset().top;
                        window.scrollTo(0, targetOffset);
                        console.log(openInfo, targetOffset);
                    }, 500);
                    // setTimeout(()=>{
                    // 	this.$scrollTo('#' + openInfo);
                    // }, 500)
                }
                /*
                    例 /index.html?openInfo=q1
                */
            }
        },
        topBtn() {
            $(window)
                .bind("scroll resize", function () {
                    var $this = $(this);
                    var $this_Top = $this.scrollTop();

                    //當高度小於100時，關閉區塊
                    if ($this_Top < 100) {
                        $(".topBtn").stop().css({
                            transform: "matrix(1, 0, 0, 1, 0, 400)",
                            opacity: 0,
                        });
                    }
                    if ($this_Top > 100) {
                        $(".topBtn").stop().css({
                            transform: "matrix(1, 0, 0, 1, 0, 0)",
                            opacity: 1,
                        });
                    }
                })
                .scroll();
        },
        toThousands(num) {
            // 錢加逗號
            return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, `$1,`);
        },
        delHtmlTag(info) {
            // 剔除htmlCode 只留文字
            String.prototype.stripHTML = function () {
                var reTag = /<(?:.|\s)*?>/g;
                return this.replace(reTag, "");
            };
            return info.stripHTML();
        },
        countUp() {
            // 數字遞增動畫
            let domPos = document.getElementById("crownArea").offsetTop;

            var options={
                useEasing: true,  // 過渡動畫效果，默認ture
                useGrouping: true,  // 千分位效果，例：1000->1,000。默認true
                separator: ',',   // 使用千分位時分割符號
                decimal: '.',   // 小數位分割符號
                prefix: '',    // 前置符號
                suffix: ''    // 後置符號，可漢字
            }

            // dom節點, 初始值,  結束值, 小數位數, 過渡幾秒 , 初始參數
            var num1 = new CountUp('num1', 0, 1.4, 1, 5, options);
            var num2 = new CountUp('num2', 0, 75, 0, 5, options);
            var num3 = new CountUp('num3', 0, 284, 0, 5, options);

            $(window).scroll(function () {
                var scrollVal = $(this).scrollTop();
                if (scrollVal >= domPos) {
                    num1.start();
                    num2.start();
                    num3.start();
                }
            });
        },

        //-------------------------------------navbar
        toggleMobileNavbar() {
            this.menuBtnActive === false
                ? (this.menuBtnActive = true)
                : (this.menuBtnActive = false);
            this.navbarShow === false
                ? (this.navbarShow = true)
                : (this.navbarShow = false);
        },
        hideMobileNavbar() {
            this.menuBtnActive = false;
            this.navbarShow = false;
        },
        navClick(no, hashName) {
            this.navbarShow = false;
            this.$scrollTo("#" + hashName);
        },

        //-------------------------------------使用jq區塊
        useJq() {
            
        },

        //-------------------------------------scrollMagic
        scrollMagic() {
            // // init controller
            // let controller = new ScrollMagic.Controller(),
            //     bannerTit = new TimelineMax();
            // // howToPickTimeLine = new TimelineMax(),

            // new ScrollMagic.Scene({
            //     triggerElement: ".banner",
            //     duration: 400,
            //     // offset: 0,
            // })
            //     .setTween(bannerTit)
            //     // .addIndicators({name: "1 (duration: 0)"})
            //     .addTo(controller);

            // bannerTit.add(
            //     TweenMax.from(".banner-tit-sTit", 5, {
            //         x: 50,
            //         y: -80,
            //     })
            // );
            // TweenMax.to(".banner", 1, {
            //     opacity: 0,
            // });
            TweenLite.from('.banner-appIcon', 1, {
                opacity: 0,
                y: 100
            });
            TweenLite.from('.banner-tit-1', 0.5, {
                opacity: 0,
                y: 100,
                delay: 0.3
            });
            TweenLite.from('.banner-kv-phone', 0.5, {
                opacity: 0,
                y: 100,
                delay: 0.5
            });
            TweenLite.from('.banner-tit-2', 0.5, {
                opacity: 0,
                y: 100,
                delay: 0.5
            });
            TweenLite.from('.banner-text', 0.5, {
                opacity: 0,
                y: 100,
                delay: 0.8
            });
            TweenLite.from('.banner-kv-bg', 0.5, {
                opacity: 0,
                scale: 0,
                delay: 0.8
            });
            TweenLite.from('.banner-kv-2', 0.5, {
                opacity: 0,
                x: -100,
                delay: 1
            });
            TweenLite.from('.banner-kv-1', 0.5, {
                opacity: 0,
                x: -100,
                delay: 1.2
            });
            TweenLite.from('.banner-kv-text', 0.5, {
                opacity: 0,
                rotation: -100,
                delay: 1.4
            });
        },

        //-------------------------------------快速搜尋選單篩選
        searchQa(val) {
            var eleStyle = document.createElement("style");
            eleStyle.setAttribute("class", "searchQaList");
            
            if (val !== '') {
                $('.searchQaList').remove();
                document.querySelector("head").appendChild(eleStyle);
                // 改變css篩選規則
                eleStyle.innerHTML = '.searchBar-ansList li:not([data-keywords*="'+ val +'"]) { display: none; }';
            } else {
                $('.searchQaList').remove();
            }
        },

        //-------------------------------------合併所有列表資料
        mergeAllStrategyList() {
            this.strategyListLv1.forEach(e => {
                e.list.forEach(e2 => {
                    this.allStrategyList.push(e2);
                });
            });
            this.strategyListLv2.forEach(e => {
                e.list.forEach(e2 => {
                    this.allStrategyList.push(e2);
                });
            });
            this.strategyListOther.forEach(e => {
                e.list.forEach(e2 => {
                    this.allStrategyList.push(e2);
                });
            });
        },

        //-------------------------------------搜尋攻略列表陣列
        searchStrategyListArry(pageLink) {
            var result = $.map(this.allStrategyList, (item, index)=> {
                return item.link;
            }).indexOf(pageLink);

            return result;
        },

        //-------------------------------------複製網址
        copyUrl() {
            var temp = $('<input>'); // 建立input物件
            $('body').append(temp); // 將input物件增加到body
            var url = window.location.href; // 取得要複製的連結
            temp.val(url).select(); // 將連結加到input物件value
            document.execCommand('copy'); // 複製
            temp.remove(); // 移除input物件

            this.toggleModal('copyUrlSuccess');
        }
    },
    watch: {
        screenWidth(val) {
            this.screenWidth = val;
        },
        screenHeight(val) {
            this.screenHeight = val;
        },
        windowWidth(val) {
            this.windowWidth = val;
        },
        windowHeight(val) {
            this.windowHeight = val;
        },
        searchBar(val) {
            this.searchQa(val);
        }
    },
});
