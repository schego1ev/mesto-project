const profileEditButton = document.querySelector('.profile-info__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('#profile-name');
const jobInput = document.querySelector('#profile-profession');
const profileName = document.querySelector('.profile-info__name');
const profileJob = document.querySelector('.profile-info__profession');

profileEditButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// console.log(nameInput.value = profileName.textContent);
// console.log(jobInput.value = profileJob.textContent);

formElement.addEventListener('submit', formSubmitHandler);