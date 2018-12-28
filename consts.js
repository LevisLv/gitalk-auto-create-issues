'use strict';

/**
 * 博客 base url
 * @type {string}
 */
const BLOG_BASE_URL = 'https://levislv.com';

/**
 * Personal access tokens
 * @see https://github.com/settings/tokens
 * @type {string}
 */
const GITHUB_ACCESS_TOKEN = process.env['GITHUB_ACCESS_TOKEN'];

const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_OWNER = 'LevisLv';
const GITHUB_REPO = 'gitalk-auto-create-issues';

/**
 * label name 黑名单，不生成对应的 issue
 * @link BLOG_BASE_URL 后面的部分作为 issue title
 * @type {string[]}
 */
const LABEL_NAME_BLACK_LIST = [
    '/tags/',
    '/about/',
    '/project/',
    '/404.html'
];

const LABEL_DEFAULT = 'Gitalk';
const LABEL_COLOR_DEFAULT = '00ff00';
const LABEL_COLOR_OTHER = '0000ff';

module.exports = {
    BLOG_BASE_URL: BLOG_BASE_URL,
    GITHUB_ACCESS_TOKEN: GITHUB_ACCESS_TOKEN,
    GITHUB_API_BASE_URL: GITHUB_API_BASE_URL,
    GITHUB_OWNER: GITHUB_OWNER,
    GITHUB_REPO: GITHUB_REPO,
    LABEL_NAME_BLACK_LIST: LABEL_NAME_BLACK_LIST,
    LABEL_DEFAULT: LABEL_DEFAULT,
    LABEL_COLOR_DEFAULT: LABEL_COLOR_DEFAULT,
    LABEL_COLOR_OTHER: LABEL_COLOR_OTHER,
};