let startIndex = 0;
const dots = [];
const itemsPerPage = 3;
const locations = [
  {
    name: "Docklands",
    image: "travel_des1.svg",
    introduction:
      "Docklands is situated immediately west of Melbourne's central business district and fronts the Yarra River and Victoria Harbour.",
  },
  {
    name: "Federation Square",
    image: "travel_des2.svg",
    introduction:
      "Federation Square is a modern piazza that has become the city centre's public square.",
  },
  {
    name: "Luna Park",
    image: "travel_des3.svg",
    introduction:
      "Luna Park Melbourne is a small Family Friendly Amusement Park in St Kilda.",
  },
  {
    name: "Flinders Station",
    image: "travel_des4.svg",
    introduction:
      "Flinders Street Station is Australia’s oldest train station.",
  },
  {
    name: "State Library",
    image: "travel_des5.svg",
    introduction:
      "State Library Victoria is Australia's oldest public library and one of the first free public libraries in the world.",
  },
  {
    name: "St Patrick's Cathedral",
    image: "travel_des6.svg",
    introduction:
      "St Patrick’s Cathedral is the mother church of the Catholic Archdiocese of Melbourne.",
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

const generateItem = (index) => {
  const li = document.createElement("li");
  li.classList.add("place");

  const img = document.createElement("img");
  img.src = `images/${locations[index].image}`;
  li.appendChild(img);

  const div = document.createElement("div");
  div.classList.add("hovered-content", "gradient-box");

  const h2 = document.createElement("h2");
  h2.classList.add("title");
  h2.textContent = locations[index].name;
  div.appendChild(h2);

  const p = document.createElement("p");
  p.classList.add("introduction");
  p.textContent = locations[index].introduction;
  div.appendChild(p);

  const readMoreDiv = document.createElement("div");
  readMoreDiv.classList.add("read-more");
  const link = document.createElement("a");
  link.href = "#";
  link.textContent = "Read More";
  readMoreDiv.appendChild(link);
  div.appendChild(readMoreDiv);
  li.appendChild(div);

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
  }
};

const placesList = document.querySelector(".places");
setup(placesList);
