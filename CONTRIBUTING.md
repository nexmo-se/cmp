# CONTRIBUTING GUIDELINE
Thanks for having time to read this guideline. We are really excited for your contribution. If you don't know what this project about, feel free to reach us directly via Slack (#ask-cse).

If you are a new comer to CSE team, welcome to CSE team. Please read this guide carefully. We are at #ask-cse is open for your questions.

Table of Content:
  - [Environment Setup](./CONTRIBUTING.md#environment-setup)
  - [How to Report a Bug](./CONTRIBUTING.md#how-to-report-a-bug)
  - [How to Submit Changes](./CONTRIBUTING.md#how-to-submit-changes)
  - [Merge to Master](./CONTRIBUTING.md#merge-to-master)
  - [Style Guide](./CONTRIBUTING.md#style-guide)
  - [Your First Contribution](./CONTRIBUTING.md#your-first-contribution)

## Environment Setup
For the environment setup, you can refer to [README](./README.md#Installation). In short, there are 2 configuration files that you need to setup for the first time
  - `.env`, please refer to `.env.example`
  - `nexmo.ini`, please refer to `nexmo.ini.example`

## How to Report a Bug
Please raise your concern or bug directly to our Slack (#ask-cse) before putting it to JIRA. After we receive your bug request, we will evaluate your request and put NIDS ticket inside JIRA. 

To better understand your report, please use below template when reporting a bug:
  - Demo Name:
  - What have you done:

## How to Submit Changes
We are welcome to all CSE's team to contribute and submit changes or adding new demo to `nids-nodejs`. To do so, please follow below steps:
  1. Create a branch from `develop`. Please refer [Style Guide](./CONTRIBUTING.md#branch-naming) for creating branch.
  2. Checkout to your branch using `git checkout` command.
  3. Work, work and work :computer:
  4. Test your code, searching for missed bugs :mag:
  5. Whenever you are ready, merge `develop` branch to `your_branch`.
  6. Solve any merge conflict that may happen when mergin.
  7. Once you don't have any conflict, push your branch to `develop` and `your_branch`.

:notebook: TODO: We might have an option to do PR instead of merging `develop` branch with `your_branch` directly from CLI. However, considering from our team size, it is not required at the moment.

## Merge to Master
:notebook: TODO: Write something about how to comit to `master` branch.

## Style Guide
This section, you will learn to comply with our code style and contribution style. 
There are 3 type of style and guide.
  - [Adding new demo](./src/router)
  - [Adding new service](./src/services)
  - [Branch naming](./CONTRIBUTING.md#branch-naming)
  - [Commit message](./CONTRIBUTING.md#commit-message).

### Branch Naming
We will enforce a standard barnch naming. Please follow the naming convention closely.
  - `demo/*` for creating or maintaining a demo. Please use JIRA ticket number instead of your own demo name.
  - `fix/*` for maintaining the core engine. Please use JIRA ticket number if any.

You need to use all CAPTIAL CASE for the naming. Example, `demo/NIDS-10`.

:notebook: TODO: In the event that the JIRA ticket has not been created, I am suggesting to add the JIRA ticket before creating the branch.

### Commit Message
There is not certain guideline for the commit message. However, please write a meaningful commit message. Don't write `commit something`. If I found that, you need to buy me a glass wine :wine_glass:.

## Your First Contribution
This example is to help you better understand the contribution process. 

Assuming that you want to develop a new demo called `NIDS-10`. Here is what you need to do in Git command
  1. `git checkout develop`
  2. `git branch demo/NIDS-10`
  3. Work, work and work :computer:. Commit using `git commit -m <your_message_here>`
  4. Test, test and test :mag:
  5. `git merge develop`
  6. Resolve conflict if any.
  7. `git push origin demo/NIDS-10`
  8. `git checkout develop`
  9. `git merge demo/NIDS-10`
  10. `git push origin develop`

