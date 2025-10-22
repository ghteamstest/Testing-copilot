# How to Fix a Merge Conflict

This guide demonstrates how to identify and resolve merge conflicts in Git.

## What is a Merge Conflict?

A merge conflict occurs when Git cannot automatically merge changes from different branches because the same lines of code have been modified in both branches.

## Identifying a Merge Conflict

When you attempt to merge branches and a conflict occurs, Git will output:

```
Auto-merging <filename>
CONFLICT (content): Merge conflict in <filename>
Automatic merge failed; fix conflicts and then commit the result.
```

## Steps to Fix a Merge Conflict

### 1. Check the Status

Run `git status` to see which files have conflicts:

```bash
git status
```

Output will show:
```
Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both modified:   <filename>
```

### 2. Open the Conflicted File

Open the file in your editor. You'll see conflict markers:

```
<<<<<<< HEAD
Your current branch's changes
=======
The incoming branch's changes
>>>>>>> branch-name
```

### 3. Resolve the Conflict

Choose one of the following options:

**Option A: Keep your changes**
- Delete the incoming changes and conflict markers
- Keep only the content from the HEAD section

**Option B: Keep incoming changes**
- Delete your changes and conflict markers
- Keep only the content from the branch-name section

**Option C: Keep both changes**
- Merge both sets of changes appropriately
- Remove all conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)

**Option D: Write new content**
- Replace everything with entirely new content that combines the intent of both changes

### 4. Stage the Resolved File

After editing, mark the conflict as resolved:

```bash
git add <filename>
```

### 5. Complete the Merge

Commit the merge resolution:

```bash
git commit -m "Resolve merge conflict in <filename>"
```

Or if Git created a merge commit message for you, simply run:

```bash
git commit
```

## Example Resolution

In this repository, we demonstrated a merge conflict resolution:

1. Created `feature-branch-1` with "Feature 1" content
2. Created `feature-branch-2` with "Feature 2" content (conflicting with Feature 1)
3. Merged `feature-branch-1` into main branch successfully
4. Attempted to merge `feature-branch-2` → **Conflict!**
5. Resolved by keeping both features in Readme.md
6. Staged the file with `git add Readme.md`
7. Committed with `git commit -m "Resolve merge conflict by keeping both features"`

## Aborting a Merge

If you want to abandon the merge and start over:

```bash
git merge --abort
```

## Tips

- Always read the conflicted content carefully before making changes
- Test your code after resolving conflicts
- Communicate with your team about complex conflicts
- Use a merge tool for visual conflict resolution: `git mergetool`

## Common Merge Tools

- VS Code (built-in merge conflict resolver)
- KDiff3
- Meld
- P4Merge
- Beyond Compare

## Best Practices

1. **Keep branches up to date**: Regularly merge or rebase from the main branch
2. **Communicate**: Coordinate with teammates when working on the same files
3. **Small commits**: Make smaller, focused commits to reduce conflict complexity
4. **Pull before push**: Always pull latest changes before starting work
5. **Review carefully**: Double-check your resolution before committing
