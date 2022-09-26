# cp-contest-notifier
A firefox extension that provides details of upcoming CP contests from platforms like CodeForces, CodeChef and AtCoder.

<p align="center">
  <img src="https://user-images.githubusercontent.com/55916430/124091339-5bbae000-da73-11eb-8664-88dea67a6ddb.png">
</p>


## Use case
To add this extension to firefox, you'd just have to add a `credentials.json` file in your local clone, that includes username and api key values as received from [CLIST](https://clist.by) website login/signup.

The format of credentials should be `JSON`:

```code
{
  "username": "clist_username_here",
  "api_key": "clist_api_key_here"
}
```

NOTE:
1. Follow the naming **strictly** to avoid pushing the credentials to git.
2. Make sure to be logged in with CLIST while using the extension.

## Adding add-on to firefox permanently

To use the add-on on a daily basis, you'd need to install the add-on permanently. Follow the below steps for the same:

1. Wrap the required extension files in a `.zip` or `.xpi` file. (The compressed file should contain `mainfest.json`, `credentials.json`, `icons/` dir, `popup.html` and `popup.js`).
2. Now add this compressed file as add-on by going to `Extensions` -> `Settings icon` -> `Install add-on from file`.

You're good to go now!
