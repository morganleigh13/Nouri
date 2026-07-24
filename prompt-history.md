Prompt history

## To start my application

- I want to build a front end application called Nouri using react, tailwind, daisy, redux toolkit, no backend, authentication, database, API calls yet.  We will use mock data only. 
The app should include a landing page that describes the services offered and a button to get started.  There should be a multistep survey that asks what type of fitness they enjoy or are open to trying. Their current activity level. What type of foods they are allergic to and enjoy.  If they have any restrictions, religious or vegan for example.  If they take any supplements. What their age, gender, weight and height are. Also add any other things in that would be helpful in helping someone make healthier lifestyle choices. I want to make some mock data using this to start.

## To get my dashboard/results page

- Next i would like to have all their information put onto a dashboard for them with reccomendations for them. I want their BMI to be calculated and if over or underweight I would like to give them reccomendations for food, fitness and supplements to help them get to an ideal weight.  In the survey, at the beginning we should ask them their goal in using this app.  is it to loose, gain, tone, etc.  Take their age into account when doing calculations.  We should make reccomendations that are not just things they listed but similar or adding those things to recipes. After we get their results I want to move onto navigation on that page to further delve into these results with additional resources for each reccomendation when they click a button. 

- Now the fitness section.  I would like real pictures of the exercises we are suggestioning.  If it is running then i want some different running techniques shown.  Like how to do HIIT Running or how long you should run at what pace. For strength reccomend some types of classes that are popular.  Weight lifting body weight moves etc.  Give examples.  When you click resources I would like there to be a list of places to do those activities by where that person lives.

-I want the fitness resources to be under the resources tab not the fitness one. You can put. links on the bottom of the fitness one so that it chooses resources dependent on what workout they want to do.  I would like multiple resources for each type of activity listing the name, location and hours and a link to that businesses website for each resource.

## When I inquired a problem with buttons firing correctly and the content on naviagtion

- When i press the get started button I should be able to run through the survey. The reset mock data should put mock data in there if you dont want to type in your own data. Reset mock data should rest mock data and take you to the dashboard. On the dashboard the BMI should show their range and also the range that is healthy using a colored bar or similar. I would like the navigational buttons to go to something more robust.  The food one should start with having reccomended recipies with a list of recipes that include their foods they choose along with like foods to help them accomplish their goals.

### Cursor Response: 

- I’ve identified the main flow bug: the “Get started” action currently jumps straight into the dashboard instead of the survey. I’m splitting those screens cleanly now so the onboarding experience reads correctly end to end.

## For organization and readability

- Cursor: This leaves App.jsx much smaller and more focused on screen state and rendering logic. If you want, the next clean-up step would be extracting the dynamic recommendation engine itself into a helper module as well. 
 - Dev: I would also like to use browser router, in my main file and then routes and route in App to futher clean it up.  Then we can split the landingpage and dashboard into its own components.  Then inside dashboard we can have each of the nav routes from their in their own components, importing them into dashboard.  Would that be best practice? If so i would like this done.

## Questioning code that Cursor wrote 

- Dev: If a wrapper is best then lets do that.  Is it best practice to have routes in the dashboard page? Please scan the whole site to make sure best practices are being used, the code is the most up to date syntax being used as of today and that we are using redux for as much of the state management as makes sense.

- Cursor response: The main improvement I’m making now is the router layout itself: the dashboard should be a true wrapper with nested child routes, rather than the dashboard page owning its own separate route tree.

## For styling