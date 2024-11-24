//!header
const navbar = document.querySelector('.navbar-wrapper');
const link = navbar.querySelectorAll(".nav-links a");
const logoLink = navbar.querySelector(".logo a");

window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;

    if (scrollPosition <= 98) {
        updateStyle("transparent", "none", "white");
        updateColor("white", "white", true);
    } else if (scrollPosition > 98 && scrollPosition < 630) {
        updateStyle("rgba(0, 0, 0, 0.3)", "none", "white");
        updateColor("white", "white", false);
    } else {
        updateStyle("white", "0 1px 5px -1px gray", "black");
        updateColor("rgba(0, 0, 0, 0.5)", "black", true);
    }

});

function updateColor(color, hoverColor, hover) {
    link.forEach(a => {
        if (hover) {
            if (!a.hasHoverEvents) {
                a.addEventListener("mouseover", function () {
                    a.style.color = hoverColor;
                });
                a.addEventListener("mouseout", function () {
                    a.style.color = color;
                });
                a.hasHoverEvents = true;
            }
        } else {
            a.removeEventListener("mouseover", null);
            a.removeEventListener("mouseout", null);
            a.hasHoverEvents = false;
        }
        a.style.color = color;
    }

    );

}

function updateStyle(bgColor, bShadow, colors) {
    navbar.style.backgroundColor = bgColor;
    navbar.style.boxShadow = bShadow;
    logoLink.style.color = colors;
}


//! SLIDER
const rightBtn = document.querySelector(".slide-right");
const leftBtn = document.querySelector(".slide-left");
const paginationElement = document.querySelector(".pagination");
const slides = document.querySelectorAll(".slider-wrapper");

let index = 0;


slides.forEach((slide, i) => {
    if (i == index) {
        paginationElement.innerHTML += `<div class="pag" data-id="${i}">
        <span id="dot"></span>
        </div>`;
    } else {
        paginationElement.innerHTML += `<div class="pag" data-id="${i}"></div>`;
    }
});

let allPag = document.querySelectorAll('.pag');


allPag.forEach(elem => {
    elem.addEventListener('click', (e) => {
        index = Number(e.target.dataset.id);

        allPag.forEach((el) => {
            el.innerHTML = "";
        });

        e.target.innerHTML = `<span id="dot"></span>`;

        showSlide();
    });
});

const showSlide = () => {
    slides.forEach((slide, i) => {
        if (index === i) {
            slide.style.opacity = 1;
        } else {
            slide.style.opacity = 0;
        }
    });


    updatePaginationStyles();
};


leftBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
    } else {
        index = slides.length - 1;
    }

    allPag.forEach(element => {
        if (index == element.dataset.id) {
            element.innerHTML = `<span id="dot"></span>`;
        } else {
            element.innerHTML = "";
        }
    });

    showSlide();
});


rightBtn.addEventListener('click', () => {
    if (index < slides.length - 1) {
        index++;
    } else {
        index = 0;
    }

    allPag.forEach(element => {
        if (index == element.dataset.id) {
            element.innerHTML = `<span id="dot"></span>`;
        } else {
            element.innerHTML = "";
        }
    });

    showSlide();
});


const updatePaginationStyles = () => {
    allPag.forEach(element => {

        if (index == element.dataset.id) {
            element.style.backgroundColor = '#bc5148';
        } else {
            element.style.backgroundColor = '';
        }
    });
};










// ACCORDION
const accordionContent = document.querySelectorAll(".accordion-content")



accordionContent.forEach((element, index) => {


    let accordionHead = element.querySelector(".accordion-head")
    let accordionInfo = element.querySelector(".accordion-info")

    accordionHead.addEventListener("click", function () {
        let head = element.querySelector(".accordion-head a")
        let icon = element.querySelector(".fa-solid ")
        accordionHead.style.color = "#bc5148"
        accordionHead.style.boxShadow = "0px 1px 10px -3px rgb(190, 190, 190)"
        accordionInfo.classList.toggle("open")
        if (accordionInfo.classList.contains("open")) {
            accordionInfo.style.height = `${accordionInfo.scrollHeight}px`
            element.querySelector("i").classList.replace("fa-chevron-down", "fa-chevron-up")
            head.style.color = "#bc5148"
            icon.style.color = "#bc5148"
        } else {
            accordionInfo.style.height = `0px`
            element.querySelector("i").classList.replace("fa-chevron-up", "fa-chevron-down")
            head.style.color = "black"
            icon.style.color = "black"
        }
        collapse(index)
    })
});
function collapse(index) {

    accordionContent.forEach((element2, index2) => {
        let head2 = element2.querySelector(".accordion-head a")
        let icon2 = element2.querySelector(".fa-solid")
        if (index != index2) {
            let accordionInfo2 = element2.querySelector(".accordion-info")
            accordionInfo2.classList.remove("open")
            accordionInfo2.style.height = "0px"
            element2.querySelector("i").classList.replace("fa-chevron-up", "fa-chevron-down")
            head2.style.color = "black"
            icon2.style.color = "black"
        }
    })
}



// STORIES
// const stories = [
//     {
//         id: 1,
//         name: "Edward",
//         age: 14,
//         image: "assets/Media/children_1.jpg.webp",
//         alt: "children_1"

//     },
//     {
//         id: 2,
//         name: "Mellisa",
//         age: 6,
//         image: "assets/Media/children_2.jpg.webp",
//         alt: "children_2"

//     },
//     {
//         id: 3,
//         name: "Mark",
//         age: 12,
//         image: "assets/Media/children_3.jpg.webp",
//         alt: "children_3"

//     },

// ]



const storiesCards = document.querySelector(".stories-cards")

const storiesCard = document.querySelectorAll(".storie-card")
const addForm = document.querySelector(".add-form")
const nameInput = document.querySelector("#name")
const ageInput = document.querySelector("#age")
const imageInput = document.querySelector("#image")
const altInput = document.querySelector("#alt")
const formBtn = document.querySelector("#form-btn")
const modal = document.querySelector(".modal")
const editForm = document.querySelector(".edites-form")
const editNameInput = document.querySelector("#edit-name")
const editAgeInput = document.querySelector("#edit-age")
const editImageInput = document.querySelector("#edit-image")
const editAltInput = document.querySelector("#edit-alt")
const overlay = document.querySelector(".overlay")

let stories = JSON.parse(localStorage.getItem("posts")) || []


document.addEventListener("DOMContentLoaded", showStories(stories));




function showStories(myStories) {
    storiesCards.innerHTML = ""
    myStories.slice(0,3).forEach(myStorie => {
        storiesCards.innerHTML += `

<div class="storie-card">

<div class="storie-img">
    <img src=${myStorie.image} alt="${myStorie.alt}">
</div>
<div class="storie-info">
    <a href="#">${myStorie.name} , <span>${myStorie.age} yrs. old</span></a>
    <div class="storie-btns">
<a href="#" class="details"  storie2-id = ${myStorie.id}><i class="fa-solid fa-circle-info"></i></a>
<a href="#" class="delete" storie-id = ${myStorie.id} ><i class="fa-solid  fa-circle-minus"></i></a>
<a href="#" class="edit" storie-id = ${myStorie.id} ><i class="fa-solid fa-pen-to-square"></i></a>
</div>
</div>

</div>
`


        let deleteBtn = document.querySelectorAll(".delete")
        let detailsBtn = document.querySelectorAll(".details")
        let editBtns = document.querySelectorAll(".edit")
        deleteBtn.forEach(element => {
            element.addEventListener("click", function () {
                let id = element.getAttribute("storie-id")
                //find.indexof,splice

                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        let findStorie = stories.find(storie => storie.id == id)
                        let indexStorie = stories.indexOf(findStorie)
                        stories.splice(indexStorie, 1)
                        showStories(stories)
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `Child named ${findStorie.name} deleted`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });

            })
        });
        detailsBtn.forEach(element2 => {
            element2.addEventListener("click", function () {
                modal.style.display = "block"
                overlay.style.display = "block"
                let id2 = element2.getAttribute("storie2-id")
                let findStorie = stories.find(storie => storie.id == id2)
                modal.innerHTML = `
 <div class="modal-content">
     <p>${findStorie.name}, <span>${findStorie.age} yrs.old</span>  <span class="close"><i class="fa-solid fa-x"></i></span></p>
   
    <img src="${findStorie.image}" alt="${findStorie.alt}" style="width:100%; height:80%;">

  </div>
`
                let closeBtn = document.querySelector(".close")
                closeBtn.addEventListener("click", function () {
                    modal.style.display = "none"
                    overlay.style.display = "none"
                })

            })
        });

        editBtns.forEach(editBTN => {

            editBTN.addEventListener("click", function () {
                overlay.style.display = "block";
                editForm.style.display = "block"

                let close2Btn = document.querySelector(".close2")
                close2Btn.addEventListener("click", function () {
                    editForm.style.display = "none"
                    overlay.style.display = "none"
                })

                let id = editBTN.getAttribute("storie-id")

                let findStory = stories.find(el => el.id == id)
                let storyIndex = stories.indexOf(findStory)

                editNameInput.value = findStory.name
                editAgeInput.value = findStory.age
                editImageInput.value = findStory.image
                editAltInput.value = findStory.alt
                const editFormSubmit = document.querySelector(".edit-form")
                editFormSubmit.addEventListener("submit", function (e) {
                    e.preventDefault()

                    let newStory = {
                        id: id,
                        name: editNameInput.value,
                        age: editAgeInput.value,
                        image: editImageInput.value,
                        alt: editAltInput.value
                    }
                    stories.splice(storyIndex, 1, newStory)
                    localStorage.setItem("posts", JSON.stringify(stories))
                    showStories(stories)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Child Named ${newStory.name} Edited`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    editForm.style.display = "none"
                    overlay.style.display = "none"
                })

            })
        })
    })


}

addForm.addEventListener("submit", function (e) {
    e.preventDefault()



    if (nameInput.value.trim() != "" && ageInput.value.trim() != "" && imageInput.value.trim() != "" && altInput.value.trim() != "") {
        let id = crypto.randomUUID();
        let newStorie = {
            id: id,
            name: nameInput.value,
            age: ageInput.value,
            image: imageInput.value,
            alt: altInput.value
        }
        // stories.push(newStorie)
        addNewCard(newStorie)

        nameInput.value = ""
        ageInput.value = ""
        imageInput.value = ""
        altInput.value = ""
        Swal.fire({
            position: "center",
            icon: "success",
            title: `Child Named ${newStorie.name} Added`,
            showConfirmButton: false,
            timer: 3500
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fill in the inputs!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
})

nextBtn.addEventListener('click', slideRight); 
backBtn.addEventListener('click', slideLeft); 

function addNewCard(newCard) {
    if (stories.length >= 3) {
        stories.shift();
    }
    stories.push(newCard);
    localStorage.setItem("posts", JSON.stringify(stories));
    showStories(stories); 
}






const search = document.querySelector(".search")
const searchInput = document.querySelector("#search")

searchInput.addEventListener("keyup", function () {


    let serachFilter = stories.filter(story => story.name.toLowerCase().trim().includes(searchInput.value.toLowerCase().trim()))
    let searchSort = serachFilter.sort((a, b) => a.age - b.age)
    showStories(searchSort)


});
