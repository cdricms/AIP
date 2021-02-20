"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepos = exports.repoAlreadyExists = exports.deleteRepo = exports.createRepo = void 0;
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
    return __awaiter(this, void 0, void 0, function* () {
        const userData = yield octokit.users.getAuthenticated();
        const owner = userData.data.login;
        yield octokit.repos.delete({ owner, repo });
    });
}
exports.deleteRepo = deleteRepo;
function repoAlreadyExists(repo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield octokit.users.getAuthenticated();
            const repository = yield octokit.repos.get({
                owner: user.data.login,
                repo,
            });
            if (repository)
                return true;
        }
        catch (error) {
            return false;
        }
    });
}
exports.repoAlreadyExists = repoAlreadyExists;
function getRepos() {
    return __awaiter(this, void 0, void 0, function* () {
        const repos = yield octokit.repos.listForAuthenticatedUser({
            per_page: 100,
            sort: "updated",
        });
        repos.data.forEach((d) => {
            console.log(`${d.name}: ${d.private ? "Private".green : "Public".yellow}`);
        });
        console.log("TOTAL: ".green + repos.data.length);
    });
}
exports.getRepos = getRepos;
