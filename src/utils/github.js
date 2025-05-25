export async function fetchPublicRepos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  if (!response.ok) throw new Error('Failed to fetch repos');
  return response.json();
}
