1.===== Province Functionality in Add/Edit Modal Flowchart=====
/*
+-----------------+
| Province Input  |
| Functionality   |
+-----------------+
          |
          v
+-----------------+
| Initialize      |
| provinces Array |
| with VN         |
| Provinces       |
+-----------------+
          |
          v
+-----------------+
| Render Initial  |
| Dropdown with   |
| All Provinces   |
+-----------------+
          |
          v
+-----------------+
| Event: Input    |
| on Province     |
| Field           |
+-----------------+
          |
          v
+-----------------+
| Filter Province |
| List Based on   |
| Input Text      |
+-----------------+
          |
          v
+-----------------+
| Re-render       |
| Dropdown with   |
| Filtered Results|
+-----------------+
          |
          v
+-----------------+
| Show Dropdown   |
| (Remove hidden  |
| Class)          |
+-----------------+
          |
          v
+-----------------+
| Event: Arrow    |
| Up/Down Keys    |
+-----------------+
          |
          v
+-----------------+
| Navigate Through|
| Dropdown Items  |
| with Keyboard   |
+-----------------+
          |
          v
+-----------------+
| Update Active   |
| Item Highlight  |
| and Auto-scroll |
+-----------------+
          |
          v
+-----------------+
| Event: Enter    |
| Key or Click    |
+-----------------+
          |
          v
+-----------------+
| Select Province |
| and Fill Input  |
| Field           |
+-----------------+
          |
          v
+-----------------+
| Event: Click    |
| Outside         |
+-----------------+
          |
          v
+-----------------+
| Hide Dropdown   |
| (Add hidden     |
| Class)          |
+-----------------+
          |
          v
+-----------------+
| When Saving:    |
| Include Province|
| in Employee     |
| Object          |
+-----------------+
*/


2. =====Province Display in Table Flowchart=====
/*
+-----------------+
| Province Display|
| in Table        |
+-----------------+
          |
          v
+-----------------+
| Initialize      |
| headers Array   |
| Including       |
| "province" field|
+-----------------+
          |
          v
+-----------------+
| In renderAll    |
| Function        |
+-----------------+
          |
          v
+-----------------+
| For Each        |
| Employee in     |
| filtered array  |
+-----------------+
          |
          v
+-----------------+
| Call            |
| renderTableRow  |
| with employee   |
+-----------------+
          |
          v
+-----------------+
| In renderTableRow|
| Loop Through    |
| headers         |
+-----------------+
          |
          v
+-----------------+
| When header is  |
| "province"      |
+-----------------+
          |
          v
+-----------------+
| Create TD cell  |
| with province   |
| value           |
+-----------------+
          |
          v
+-----------------+
| If searching:   |
| Check if province|
| matches search  |
+-----------------+
          |
          v
+-----------------+
| If match:       |
| Highlight text  |
| in province cell|
+-----------------+
          |
          v
+-----------------+
| Append province |
| cell to table   |
| row             |
+-----------------+
*/


3. =====Search Using searchStr Key Flowchart=====
/*
+-----------------+
| Search Using    |
| searchStr Key   |
+-----------------+
          |
          v
+-----------------+
| Initialize      |
| employees with  |
| searchStr field |
+-----------------+
          |
          v
+-----------------+
| Format searchStr|
| as Pipe-delimited|
| values: name|   |
| address|province||
| age             |
+-----------------+
          |
          v
+-----------------+
| Event: Input    |
| on Search Field |
+-----------------+
          |
          v
+-----------------+
| Get searchTerm  |
| from input value|
+-----------------+
          |
          v
+-----------------+
| Call            |
| searchBySearchStr|
| (searchTerm)    |
+-----------------+
          |
          v
+-----------------+
| Filter employees|
| where searchStr |
| contains the    |
| searchTerm      |
+-----------------+
          |
          v
+-----------------+
| Store results in|
| searchResults   |
| array           |
+-----------------+
          |
          v
+-----------------+
| Call            |
| renderBySearchStr|
| (searchResults) |
+-----------------+
          |
          v
+-----------------+
| Clear table body|
+-----------------+
          |
          v
+-----------------+
| For Each        |
| employee in     |
| searchResults   |
+-----------------+
          |
          v
+-----------------+
| Call            |
| renderTableRow  |
| (employee)      |
+-----------------+
          |
          v
+-----------------+
| Call            |
| highlightResultSStr|
| (searchResults,  |
| searchTerm)     |
+-----------------+
          |
          v
+-----------------+
| Find all non-   |
| action, non-ID  |
| cells in table  |
+-----------------+
          |
          v
+-----------------+
| For each cell   |
| that contains   |
| searchTerm      |
+-----------------+
          |
          v
+-----------------+
| Apply highlight |
| styling to      |
| matching text   |
+-----------------+
          |
          v
+-----------------+
| When Adding/    |
| Editing Employee|
+-----------------+
          |
          v
+-----------------+
| Update searchStr|
| with new values |
| name|address|   |
| province|age    |
+-----------------+
*/