'use strict';

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/blog-posts/preview',
            handler: 'blog-post.preview',
            config: {
                auth: false, // or true if you want authentication
            },
        },
    ],
};