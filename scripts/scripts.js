const profileEditButton = document.querySelector('.profile-info__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('#profile-name');
const jobInput = document.querySelector('#profile-profession');
const profileName = document.querySelector('.profile-info__name');
const profileJob = document.querySelector('.profile-info__profession');
const galleryContainer = document.querySelector('.gallery__container');



profileEditButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
});

let popupClose = () => {
  popup.classList.remove('popup_opened');
};

let getProfileInfo = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};
getProfileInfo();

popupCloseButton.addEventListener('click', () => {
  popupClose();
  getProfileInfo();
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addGalleryItem(arr) {
  arr.forEach(element => {
    let galleryTitle = element.name;
    let imgLink = element.link;

    galleryContainer.insertAdjacentHTML('beforeend', `
    <li class="gallery__item">
      <img class="gallery__image" src="${imgLink}" alt="#">
      <div class="gallery__caption">
        <h2 class="gallery__title">${galleryTitle}</h2>
        <button type="button" class="gallery__like"></button>
      </div>
    </li>`);
  });
}
addGalleryItem(initialCards);