# Pull Request Guidelines

## Overview

This repository uses an approval-based workflow for pull requests to ensure code quality and collaborative review.

## Approval Requirements

All pull requests require approval before merging. The approval process is managed through:

1. **CODEOWNERS**: Automatically requests reviews from designated code owners
2. **GitHub Actions**: Validates PR status and provides approval visibility
3. **Branch Protection**: Enforces approval requirements (configured in repository settings)

## How to Submit a PR for Approval

1. **Create a Pull Request**
   - Push your changes to a feature branch
   - Open a pull request against the main branch
   - Provide a clear title and description

2. **Automatic Review Requests**
   - Code owners will automatically be requested for review
   - Check the CODEOWNERS file to see who will be notified

3. **Address Review Comments**
   - Respond to reviewer feedback
   - Make necessary changes
   - Request re-review if needed

4. **Wait for Approval**
   - At least one approval is required
   - The PR approval workflow will validate the status
   - Once approved, the PR can be merged

## CODEOWNERS

The `.github/CODEOWNERS` file defines who is responsible for reviewing code in different parts of the repository. All PRs will automatically request review from the appropriate owners.

## Workflow Automation

The `.github/workflows/pr-approval.yml` workflow:
- Runs on PR events (open, sync, review)
- Checks approval status
- Provides visibility into the review process
- Complements branch protection rules

## Branch Protection Rules

For complete enforcement, repository administrators should configure branch protection rules:

1. Go to repository Settings → Branches
2. Add a branch protection rule for the main branch
3. Enable "Require a pull request before merging"
4. Enable "Require approvals" (set minimum number)
5. Enable "Require review from Code Owners"
6. Enable "Dismiss stale pull request approvals when new commits are pushed"

## Best Practices

- Keep PRs focused and small
- Write clear commit messages
- Provide context in PR descriptions
- Respond promptly to review feedback
- Be respectful and constructive in reviews
