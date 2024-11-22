(function (window) {
    async function showFaqHtml(data) {
        const containerTemplate = await $ajaxUtils.fetch("templates/faqpage/faq_container_template.html", false);
        const itemTemplate = await $ajaxUtils.fetch("templates/faqpage/item_template.html", false);

        let items = "";

        for(const ind in data){
            items += insertProperties(itemTemplate, {
                "id": ind,
                "question": `${ind}. ${data[ind].question}`,
                "answer": data[ind].answer
            });
        }
        
        let result = insertProperty(containerTemplate, "items", items);

        insertHtml("#main-content", result);

    }

    window.$page_loader.faqHtml = function (event) {
        showLoading("#main-content");
        $ajaxUtils.get(
            "data/faq.json",
            showFaqHtml,
            true);
    };

})(window);