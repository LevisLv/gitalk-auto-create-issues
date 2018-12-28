'use strict';

const Consts = require('./consts');

const rp = require('request-promise');
const fastXmlParser = require('fast-xml-parser');

let necessaryLabelNameSet;
let issueLabelNameSet;
let necessaryTitleSet;
let issueTitleNumberMap;

/**
 * 开始执行
 */
function execute() {
    Promise.resolve(getSitemap())
        .then(function (set) {
            console.log(set);
            necessaryLabelNameSet = set;

            necessaryLabelNameSet.add(Consts.LABEL_DEFAULT);

            return getLabels();
        })
        .then(function (set) {
            console.log(set);
            issueLabelNameSet = set;

            const promiseSet = new Set();
            const difference = new Set();
            necessaryLabelNameSet.forEach(function (necessaryLabelName) {
                if (!issueLabelNameSet.has(necessaryLabelName)) {
                    difference.add(necessaryLabelName);
                }
            });

            /**
             * 差集-创建
             */
            difference.forEach(function (labelName) {
                promiseSet.add(createLabel({
                    'name': labelName,
                    'color': labelName == Consts.LABEL_DEFAULT
                        ? Consts.LABEL_COLOR_DEFAULT
                        : Consts.LABEL_COLOR_OTHER,
                    'description': ''
                }));
            });

            return Promise.all(promiseSet)
                .then(function (data) {
                    console.log(data);
                })
                .catch(function (err) {
                    console.error(err);
                });
        })
        .then(function (data) {
            console.log(data);

            return getIssues();
        })
        .then(function (map) {
            console.log(map);
            issueTitleNumberMap = map;

            necessaryTitleSet = new Set();
            necessaryLabelNameSet.forEach(function (necessaryLabelName) {
                if (necessaryLabelName != Consts.LABEL_DEFAULT) {
                    // key为value的md5值
                    necessaryTitleSet.add(necessaryLabelName);
                }
            });

            const promiseSet = new Set();
            const difference = new Set();
            necessaryTitleSet.forEach(function (necessaryTitle) {
                if (!issueTitleNumberMap.has(necessaryTitle)) {
                    difference.add(necessaryTitle);
                }
            });

            /**
             * 差集-创建
             */
            difference.forEach(function (title) {
                // title和label name相同
                promiseSet.add(createIssue(title, title));
            });

            return Promise.all(promiseSet);
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (err) {
            console.error(err);
        });
}

/**
 * 通过sitemap获取所有需要创建的label name集合
 *
 * @returns {Promise<void>}
 */
async function getSitemap() {
    return await rp({
        method: 'GET',
        uri: `${Consts.BLOG_BASE_URL}/sitemap.xml`,
        transform: function (body, response, resolveWithFullResponse) {
            const necessaryLabelNameSet = new Set();
            const urls = fastXmlParser.parse(body)['urlset']['url'];
            urls.forEach(function (url) {
                const loc = decodeURI(url['loc']);
                const start = loc.indexOf(Consts.BLOG_BASE_URL) + `${Consts.BLOG_BASE_URL}`.length;
                let end = loc.lastIndexOf('/');
                end = end > start ? end + 1 : loc.length;
                const necessaryLabelName = loc.substring(start, end);
                if (!Consts.LABEL_NAME_BLACK_LIST.includes(necessaryLabelName)) {
                    necessaryLabelNameSet.add(necessaryLabelName);
                }
            });

            return necessaryLabelNameSet;
        }
    })
}

/**
 * 获取当前已有的label name集合
 *
 * @returns {Promise<void>}
 */
async function getLabels() {
    return await rp({
        method: 'GET',
        uri: `${Consts.GITHUB_API_BASE_URL}/repos/${Consts.GITHUB_OWNER}/${Consts.GITHUB_REPO}/labels`,
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': `token ${Consts.GITHUB_ACCESS_TOKEN}`
        },
        json: true,
        transform: function (body, response, resolveWithFullResponse) {
            const issueLabelNameSet = new Set();
            body.forEach(function (label) {
                issueLabelNameSet.add(label['name']);
            });

            return issueLabelNameSet;
        }
    });
}

/**
 * 创建label
 *
 * @param label
 * @returns {Promise<void>}
 */
async function createLabel(label) {
    return await rp({
        method: 'POST',
        uri: `${Consts.GITHUB_API_BASE_URL}/repos/${Consts.GITHUB_OWNER}/${Consts.GITHUB_REPO}/labels`,
        body: {
            'name': label['name'],
            'color': label['color'],
            'description': label['description']
        },
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': `token ${Consts.GITHUB_ACCESS_TOKEN}`
        },
        json: true
    });
}

/**
 * 获取所有issue title和number的映射表
 *
 * @returns {Promise<void>}
 */
async function getIssues() {
    return await rp({
        method: 'GET',
        uri: `${Consts.GITHUB_API_BASE_URL}/repos/${Consts.GITHUB_OWNER}/${Consts.GITHUB_REPO}/issues`,
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': `token ${Consts.GITHUB_ACCESS_TOKEN}`
        },
        json: true,
        transform: function (body, response, resolveWithFullResponse) {
            const issueTitleNumberMap = new Map();
            body.forEach(function (issue) {
                issueTitleNumberMap.set(issue['title'], issue['number']);
            });

            return issueTitleNumberMap;
        }
    });
}

/**
 * 创建issue
 *
 * @param title
 * @param labelName
 * @returns {Promise<void>}
 */
async function createIssue(title, labelName) {
    return await rp({
        method: 'POST',
        uri: `${Consts.GITHUB_API_BASE_URL}/repos/${Consts.GITHUB_OWNER}/${Consts.GITHUB_REPO}/issues`,
        body: {
            'title': title,
            'labels': [
                Consts.LABEL_DEFAULT,
                labelName
            ]
        },
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': `token ${Consts.GITHUB_ACCESS_TOKEN}`
        },
        json: true
    });
}

if (module === require.main) {
    execute();
}
