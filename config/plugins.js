module.exports = () => ({
    seo: {
        enabled: true,
    },
    'strapi-v5-plugin-populate-deep': {
        config: {
            defaultDepth: 3, // Default is 5
        }
    },
});
