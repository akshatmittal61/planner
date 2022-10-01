# Sending a Pull Request

Planner is an open source project and we love to receive contributions from our community — you!

Since it is a community project, so Pull Requests are always welcome, but, before working on a large change, it is best to open an issue first to discuss it with the maintainers.

When in doubt, keep your Pull Requests small. To give a Pull Request the best chance of getting accepted, don't bundle more than one feature or bug fix per Pull Request. It's often best to create two smaller Pull Requests than one big one.

1. Fork the repository.
2. Clone the fork to your local machine and add upstream remote:

```
git clone https://github.com/<your-username>/planner.git
git remote add upstream https://github.com/akshatmittal61/planner.git
```

3. Create a new branch for your feature or bug fix:

```
git checkout -b my-branch
```

4. Make your changes.
5. Commit your changes using a descriptive commit message.

```
git add .
git commit -m "Add some feature"
```

6. Push your branch to your fork on GitHub:

```
git push origin my-branch
```

7. In GitHub, send a pull request to `planner:master`.

If we suggest changes then:

8. Make the required updates.

9. Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

```
git rebase master -i

git push origin my-fix-branch -f
```

That's it! Thank you for your contribution!

We are monitoring for Pull Requests. We will review your Pull Request and either merge it, request changes to it, or close it with an explanation.

# Code of Conduct

This project and everyone participating in it is governed by the [Planner Code of Conduct](https://github.com/akshatmittal61/Planner/blob/master/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [Akshat Mittal](https://akshtmittal61.vercel.app/).

# License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/akshatmittal61/Planner/blob/master/LICENSE) file for details.
By contributing to [Planner](https://github.com/akshatmittal61/planner) GitHub repository, you agree to license your contribution under the [MIT license](https://github.com/akshatmittal61/Planner/blob/master/LICENSE).

# Acknowledgments

- [Akshat Mittal](https://akshatmittal61.vercel.app/)