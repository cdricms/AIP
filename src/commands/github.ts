import { Octokit } from "@octokit/rest";
import { env } from "../main";
const octokit = new Octokit({ auth: env.token });

export function createRepo(folderName: string, isPrivate: boolean) {
  octokit.repos
    .createForAuthenticatedUser({
      name: folderName,
      private: isPrivate,
      auto_init: true,
    })
    .then((data) =>
      console.log("[GITHUB] ".red + "repository " + data.data.html_url.green)
    );
}

export function deleteRepo(repo: string) {
  octokit.users.getAuthenticated().then((user) => {
    octokit.repos
      .delete({ owner: user.data.login, repo })
      .then((data) => console.log("[GITHUB] ".red + "repository deleted"));
  });
}

export function getRepos() {
  octokit.repos
    .listForAuthenticatedUser({ per_page: 100, sort: "updated" })
    .then((data) => {
      data.data.forEach((d) => {
        console.log(
          `${d.name}: ${d.private ? "Private".green : "Public".yellow}`
        );
      });
      console.log("TOTAL: ".green + data.data.length);
    });
}
