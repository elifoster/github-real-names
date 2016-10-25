# Changelog
## Version 1
### 1.2.0
* Improve performance significantly by caching usernames with simple-storage instead of submitting a request for every instance of every username.
* Add support for issue/pull request URLs that link directly to a comment (#issuecomment-####)
* Update for GitHub's new selectors

### 1.1.1
* Decode HTML entities in real names (#4).

### 1.1.0
* Replace usernames with real names in commits and the GitHub dashboard.
* Improve the regex used to determine when to call certain content scripts. This should improve performance when on pages that are not having anything replaced.

### 1.0.1
* Major security fixes (#1):
  * Use textContent instead of innerHTML.
  * Skip assigning the repository author name (elifoster in elifoster/github-real-names).

### 1.0.0
* Initial release