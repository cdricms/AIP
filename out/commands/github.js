"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepos = exports.deleteRepo = exports.createRepo = void 0;
const rest_1 = require("@octokit/rest");
const main_1 = require("../main");
const octokit = new rest_1.Octokit({ auth: main_1.env.token });
function createRepo(folderName, isPrivate) {
    octokit.repos
        .createForAuthenticatedUser({
        name: folderName,
        private: isPrivate,
        auto_init: true,
    })
        .then((data) => console.log("[GITHUB] ".red + "repository " + data.data.html_url.green));
}
exports.createRepo = createRepo;
function deleteRepo(repo) {
    octokit.users.getAuthenticated().then((user) => {
        octokit.repos
            .delete({ owner: user.data.login, repo })
            .then((data) => console.log("[GITHUB] ".red + "repository deleted"));
    });
}
exports.deleteRepo = deleteRepo;
function getRepos() {
    octokit.repos
        .listForAuthenticatedUser({ per_page: 100, sort: "updated" })
        .then((data) => {
        data.data.forEach((d) => {
            console.log(`${d.name}: ${d.private ? "Private".green : "Public".yellow}`);
        });
        console.log("TOTAL: ".green + data.data.length);
    });
}
exports.getRepos = getRepos;