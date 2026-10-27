
(function ($) {
    "use strict";

    // Không chạy nếu người dùng yêu cầu giảm chuyển động.
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // 1. ANIMATION XUẤT HIỆN SẢN PHẨM KHI CUỘN
    function initProductReveal() {
        const items = document.querySelectorAll(
            ".product__item, .categories__item"
        );

        if (reduceMotion || !("IntersectionObserver" in window)) {
            items.forEach(function (item) {
                item.classList.add("kyan-visible");
            });
            return;
        }

        const observer = new IntersectionObserver(
            function (entries, currentObserver) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("kyan-visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px 30px 0px"
            }
        );

        items.forEach(function (item, index) {
            item.classList.add("kyan-reveal");

            // Tạo độ trễ nhẹ theo thứ tự sản phẩm.
            item.style.transitionDelay =
                (index % 4) * 80 + "ms";

            observer.observe(item);
        });
    }

    // 2. ĐẢM BẢO MENU DROPDOWN CÓ THỂ ĐƯỢC SỬ DỤNG
    function initMenuAccessibility() {
        $(".header__menu ul li").each(function () {
            const $item = $(this);
            const $submenu = $item.children("ul");
            const $link = $item.children("a");

            if ($submenu.length && !$link.attr("aria-haspopup")) {
                $link.attr("aria-haspopup", "true");
                $link.attr("aria-expanded", "false");

                $item.on("mouseenter", function () {
                    $link.attr("aria-expanded", "true");
                });

                $item.on("mouseleave", function () {
                    $link.attr("aria-expanded", "false");
                });

                $link.on("focus", function () {
                    $link.attr("aria-expanded", "true");
                });

                $link.on("blur", function () {
                    if (!$item.find(":focus").length) {
                        $link.attr("aria-expanded", "false");
                    }
                });
            }
        });
    }

    // 3. KHỞI TẠO SAU KHI DOM ĐÃ SẴN SÀNG
    $(function () {
        initProductReveal();
        initMenuAccessibility();
    });

})(jQuery);
