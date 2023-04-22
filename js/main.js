const d = document

const openModal = d.getElementById('btn-settings')
const modal = d.getElementById('modal')

openModal.addEventListener('click', (e) => {
  e.preventDefault()
  modal.classList.add('modal--show')
})