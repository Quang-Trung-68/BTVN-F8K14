[ START GAME ]
    |
    V
+---------------------------------+
| Initialize Global Variables     |
| (countCurQuestion=0, resultPlayer,|
| questions, prizeMap, etc.)      |
+---------------------------------+
    |
    V
+---------------------------------+
| addEvent()                      |
| (Attach listeners to choices    |
|  A,B,C,D via createOptionHandler)|
+---------------------------------+
    |
    V
(MAIN_GAME_LOOP_START) <---------------------------------------------------------------------+
+---------------------------------+                                                     |
| curQuestion = questions[count]  |                                                     |
| IF (Not first question) THEN    |                                                     |
|   resetAllOptions()             |                                                     |
| ENDIF                           |                                                     |
| onShowQuestion()                |                                                     |
|   - clearAskAudience()          |                                                     |
|   - clearCall()                 |                                                     |
|   - showHelpForPlayer()         |                                                     |
|   - Update Prize/Level Display  |                                                     |
|   - Display Question & Options  |                                                     |
| startTimer()                    | (TIMER_REF_1)                                       |
|   - stopTimer() (if any)        |                                                     |
|   - timeLeft = 30               |                                                     |
|   - updateTimeDisplay()         |                                                     |
|   - setInterval --> (TIMER_TICK)|                                                     |
| isAnswer = false                |                                                     |
| isSelected = false              |                                                     |
| isNext = false (usually)        |                                                     |
+---------------------------------+
    |
    V
[AWAIT_USER_INPUT] -----------------------------------------------------------------------------------------------------.
    |                                                                                                                      |
    |--(User Clicks Answer A,B,C,D)-->+--------------------------+                                                         |
    |                                 | createOptionHandler(key) |                                                         |
    |                                 | - isSelected = true      |                                                         |
    |                                 | - curQuestion.userAns=key|                                                         |
    |                                 | - Highlight selection    |                                                         |
    |                                 +--------------------------+                                                         |
    |                                           |                                                                          |
    |<------------------------------------------+                                                                          |
    |                                                                                                                      |
    |--(User Clicks "Check Answer" btn)--------------------------------------------------------------------->(CHECK_ANSWER_LOGIC)
    |                                                                                                                      |
    |--(User Clicks "50:50" btn)------>+--------------------------+                                                         |
    |                                 |< !isAnswer ? > -----N-----> [AWAIT_USER_INPUT]                                     |
    |                                 |   Y                        |                                                         |
    |                                 V                          |                                                         |
    |                                 +--------------------------+                                                         |
    |                                 | use5050()                |                                                         |
    |                                 | halfAnswer.disabled=true |                                                         |
    |                                 +--------------------------+                                                         |
    |                                           |                                                                          |
    | <-----------------------------------------+                                                                          |
    |                                                                                                                      |
    |--(User Clicks "Ask Audience")--->+--------------------------+                                                         |
    |                                 |< !isAnswer ? > -----N-----> [AWAIT_USER_INPUT]                                     |
    |                                 |   Y                        |                                                         |
    |                                 V                          |                                                         |
    |                                 +--------------------------+                                                         |
    |                                 | askAudience()            |                                                         |
    |                                 | askAudienceBtn.disabled=true|                                                      |
    |                                 +--------------------------+                                                         |
    |                                           |                                                                          |
    | <-----------------------------------------+                                                                          |
    |                                                                                                                      |
    |--(User Clicks "Call Friend")---->+--------------------------+                                                         |
    |                                 | phoneCall()              |                                                         |
    |                                 | callPeople.disabled=true |                                                         |
    |                                 +--------------------------+                                                         |
    |                                           |                                                                          |
    | <-----------------------------------------+                                                                          |
    |                                                                                                                      |
    |--(User Clicks "Call Expert")---->+--------------------------+                                                         |
    |                                 | expertAdvice()           |                                                         |
    |                                 | callExpert.disabled=true |                                                         |
    |                                 +--------------------------+                                                         |
    |                                           |                                                                          |
    | <-----------------------------------------+                                                                          |
    |                                                                                                                      |
    |--(User Clicks "End Game" btn)--->+--------------------------+                                                         |
    |                                 | endGameAction()          |                                                         |
    |                                 |  - loseModal() (current score)|                                                    |
    |                                 |  - stopTimer()           |                                                         |
    |                                 +--------------------------+                                                         |
    |                                           |                                                                          |
    |                                           V                                                                          |
    |                                           (MODAL_DISPLAYED) --> (User clicks Restart? --> (RESTART_GAME_LOGIC))      |
    |                                                                   Else --> [END_GAME]                                |
    |                                                                                                                      |
    `--(TIMER_TICK from startTimer)-------------------------------------------------------------------------->(TIMER_TICK_LOGIC)


(CHECK_ANSWER_LOGIC)
+---------------------------------+
| Handle "Check Answer" Click     |
+---------------------------------+
    |
    V
< !isAnswer && isSelected ? > ----No----------------------------------------------------------------------------------> [AWAIT_USER_INPUT]
    | Yes
    V
+---------------------------------+
| isSelected = false              |
| checkAnswer()                   |
|   - stopTimer()                 |
|   - showResult() (Highlights)   |
+---------------------------------+
    |
    V
< curQuestion.isCorrect ? >
    | Yes                         | No
    V                             V
+-----------------------------+   +---------------------------------+
| Update Player Score & Level |   | loseModal() (Safe Score)        |
| (money, level, levelSafe)   |   |   - Display Lose Text/Score     |
| isAnswer = true             |   | isAnswer = false                |
+-----------------------------+   | isNext = true                   |
    |                             +---------------------------------+
    V                                       |
(AWAIT_CHECK_FOR_NEXT_Q)                    V
    |                                       (MODAL_DISPLAYED) --> (User clicks Restart? --> (RESTART_GAME_LOGIC))
    |                                                             Else --> [END_GAME_LOSE]
    |
    |--(User Clicks "Check Answer" btn AGAIN)-->
    |
    V
< isAnswer && curQuestion.isCorrect ? > --No--------------------------------------------------------------------------> [AWAIT_USER_INPUT]
    | Yes  (This implies isAnswer was true from previous correct, and now we proceed)
    V
+---------------------------------+
| isAnswer = false                |
| isNext = true                   |
| setTimeout(1000ms, DO_NEXT_Q)   |
+---------------------------------+
    |
    V
[AWAIT_USER_INPUT] (Waiting for timeout)


(DO_NEXT_Q)
+---------------------------------+
| Process Next Question           |
+---------------------------------+
    |
    V
| countCurQuestion++              |
    |
    V
< countCurQuestion >= questions.length ? >
    | Yes                         | No
    V                             V
+-----------------------------+   (Back to MAIN_GAME_LOOP_START for next question)-------------------------------------->O
| loseModal() (WINNER!)       |
|   - Display WIN Text/Score  |
+-----------------------------+
    |
    V
(MODAL_DISPLAYED) --> (User clicks Restart? --> (RESTART_GAME_LOGIC))
                      Else --> [END_GAME_WIN]


(TIMER_TICK_LOGIC) <--(from TIMER_REF_1)
+---------------------------------+
| Handle Timer Tick (every 1s)    |
+---------------------------------+
    |
    V
| timeLeft--                      |
| updateTimeDisplay()             |
| Update timeLeftElement Style    |
    |
    V
< timeLeft < 1 ? >
    | Yes                         | No
    V                             V (Timer continues)
+-----------------------------+   [AWAIT_USER_INPUT] (implicitly, timer runs in background)
| stopTimer()                 |
| loseModal() (Time's Up!)    |
| isAnswer = false            |
| isNext = true               |
+-----------------------------+
    |
    V
(MODAL_DISPLAYED) --> (User clicks Restart? --> (RESTART_GAME_LOGIC))
                      Else --> [END_GAME_LOSE_TIMEUP]
    |
    V (Code has this check, seems to ensure timer stops if modal already shown by other means)
< isNext ? > --Yes--> stopTimer()
    | No
    V
[AWAIT_USER_INPUT]


(RESTART_GAME_LOGIC)
+---------------------------------+
| Handle "Restart Game" Click     |
| (from Modal)                    |
+---------------------------------+
    |
    V
+---------------------------------+
| overlay.classList.add("hidden") |
| modal.classList.add("hidden")   |
| resetGame() (vars to initial)   |
| resetAllOptions()               |
| Enable Lifeline Buttons         |
|   (halfAnswer.disabled=false,etc)|
| isNext = false                  |
+---------------------------------+
    |
    V
(Back to MAIN_GAME_LOOP_START)----------------------------------------------------------------------------------------->O


[END_GAME]
[END_GAME_LOSE]
[END_GAME_WIN]
[END_GAME_LOSE_TIMEUP]
(All represent final states where game play has ceased unless restarted)

Notes:
- (MODAL_DISPLAYED) is a sub-state where the modal is visible, and the primary interaction is usually the Restart button.
- The loseModal() function is called from multiple places and updates the modal content (win/lose/score) accordingly.
- The O symbol is used as a connector for long jumps in the flowchart.
- The isAnswer and isNext flags are crucial for controlling flow, especially around checkAnswer and startTimer.
- The behavior where the user clicks the "Check Answer" button twice for a correct answer to proceed to the next question is represented in the flowchart.