# Development

### Link to Deployed Website
`https://sillysloth888.github.io/cs130-development`

### Goal and Value of the Application
It can be difficult to find and discover albums to listen to if you don't know the artist already. This app allows you to sort and filter through a list of albums. You can add the albums you're interested in to a queue which displays the time it would take to listen to them all. 

Many of the albums were drawn from the "500 Greatest Albums of All Time" list published by the Rolling Stone, so the application allows you to discover high-quality albums in a much more digestible and interactive format compared to a listicle, as well as keep track of the specific albums you would like to listen to via the queue. 

### Usability Principles Considered
Visual Hierarchy: 
 - "Albums" and "Queue" headers clearly delineate each respective section
 - All album and queue items have the same look and size.
 - More important album info is a bigger font size and vice-versa
 - Control bar with sorting and filter options only extends the length of the album grid, indicating that sorting/filtering will only occur on the main aggregator objects (not the queue). 
 
Visual Design: 
 - Album items are displayed as squares organized into a grid, while queue items are displayed as rectangels organized into a list in order to create visual distinction between the sections. 
 - Purple is used to accent elements on the site that can be interacted with, such as the buttons to add and remove items from the queue, the sliders, and the checkboxes when they are checked. 


### Organization of Components
I created 6 total components. 
- `App` handles the main logic of the application, and contains all of the other components I created. 
- `AlbumItem` is the album card in the aggregator, and displays the album cover, name, artists, number of tracks, and runtime. It also contains the button to add an item to the queue. In the App component, a map function is applied to a list of albums to create each `AlbumItem`.
- `ControlBar` contains a dropdown menu for sorting, a range slider to filter by date, and a checkbox to include explicit content. The 'ControlBar` component contains the `DoubleRangeSlider` component
- `DoubleRangeSlider` contains the range slider used to filter by date. It was adapted from an example in the Material UI React documentation. 
- `Queue` contains the entire queue, including the title and total runtime elements, as well as the list of QueueItems which makes up the queue. 
- `QueueItem` displays an single album in the queue, showing the album's cover and name. It also contains a button that allows you to remove items from the queue. In the Queue component, a map function is applied to the `queue` state to create each `QueueItem`

### How Data is Passed Down Through Components

Data is passed down through Components via their props. 
- `AlbumItem` passes down an object `item` representing the info about the album to be displayed in the main aggregator, and a function `handleClick` which handles adding albums to the queue when the "Add to Queue" button is pressed. These props are passed down from the `App` component. 
- `ControlBar` passes down the `checked`, `sort`, and `rangeValue` states as well as their respective event handlers in order to handle the sorting and filtering options. It also passes down the min and mix release dates of the albums of the list (this is used to set the range of the release date slider filter). These props are passed down from the `App` component. 
- `DoubleRangeSlider` passes down the `rangeValue` state and its respective event handler, and the min and max release dates of the albums. These props are passed down via the `ControlBar` component's props.
- `Queue` passes down the list of albums in the queue, as well as a function `handleRemoveQueue` which handles removing albums from the queue when the "-" button is pressed. These props are passed down from the `App` component. 
- `QueueItem` passes down an object `queueItem` representing the info about an album to be displayed in the queue, and a function `handleRemoveQueue` which handles removing albums from the queue when the "-" button is pressed. These props are passed down via the `Queue` component's props. 

### How the User Triggers State Changes
My app contains four states. 

1. `queue` contains a list of albums which represent the queue. Clicking the "Add to Queue" button on an album card adds that album to the list. Clicking the minus button on an queue item removes that album from the list. 
2. `checked` represents the state of the "Include Explicit" checkbox. Checking the "Include Explicit" box sets the state to `true` while unchecking the box sets the state to `false`
3. `sort` represents the current sorting method used to display the albums. Selecting different options in the `"Sort by"` dropdown box changes the state to `"newest"`, `"oldest"`, and `"popular"` respectively. If no option has been selected, the state is `""`
4. `rangeValue` is a tuple that represents the lower and upper bound set by the Release Date slider. By dragging either end of the slider back or forth, the user changes the first integer in the tuple (the minimum) or the second integer in the tuple (the maximum). 
