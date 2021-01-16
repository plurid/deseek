<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/deseek/master/about/identity/deseek-logo.png" height="250px">
    <br />
    <br />
    <a target="_blank" href="https://github.com/plurid/deseek/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-DEL-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: DEL">
    </a>
</p>



<h1 align="center">
    deseek
</h1>


<h3 align="center">
    Question Querypath Grader
</h3>



<br />



`deseek` is a [product](https://deseek.plurid.com) or self-hosted question querypath grader.


### Contents

+ [About](#about)
+ [Usage](#usage)
+ [Packages](#packages)
+ [Codeophon](#codeophon)



## About

A `querypath` refers to the entities with which one interacts when trying to answer a question.

Consider a classic question such as: 'what is 5 summed up with 7'. The answer might spring to mind in a blink, however, it might not. A simply query in an omnibox for 'calculator' will bring up the calculator interface. However, since it is a more or less true omnibox, one could write '5 + 7' or even '5 summed with 7'. Analysing the `querypath` of a question can tell more about the insight the answerer has about their reality than the mere giving of an answer, albeit fast and correctly. Knowing that the answerer knows about such a contraption as `calculator`, and knows how to query for it, is more important than the answer.

What do we care about when answering a question? - The answer must be correct and fast. And the common grading systems account for these. However, when trying to learn something, the way you reach the answer is as important, if not more important, than the answer itself.

There are two types of questions? Questions to which you can know the answer with a fair use of energytime (from a few seconds up to a few hours), and questions which are unanswerable regardless of the energytime spent on them or which require tremendous amounts of energytime (thousands of hours and beyond).



## Usage

Deseek is implemented for the plurid.com machine ([plurid.com/deseek](https://plurid.com/deseek)) and can be implemented on any other machine.

The deseek browser extension can record deseeks using an ID. The ID has the format

```
<domain>::<value>
```

The domain can be missing, and then it is assumed to be `plurid.com`, which further resolves to `api.plurid.com/graphql`.

The browser extension will resolve a domain by `POST`ing to `<domain>/deseek` the following request

``` json
{
    request: "api"
}
```

and expects the response

``` json
{
    api: "path/to/graphql/endpoint"
}
```

The extension will then communicate with the endpoint, uploading the record.



## Packages

<a target="_blank" href="https://www.npmjs.com/package/@plurid/deseek-server">
    <img src="https://img.shields.io/npm/v/@plurid/deseek-server.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/deseek-server][deseek-server] • the server application

[deseek-server]: https://github.com/plurid/deseek/tree/master/packages/deseek-server



## [Codeophon](https://github.com/ly3xqhl8g9/codeophon)

+ licensing: [delicense](https://github.com/ly3xqhl8g9/delicense)
+ versioning: [αver](https://github.com/ly3xqhl8g9/alpha-versioning)
