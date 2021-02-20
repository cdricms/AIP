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

export async function deleteRepo(repo: string) {
  const userData = await octokit.users.getAuthenticated();
  const owner = userData.data.login;
  await octokit.repos.delete({ owner, repo });
}

export async function repoAlreadyExists(repo: string) {
  try {
    const user = await octokit.users.getAuthenticated();
    const repository = await octokit.repos.get({
      owner: user.data.login,
      repo,
    });

    if (repository) return true;
  } catch (error) {
    return false;
  }
}

export async function getRepos() {
  const repos = await octokit.repos.listForAuthenticatedUser({
    per_page: 100,
    sort: "updated",
  });

  repos.data.forEach((d) => {
    console.log(`${d.name}: ${d.private ? "Private".green : "Public".yellow}`);
  });

  console.log("TOTAL: ".green + repos.data.length);
}
