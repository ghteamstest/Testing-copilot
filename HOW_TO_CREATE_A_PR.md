# How to Create a Pull Request

This guide will walk you through the process of creating a Pull Request (PR) on GitHub.

## What is a Pull Request?

A Pull Request is a way to propose changes to a repository. It allows you to notify project maintainers about changes you'd like to make, discuss those changes, and ultimately merge them into the main codebase.

## Prerequisites

Before creating a Pull Request, you should have:

- A GitHub account
- Git installed on your local machine
- A forked repository (for external contributions) or access to the repository (for team members)

## Step-by-Step Guide

### 1. Fork the Repository (For External Contributors)

If you're not a direct collaborator on the repository:

1. Navigate to the repository on GitHub
2. Click the **Fork** button in the upper right corner
3. This creates a copy of the repository under your GitHub account

### 2. Clone the Repository

Clone the repository to your local machine:

```bash
# If you forked the repository
git clone https://github.com/YOUR-USERNAME/REPOSITORY-NAME.git

# If you're a direct collaborator
git clone https://github.com/ORGANIZATION/REPOSITORY-NAME.git
```

### 3. Create a New Branch

Always create a new branch for your changes:

```bash
# Navigate to the repository directory
cd REPOSITORY-NAME

# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or use the newer syntax
git switch -c feature/your-feature-name
```

**Branch naming conventions:**
- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation updates
- `refactor/description` - for code refactoring

### 4. Make Your Changes

1. Make the necessary changes to the files
2. Test your changes thoroughly
3. Ensure your code follows the project's coding standards

### 5. Commit Your Changes

Stage and commit your changes with a clear, descriptive message:

```bash
# Stage specific files
git add file1.js file2.js

# Or stage all changes
git add .

# Commit with a descriptive message
git commit -m "Add feature: brief description of your changes"
```

**Good commit message practices:**
- Use the imperative mood ("Add feature" not "Added feature")
- Keep the first line under 50 characters
- Provide additional details in the body if needed
- Reference issue numbers if applicable (e.g., "Fixes #123")

### 6. Push Your Changes

Push your branch to GitHub:

```bash
# Push to your fork
git push origin feature/your-feature-name

# If it's your first push on this branch
git push -u origin feature/your-feature-name
```

### 7. Create the Pull Request

1. Navigate to the repository on GitHub
2. You should see a banner saying "Compare & pull request" - click it
   - If you don't see this, go to the "Pull requests" tab and click "New pull request"
3. Select the base branch (usually `main` or `master`) and compare it with your feature branch
4. Fill in the PR template:
   - **Title**: Write a clear, concise title describing your changes
   - **Description**: Provide details about what changes you made and why
   - Include any relevant issue numbers
   - Add screenshots if your changes affect the UI
   - Mention any breaking changes

### 8. Submit and Follow Up

1. Click **Create pull request**
2. Wait for reviewers to provide feedback
3. Address any requested changes by:
   - Making additional commits to the same branch
   - Pushing the changes (they'll automatically appear in the PR)
4. Engage in discussions and respond to comments
5. Once approved, a maintainer will merge your PR

## Best Practices

### Before Creating a PR

- ✅ Pull the latest changes from the main branch
- ✅ Run all tests and ensure they pass
- ✅ Run linters and fix any code style issues
- ✅ Review your own changes first
- ✅ Keep your changes focused (one feature/fix per PR)

### Writing a Good PR Description

- Explain **what** you changed and **why**
- Include screenshots or GIFs for UI changes
- List any dependencies or related PRs
- Mention any breaking changes
- Reference relevant issues using keywords:
  - `Fixes #123`
  - `Closes #123`
  - `Resolves #123`

### During Review

- Be responsive to feedback
- Be open to suggestions
- Ask questions if something is unclear
- Keep discussions professional and constructive
- Update your PR based on feedback promptly

### PR Size

- Keep PRs small and focused
- Large PRs are harder to review and more likely to have issues
- If you have a large feature, consider breaking it into multiple PRs

## Common Commands Reference

```bash
# Update your local main branch
git checkout main
git pull origin main

# Update your feature branch with latest main
git checkout feature/your-feature-name
git merge main
# Or use rebase for a cleaner history
git rebase main

# View status of your changes
git status

# View differences in your changes
git diff

# Amend the last commit (if you forgot something)
git add forgotten-file.js
git commit --amend

# Push amended commit (only if not yet reviewed)
git push --force-with-lease origin feature/your-feature-name
```

## Troubleshooting

### Merge Conflicts

If you encounter merge conflicts:

1. Pull the latest changes from the base branch
2. Resolve conflicts in the affected files
3. Mark conflicts as resolved: `git add <resolved-files>`
4. Complete the merge: `git commit`
5. Push the changes

### PR Shows Unexpected Changes

- Make sure you created your branch from the latest main branch
- Check that you're comparing against the correct base branch
- Verify you haven't accidentally included unrelated commits

### Need to Make Changes After Creating PR

Just make more commits to the same branch and push them - they'll automatically appear in the PR.

## Resources

- [GitHub's Official Pull Request Documentation](https://docs.github.com/en/pull-requests)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)

## Getting Help

If you're stuck or have questions:

- Ask in the PR comments
- Check the repository's CONTRIBUTING.md file
- Reach out to the maintainers
- Consult GitHub's documentation

---

Happy contributing! 🚀
