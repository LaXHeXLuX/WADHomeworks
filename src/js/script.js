
function toggleMenu() {
  document.getElementById("user-menu").classList.toggle("visible");
}

window.onload = function() {
  /*fetch("https://api.jsonbin.io/v3/b/6546360b0574da7622c1e9b2", {
    headers: {
      "X-Access-Key": "$2a$10$wqK5k9KgCRowny1kkb.Fgu0H.XwrZa1n9PoNTYJKDH4eDx4TnDFPS"
    }
  })*/
  fetch('res/json/posts.json')
  .then((response) => 
    response.json()
  ).then(json => {
    let posts = document.getElementsByClassName("posts")[0]; // section to insert posts into

    let postsData = json./*record.*/posts; // the array of posts
    // If using the API to fetch instead of local file, remove the comment marking in this line as well

    for (const element of postsData) {
      let section = document.createElement("section");
      section.className = "post";

      let headerDiv = document.createElement("div"); // author and date
      headerDiv.className = "postHeader";

      let authorImage = document.createElement("img");
      authorImage.className = "postIcon";
      authorImage.src = "res/images/me.png";
      authorImage.alt = "User icon";
      
      let author = document.createElement("span");
      author.textContent = element.author;
      
      let authorDiv = document.createElement("div");
      authorDiv.appendChild(authorImage);
      authorDiv.appendChild(author);
      headerDiv.appendChild(authorDiv);
      
      let date = document.createElement("span");
      date.textContent = element.date;
      headerDiv.appendChild(date);


      let bodyDiv = document.createElement("div"); // text and/or image
      bodyDiv.className = "postBody";

      if (!element.postBody == "") {
        let text = document.createElement("p");
        text.innerHTML = element.postBody.replaceAll("\n", "<br>"); // replaces all new lines in texts
        bodyDiv.appendChild(text);
      }

      if (!element.postImage.url == "") {
        let image = document.createElement("img");
        image.className = "postImage";
        image.src = element.postImage.url;
        image.alt = element.postImage.name;
        bodyDiv.appendChild(image);
      }
      

      let footerDiv = document.createElement("div"); // like count
      footerDiv.className = "postFooter";

      let likeImage = document.createElement("img");
      likeImage.className = "postIcon";
      likeImage.src = "res/images/like.png";
      likeImage.alt = "Post reaction";
      footerDiv.appendChild(likeImage);

      let likeCount = document.createElement("span");
      likeCount.textContent = element.likeCount;
      footerDiv.appendChild(likeCount);

      section.appendChild(headerDiv);
      section.appendChild(bodyDiv);
      section.appendChild(footerDiv);

      posts.appendChild(section);
    }
  }).catch((error) => {
    console.error("Error fetching data: ", error);
  })

}