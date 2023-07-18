# Build Log

## Design

- Responsive
- Choose to show next section

- Accordion Question lists

- Data flow? Data context?
- Component separation?

## Log

### 0629

- intial project setup
- use vapor theme
- initial layout sections
- Mock API delays (via func returning a promise)

- Loading state for ROLE section
- accordion on Q&A sections

TODO

- styling accordion: add card border or change color scheme
- fix ROLE section loading state (2nd click triggers API again)
- Data flow => Show/hide & Loading state for all sections

New Tasks

- Reselecting same role do not refresh keywords
- keyword selection & hide QA until keyword selected
- expand qns + loading state + call API
- 3 API async functions! (Role, keyword, answer)
- layout: role & keyword center
- keyword 换行

### 0706

- Reselecting same role do not refresh keywords
- 3 API async functions! (Role, keyword, answer)

### 0707

- FIX & refactor role selection & show hide keywords section

TODO

- expand qns + loading state + call API
- Center role & keywords section
- keyword 换行

### 0710

- expand qns + loading state + call API

TODO

- HIDE API keys in environment variable!
- Center role & keywords section
- keyword 换行
- Responsive

### 0712

- `get-keywords` & `get-qas` handler function locally tested with API key
- deployed to AWS but cannot access openai API

- Connected API to front-end website
  - openai callable
  - query parameters not received correctly.

TODO

- ! Sync prettier & Eslint!
- ! HIDE API keys in environment variable!
- Center role & keywords section
- keyword 换行
- Responsive

### 0713

Dev setup

- set up proxy server, redirects localhost api call to deployed api gateway
  - set up cors since local website & proxy are on different port
  - don't use local server.js

API handler func

- updated API handler functions to receive multiValueQueryStringParameters
- added longer time-out in cdk (needs more time to wait for gpt response)

Front-end to API

- keywords API called successfully by button clicks with parameters sent
- format received output for display
- make query params coming from the buttons clicked

TODO

- refactor `App.tsx`, separate API functions & define types
- get questions first, then get individual answer.
  - get answer API
  - rename QAs
- multi-value keywords handle single value case
- URL constructor, append parameters
  - does it handle "1 yr - 3 yr" spaces?
- ! Add `try-catch` block to API handlers! (now not logging errors)
- ! Sync prettier & Eslint!
- ! HIDE API keys in environment variable!
- Center role & keywords section
- keyword 换行
- Responsive

### 0714

- refactor `App.tsx`, separate API functions & define types
- ename QAs
- URL constructor, append parameters
- handle "1 yr - 3 yr" spaces
- get answer API

Code Review

- Dev API URL set as environment variable
- use URL instead of URLSearchParams
- conditional set state: put logic inside the set()

TODO

- get questions first, then get individual answer => Accordion
- Call get answer API
- multi-value keywords handle single value case
- Improve API prompt for better result
- Move to constants, types file;
- API return object instead of array type;
- Change keywords to use set;

### 0717

- move constants to separate file
- move types to separate file
  - Moved get-keyword Request & Response type
- Support both dev URL and real URL
- Use const whenever possible
- change selectedKeywords from array to set
- API
  - openai configuration separate to helper functon
  - response in object type
  - Age group: string
  - keywords: support both single or multi-value

DOING

- API return Error handling
  - Deploy & test
- Front-End accept API response in object
  - test & Deploy

TODO

- API handle unexpected query string params?
