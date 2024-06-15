let startIndex = 0;
const dots = [];
const itemsPerPage = 3;
const locations = [
  {
    name: "Docklands",
    image: "travel_des1.svg",
    introduction:
      "Docklands is situated immediately west of Melbourne's central business district and fronts the Yarra River and Victoria Harbour.",
    detailedDescription: [
      "Adorned with art sculptures and apartment buildings, Docklands is a contemporary waterfront dining, retail and entertainment hub.",
      "Wander through the pedestrian plazas to admire public murals and light displays. Head to The District Docklands to browse high-end fashion, jewellery and lifestyle pieces in an open-air shopping mall.",
    ],
    location: "440 Docklands Dr, Docklands VIC 3008",
    background: "travel_bg1.svg",
  },
  {
    name: "Federation Square",
    image: "travel_des2.svg",
    introduction:
      "Federation Square is a modern piazza that has become the city centre's public square.",
    detailedDescription: [
      "Stand beneath the clocks of Melbourne's iconic railway station, as tourists and Melburnians have done for generations. Hop on a train to explore outer-Melbourne suburbs, or join a tour to learn more about the history of the grand Flinders Street Station.",
    ],
    location:
      "Corner Flinders Street and Swanston Street, Melbourne, Victoria, 3000",
    background: "travel_bg2.svg",
  },
  {
    name: "Luna Park",
    image: "travel_des3.svg",
    introduction:
      "Luna Park Melbourne is a small Family Friendly Amusement Park in St Kilda.",
    detailedDescription: [
      "Luna Park was built by American showman J.D. Williams, together with the Phillips brothers Harold, Leon and Herman. Not much is known of their background, but they were involved in the building of picture theatres in Spokane, Washington and Vancouver before coming to Sydney in 1909 and quickly establishing a chain of luxury cinemas in that city and then Melbourne.",
    ],
    location: "18 Lower Esplanade, St Kilda, Victoria, 3182",
    background: "travel_bg3.svg",
  },
  {
    name: "Flinders Street Station",
    image: "travel_des4.svg",
    introduction:
      "Flinders Street Station is Australia’s oldest train station.",
    detailedDescription: [
      "Stand beneath the clocks of Melbourne's iconic railway station, as tourists and Melburnians have done for generations. Hop on a train to explore outer-Melbourne suburbs, or join a tour to learn more about the history of the grand Flinders Street Station.",
    ],
    location: "Swanston St & Flinders St Melbourne 3000",
    background: "travel_bg4.svg",
  },
  {
    name: "State Library",
    image: "travel_des5.svg",
    introduction:
      "State Library Victoria is Australia's oldest public library and one of the first free public libraries in the world.",
    detailedDescription: [
      "Established in 1854 as the Melbourne Public Library, State Library Victoria is Australia's oldest public library and one of the first free public libraries in the world.",
      "A Melbourne landmark and cultural icon, the library is a magnificent 19th-century building with some of the city’s most beautiful heritage interiors. A special highlight is the La Trobe Reading Room, with its majestic octagonal domed ceiling.",
    ],
    location: "328 Swanston St Melbourne 3000",
    background: "travel_bg5.svg",
  },
  {
    name: "St Patrick's Cathedral",
    image: "travel_des6.svg",
    introduction:
      "St Patrick’s Cathedral is the mother church of the Catholic Archdiocese of Melbourne.",
    detailedDescription: [
      "Located on Eastern Hill in the heart of bustling Melbourne, St. Patrick’s is surrounded by Albert Street, Lansdowne Street, Gisborne Street, and Cathedral Place. Just across the road from the cathedral, you can also find St. Peter’s Church, which was completed in 1848 and remains the Anglican parish church of Melbourne.",
      "The cathedral itself boasts a traditional format, featuring an east-west axis and an altar that lies at the far eastern end. This is to symbolise the belief of Christ and his resurrection. The rest of the plan takes on the shape of a Latin cross, with a nave and wide aisles that are characteristic of these kinds of churches. Inside, there is a sanctuary with no less than seven chapels.",
    ],
    location: "1 Cathedral Pl, East Melbourne VIC 3002",
    background: "travel_bg6.svg",
  },
];

const checkArrows = () => {
  const leftArrow = document.querySelector(".left-arrow");
  const righttArrow = document.querySelector(".right-arrow");
  if (startIndex === 0) {
    // Hide the left arrow
    leftArrow.style.visibility = "hidden";
    righttArrow.style.visibility = "visible";
  } else if (startIndex >= locations.length - itemsPerPage) {
    // Hide the right arrow
    leftArrow.style.visibility = "visible";
    righttArrow.style.visibility = "hidden";
  }
};

// Click "Read more" to show popup
const showPopup = (event) => {
  // Get item index from clicking
  const closestListItem = event.target.closest("li");
  const currentIndex = Number(closestListItem.getAttribute("data-value"));
  const popupOverlay = document.querySelector("#overlay-pop-up");
  const popup = document.querySelector(".pop-up");
  popup.style.backgroundImage = `linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(55, 47, 47, 0.5),
      rgba(55, 47, 47, 0.95),
      rgba(55, 47, 47, 1),
      rgba(55, 47, 47, 1),
      rgba(55, 47, 47, 1)
    ),
    url("images/${locations[currentIndex].background}")`;
  const title = popup.querySelector(".section-title");
  title.textContent = locations[currentIndex].name;
  const description = popup.querySelector(".detailed-intro");
  description.innerHTML = locations[currentIndex].detailedDescription
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
  const location = popup.querySelector(".location span");
  location.textContent = locations[currentIndex].location;
  popupOverlay.style.display = "flex";
};

// Click "close" to hide popup
const hidePopup = (event) => {
  const popupOverlay = document.querySelector("#overlay-pop-up");
  popupOverlay.style.display = "none";
};

const generateItem = (index) => {
  const li = document.createElement("li");
  li.classList.add("place");

  const img = document.createElement("img");
  img.src = `images/${locations[index].image}`;
  li.appendChild(img);

  const div = document.createElement("div");
  div.classList.add("hovered-content", "gradient-box");

  const h2 = document.createElement("h2");
  h2.classList.add("location-title");
  h2.classList.add("title");
  h2.textContent = locations[index].name;
  div.appendChild(h2);

  const p = document.createElement("p");
  p.classList.add("introduction");
  p.textContent = locations[index].introduction;
  div.appendChild(p);

  const readMoreDiv = document.createElement("div");
  readMoreDiv.classList.add("btn-wrapper");
  const button = document.createElement("button");
  button.classList.add("btn");
  button.textContent = "Read More";
  // Add event listener to read more button
  li.addEventListener("click", showPopup);
  readMoreDiv.appendChild(button);
  div.appendChild(readMoreDiv);

  li.appendChild(div);
  li.setAttribute("data-value", index);
  li.setAttribute("data-value", index);

  // Add event listener
  li.addEventListener("mouseover", placeOnHover);
  li.addEventListener("mouseleave", placeOnLeave);
  return li;
};

// Generate dots as position indicator
const generateIndicator = () => {
  const amount = Math.ceil(locations.length / itemsPerPage);
  const indicator = document.querySelector(".indicator");
  for (let i = 0; i < amount; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dots.push(dot);
    indicator.appendChild(dot);
  }
};

const checkIndicator = () => {
  const activeIndex = Math.floor(startIndex / itemsPerPage);
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[activeIndex].classList.add("active");
};

const setup = (placesList) => {
  for (let i = 0; i < locations.length; i++) {
    const place = generateItem(i);
    placesList.appendChild(place);
  }
  checkArrows();
  generateIndicator();
  checkIndicator();
};

// Handler when arrow click
const arrowClick = (factor) => {
  const places = document.querySelector(".places");
  const x = factor * 50;
  const offsetX = factor * 16;
  places.style.transform = `translateX(${x}%) translateX(${offsetX}px)`;
  startIndex = factor < 0 ? startIndex + 3 : startIndex - 3;
  checkArrows();
  checkIndicator();
};

// Handler when mouse hovering on location
const placeOnHover = (event) => {
  const closestListItem = event.target.closest("li");
  if (closestListItem) {
    const image = closestListItem.querySelector("img");
    image.style.width = "100%";
    const hiddenContent = closestListItem.querySelector(".hovered-content");
    hiddenContent.style.visibility = "visible";
    const bgImg = document.querySelector("#bg-image");
    const currentIndex = Number(closestListItem.getAttribute("data-value"));
    bgImg.src = `images/${locations[currentIndex].background}`;
    bgImg.style.visibility = "visible";
  }
};

// Handler when mouse leaves location
const placeOnLeave = (event) => {
  const closestListItem = event.target.closest("li");
  if (closestListItem) {
    const image = closestListItem.querySelector("img");
    image.style.width = "85%";
    const hiddenContent = closestListItem.querySelector(".hovered-content");
    hiddenContent.style.visibility = "hidden";
    const bgImg = document.querySelector("#bg-image");
    bgImg.style.visibility = "hidden";
  }
};

const placesList = document.querySelector(".places");
setup(placesList);
