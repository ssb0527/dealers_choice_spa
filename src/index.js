import axios from 'axios';

const brandsList = document.querySelector('#brand-list');
const takeawaysList = document.querySelector('#takeaway-list');
const form = document.querySelector('form');

form.addEventListener('submit', async(ev) => {
    ev.preventDefault();
    const name = document.querySelector('input').value;
    const response = await axios.post('/api/brands', { name });
    state.brands.push(response.data);
    renderBrands();
})

window.addEventListener('hashchange', async() => {
    renderBrands();
    await fetchTakeaways();
    renderTakeaways();
});

brandsList.addEventListener('click', async(ev) => {
    if (ev.target.tagName === 'BUTTON') {
        const brandId = ev.target.getAttribute('data-id') * 1;
        await axios.delete(`/api/brands/${brandId}`);
        state.brands = state.brands.filter(brand => brand.id !== brandId);
        renderBrands();
    };
});

const state = {};

const renderBrands = () => {
    const brandId = window.location.hash.slice(1) * 1;
    const html = state.brands.map(brand => {
        return `
            <li class='${brand.id === brandId ? 'selected': ''}'>
                <a href='#${brand.id}'>
                    ${brand.name}
                </a>
                <button data-id='${brand.id}'>x</button>
            </li>
            `;
    }).join('');
    brandsList.innerHTML = html;
}

const renderTakeaways = () => {
    const html = state.takeaways.map(takeaway => {
        return `
            <li>
                ${takeaway.comment} (${takeaway.commenter.fullName})
            </li>
            `;
    }).join('');
    takeawaysList.innerHTML = html;
}

const fetchBrands = async() => {
    const response = await axios.get('/api/brands');
    state.brands= response.data;
};

const fetchTakeaways = async() => {
    const brandId = window.location.hash.slice(1);
    const response = await axios.get(`/api/brands/${brandId}/takeaways`);
    state.takeaways = response.data;
};

const start = async() => {
    await fetchBrands();
    renderBrands();
}

start();