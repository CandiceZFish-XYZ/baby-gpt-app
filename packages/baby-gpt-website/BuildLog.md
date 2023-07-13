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
