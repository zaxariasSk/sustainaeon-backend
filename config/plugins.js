module.exports = () => ({
    seo: {
        enabled: true,
    },
    'strapi-v5-plugin-populate-deep': {
        config: {
            defaultDepth: 5, // Default is 5
        }
    },
    upload: {
        config: {
            breakpoints: {
                large: 1000,
                medium: 750,
                small: 500,
            },
        },
    },
});
