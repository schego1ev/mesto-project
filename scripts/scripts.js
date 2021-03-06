const profileEditButton = document.querySelector('.profile-info__edit-button');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const formProfile = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('#profile-name');
const jobInput = document.querySelector('#profile-profession');
const profileName = document.querySelector('.profile-info__name');
const profileJob = document.querySelector('.profile-info__profession');
const galleryContainer = document.querySelector('.gallery__container');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('.popup_type_new-place');
const formNewPlace = document.querySelector('[name="new-place"]');
const placeInput = document.querySelector('#place-name');
const urlInput = document.querySelector('#img-url');
const popupImage = document.querySelector('.popup_type_gallery-image');
const galleryTemplate = document.querySelector('#gallery-template').content;
const galleryItem = galleryTemplate.querySelector('.gallery__item');
import { initialCards } from './initial-cards.js';

/*функция открыттия попапа*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/*передача в поля попапа данных из верстки*/
const getProfileInfo = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

/*функция закрытия попапа*/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/*функция закрытия попапа добавления карточки с очисткой полей*/
function closePopupNewPlace() {
  closePopup(popupNewPlace);
  formNewPlace.reset();
}

/*установка слушателей на кнопки зыкрытия попапов*/
popupProfile.querySelector('.popup__close')
  .addEventListener('click', () => {
    closePopup(popupProfile);
  });

popupNewPlace.querySelector('.popup__close')
  .addEventListener('click', () => {
    closePopupNewPlace();
  });

popupImage.querySelector('.popup__close')
  .addEventListener('click', () => {
    closePopup(popupImage);
  });

/*открытие попапа редактирования профиля*/
profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
  getProfileInfo();
});

/*открытие попапа добавления элемента галереи*/
buttonAddCard.addEventListener('click', () => {
  openPopup(popupNewPlace);
});

/*функция открытия картинки в попапе*/
function openGalleryPopup() {
  openPopup(popupImage);
}

/*функция изменения профиля*/
function submitProfileForm(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup(popupProfile);
}
formProfile.addEventListener('submit', submitProfileForm);

/*функция лайка*/
function galleryLike(likeButton) {
  likeButton.classList.toggle('gallery__like_active');
}

/*функция удаления элемента галерии*/
function galleryDelete(deleteButton) {
  deleteButton.closest('.gallery__item').remove();
}

/*функция создания карточки*/
function createCard(cardData) {
  const galleryTitle = cardData.name;
  const imgLink = cardData.link;
  const galleryItem = galleryTemplate.
    querySelector('.gallery__item').cloneNode(true);

  galleryItem.querySelector('.gallery__like')
    .addEventListener('click', (evt) => {
      galleryLike(evt.target);
    });
  galleryItem.querySelector('.gallery__delete')
    .addEventListener('click', (evt) => {
      galleryDelete(evt.target);
    });
  galleryItem.querySelector('.gallery__image')
    .addEventListener('click', (evt) => {
      openGalleryPopup(evt.target);
      popupImage.querySelector('.popup__image').src = imgLink;
      popupImage.querySelector('.popup__image').alt = galleryTitle;
      popupImage.querySelector('.popup__caption').textContent = galleryTitle;
    });
  galleryItem.querySelector('.gallery__image').src = imgLink;
  galleryItem.querySelector('.gallery__image').alt = galleryTitle;
  galleryItem.querySelector('.gallery__title').textContent = galleryTitle;

  return galleryItem;
}

/*добавляем карточки с данными из переменной initialCards*/
initialCards.forEach(cardData => {
  const card = createCard(cardData);
  galleryContainer.append(card);
});

/*Функция дабовления карточек в галерею*/
function submitPlaceForm(evt) {
  evt.preventDefault();
  const cardData = { name: placeInput.value, link: urlInput.value };
  const card = createCard(cardData);
  galleryContainer.prepend(card);
  closePopupNewPlace();
}
formNewPlace.addEventListener('submit', submitPlaceForm);
