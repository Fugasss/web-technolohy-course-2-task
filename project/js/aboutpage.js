(function (window) {
    const ABOUT_DATA_URL = "data/about.json";

    async function showAboutHtml(data) {
        const containerTemplate = await $ajaxUtils.fetch("templates/aboutpage/about.html", false);

        let container = insertProperties(containerTemplate, {
            "project_name" : data.project_name,
            "project_description" : data.project_description,
            "project_elevator_pitch" : data.project_elevator_pitch,
            "author_name" : data.author_name,
            "author_email" : data.contacts.email,
            "author_phone" : data.contacts.phone
        });

        insertHtml("#main-content", container);
    }

    window.$page_loader.aboutHtml = function (event) {
        showLoading("#main-content");
        $ajaxUtils.get(
            ABOUT_DATA_URL,
            showAboutHtml,
            true);
    };
    

})(window);