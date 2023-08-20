# ApartmentRatings


This program allows users to store and retrieve data that would be used in relation to a website that collects and displays reviews for different apartments complexes.





## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Start Server:

`npm start`  

To Visit App:

`http://localhost:8000/api/v1/`  

## Reflection



This project was made, as a deep dive into building my first API able to be scaled depending on usage.

I said out to build an API that accomplishes the problem that I was interested in exploring in rating apartments. While I'm not looking to start a full website right now, this is something I was interested in exploring because I have been through the apartment hunting process at college. I was interested in making an API that interacted with data and held multiple important data points. One of the most interesting data points I worked with was the average price for the apartments. While lots of endpoints, just add or remove information, adding, removing, or updating a review, could change the price listed on the review meaning the entire apartment average price needed to be changed. This was interesting, because changing one object had effects on multiple bigger objects, and with something that I was interested in getting experience with.

Some of the bigger challenges I ran into with this was working with all the smaller pieces of an API that you wouldn’t necessarily think of in the beginning. I expected most of my work to be done with building endpoints and working with data, but it turned out a lot of my time was spent looking more into hosting and routing endpoints, as well as learning how to make clear documentation if someone were to use this in the future. All these little things that I didn’t expect helped me to realize that a lot more goes on behind the scenes than just the data an end user might see.

The tech I chose for this was based off of the scale that I knew I wanted the project on. Using express and node.js allowed me to test my project easily locally. I used mongo DB because I knew I wanted to store objects and it works well with the tech stack I was using. The choice of the language was due to the tools it allowed me to use when working with web development.


