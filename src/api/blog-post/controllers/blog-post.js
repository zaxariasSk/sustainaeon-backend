'use strict';

/**
 * blog-post controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog-post.blog-post', ({strapi}) => ({
    async preview(ctx) {
        const contentType = strapi.contentType('api::blog-post.blog-post');

        // sanitize query
        const sanitizedQuery = await strapi.contentAPI.sanitize.query(ctx.query, contentType, {auth: ctx.state.auth});

        // query documents with only the fields you want
        const docs = await strapi.documents(contentType.uid).findMany({
            ...sanitizedQuery,
            sort: {publish_date: 'desc'},
            fields: ['title', 'publish_date', 'slug', 'short_description'],
            populate: {
                author: {
                    fields: ['name', 'email'],
                    populate: {
                        avatar: true,
                    },
                },
                main_image: true,
            },
        });

        // sanitize output
        const sanitized = await strapi.contentAPI.sanitize.output(docs, contentType, {auth: ctx.state.auth});

        // shape the response
        const mapped = sanitized.map((entry) => ({
            id: entry.id,
            title: entry.title,
            publish_date: entry.publish_date,
            slug: entry.slug,
            short_description: entry.short_description,
            author: entry.author ? {
                name: entry.author.name,
                email: entry.author.email,
                avatar: entry.author.avatar,
            } : null,
            main_image: entry.main_image || null, // full object
        }));

        return this.transformResponse(mapped);
    },
}));
