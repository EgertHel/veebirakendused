/* jshint esversion: 6 */

window.onload = function() {
    // Task 4
    /*
    fetch('https://690285dab208b24affe66246.mockapi.io/api/v1/posts')
     .then(response => response.json())
        .then(json => {
    */
    fetch('res/json/posts.json')
     .then(response => response.json())
        .then(json => { 
            console.log(json); // Test, what data did we get from endpoint
            for(let i = 0; i < json.length; i++) {
                // Create elements
                let obj = json[i];
                var section = document.createElement("section");
                var header = document.createElement("header");
                var a = document.createElement("a");
                var profile = document.createElement("img");
                var date = this.document.createElement("p");
                var postText = document.createElement("p");
                var footer = document.createElement("footer");
                var like = document.createElement("i");

                section.className = "post";

                // Post header
                header.className = "postHeader";
                a.className = "logo";
                a.href = "#";
                profile.src = 'res/images/profile.jpg';
                profile.alt = "Profile";
                date.innerText = new Date(obj.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                });
                a.appendChild(profile);
                header.appendChild(a);
                header.appendChild(date);
                section.appendChild(header);
                
                // Don't create postImg unless the path is not null
                if (obj.imagePath != null) {
                    var postImg = document.createElement("img");
                    postImg.className = "postImage";
                    postImg.src = obj.imagePath;
                    postImg.alt = "Post image";
                    section.appendChild(postImg);
                }
                
                // Post text content
                postText.className = "postText";
                postText.innerText = obj.content;
                section.appendChild(postText);

                // Post footer
                footer.className = "postFooter";
                like.className = "fa-solid fa-thumbs-up like";
                footer.appendChild(like);
                section.appendChild(footer);

                // Add post to the timeline
                var timeline = document.getElementById('timeline');
                timeline.appendChild(section);
            }
            
        })
        .catch(err => {
            let errDiv = document.createElement("div");
            errDiv.className = 'post';
            errDiv.innerText = err;
            var timeline = document.getElementById('timeline');
            timeline.appendChild(errDiv);
        });
};