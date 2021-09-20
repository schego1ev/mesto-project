const profileEditButton = document.querySelector('.profile-info__edit-button');
const popupCloseButton = document.querySelectorAll('.popup__close');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('#profile-name');
const jobInput = document.querySelector('#profile-profession');
const profileName = document.querySelector('.profile-info__name');
const profileJob = document.querySelector('.profile-info__profession');
const galleryContainer = document.querySelector('.gallery__container');
const addPlaceButton = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('.popup_type_new-place');
const formNewPlaceElement = document.querySelector('[name="new-place"]');
const placeInput = document.querySelector('#place-name');
const urlInput = document.querySelector('#img-url');
const imagePopup = document.querySelector('.popup_type_gallery-image');
const galleryTemplate = document.querySelector('#gallery-template').content;
const galleryItem = galleryTemplate.querySelector('.gallery__item');
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

profileEditButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
});

addPlaceButton.addEventListener('click', () => {
  popupNewPlace.classList.add('popup_opened');
});

let popupClose = () => {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else if (popupNewPlace.classList.contains('popup_opened')) {
    popupNewPlace.classList.remove('popup_opened');
  } else if (imagePopup.classList.contains('popup_opened')) {
    imagePopup.classList.remove('popup_opened');
  }
};

let getProfileInfo = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};
getProfileInfo();

let clearPopupInput = () => {
  placeInput.value = '';
  urlInput.value = '';
};
clearPopupInput();

popupCloseButton.forEach(element => {
  element.addEventListener('click', () => {
    popupClose();
    getProfileInfo();
    clearPopupInput();
  });
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

function galleryLike(likeButton) {
  likeButton.classList.toggle('gallery__like_active');
}

function galleryDelete(deleteButton) {
  deleteButton.closest('.gallery__item').remove();
}

function galleryPopup() {
  imagePopup.classList.add('popup_opened');
}

/*Функция отрисовки первых 6-и карточек галереи*/
function addGalleryItem(arr) {
  arr.forEach(element => {
    const galleryTitle = element.name;
    const imgLink = element.link;
    const galleryItem = galleryTemplate.querySelector('.gallery__item').cloneNode(true);

    galleryItem.querySelector('.gallery__like').addEventListener('click', (evt) => {
      galleryLike(evt.target);
    });
    galleryItem.querySelector('.gallery__delete').addEventListener('click', (evt) => {
      galleryDelete(evt.target);
    });
    galleryItem.querySelector('.gallery__image').addEventListener('click', (evt) => {
      galleryPopup(evt.target);
      imagePopup.querySelector('.popup__image').src = imgLink;
      imagePopup.querySelector('.popup__image').alt = galleryTitle;
      imagePopup.querySelector('.popup__caption').textContent = galleryTitle;
    });
    galleryItem.querySelector('.gallery__image').src = imgLink;
    galleryItem.querySelector('.gallery__image').alt = galleryTitle;
    galleryItem.querySelector('.gallery__title').textContent = galleryTitle;
    galleryContainer.append(galleryItem);
  });
}
addGalleryItem(initialCards);

/*Функция дабовления карточек в галерею*/
function formPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const urlValue = urlInput.value;
  const galleryItem = galleryTemplate.querySelector('.gallery__item').cloneNode(true);

  galleryItem.querySelector('.gallery__like').addEventListener('click', (evt) => {
    galleryLike(evt.target);
  });
  galleryItem.querySelector('.gallery__delete').addEventListener('click', (evt) => {
    galleryDelete(evt.target);
  });
  galleryItem.querySelector('.gallery__image').addEventListener('click', (evt) => {
    galleryPopup(evt.target);
    imagePopup.querySelector('.popup__image').src = urlValue;
    imagePopup.querySelector('.popup__image').alt = placeValue;
    imagePopup.querySelector('.popup__caption').textContent = placeValue;
  });
  galleryItem.querySelector('.gallery__image').src = urlValue;
  galleryItem.querySelector('.gallery__image').alt = placeValue;
  galleryItem.querySelector('.gallery__title').textContent = placeValue;
  galleryContainer.prepend(galleryItem);

  popupClose();
  clearPopupInput();
}
formNewPlaceElement.addEventListener('submit', formPlaceSubmitHandler);