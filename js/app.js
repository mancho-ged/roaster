'use strict';
import HomeView from './views/HomeView.js';
import DetailsView from './views/DetailsView.js';

const PROJECT_DIRECTORY = '/roaster/';

const router = async () => {

    const route = [
        { path: PROJECT_DIRECTORY, view: HomeView},
        { path: PROJECT_DIRECTORY + 'details.html', view: DetailsView}
    ]
    // Test each route for potential match
    const potentialMatches = route.map(path => {
        return {
            path,
            isMatch: location.pathname === path.path
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if(match) {
      const view = new match.path.view();
      view.getView();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    router();

    const newEntryBtn = document.createElement("button");
    newEntryBtn.id = "new-entry";
    newEntryBtn.classList.add("btn", "mb");
    newEntryBtn.textContent = "New Employee";
    app.appendChild(newEntryBtn);

    $('#new-entry').on("click", function() {
      $('#new-entry-form').slideToggle();
      console.log('click');
    })
    
})

